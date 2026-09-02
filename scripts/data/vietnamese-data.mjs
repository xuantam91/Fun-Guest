/**
 * Procedural Vietnamese Question Generator for Globy Fun Quest.
 * Designed for Kindergarten & Primary School (Mầm Non & Tiểu Học).
 * Topics: Alphabet, Tones, Vowels/Consonants, Spelling, Rhymes, Vocabulary, Sentences, Proverbs.
 */

export const vietnameseAlphabet = [
  { letter: 'A', lower: 'a', word: 'Quả Táo', type: 'nguyên âm' },
  { letter: 'Ă', lower: 'ă', word: 'Con Măng', type: 'nguyên âm' },
  { letter: 'Â', lower: 'â', word: 'Cái Ấm', type: 'nguyên âm' },
  { letter: 'B', lower: 'b', word: 'Em Bé', type: 'phụ âm' },
  { letter: 'C', lower: 'c', word: 'Con Cò', type: 'phụ âm' },
  { letter: 'D', lower: 'd', word: 'Quả Dưa', type: 'phụ âm' },
  { letter: 'Đ', lower: 'đ', word: 'Đèn Pin', type: 'phụ âm' },
  { letter: 'E', lower: 'e', word: 'Em Bé', type: 'nguyên âm' },
  { letter: 'Ê', lower: 'ê', word: 'Con Ếch', type: 'nguyên âm' },
  { letter: 'G', lower: 'g', word: 'Con Gà', type: 'phụ âm' },
  { letter: 'H', lower: 'h', word: 'Bông Hoa', type: 'phụ âm' },
  { letter: 'I', lower: 'i', word: 'Hòn Bi', type: 'nguyên âm' },
  { letter: 'K', lower: 'k', word: 'Cái Kéo', type: 'phụ âm' },
  { letter: 'L', lower: 'l', word: 'Chiếc Lá', type: 'phụ âm' },
  { letter: 'M', lower: 'm', word: 'Mẹ Yêu', type: 'phụ âm' },
  { letter: 'N', lower: 'n', word: 'Nón Lá', type: 'phụ âm' },
  { letter: 'O', lower: 'o', word: 'Quả Óc Chó', type: 'nguyên âm' },
  { letter: 'Ô', lower: 'ô', word: 'Cái Ô (Dù)', type: 'nguyên âm' },
  { letter: 'Ơ', lower: 'ơ', word: 'Lá Cờ', type: 'nguyên âm' },
  { letter: 'P', lower: 'p', word: 'Đèn Pin', type: 'phụ âm' },
  { letter: 'Q', lower: 'q', word: 'Quả Quýt', type: 'phụ âm' },
  { letter: 'R', lower: 'r', word: 'Con Rùa', type: 'phụ âm' },
  { letter: 'S', lower: 's', word: 'Ngôi Sao', type: 'phụ âm' },
  { letter: 'T', lower: 't', word: 'Trái Tim', type: 'phụ âm' },
  { letter: 'U', lower: 'u', word: 'Con Cú', type: 'nguyên âm' },
  { letter: 'Ư', lower: 'ư', word: 'Con Hươu', type: 'nguyên âm' },
  { letter: 'V', lower: 'v', word: 'Con Vịt', type: 'phụ âm' },
  { letter: 'X', lower: 'x', word: 'Xe Máy', type: 'phụ âm' },
  { letter: 'Y', lower: 'y', word: 'Y Tế', type: 'nguyên âm' }
]

export const vietnameseTones = [
  { name: 'Thanh Ngang (không dấu)', example: 'Ba', mark: 'không có dấu' },
  { name: 'Dấu Huyền ( ` )', example: 'Bà', mark: 'dấu huyền ` ' },
  { name: 'Dấu Sắc ( ´ )', example: 'Bá', mark: 'dấu sắc ´ ' },
  { name: 'Dấu Hỏi ( ? )', example: 'Bả', mark: 'dấu hỏi ? ' },
  { name: 'Dấu Ngã ( ~ )', example: 'Bã', mark: 'dấu ngã ~ ' },
  { name: 'Dấu Nặng ( . )', example: 'Bạ', mark: 'dấu nặng . ' }
]

export const vietnameseSpelling = [
  { text: 'b - a', result: 'ba', exp: 'Âm "b" ghép với âm "a" đọc là "ba".' },
  { text: 'm - ẹ', result: 'mẹ', exp: 'Âm "m" ghép với âm "ẹ" đọc là "mẹ".' },
  { text: 'c - á', result: 'cá', exp: 'Âm "c" ghép với âm "á" đọc là "cá".' },
  { text: 'g - à', result: 'gà', exp: 'Âm "g" ghép với âm "à" đọc là "gà".' },
  { text: 'v - ịt', result: 'vịt', exp: 'Âm "v" ghép với vần "ịt" đọc là "vịt".' },
  { text: 'b - óng', result: 'bóng', exp: 'Âm "b" ghép với vần "óng" đọc là "bóng".' },
  { text: 'h - òa', result: 'hòa', exp: 'Âm "h" ghép với vần "òa" đọc là "hòa".' },
  { text: 'nh - à', result: 'nhà', exp: 'Âm "nh" ghép với âm "à" đọc là "nhà".' },
  { text: 'th - ỏ', result: 'thỏ', exp: 'Âm "th" ghép với âm "ỏ" đọc là "thỏ".' },
  { text: 'ch - ợ', result: 'chợ', exp: 'Âm "ch" ghép với âm "ợ" đọc là "chợ".' }
]

export const vietnameseRhymes = [
  { rhyme: 'an', example: 'Bàn', exp: 'Vần "an" gồm nguyên âm "a" đứng trước, phụ âm "n" đứng sau.' },
  { rhyme: 'at', example: 'Hát', exp: 'Vần "at" gồm nguyên âm "a" đứng trước, phụ âm "t" đứng sau.' },
  { rhyme: 'em', example: 'Xem', exp: 'Vần "em" gồm nguyên âm "e" và phụ âm "m".' },
  { rhyme: 'in', example: 'Chín', exp: 'Vần "in" gồm nguyên âm "i" và phụ âm "n".' },
  { rhyme: 'ong', example: 'Chóng', exp: 'Vần "ong" gồm nguyên âm "o" và phụ âm "ng".' },
  { rhyme: 'uon', example: 'Cuộn', exp: 'Vần "uon" gồm nguyên âm đôi "uo" và phụ âm "n".' }
]

export const vietnameseProverbs = [
  { q: 'Điền từ còn thiếu: "Công cha như núi ..... nghĩa mẹ như nước trong nguồn chảy ra."', correct: 'Thái Sơn', wrong: 'Hồng Lĩnh', exp: '"Công cha như núi Thái Sơn, nghĩa mẹ như nước trong nguồn chảy ra" ca ngợi công ơn sinh thành.' },
  { q: 'Điền từ còn thiếu: "Ăn quả nhớ kẻ ..... cây."', correct: 'trồng', wrong: 'tưới', exp: '"Ăn quả nhớ kẻ trồng cây" nhắc nhở lòng biết ơn.' },
  { q: 'Điền từ còn thiếu: "Uống nước nhớ ....."', correct: 'nguồn', wrong: 'sông', exp: '"Uống nước nhớ nguồn" dạy đạo lý biết ơn cội nguồn.' },
  { q: 'Điền từ còn thiếu: "Học thầy không tày học ....."', correct: 'bạn', wrong: 'sách', exp: '"Học thầy không tày học bạn" khuyên học hỏi lẫn nhau.' },
  { q: 'Điền từ còn thiếu: "Thương người như thể thương ....."', correct: 'thân', wrong: 'mình', exp: '"Thương người như thể thương thân" dạy lòng nhân ái.' }
]

export function generateVietnameseQuestions(level, targetCount = 5000) {
  const questions = []
  const seen = new Set()

  let attempts = 0
  while (questions.length < targetCount && attempts < targetCount * 10) {
    attempts++

    if (level === 'alphabet') {
      const item = vietnameseAlphabet[Math.floor(Math.random() * vietnameseAlphabet.length)]
      let other = vietnameseAlphabet[Math.floor(Math.random() * vietnameseAlphabet.length)]
      while (other.letter === item.letter) other = vietnameseAlphabet[Math.floor(Math.random() * vietnameseAlphabet.length)]

      const isLeft = Math.random() < 0.5

      const optLeft = isLeft ? item.letter : other.letter
      const optRight = isLeft ? other.letter : item.letter

      const key = `alph_${item.letter}_${other.letter}_${isLeft}`
      if (!seen.has(key)) {
        seen.add(key)
        questions.push({
          question: `Chữ "${item.letter}" viết thường tương ứng là chữ nào?`,
          option_left: isLeft ? `Chữ "${item.lower}"` : `Chữ "${other.lower}"`,
          option_right: isLeft ? `Chữ "${other.lower}"` : `Chữ "${item.lower}"`,
          correct_option: isLeft ? 'left' : 'right',
          explanation: `Chữ hoa "${item.letter}" có chữ viết thường tương ứng là "${item.lower}".`
        })
      }
    } else if (level === 'tones') {
      const item = vietnameseTones[Math.floor(Math.random() * vietnameseTones.length)]
      let other = vietnameseTones[Math.floor(Math.random() * vietnameseTones.length)]
      while (other.name === item.name) other = vietnameseTones[Math.floor(Math.random() * vietnameseTones.length)]

      const isLeft = Math.random() < 0.5
      const key = `tone_${item.name}_${other.name}_${isLeft}`
      if (!seen.has(key)) {
        seen.add(key)
        questions.push({
          question: `Từ "${item.example}" mang thanh điệu / dấu thanh nào?`,
          option_left: isLeft ? item.name : other.name,
          option_right: isLeft ? other.name : item.name,
          correct_option: isLeft ? 'left' : 'right',
          explanation: `Từ "${item.example}" mang ${item.name}.`
        })
      }
    } else if (level === 'vowels') {
      const item = vietnameseAlphabet[Math.floor(Math.random() * vietnameseAlphabet.length)]
      const isLeft = item.type === 'nguyên âm'
      const key = `vow_${item.letter}_${isLeft}`
      if (!seen.has(key)) {
        seen.add(key)
        questions.push({
          question: `Chữ cái "${item.letter}" (${item.lower}) thuộc loại âm nào trong Tiếng Việt?`,
          option_left: 'Nguyên âm',
          option_right: 'Phụ âm',
          correct_option: isLeft ? 'left' : 'right',
          explanation: `Chữ "${item.letter}" là một ${item.type} trong bảng chữ cái Tiếng Việt.`
        })
      }
    } else if (level === 'spelling') {
      const item = vietnameseSpelling[Math.floor(Math.random() * vietnameseSpelling.length)]
      let other = vietnameseSpelling[Math.floor(Math.random() * vietnameseSpelling.length)]
      while (other.result === item.result) other = vietnameseSpelling[Math.floor(Math.random() * vietnameseSpelling.length)]

      const isLeft = Math.random() < 0.5
      const key = `spel_${item.text}_${other.result}_${isLeft}`
      if (!seen.has(key)) {
        seen.add(key)
        questions.push({
          question: `Bé hãy đánh vần giúp: "${item.text}" đọc thành tiếng là gì?`,
          option_left: isLeft ? item.result : other.result,
          option_right: isLeft ? other.result : item.result,
          correct_option: isLeft ? 'left' : 'right',
          explanation: item.exp
        })
      }
    } else if (level === 'rhymes') {
      const item = vietnameseRhymes[Math.floor(Math.random() * vietnameseRhymes.length)]
      let other = vietnameseRhymes[Math.floor(Math.random() * vietnameseRhymes.length)]
      while (other.rhyme === item.rhyme) other = vietnameseRhymes[Math.floor(Math.random() * vietnameseRhymes.length)]

      const isLeft = Math.random() < 0.5
      const key = `rhym_${item.rhyme}_${other.rhyme}_${isLeft}`
      if (!seen.has(key)) {
        seen.add(key)
        questions.push({
          question: `Từ "${item.example}" chứa vần nào dưới đây?`,
          option_left: isLeft ? `Vần "${item.rhyme}"` : `Vần "${other.rhyme}"`,
          option_right: isLeft ? `Vần "${other.rhyme}"` : `Vần "${item.rhyme}"`,
          correct_option: isLeft ? 'left' : 'right',
          explanation: item.exp
        })
      }
    } else if (level === 'words') {
      const item = vietnameseAlphabet[Math.floor(Math.random() * vietnameseAlphabet.length)]
      let other = vietnameseAlphabet[Math.floor(Math.random() * vietnameseAlphabet.length)]
      while (other.word === item.word) other = vietnameseAlphabet[Math.floor(Math.random() * vietnameseAlphabet.length)]

      const isLeft = Math.random() < 0.5
      const key = `word_${item.letter}_${other.word}_${isLeft}`
      if (!seen.has(key)) {
        seen.add(key)
        questions.push({
          question: `Từ nào dưới đây bắt đầu bằng chữ cái "${item.letter}"?`,
          option_left: isLeft ? item.word : other.word,
          option_right: isLeft ? other.word : item.word,
          correct_option: isLeft ? 'left' : 'right',
          explanation: `Từ "${item.word}" bắt đầu bằng chữ cái "${item.letter}".`
        })
      }
    } else if (level === 'sentences') {
      const isLeft = Math.random() < 0.5
      const key = `sent_${attempts}_${isLeft}`
      if (!seen.has(key)) {
        seen.add(key)
        questions.push({
          question: 'Cuối câu hỏi (ví dụ: "Bé tên là gì?") ta dùng dấu gì?',
          option_left: isLeft ? 'Dấu hỏi ( ? )' : 'Dấu chấm ( . )',
          option_right: isLeft ? 'Dấu chấm ( . )' : 'Dấu hỏi ( ? )',
          correct_option: isLeft ? 'left' : 'right',
          explanation: 'Cuối câu hỏi luôn kết thúc bằng Dấu hỏi ( ? ).'
        })
      }
    } else { // proverbs
      const item = vietnameseProverbs[Math.floor(Math.random() * vietnameseProverbs.length)]
      const isLeft = Math.random() < 0.5
      const key = `prov_${item.correct}_${attempts}_${isLeft}`
      if (!seen.has(key)) {
        seen.add(key)
        questions.push({
          question: item.q,
          option_left: isLeft ? item.correct : item.wrong,
          option_right: isLeft ? item.wrong : item.correct,
          correct_option: isLeft ? 'left' : 'right',
          explanation: item.exp
        })
      }
    }
  }

  return questions
}
