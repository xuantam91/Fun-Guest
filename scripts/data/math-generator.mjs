/**
 * Algorithmic Math Question Generator for Elementary Grades 1 to 5.
 * Generates 2,000+ distinct questions per grade with zero token cost.
 */

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function makeQuestion(question, correctVal, wrongVal, explanation) {
  const isLeftCorrect = Math.random() < 0.5
  return {
    question,
    option_left: String(isLeftCorrect ? correctVal : wrongVal),
    option_right: String(isLeftCorrect ? wrongVal : correctVal),
    correct_option: isLeftCorrect ? 'left' : 'right',
    explanation
  }
}

// ----------------------------------------------------
// GRADE 1: 2,000 questions
// ----------------------------------------------------
export function generateGrade1Questions(targetCount = 2000) {
  const questions = []
  const seen = new Set()
  const names = ['Nam', 'Lan', 'Hoa', 'Minh', 'An', 'Bình', 'Hà', 'Linh', 'Khánh', 'Tú']
  const items = ['quả táo', 'cây kẹo', 'viên bi', 'bông hoa', 'quyển vở', 'bút chì', 'quả bóng']

  let attempts = 0
  while (questions.length < targetCount && attempts < targetCount * 10) {
    attempts++
    const type = getRandomInt(1, 6)
    let qObj = null

    if (type === 1) {
      // Phép cộng phạm vi 20
      const a = getRandomInt(1, 15)
      const b = getRandomInt(1, 20 - a)
      const sum = a + b
      const wrong = sum + (Math.random() < 0.5 ? 1 : -1) * getRandomInt(1, 3)
      const wrongClean = wrong === sum || wrong <= 0 ? sum + 2 : wrong
      const key = `g1_add_${a}_${b}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Bé tính giúp: ${a} + ${b} = ?`,
          sum,
          wrongClean,
          `Vì ${a} cộng ${b} bằng ${sum}.`
        )
      }
    } else if (type === 2) {
      // Phép trừ phạm vi 20
      const sum = getRandomInt(3, 20)
      const a = getRandomInt(1, sum)
      const diff = sum - a
      const wrong = diff + (Math.random() < 0.5 ? 1 : -1) * getRandomInt(1, 3)
      const wrongClean = wrong === diff || wrong < 0 ? diff + 2 : wrong
      const key = `g1_sub_${sum}_${a}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Bé tính giúp: ${sum} - ${a} = ?`,
          diff,
          wrongClean,
          `Vì ${sum} trừ ${a} bằng ${diff}.`
        )
      }
    } else if (type === 3) {
      // So sánh số lớn hơn / bé hơn
      const a = getRandomInt(1, 20)
      let b = getRandomInt(1, 20)
      while (b === a) b = getRandomInt(1, 20)
      const isGreater = Math.random() < 0.5
      const correct = isGreater ? Math.max(a, b) : Math.min(a, b)
      const wrong = isGreater ? Math.min(a, b) : Math.max(a, b)
      const key = `g1_cmp_${a}_${b}_${isGreater}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Số nào ${isGreater ? 'lớn hơn' : 'bé hơn'}: ${a} hay ${b}?`,
          correct,
          wrong,
          `Vì ${correct} ${isGreater ? 'lớn hơn' : 'bé hơn'} ${wrong}.`
        )
      }
    } else if (type === 4) {
      // Số liền trước / liền sau
      const num = getRandomInt(2, 19)
      const isAfter = Math.random() < 0.5
      const correct = isAfter ? num + 1 : num - 1
      const wrong = isAfter ? num - 1 : num + 1
      const key = `g1_seq_${num}_${isAfter}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Số liền ${isAfter ? 'sau' : 'trước'} của số ${num} là số nào?`,
          correct,
          wrong,
          `Số liền ${isAfter ? 'sau' : 'trước'} của ${num} là ${correct}.`
        )
      }
    } else if (type === 5) {
      // Bài toán có lời văn ngắn
      const name1 = names[getRandomInt(0, names.length - 1)]
      const it = items[getRandomInt(0, items.length - 1)]
      const a = getRandomInt(2, 10)
      const b = getRandomInt(1, 10)
      const isAdd = Math.random() < 0.5
      if (isAdd) {
        const total = a + b
        const key = `g1_word_add_${name1}_${a}_${b}_${it}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `${name1} có ${a} ${it}, bạn tặng thêm ${b} ${it}. Hỏi ${name1} có tất cả bao nhiêu ${it}?`,
            `${total} ${it}`,
            `${total + 2} ${it}`,
            `Phép tính: ${a} + ${b} = ${total} (${it}).`
          )
        }
      } else {
        const total = a + b
        const remain = total - a
        const key = `g1_word_sub_${name1}_${total}_${a}_${it}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `${name1} có ${total} ${it}, ${name1} cho bạn ${a} ${it}. Hỏi ${name1} còn lại bao nhiêu ${it}?`,
            `${remain} ${it}`,
            `${remain === 1 ? 3 : remain - 1} ${it}`,
            `Phép tính: ${total} - ${a} = ${remain} (${it}).`
          )
        }
      }
    } else {
      // Điền số thích hợp vào chỗ trống (dạng ... + b = c hoặc a - ... = c)
      const a = getRandomInt(1, 10)
      const b = getRandomInt(1, 10)
      const sum = a + b
      const key = `g1_fill_${a}_${b}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Điền số thích hợp: ... + ${b} = ${sum}`,
          a,
          a + (Math.random() < 0.5 ? 1 : -1),
          `Vì ${a} + ${b} = ${sum} nên số cần điền là ${a}.`
        )
      }
    }

    if (qObj) questions.push(qObj)
  }

  return questions
}

// ----------------------------------------------------
// GRADE 2: 2,000 questions
// ----------------------------------------------------
export function generateGrade2Questions(targetCount = 2000) {
  const questions = []
  const seen = new Set()

  let attempts = 0
  while (questions.length < targetCount && attempts < targetCount * 10) {
    attempts++
    const type = getRandomInt(1, 6)
    let qObj = null

    if (type === 1) {
      // Bảng nhân 2, 3, 4, 5, 6
      const a = getRandomInt(2, 6)
      const b = getRandomInt(1, 10)
      const prod = a * b
      const wrong = prod + (Math.random() < 0.5 ? a : -a)
      const key = `g2_mul_${a}_${b}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Bé tính giúp: ${a} x ${b} = ?`,
          prod,
          wrong <= 0 || wrong === prod ? prod + 3 : wrong,
          `Bảng nhân ${a}: ${a} x ${b} = ${prod}.`
        )
      }
    } else if (type === 2) {
      // Bảng chia 2, 3, 4, 5
      const div = getRandomInt(2, 5)
      const quo = getRandomInt(1, 10)
      const num = div * quo
      const wrong = quo + (Math.random() < 0.5 ? 1 : -1) * getRandomInt(1, 2)
      const key = `g2_div_${num}_${div}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Bé tính giúp: ${num} : ${div} = ?`,
          quo,
          wrong <= 0 || wrong === quo ? quo + 3 : wrong,
          `Vì ${div} x ${quo} = ${num} nên ${num} : ${div} = ${quo}.`
        )
      }
    } else if (type === 3) {
      // Phép cộng trong phạm vi 100
      const a = getRandomInt(12, 68)
      const b = getRandomInt(11, 31)
      const sum = a + b
      const wrong = sum + (Math.random() < 0.5 ? 10 : -10)
      const key = `g2_add100_${a}_${b}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Bé tính: ${a} + ${b} = ?`,
          sum,
          wrong === sum ? sum + 2 : wrong,
          `Ta có: ${a} + ${b} = ${sum}.`
        )
      }
    } else if (type === 4) {
      // Phép trừ trong phạm vi 100
      const a = getRandomInt(30, 99)
      const b = getRandomInt(10, a - 5)
      const diff = a - b
      const wrong = diff + (Math.random() < 0.5 ? 10 : -10)
      const key = `g2_sub100_${a}_${b}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Bé tính: ${a} - ${b} = ?`,
          diff,
          wrong <= 0 || wrong === diff ? diff + 5 : wrong,
          `Ta có: ${a} - ${b} = ${diff}.`
        )
      }
    } else if (type === 5) {
      // Tìm x cơ bản (x + a = b hoặc a - x = b)
      const x = getRandomInt(5, 40)
      const a = getRandomInt(5, 40)
      const sum = x + a
      const key = `g2_findx_${x}_${a}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Tìm x biết: x + ${a} = ${sum}`,
          x,
          x + 5,
          `x = ${sum} - ${a} = ${x}.`
        )
      }
    } else {
      // Đổi đơn vị đo: dm sang cm, m sang dm, kg, lít
      const dm = getRandomInt(2, 9)
      const cm = dm * 10
      const key = `g2_unit_dm_${dm}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Đổi: ${dm} dm = ... cm?`,
          `${cm} cm`,
          `${dm * 100} cm`,
          `Vì 1 dm = 10 cm nên ${dm} dm = ${cm} cm.`
        )
      }
    }

    if (qObj) questions.push(qObj)
  }

  return questions
}

// ----------------------------------------------------
// GRADE 3: 2,000 questions
// ----------------------------------------------------
export function generateGrade3Questions(targetCount = 2000) {
  const questions = []
  const seen = new Set()

  let attempts = 0
  while (questions.length < targetCount && attempts < targetCount * 10) {
    attempts++
    const type = getRandomInt(1, 6)
    let qObj = null

    if (type === 1) {
      // Chu vi hình chữ nhật & hình vuông
      const isSquare = Math.random() < 0.5
      if (isSquare) {
        const side = getRandomInt(4, 30)
        const p = side * 4
        const key = `g3_psq_${side}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Tính chu vi hình vuông có cạnh ${side} cm?`,
            `${p} cm`,
            `${p + 4} cm`,
            `Chu vi hình vuông = cạnh x 4 = ${side} x 4 = ${p} cm.`
          )
        }
      } else {
        const d = getRandomInt(10, 40)
        const r = getRandomInt(3, d - 2)
        const p = (d + r) * 2
        const key = `g3_prec_${d}_${r}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Tính chu vi hình chữ nhật có chiều dài ${d} cm, chiều rộng ${r} cm?`,
            `${p} cm`,
            `${p + 6} cm`,
            `Chu vi = (${d} + ${r}) x 2 = ${p} cm.`
          )
        }
      }
    } else if (type === 2) {
      // Diện tích hình chữ nhật & hình vuông
      const isSquare = Math.random() < 0.5
      if (isSquare) {
        const side = getRandomInt(3, 12)
        const s = side * side
        const key = `g3_ssq_${side}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Tính diện tích hình vuông có cạnh dài ${side} cm?`,
            `${s} cm²`,
            `${s + side} cm²`,
            `Diện tích hình vuông = cạnh x cạnh = ${side} x ${side} = ${s} cm².`
          )
        }
      } else {
        const d = getRandomInt(5, 15)
        const r = getRandomInt(2, d - 1)
        const s = d * r
        const key = `g3_srec_${d}_${r}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Tính diện tích hình chữ nhật có chiều dài ${d} cm và chiều rộng ${r} cm?`,
            `${s} cm²`,
            `${(d + r) * 2} cm²`,
            `Diện tích = dài x rộng = ${d} x ${r} = ${s} cm².`
          )
        }
      }
    } else if (type === 3) {
      // Nhân số có 3 chữ số với số có 1 chữ số
      const a = getRandomInt(110, 450)
      const b = getRandomInt(2, 5)
      const prod = a * b
      const key = `g3_mul3_${a}_${b}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Bé tính: ${a} x ${b} = ?`,
          prod,
          prod + 10,
          `Ta có: ${a} x ${b} = ${prod}.`
        )
      }
    } else if (type === 4) {
      // Chia số có 3 chữ số cho số có 1 chữ số (chia hết)
      const b = getRandomInt(2, 6)
      const quo = getRandomInt(30, 160)
      const a = b * quo
      const key = `g3_div3_${a}_${b}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Bé tính: ${a} : ${b} = ?`,
          quo,
          quo + 5,
          `Ta có: ${a} : ${b} = ${quo}.`
        )
      }
    } else if (type === 5) {
      // Gấp lên nhiều lần / Giảm đi nhiều lần
      const num = getRandomInt(12, 60)
      const k = getRandomInt(2, 6)
      const isMul = Math.random() < 0.5
      if (isMul) {
        const res = num * k
        const key = `g3_times_m_${num}_${k}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Số ${num} gấp lên ${k} lần được bao nhiêu?`,
            res,
            res + k,
            `Lấy ${num} x ${k} = ${res}.`
          )
        }
      } else {
        const total = num * k
        const key = `g3_times_d_${total}_${k}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Số ${total} giảm đi ${k} lần được bao nhiêu?`,
            num,
            num + 2,
            `Lấy ${total} : ${k} = ${num}.`
          )
        }
      }
    } else {
      // Đổi đơn vị đo: km, m, kg, g
      const km = getRandomInt(1, 9)
      const m = getRandomInt(10, 800)
      const totalM = km * 1000 + m
      const key = `g3_unit_km_${km}_${m}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Đổi: ${km} km ${m} m = ... m?`,
          `${totalM} m`,
          `${km * 100 + m} m`,
          `Vì 1 km = 1000 m nên ${km} km ${m} m = ${km * 1000} + ${m} = ${totalM} m.`
        )
      }
    }

    if (qObj) questions.push(qObj)
  }

  return questions
}

// ----------------------------------------------------
// GRADE 4: 2,000 questions
// ----------------------------------------------------
export function generateGrade4Questions(targetCount = 2000) {
  const questions = []
  const seen = new Set()

  let attempts = 0
  while (questions.length < targetCount && attempts < targetCount * 10) {
    attempts++
    const type = getRandomInt(1, 6)
    let qObj = null

    if (type === 1) {
      // Trung bình cộng của 2, 3 hoặc 4 số
      const avg = getRandomInt(30, 150)
      const d = getRandomInt(3, 15)
      const a = avg - d
      const b = avg + d
      const key = `g4_avg_${a}_${b}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Tìm số trung bình cộng của ${a} và ${b}?`,
          avg,
          avg + 6,
          `Trung bình cộng = (${a} + ${b}) : 2 = ${avg}.`
        )
      }
    } else if (type === 2) {
      // Tìm 2 số khi biết Tổng và Hiệu
      const soBe = getRandomInt(20, 120)
      const hieu = getRandomInt(6, 40)
      const soLon = soBe + hieu
      const tong = soLon + soBe
      const isAskLon = Math.random() < 0.5
      const ans = isAskLon ? soLon : soBe
      const wrong = isAskLon ? soBe : soLon
      const key = `g4_sumdiff_${tong}_${hieu}_${isAskLon}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Tổng hai số là ${tong}, hiệu là ${hieu}. ${isAskLon ? 'Số lớn' : 'Số bé'} là?`,
          ans,
          wrong,
          isAskLon ? `Số lớn = (${tong} + ${hieu}) : 2 = ${ans}.` : `Số bé = (${tong} - ${hieu}) : 2 = ${ans}.`
        )
      }
    } else if (type === 3) {
      // Phân số: Rút gọn phân số
      const num = getRandomInt(1, 7)
      const den = getRandomInt(num + 1, 11)
      const k = getRandomInt(2, 6)
      const bigNum = num * k
      const bigDen = den * k
      const key = `g4_frac_red_${bigNum}_${bigDen}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Rút gọn phân số ${bigNum}/${bigDen} về phân số tối giản?`,
          `${num}/${den}`,
          `${num + 1}/${den}`,
          `Chia cả tử và mẫu cho ${k} ta được ${num}/${den}.`
        )
      }
    } else if (type === 4) {
      // Cộng trừ hai phân số cùng mẫu số
      const den = getRandomInt(5, 15)
      const num1 = getRandomInt(1, den - 2)
      const num2 = getRandomInt(1, den - num1)
      const isAdd = Math.random() < 0.5
      if (isAdd) {
        const sum = num1 + num2
        const key = `g4_frac_add_${num1}_${num2}_${den}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Tính: ${num1}/${den} + ${num2}/${den} = ?`,
            `${sum}/${den}`,
            `${sum}/${den * 2}`,
            `Cộng hai phân số cùng mẫu: lấy tử cộng tử, giữ nguyên mẫu = ${sum}/${den}.`
          )
        }
      } else {
        const a = num1 + num2
        const diff = a - num1
        const key = `g4_frac_sub_${a}_${num1}_${den}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Tính: ${a}/${den} - ${num1}/${den} = ?`,
            `${diff}/${den}`,
            `${diff}/1`,
            `Trừ hai phân số cùng mẫu: ${a}/${den} - ${num1}/${den} = ${diff}/${den}.`
          )
        }
      }
    } else if (type === 5) {
      // Diện tích hình bình hành & hình thoi
      const isRhombus = Math.random() < 0.5
      if (isRhombus) {
        const m = getRandomInt(4, 20) * 2
        const n = getRandomInt(3, 15)
        const s = (m * n) / 2
        const key = `g4_s_rhombus_${m}_${n}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Tính diện tích hình thoi có độ dài 2 đường chéo là ${m} cm và ${n} cm?`,
            `${s} cm²`,
            `${m * n} cm²`,
            `Diện tích hình thoi = (m x n) : 2 = (${m} x ${n}) : 2 = ${s} cm².`
          )
        }
      } else {
        const a = getRandomInt(6, 25)
        const h = getRandomInt(4, 18)
        const s = a * h
        const key = `g4_s_para_${a}_${h}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Tính diện tích hình bình hành có đáy ${a} cm và chiều cao ${h} cm?`,
            `${s} cm²`,
            `${(a + h) * 2} cm²`,
            `Diện tích hình bình hành = đáy x chiều cao = ${a} x ${h} = ${s} cm².`
          )
        }
      }
    } else {
      // Đổi đơn vị đo khối lượng: tấn, tạ, yến, kg
      const tan = getRandomInt(2, 9)
      const kg = getRandomInt(10, 800)
      const totalKg = tan * 1000 + kg
      const key = `g4_unit_tan_${tan}_${kg}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Đổi: ${tan} tấn ${kg} kg = ... kg?`,
          `${totalKg} kg`,
          `${tan * 100 + kg} kg`,
          `Vì 1 tấn = 1000 kg nên ${tan} tấn ${kg} kg = ${totalKg} kg.`
        )
      }
    }

    if (qObj) questions.push(qObj)
  }

  return questions
}

// ----------------------------------------------------
// GRADE 5: 2,000 questions
// ----------------------------------------------------
export function generateGrade5Questions(targetCount = 2000) {
  const questions = []
  const seen = new Set()

  let attempts = 0
  while (questions.length < targetCount && attempts < targetCount * 10) {
    attempts++
    const type = getRandomInt(1, 6)
    let qObj = null

    if (type === 1) {
      // Toán chuyển động đều: s = v * t
      const v = getRandomInt(25, 75)
      const t = getRandomInt(2, 6)
      const s = v * t
      const isAskS = Math.random() < 0.5
      if (isAskS) {
        const key = `g5_motion_s_${v}_${t}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Một xe đi với vận tốc ${v} km/h trong ${t} giờ. Quãng đường đi được là?`,
            `${s} km`,
            `${s + 25} km`,
            `s = v x t = ${v} x ${t} = ${s} km.`
          )
        }
      } else {
        const key = `g5_motion_v_${s}_${t}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Một xe đi được quãng đường ${s} km trong ${t} giờ. Vận tốc của xe là?`,
            `${v} km/h`,
            `${v + 10} km/h`,
            `v = s : t = ${s} : ${t} = ${v} km/h.`
          )
        }
      }
    } else if (type === 2) {
      // Tỉ số phần trăm (%)
      const base = getRandomInt(2, 20) * 50
      const pcts = [5, 10, 15, 20, 25, 30, 40, 50, 75]
      const p = pcts[getRandomInt(0, pcts.length - 1)]
      const val = (base * p) / 100
      const key = `g5_pct_${base}_${p}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Tìm ${p}% của ${base} kg?`,
          `${val} kg`,
          `${val + 10} kg`,
          `Lấy: ${base} x ${p} : 100 = ${val} kg.`
        )
      }
    } else if (type === 3) {
      // Diện tích hình tam giác & hình thang
      const isTrap = Math.random() < 0.5
      if (isTrap) {
        const a = getRandomInt(6, 20)
        const b = getRandomInt(4, 15)
        const h = getRandomInt(2, 10) * 2
        const s = ((a + b) * h) / 2
        const key = `g5_s_trap_${a}_${b}_${h}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Tính diện tích hình thang có đáy lớn ${a} cm, đáy bé ${b} cm và chiều cao ${h} cm?`,
            `${s} cm²`,
            `${(a + b) * h} cm²`,
            `Diện tích hình thang = (đáy lớn + đáy bé) x cao : 2 = (${a} + ${b}) x ${h} : 2 = ${s} cm².`
          )
        }
      } else {
        const a = getRandomInt(4, 25) * 2
        const h = getRandomInt(3, 18)
        const s = (a * h) / 2
        const key = `g5_s_tri_${a}_${h}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Tính diện tích tam giác có cạnh đáy ${a} cm và chiều cao ${h} cm?`,
            `${s} cm²`,
            `${a * h} cm²`,
            `Diện tích tam giác = (đáy x cao) : 2 = (${a} x ${h}) : 2 = ${s} cm².`
          )
        }
      }
    } else if (type === 4) {
      // Phép tính số thập phân
      const a = (getRandomInt(15, 85) / 10).toFixed(1)
      const b = (getRandomInt(10, 45) / 10).toFixed(1)
      const isPlus = Math.random() < 0.5
      if (isPlus) {
        const sum = (parseFloat(a) + parseFloat(b)).toFixed(1)
        const key = `g5_dec_add_${a}_${b}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Tính: ${a} + ${b} = ?`,
            sum,
            (parseFloat(sum) + 0.3).toFixed(1),
            `Ta có: ${a} + ${b} = ${sum}.`
          )
        }
      } else {
        const diff = (parseFloat(a) - parseFloat(b)).toFixed(1)
        const key = `g5_dec_sub_${a}_${b}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Tính: ${a} - ${b} = ?`,
            diff,
            (parseFloat(diff) + 0.2).toFixed(1),
            `Ta có: ${a} - ${b} = ${diff}.`
          )
        }
      }
    } else if (type === 5) {
      // Thể tích hình hộp chữ nhật & hình lập phương
      const isCube = Math.random() < 0.5
      if (isCube) {
        const a = getRandomInt(2, 8)
        const v = a * a * a
        const key = `g5_v_cube_${a}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Tính thể tích hình lập phương có cạnh dài ${a} cm?`,
            `${v} cm³`,
            `${a * a * 6} cm³`,
            `Thể tích hình lập phương = cạnh x cạnh x cạnh = ${a} x ${a} x ${a} = ${v} cm³.`
          )
        }
      } else {
        const a = getRandomInt(4, 12)
        const b = getRandomInt(3, 8)
        const c = getRandomInt(2, 6)
        const v = a * b * c
        const key = `g5_v_box_${a}_${b}_${c}`
        if (!seen.has(key)) {
          seen.add(key)
          qObj = makeQuestion(
            `Tính thể tích hình hộp chữ nhật có kích thước ${a} cm, ${b} cm và ${c} cm?`,
            `${v} cm³`,
            `${(a + b + c) * 2} cm³`,
            `Thể tích = dài x rộng x cao = ${a} x ${b} x ${c} = ${v} cm³.`
          )
        }
      }
    } else {
      // Đổi đơn vị đo thể tích: m³, dm³, lít, cm³
      const dm3 = getRandomInt(2, 20)
      const key = `g5_unit_vol_${dm3}`
      if (!seen.has(key)) {
        seen.add(key)
        qObj = makeQuestion(
          `Đổi: ${dm3} dm³ = ... lít?`,
          `${dm3} lít`,
          `${dm3 * 10} lít`,
          `Vì 1 dm³ = 1 lít nên ${dm3} dm³ = ${dm3} lít.`
        )
      }
    }

    if (qObj) questions.push(qObj)
  }

  return questions
}
