const { GoogleGenerativeAI } = require('@google/generative-ai');
const { createClient } = require('@supabase/supabase-js');

// Read env variables manually from .env.local
require('fs').readFileSync('.env.local', 'utf-8')
  .split('\n')
  .forEach(line => {
    const parts = line.match(/^\s*([\w\.\-]+)\s*=\s*(.*)?\s*$/);
    if (parts) {
      const key = parts[1];
      let value = parts[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
      if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
      process.env[key] = value;
    }
  });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const geminiKey = process.env.GEMINI_API_KEY;

if (!supabaseUrl || !supabaseServiceKey || !geminiKey) {
  console.error('Lỗi: Thiếu cấu hình Supabase hoặc Gemini API Key trong .env.local!');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);
const genAI = new GoogleGenerativeAI(geminiKey);

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const ENGLISH_LEVELS = ['starters', 'movers', 'flyers', 'a1', 'a2', 'b1', 'b2'];
const CHINESE_LEVELS = ['hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'life', 'office', 'factory'];
const MATH_LEVELS = ['grade1', 'grade2', 'grade3', 'grade4', 'grade5'];

async function generateAndInsert(lang, level) {
  console.log(`\n--------------------------------------------------`);
  console.log(`[+] Đang xử lý: ${lang.toUpperCase()} - Cấp độ: ${level}`);

  // 1. Check current cache size
  const { data, error } = await supabase
    .from('question_cache')
    .select('id')
    .eq('language', lang)
    .eq('level', level);

  if (error) {
    console.error(`Lỗi truy vấn cache cho ${lang}-${level}:`, error.message);
    return;
  }

  const currentCount = data ? data.length : 0;
  console.log(`-> Số câu hỏi hiện có trong cache DB: ${currentCount}`);

  if (currentCount >= 15) {
    console.log(`-> Đã đủ số lượng câu hỏi (>15). Bỏ qua.`);
    return;
  }

  const toGenerate = 15 - currentCount;
  console.log(`-> Cần sinh thêm ${toGenerate} câu hỏi từ Gemini...`);

  // 2. Setup Gemini Model
  const model = genAI.getGenerativeModel({
    model: 'gemini-3.5-flash',
    generationConfig: { responseMimeType: 'application/json' },
  });

  let prompt = '';
  if (lang === 'en') {
    prompt = `Tạo đúng ${toGenerate} câu hỏi trắc nghiệm từ vựng tiếng Anh theo chuẩn Cambridge, cấp độ: "${level}" (starters, movers, flyers, a1, a2, b1, b2).
Yêu cầu cho mỗi câu hỏi:
1. "question": Câu hỏi ngắn gọn, thú vị bằng tiếng Việt (hoặc câu điền vào chỗ trống) cho trẻ em.
2. "option_left": Đáp án tiếng Anh.
3. "option_right": Đáp án tiếng Anh.
4. "correct_option": "left" hoặc "right".
5. "explanation": Giải thích ngắn gọn bằng tiếng Việt kèm nghĩa từ vựng.
Định dạng trả về bắt buộc phải là một mảng JSON:
[{"question": "...", "option_left": "...", "option_right": "...", "correct_option": "left", "explanation": "..."}]`;
  } else if (lang === 'zh') {
    prompt = `Tạo đúng ${toGenerate} câu hỏi trắc nghiệm tiếng Trung HSK/chủ đề: "${level}" (hsk1, hsk2, hsk3, hsk4, hsk5, life, office, factory).
Yêu cầu:
1. "question": Câu hỏi tiếng Việt hoặc điền vào chỗ trống kèm Pinyin.
2. "option_left": Chữ Hán (kèm Pinyin trong ngoặc).
3. "option_right": Chữ Hán (kèm Pinyin trong ngoặc).
4. "correct_option": "left" hoặc "right".
5. "explanation": Giải thích tiếng Việt kèm nghĩa từ.
Trả về mảng JSON.`;
  } else if (lang === 'math') {
    prompt = `Tạo đúng ${toGenerate} câu hỏi trắc nghiệm Toán tiểu học bằng tiếng Việt cấp độ: "${level}" (grade1, grade2, grade3, grade4, grade5).
Yêu cầu theo lớp:
- grade1: Cộng/trừ trong phạm vi 20, đếm số.
- grade2: Cộng/trừ trong phạm vi 100, bảng nhân/chia 2-5.
- grade3: Cộng/trừ/nhân/chia 3-4 chữ số, tính chu vi/diện tích cơ bản, phân số đơn giản.
- grade4: Phép tính phân số, trung bình cộng, tìm X.
- grade5: Số thập phân, phần trăm, chuyển động đều, thể tích.
Các trường: "question" (Câu hỏi dễ thương), "option_left" (Đáp án số/đơn vị), "option_right", "correct_option", "explanation" (Cách tính).
Trả về mảng JSON.`;
  }

  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const questions = JSON.parse(responseText);

    if (!Array.isArray(questions)) {
      throw new Error('Kết quả trả về không phải là mảng.');
    }

    const dbInsertData = questions.map(q => ({
      language: lang,
      level: level,
      question: q.question,
      option_left: q.option_left,
      option_right: q.option_right,
      correct_option: q.correct_option,
      explanation: q.explanation
    }));

    const { error: insertError } = await supabase
      .from('question_cache')
      .insert(dbInsertData);

    if (insertError) {
      throw new Error(insertError.message);
    }

    console.log(`[+] Đã lưu thành công ${questions.length} câu hỏi mới vào DB!`);
  } catch (err) {
    console.error(`[-] Thất bại khi sinh câu hỏi cho ${lang}-${level}:`, err.message);
  }

  // Sleep 4 seconds to avoid hitting API Rate Limits
  console.log('Chờ 4 giây trước khi tiếp tục...');
  await sleep(4000);
}

async function startSeeding() {
  console.log('=== KHỞI ĐỘNG CHƯƠNG TRÌNH PRE-SEED CÂU HỎI CHO GLOBY FUN QUEST ===');
  
  // Seed English
  for (const lvl of ENGLISH_LEVELS) {
    await generateAndInsert('en', lvl);
  }

  // Seed Chinese
  for (const lvl of CHINESE_LEVELS) {
    await generateAndInsert('zh', lvl);
  }

  // Seed Math
  for (const lvl of MATH_LEVELS) {
    await generateAndInsert('math', lvl);
  }

  console.log('\n=== HOÀN THÀNH PRE-SEED TOÀN BỘ CÂU HỎI! ===');
  process.exit(0);
}

startSeeding();
