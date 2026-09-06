import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

// Parse .env.local manually
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
let supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

try {
  const envPath = path.join(process.cwd(), '.env.local')
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8')
    for (const line of envContent.split('\n')) {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
      if (match) {
        const key = match[1]
        let value = match[2] || ''
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1)
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1)
        if (!process.env[key]) process.env[key] = value
      }
    }
  }
} catch (e) {}

supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Thiếu NEXT_PUBLIC_SUPABASE_URL hoặc SUPABASE_SERVICE_ROLE_KEY trong .env.local')
  process.exit(1)
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

async function auditDatabase() {
  console.log('🔍 Đang rà soát toàn bộ ngân hàng câu hỏi trên Supabase database...')

  const { count, error: countErr } = await supabaseAdmin
    .from('question_cache')
    .select('*', { count: 'exact', head: true })

  if (countErr) {
    console.error('Lỗi lấy tổng số câu hỏi:', countErr)
    return
  }

  console.log(`📊 TỔNG SỐ CÂU HỎI TRONG DATABASE: ${count.toLocaleString('vi-VN')} câu.`)
}

auditDatabase()
