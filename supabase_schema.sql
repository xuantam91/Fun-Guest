-- GLOBY Fun Quest - Supabase Database Schema

-- Enable Row Level Security (RLS) on all tables

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    selected_theme TEXT DEFAULT 'forest',
    selected_avatar TEXT DEFAULT 'dino',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to profiles" 
    ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Allow users to update their own profile" 
    ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. SCORES TABLE
CREATE TABLE IF NOT EXISTS public.scores (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    points INTEGER DEFAULT 0 NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to scores" 
    ON public.scores FOR SELECT USING (true);

CREATE POLICY "Allow users to update their own score" 
    ON public.scores FOR ALL USING (auth.uid() = user_id);

-- 3. STREAKS TABLE
CREATE TABLE IF NOT EXISTS public.streaks (
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
    current_streak INTEGER DEFAULT 0 NOT NULL,
    longest_streak INTEGER DEFAULT 0 NOT NULL,
    last_active_date DATE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to streaks" 
    ON public.streaks FOR SELECT USING (true);

CREATE POLICY "Allow users to update their own streak" 
    ON public.streaks FOR ALL USING (auth.uid() = user_id);

-- 4. QUESTION CACHE TABLE
CREATE TABLE IF NOT EXISTS public.question_cache (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    language TEXT NOT NULL, -- 'en' or 'zh'
    level TEXT NOT NULL, -- 'starters', 'movers', 'flyers', 'a1', etc.
    question TEXT NOT NULL,
    option_left TEXT NOT NULL,
    option_right TEXT NOT NULL,
    correct_option TEXT NOT NULL, -- 'left' or 'right'
    explanation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.question_cache ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to question cache" 
    ON public.question_cache FOR SELECT USING (true);

CREATE POLICY "Allow service_role to manage question cache" 
    ON public.question_cache FOR ALL USING (true);

-- 5. TRIGGER FOR NEW USER SIGNUP
-- Automatically creates a profile, score, and streak entry when a new user registers via Supabase Auth.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        new.id,
        new.email,
        COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', 'Bé Thám Hiểm'),
        new.raw_user_meta_data->>'avatar_url'
    );

    INSERT INTO public.scores (user_id, points)
    VALUES (new.id, 0);

    INSERT INTO public.streaks (user_id, current_streak, longest_streak, last_active_date)
    VALUES (new.id, 0, 0, NULL);

    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 6. HELPER FUNCTION TO UPDATE STREAK
-- Call this function when a user completes a lesson. It manages daily streaks.
CREATE OR REPLACE FUNCTION public.update_user_streak(target_user_id UUID)
RETURNS VOID AS $$
DECLARE
    today DATE := CURRENT_DATE;
    last_active DATE;
    curr_streak INTEGER;
    long_streak INTEGER;
BEGIN
    -- Get current streak details
    SELECT last_active_date, current_streak, longest_streak 
    INTO last_active, curr_streak, long_streak
    FROM public.streaks
    WHERE user_id = target_user_id;

    -- If no record, initialize (should be created by trigger, but safety first)
    IF NOT FOUND THEN
        INSERT INTO public.streaks (user_id, current_streak, longest_streak, last_active_date)
        VALUES (target_user_id, 1, 1, today);
        RETURN;
    END IF;

    -- If already active today, do nothing
    IF last_active = today THEN
        RETURN;
    END IF;

    -- If active yesterday, increment streak
    IF last_active = today - INTERVAL '1 day' THEN
        curr_streak := curr_streak + 1;
    -- If missed a day or first time, reset streak to 1
    ELSE
        curr_streak := 1;
    END IF;

    -- Update longest streak if necessary
    IF curr_streak > long_streak THEN
        long_streak := curr_streak;
    END IF;

    -- Update record
    UPDATE public.streaks
    SET 
        current_streak = curr_streak,
        longest_streak = long_streak,
        last_active_date = today,
        updated_at = now()
    WHERE user_id = target_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
