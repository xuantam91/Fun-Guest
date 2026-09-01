import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'placeholder_key')

/**
 * Generates a batch of multiple-choice vocabulary questions using Gemini.
 * @param {string} lang - 'en' or 'zh'
 * @param {string} level - Level string (e.g. starters, movers, hsk1, factory)
 * @param {number} count - Number of questions to generate
 * @returns {Promise<Array>} - Array of question objects
 */
export async function generateQuestionsFromGemini(lang, level, count = 10, apiKey = null) {
  const activeKey = apiKey || process.env.GEMINI_API_KEY
  if (!activeKey) {
    throw new Error('Thiếu GEMINI_API_KEY trong biến môi trường hoặc cấu hình cá nhân.')
  }

  const clientGenAI = new GoogleGenerativeAI(activeKey)
  const model = clientGenAI.getGenerativeModel({
    model: 'gemini-3.5-flash',
    generationConfig: {
      responseMimeType: 'application/json',
    },
  })

  let prompt = ''

  if (lang === 'en') {
    prompt = `Bạn là chuyên gia thiết kế trò chơi học ngoại ngữ cho trẻ em.
Hãy tạo đúng ${count} câu hỏi trắc nghiệm từ vựng tiếng Anh theo chuẩn Cambridge, cấp độ: "${level}" (ví dụ: starters, movers, flyers, a1, a2, b1, b2).

Yêu cầu cho mỗi câu hỏi:
1. "question": Câu hỏi ngắn gọn, thú vị bằng tiếng Việt (hoặc câu tiếng Anh điền vào chỗ trống) phù hợp cho trẻ em. Ví dụ: "Đâu là quả táo?" hoặc "I eat an ____ every day."
2. "option_left": Đáp án lựa chọn bên trái (từ vựng tiếng Anh). Ví dụ: "Apple"
3. "option_right": Đáp án lựa chọn bên phải (từ vựng tiếng Anh). Ví dụ: "Banana"
4. "correct_option": Chỉ nhận giá trị "left" hoặc "right".
5. "explanation": Giải thích ngắn gọn bằng tiếng Việt kèm nghĩa từ vựng. Ví dụ: "Apple có nghĩa là quả táo."

Định dạng trả về bắt buộc phải là một mảng JSON chứa các đối tượng có cấu trúc chính xác như sau:
[
  {
    "question": "Câu hỏi...",
    "option_left": "Từ tiếng Anh...",
    "option_right": "Từ tiếng Anh...",
    "correct_option": "left",
    "explanation": "Giải thích..."
  }
]`
  } else if (lang === 'zh') {
    prompt = `Bạn là chuyên gia thiết kế trò chơi học ngoại ngữ cho trẻ em.
Hãy tạo đúng ${count} câu hỏi trắc nghiệm từ vựng tiếng Trung cấp độ HSK hoặc chủ đề: "${level}" (hsk1, hsk2, hsk3, hsk4, hsk5, hoặc các chủ đề: life, office, factory).

Yêu cầu cho mỗi câu hỏi:
1. "question": Câu hỏi ngắn gọn bằng tiếng Việt hoặc câu tiếng Trung điền vào chỗ trống kèm Pinyin. Ví dụ: "Từ nào dưới đây nghĩa là 'Xin chào'?" hoặc "Từ '谢谢 (xièxie)' nghĩa là gì?"
2. "option_left": Đáp án lựa chọn bên trái (gồm Chữ Hán kèm Phiên âm Pinyin trong ngoặc). Ví dụ: "你好 (nǐ hǎo)"
3. "option_right": Đáp án lựa chọn bên phải (gồm Chữ Hán kèm Phiên âm Pinyin trong ngoặc). Ví dụ: "谢谢 (xièxie)"
4. "correct_option": Chỉ nhận giá trị "left" hoặc "right".
5. "explanation": Giải thích ngắn gọn bằng tiếng Việt kèm nghĩa từ vựng. Ví dụ: "你好 (nǐ hǎo) nghĩa là Xin chào."

Định dạng trả về bắt buộc phải là một mảng JSON chứa các đối tượng có cấu trúc chính xác như sau:
[
  {
    "question": "Câu hỏi...",
    "option_left": "Chữ Hán (Pinyin)...",
    "option_right": "Chữ Hán (Pinyin)...",
    "correct_option": "right",
    "explanation": "Giải thích..."
  }
]`
  } else if (lang === 'math') {
    prompt = `Bạn là chuyên gia thiết kế trò chơi học Toán cho trẻ em tiểu học.
Hãy tạo đúng ${count} câu hỏi trắc nghiệm Toán học bằng tiếng Việt cho trình độ: "${level}" (grade1, grade2, grade3, grade4, grade5).

Yêu cầu cho mỗi câu hỏi theo từng lớp:
- "grade1": Phép cộng, trừ phạm vi 20, so sánh số, đếm hình. Ví dụ: "Bé tính giúp: 8 + 7 = ?" hoặc "Số nào lớn hơn: 15 hay 12?"
- "grade2": Phép cộng, trừ phạm vi 100, bảng nhân/chia 2, 3, 4, 5. Ví dụ: "Bé tính giúp: 5 x 4 = ?"
- "grade3": Cộng/trừ/nhân/chia số có 3-4 chữ số, tính chu vi/diện tích cơ bản, phân số đơn giản. Ví dụ: "Tính chu vi hình vuông có cạnh dài 5cm?"
- "grade4": Phép tính với phân số, số trung bình cộng, tìm X, bài toán đố đơn giản. Ví dụ: "Tìm X biết: X x 5 = 150."
- "grade5": Số thập phân, phần trăm, tính diện tích hình thang/hình tròn, bài toán chuyển động (vận tốc, quãng đường, thời gian). Ví dụ: "Một ô tô đi với vận tốc 40 km/h trong 2 giờ. Quãng đường đi được là bao nhiêu?"

Yêu cầu định dạng đáp án:
1. "question": Câu hỏi ngắn gọn, dễ thương bằng tiếng Việt.
2. "option_left": Đáp án lựa chọn bên trái (chỉ chứa số hoặc đơn vị đo ngắn gọn). Ví dụ: "15" hoặc "20 cm"
3. "option_right": Đáp án lựa chọn bên phải. Ví dụ: "12" hoặc "25 cm"
4. "correct_option": Chỉ nhận giá trị "left" hoặc "right".
5. "explanation": Giải thích ngắn gọn cách tính bằng tiếng Việt để bé hiểu. Ví dụ: "Vì 8 + 7 = 15."

Định dạng trả về bắt buộc phải là một mảng JSON chứa các đối tượng có cấu trúc chính xác như sau:
[
  {
    "question": "Câu hỏi...",
    "option_left": "Đáp án...",
    "option_right": "Đáp án...",
    "correct_option": "left",
    "explanation": "Giải thích..."
  }
]`
  } else {
    throw new Error('Ngôn ngữ không hỗ trợ: ' + lang)
  }

  const result = await model.generateContent(prompt)
  const responseText = result.response.text()

  try {
    const questions = JSON.parse(responseText)
    if (!Array.isArray(questions)) {
      throw new Error('Dữ liệu trả về từ Gemini không phải là mảng.')
    }
    return questions
  } catch (error) {
    console.error('Lỗi phân tích JSON từ Gemini:', responseText)
    throw new Error('Không thể phân tích dữ liệu câu hỏi từ AI. Vui lòng thử lại.')
  }
}
