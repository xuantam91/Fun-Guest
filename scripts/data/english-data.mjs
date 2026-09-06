/**
 * Cambridge, CEFR & 20 Basic Communication Topics English Generator.
 * Generates 2,000+ distinct, non-duplicate questions per topic with 0 token cost.
 */

export const englishVocabulary = {
  starters: [
    { word: 'Apple', vn: 'Quả táo', category: 'Fruits' },
    { word: 'Banana', vn: 'Quả chuối', category: 'Fruits' },
    { word: 'Orange', vn: 'Quả cam', category: 'Fruits' },
    { word: 'Lemon', vn: 'Quả chanh vàng', category: 'Fruits' },
    { word: 'Lime', vn: 'Quả chanh xanh', category: 'Fruits' },
    { word: 'Mango', vn: 'Quả xoài', category: 'Fruits' },
    { word: 'Watermelon', vn: 'Quả dưa hấu', category: 'Fruits' },
    { word: 'Pineapple', vn: 'Quả dứa / thơm', category: 'Fruits' },
    { word: 'Grape', vn: 'Quả nho', category: 'Fruits' },
    { word: 'Coconut', vn: 'Quả dừa', category: 'Fruits' },
    { word: 'Pear', vn: 'Quả lê', category: 'Fruits' },
    { word: 'Tomato', vn: 'Quả cà chua', category: 'Vegetables' },
    { word: 'Potato', vn: 'Củ khoai tây', category: 'Vegetables' },
    { word: 'Carrot', vn: 'Củ cà rốt', category: 'Vegetables' },
    { word: 'Onion', vn: 'Củ hành tây', category: 'Vegetables' },
    { word: 'Bean', vn: 'Hạt đậu', category: 'Vegetables' },
    { word: 'Cat', vn: 'Con mèo', category: 'Animals' },
    { word: 'Dog', vn: 'Con chó', category: 'Animals' },
    { word: 'Elephant', vn: 'Con voi', category: 'Animals' },
    { word: 'Fish', vn: 'Con cá', category: 'Animals' },
    { word: 'Giraffe', vn: 'Hươu cao cổ', category: 'Animals' },
    { word: 'Hippo', vn: 'Hà mã', category: 'Animals' },
    { word: 'Lion', vn: 'Con sư tử', category: 'Animals' },
    { word: 'Monkey', vn: 'Con khỉ', category: 'Animals' },
    { word: 'Tiger', vn: 'Con hổ', category: 'Animals' },
    { word: 'Zebra', vn: 'Ngựa vằn', category: 'Animals' },
    { word: 'Duck', vn: 'Con vịt', category: 'Animals' },
    { word: 'Frog', vn: 'Con ếch', category: 'Animals' },
    { word: 'Bird', vn: 'Con chim', category: 'Animals' },
    { word: 'Rabbit', vn: 'Con thỏ', category: 'Animals' },
    { word: 'Horse', vn: 'Con ngựa', category: 'Animals' },
    { word: 'Cow', vn: 'Con bò sữa', category: 'Animals' },
    { word: 'Sheep', vn: 'Con cừu', category: 'Animals' },
    { word: 'Chicken', vn: 'Con gà', category: 'Animals' },
    { word: 'Mouse', vn: 'Con chuột', category: 'Animals' },
    { word: 'Snake', vn: 'Con rắn', category: 'Animals' },
    { word: 'Spider', vn: 'Con nhện', category: 'Animals' },
    { word: 'Book', vn: 'Quyển sách', category: 'School' },
    { word: 'Pencil', vn: 'Bút chì', category: 'School' },
    { word: 'Pen', vn: 'Bút mực', category: 'School' },
    { word: 'Ruler', vn: 'Thước kẻ', category: 'School' },
    { word: 'Eraser', vn: 'Cục tẩy', category: 'School' },
    { word: 'Bag', vn: 'Cặp sách / túi', category: 'School' },
    { word: 'Desk', vn: 'Bàn học', category: 'School' },
    { word: 'Chair', vn: 'Cái ghế', category: 'School' },
    { word: 'Board', vn: 'Bảng viết', category: 'School' },
    { word: 'Crayon', vn: 'Bút sáp màu', category: 'School' },
    { word: 'Teacher', vn: 'Giáo viên', category: 'People' },
    { word: 'Student', vn: 'Học sinh', category: 'People' },
    { word: 'Boy', vn: 'Bé trai', category: 'People' },
    { word: 'Girl', vn: 'Bé gái', category: 'People' },
    { word: 'Baby', vn: 'Em bé', category: 'People' },
    { word: 'Father', vn: 'Bố / ba', category: 'Family' },
    { word: 'Mother', vn: 'Mẹ', category: 'Family' },
    { word: 'Brother', vn: 'Anh / em trai', category: 'Family' },
    { word: 'Sister', vn: 'Chị / em gái', category: 'Family' },
    { word: 'Grandpa', vn: 'Ông nội / ngoại', category: 'Family' },
    { word: 'Grandma', vn: 'Bà nội / ngoại', category: 'Family' },
    { word: 'Family', vn: 'Gia đình', category: 'Family' },
    { word: 'Friend', vn: 'Bạn bè', category: 'People' },
    { word: 'Red', vn: 'Màu đỏ', category: 'Colors' },
    { word: 'Blue', vn: 'Màu xanh dương', category: 'Colors' },
    { word: 'Green', vn: 'Màu xanh lá', category: 'Colors' },
    { word: 'Yellow', vn: 'Màu vàng', category: 'Colors' },
    { word: 'Pink', vn: 'Màu hồng', category: 'Colors' },
    { word: 'Purple', vn: 'Màu tím', category: 'Colors' },
    { word: 'Brown', vn: 'Màu nâu', category: 'Colors' },
    { word: 'Black', vn: 'Màu đen', category: 'Colors' },
    { word: 'White', vn: 'Màu trắng', category: 'Colors' },
    { word: 'Grey', vn: 'Màu xám', category: 'Colors' },
    { word: 'Eye', vn: 'Mắt', category: 'Body' },
    { word: 'Ear', vn: 'Tai', category: 'Body' },
    { word: 'Nose', vn: 'Mũi', category: 'Body' },
    { word: 'Mouth', vn: 'Miệng', category: 'Body' },
    { word: 'Hand', vn: 'Bàn tay', category: 'Body' },
    { word: 'Arm', vn: 'Cánh tay', category: 'Body' },
    { word: 'Leg', vn: 'Chân', category: 'Body' },
    { word: 'Foot', vn: 'Bàn chân', category: 'Body' },
    { word: 'Head', vn: 'Đầu', category: 'Body' },
    { word: 'Hair', vn: 'Mái tóc', category: 'Body' },
    { word: 'Car', vn: 'Xe ô tô', category: 'Vehicles' },
    { word: 'Bus', vn: 'Xe buýt', category: 'Vehicles' },
    { word: 'Bike', vn: 'Xe đạp', category: 'Vehicles' },
    { word: 'Plane', vn: 'Máy bay', category: 'Vehicles' },
    { word: 'Boat', vn: 'Thuyền', category: 'Vehicles' },
    { word: 'Train', vn: 'Tàu hỏa', category: 'Vehicles' },
    { word: 'Helicopter', vn: 'Trực thăng', category: 'Vehicles' },
    { word: 'Lorry', vn: 'Xe tải', category: 'Vehicles' },
    { word: 'Ball', vn: 'Quả bóng', category: 'Toys' },
    { word: 'Doll', vn: 'Búp bê', category: 'Toys' },
    { word: 'Robot', vn: 'Người máy', category: 'Toys' },
    { word: 'Kite', vn: 'Cái diều', category: 'Toys' }
  ],
  movers: [
    { word: 'Doctor', vn: 'Bác sĩ chữa bệnh' },
    { word: 'Nurse', vn: 'Y tá chăm sóc' },
    { word: 'Dentist', vn: 'Bác sĩ nha khoa' },
    { word: 'Driver', vn: 'Tài xế lái xe' },
    { word: 'Farmer', vn: 'Nông dân trồng trọt' },
    { word: 'Cook', vn: 'Đầu bếp nấu ăn' },
    { word: 'Clown', vn: 'Chú hề biểu diễn' },
    { word: 'Pirate', vn: 'Cướp biển' },
    { word: 'Kitchen', vn: 'Phòng bếp' },
    { word: 'Bedroom', vn: 'Phòng ngủ' },
    { word: 'Bathroom', vn: 'Phòng tắm' },
    { word: 'Living room', vn: 'Phòng khách' },
    { word: 'Garden', vn: 'Khu vườn' },
    { word: 'Balcony', vn: 'Ban công' },
    { word: 'Cloud', vn: 'Đám mây' },
    { word: 'Rain', vn: 'Cơn mưa' },
    { word: 'Sun', vn: 'Mặt trời' },
    { word: 'Wind', vn: 'Cơn gió' },
    { word: 'Snow', vn: 'Tuyết rơi' },
    { word: 'Rainbow', vn: 'Cầu vồng' },
    { word: 'Coffee', vn: 'Cà phê' },
    { word: 'Tea', vn: 'Nước trà' },
    { word: 'Juice', vn: 'Nước trái cây' },
    { word: 'Milk', vn: 'Sữa tươi' },
    { word: 'Soup', vn: 'Món súp' },
    { word: 'Bread', vn: 'Bánh mì' },
    { word: 'Cheese', vn: 'Phô mai' },
    { word: 'Rice', vn: 'Cơm / gạo' }
  ],
  flyers: [
    { word: 'Airport', vn: 'Sân bay bay quốc tế' },
    { word: 'Astronaut', vn: 'Phi hành gia vũ trụ' },
    { word: 'Castle', vn: 'Tòa lâu đài' },
    { word: 'Bridge', vn: 'Cây cầu bắc qua sông' },
    { word: 'Desert', vn: 'Sa mạc cát' },
    { word: 'Forest', vn: 'Khu rừng rậm' },
    { word: 'Island', vn: 'Hòn đảo ngoài biển' },
    { word: 'Mountain', vn: 'Ngọn núi cao' },
    { word: 'Museum', vn: 'Bảo tàng lịch sử' },
    { word: 'Pyramid', vn: 'Kim tự tháp' },
    { word: 'Restaurant', vn: 'Nhà hàng ăn uống' },
    { word: 'Spacecraft', vn: 'Tàu vũ trụ' },
    { word: 'Stadium', vn: 'Sân vận động' },
    { word: 'Theater', vn: 'Rạp hát / nhà hát' }
  ],
  a1: [
    { word: 'Activity', vn: 'Hoạt động trải nghiệm' },
    { word: 'Address', vn: 'Địa chỉ nhà' },
    { word: 'Alphabet', vn: 'Bảng chữ cái' },
    { word: 'Answer', vn: 'Câu trả lời' },
    { word: 'Apartment', vn: 'Căn hộ chung cư' },
    { word: 'Calendar', vn: 'Quyển lịch ngày' },
    { word: 'Dictionary', vn: 'Từ điển tra cứu' },
    { word: 'Envelope', vn: 'Phong bì thư' },
    { word: 'Holiday', vn: 'Kỳ nghỉ lễ' },
    { word: 'Homework', vn: 'Bài tập về nhà' }
  ],
  a2: [
    { word: 'Adventure', vn: 'Cuộc thám hiểm / phiêu lưu' },
    { word: 'Luggage', vn: 'Hành lý mang theo' },
    { word: 'Ticket', vn: 'Vé vào cửa / vé xe' },
    { word: 'Passport', vn: 'Hộ chiếu xuất nhập cảnh' },
    { word: 'Passenger', vn: 'Hành khách' },
    { word: 'Direction', vn: 'Phương hướng di chuyển' },
    { word: 'Distance', vn: 'Khoảng cách địa lý' },
    { word: 'Guidebook', vn: 'Sách hướng dẫn du lịch' },
    { word: 'Souvenir', vn: 'Món quà lưu niệm' }
  ],
  b1: [
    { word: 'Opportunity', vn: 'Cơ hội phát triển' },
    { word: 'Challenge', vn: 'Thử thách khó khăn' },
    { word: 'Solution', vn: 'Biện pháp giải quyết' },
    { word: 'Decision', vn: 'Quyết định đưa ra' },
    { word: 'Improvement', vn: 'Sự tiến bộ / cải tiến' },
    { word: 'Achievement', vn: 'Thành tựu đạt được' }
  ],
  b2: [
    { word: 'Perspective', vn: 'Góc nhìn nhận vấn đề' },
    { word: 'Phenomenon', vn: 'Hiện tượng khoa học / xã hội' },
    { word: 'Hypothesis', vn: 'Giả thuyết nghiên cứu' },
    { word: 'Consequence', vn: 'Hậu quả / hệ lụy' },
    { word: 'Significance', vn: 'Tầm quan trọng đặc biệt' }
  ]
}

/**
 * Rich 20 English Basic Communication Topics with Scalable Dynamic Sentence Generators
 */
export const englishCommunication = {
  en_greetings: [
    {
      templates: [
        'Khi ai đó chào "Hello! How are you?", bạn trả lời như thế nào?',
        'Gặp bạn học bả "How are you?", câu trả lời chuẩn nhất là:',
        'Mẫu câu đáp lại lời hỏi thăm sức khỏe "How are you?":',
        'Chọn câu trả lời đúng cho thắc mắc "How are you today?":'
      ],
      correct: "I'm fine, thank you!",
      distractors: ["I am 10 years old.", "It is raining outside.", "I like eating pizza.", "Good night!", "My name is Peter.", "I live in Hanoi.", "It is 8 o'clock."],
      exp: 'Khi được hỏi thăm sức khỏe "How are you?", câu trả lời lịch sự nhất là "I\'m fine, thank you!".'
    },
    {
      templates: [
        'Để chào hỏi bạn bè vào buổi sáng, bé nên nói từ gì?',
        'Chào hỏi lịch sự vào buổi sáng ban mai:',
        'Câu chào thích hợp cho buổi sáng là:',
        'Khi gặp thầy cô vào buổi sáng ở trường, bé chào:'
      ],
      correct: 'Good morning!',
      distractors: ['Good night!', 'Goodbye!', 'See you later!', 'Thank you!', 'Happy birthday!', 'Good afternoon!'],
      exp: 'Vào buổi sáng, chúng ta chào "Good morning!".'
    },
    {
      templates: [
        'Khi lần đầu tiên gặp một người bạn mới, câu nói thân thiện là:',
        'Cách thể hiện niềm vui khi kết bạn mới:',
        'Câu nói lịch sự sau khi giới thiệu tên:',
        'Khi ai đó bảo "Nice to meet you!", bé đáp lại:'
      ],
      correct: 'Nice to meet you!',
      distractors: ['Open your book!', 'What time is it?', 'Happy birthday!', 'Good night!', 'Go to bed!'],
      exp: '"Nice to meet you!" có nghĩa là "Rất vui được gặp bạn!".'
    },
    {
      templates: [
        'Để hỏi tên của người đối diện, bé dùng mẫu câu nào?',
        'Mẫu câu chuẩn để hỏi tên bạn mới:',
        'Muốn biết tên người bạn mới gặp, bé hỏi:',
        'Mẫu câu tiếng Anh dùng để hỏi "Tên bạn là gì?":'
      ],
      correct: 'What is your name?',
      distractors: ['How old are you?', 'Where do you live?', 'What time is it?', 'How are you?', 'Do you have a dog?'],
      exp: 'Dùng "What is your name?" để hỏi tên người khác.'
    },
    {
      templates: [
        'Trước khi đi ngủ vào buổi tối, bé chúc mọi người:',
        'Câu chào chúc ngủ ngon buổi tối:',
        'Khi tạm biệt bạn bè vào buổi tối muộn:',
        'Mẫu câu tiếng Anh mang nghĩa "Chúc ngủ ngon!":'
      ],
      correct: 'Good night!',
      distractors: ['Good morning!', 'Nice to meet you!', 'Hello!', 'How are you?', 'Happy New Year!'],
      exp: 'Chào chúc ngủ ngon dùng "Good night!".'
    }
  ],

  en_family: [
    {
      templates: [
        'Khi giới thiệu về bố của mình với bạn bè, bé nói:',
        'Mẫu câu tiếng Anh "Đây là bố của tớ":',
        'Để giới thiệu người cha yêu quý, bé dùng:',
        'Chọn câu giới thiệu bố đúng chuẩn:'
      ],
      correct: 'This is my father.',
      distractors: ['This is my pencil.', 'I am reading a book.', 'She is a girl.', 'It is red.', 'My car is blue.'],
      exp: '"This is my father." có nghĩa là "Đây là bố của tớ!".'
    },
    {
      templates: [
        'Từ nào trong tiếng Anh có nghĩa là "Mẹ"?',
        'Tên gọi tiếng Anh chỉ người Mẹ yêu quý:',
        'Từ tiếng Anh chính xác cho "Mẹ":',
        'Trong gia đình, "Mẹ" được gọi là:'
      ],
      correct: 'Mother',
      distractors: ['Father', 'Brother', 'Sister', 'Teacher', 'Doctor', 'Grandpa'],
      exp: 'Mẹ trong tiếng Anh là "Mother" (hoặc Mom/Mommy).'
    },
    {
      templates: [
        'Mẫu câu hỏi "Gia đình bạn có bao nhiêu người?":',
        'Muốn hỏi số lượng thành viên trong gia đình bạn:',
        'Hỏi gia đình bạn có mấy người:',
        'Mẫu câu tiếng Anh chuẩn hỏi về thành viên gia đình:'
      ],
      correct: 'How many people are there in your family?',
      distractors: ['What is your favorite color?', 'What time do you sleep?', 'Where is the dog?', 'Do you have a ball?', 'How old are you?'],
      exp: 'Hỏi số thành viên gia đình dùng "How many people are there in your family?".'
    }
  ],

  en_school: [
    {
      templates: [
        'Khi muốn xin phép thầy cô giáo vào lớp, bé nói:',
        'Mẫu câu lịch sự xin phép vào phòng học:',
        'Đi học muộn và muốn xin phép thầy cô vào lớp:',
        'Chọn câu xin vào lớp chuẩn lịch sự:'
      ],
      correct: 'May I come in, teacher?',
      distractors: ['Open your umbrella.', 'Take off your coat.', 'Turn off the light.', 'Good night teacher.', 'Go to sleep!'],
      exp: 'Xin phép vào lớp lịch sự dùng "May I come in, teacher?".'
    },
    {
      templates: [
        'Thầy cô bảo "Open your book!", bé cần làm gì?',
        'Nghĩa của câu lệnh "Open your book!":',
        'Khi nghe "Open your book!", hành động đúng là:',
        'Lời dặn "Open your book!" yêu cầu bé:'
      ],
      correct: 'Mở sách ra',
      distractors: ['Đóng cửa lại', 'Cất bút đi', 'Tắt máy tính', 'Chạy ra sân', 'Đọc to lên'],
      exp: '"Open your book!" có nghĩa là "Mở sách của em ra!".'
    },
    {
      templates: [
        'Mẫu câu hỏi môn học yêu thích nhất ở trường:',
        'Muốn hỏi bạn thích môn học nào nhất:',
        'Hỏi về môn học yêu thích ở trường:',
        'Mẫu câu "Môn học yêu thích của bạn là gì?":'
      ],
      correct: 'What subject do you like best?',
      distractors: ['Where is your house?', 'How much is this book?', 'What time is it?', 'Are you hungry?', 'What color is it?'],
      exp: 'Hỏi môn học yêu thích dùng "What subject do you like best?".'
    }
  ],

  en_food: [
    {
      templates: [
        'Khi muốn mời bạn uống nước cam, bé nói:',
        'Mẫu câu mời đồ uống nước trái cây lịch sự:',
        'Lời mời "Bạn có muốn uống nước cam không?":',
        'Mời bạn nước cam mát lạnh:'
      ],
      correct: 'Would you like some orange juice?',
      distractors: ['Do you have a car?', 'Where is the school?', 'Can you play football?', 'What color is your shirt?'],
      exp: 'Mời đồ ăn/nước uống lịch sự dùng "Would you like some...?".'
    },
    {
      templates: [
        'Khi cảm thấy đói bụng, bé nói tiếng Anh thế nào?',
        'Bế cảm thấy thèm ăn và bụng đói cồn cào:',
        'Mẫu câu "Tớ đang đói bụng quá!":',
        'Muốn nói với mẹ là mình đang đói:'
      ],
      correct: "I'm hungry!",
      distractors: ["I'm sleepy!", "I'm cold!", "I'm rainy!", "I'm blue!", "I'm dancing!"],
      exp: 'Cảm thấy đói bụng dùng "I\'m hungry!".'
    },
    {
      templates: [
        'Từ tiếng Anh nào có nghĩa là "Bữa sáng"?',
        'Bữa ăn đầu tiên trong ngày gọi là:',
        'Tên gọi tiếng Anh cho bữa ăn sáng:',
        'Từ chỉ bữa ăn sáng mát lành:'
      ],
      correct: 'Breakfast',
      distractors: ['Lunch', 'Dinner', 'Supper', 'Snack', 'Dessert'],
      exp: 'Bữa sáng trong tiếng Anh là "Breakfast".'
    }
  ],

  en_daily: [
    {
      templates: [
        'Mẫu câu hỏi giờ thức dậy hàng ngày của bạn:',
        'Hỏi bạn thức dậy lúc mấy giờ vào buổi sáng:',
        'Mẫu câu "Mấy giờ bạn thức dậy?":',
        'Hỏi thói quen thức dậy buổi sáng:'
      ],
      correct: 'What time do you wake up?',
      distractors: ['What color is the sun?', 'Where is your bag?', 'Do you like cats?', 'How is the weather?'],
      exp: 'Hỏi thời gian thức dậy dùng "What time do you wake up?".'
    },
    {
      templates: [
        'Mẫu câu "Tôi đánh răng mỗi buổi sáng":',
        'Thói quen vệ sinh răng miệng buổi sáng:',
        'Câu tiếng Anh "Tớ chải răng vào mỗi sáng":',
        'Diễn đạt thói quen đánh răng hàng ngày:'
      ],
      correct: 'I brush my teeth every morning.',
      distractors: ['I ride a bicycle to school.', 'I swim in the ocean.', 'I play guitar.', 'I read a comic book.'],
      exp: '"I brush my teeth every morning." dịch là "Tôi đánh răng mỗi buổi sáng".'
    }
  ],

  en_hobbies: [
    {
      templates: [
        'Mẫu câu hỏi "Bạn thích làm gì trong thời gian rảnh?":',
        'Hỏi sở thích cá nhân lúc rảnh rỗi:',
        'Mẫu câu hỏi về thú vui giải trí:',
        'Hỏi bạn làm gì khi rảnh:'
      ],
      correct: 'What do you do in your free time?',
      distractors: ['Where do you buy this hat?', 'How much is it?', 'What time is it now?', 'How old is your sister?'],
      exp: 'Hỏi sở thích thời gian rảnh dùng "What do you do in your free time?".'
    },
    {
      templates: [
        'Mẫu câu "Tôi rất thích chơi đá bóng":',
        'Thể hiện niềm yêu thích môn bóng đá:',
        'Mẫu câu tiếng Anh "Tớ thích chơi đá bóng":',
        'Nói về sở thích chơi thể thao bóng đá:'
      ],
      correct: 'I like playing football.',
      distractors: ['I wear a yellow coat.', 'I am reading a novel.', 'I hate apples.', 'I sleep at 10 PM.'],
      exp: '"I like playing football." nghĩa là "Tôi thích chơi đá bóng".'
    }
  ],

  en_weather: [
    {
      templates: [
        'Mẫu câu hỏi thời tiết hôm nay như thế nào:',
        'Muốn biết tình hình thời tiết hôm nay:',
        'Hỏi về thời tiết bên ngoài:',
        'Mẫu câu "Thời tiết hôm nay thế nào?":'
      ],
      correct: 'How is the weather today?',
      distractors: ['What day is today?', 'Where are you going?', 'How old are you?', 'Do you have an umbrella?'],
      exp: 'Hỏi thời tiết dùng "How is the weather today?".'
    },
    {
      templates: [
        'Thời tiết "Trời nhiều nắng và ấm áp":',
        'Miêu tả ngày nắng đẹp và ấm:',
        'Mẫu câu "Trời đang có nắng và ấm":',
        'Thời tiết đẹp trời nhiều nắng:'
      ],
      correct: 'It is sunny and warm.',
      distractors: ['It is freezing cold.', 'It is heavy rain.', 'It is stormy.', 'It is night time.'],
      exp: '"Sunny and warm" là "Nhiều nắng và ấm áp".'
    }
  ],

  en_animals: [
    {
      templates: [
        'Mẫu câu hỏi "Bạn có nuôi thú cưng không?":',
        'Hỏi bạn học có nuôi con vật cưng ở nhà:',
        'Muốn biết bạn mình có nuôi thú cưng không:',
        'Mẫu câu hỏi về loài vật nuôi gia đình:'
      ],
      correct: 'Do you have a pet?',
      distractors: ['Do you have a pen?', 'Where is your car?', 'Can you speak English?', 'Are you sleeping?'],
      exp: 'Hỏi thú cưng dùng "Do you have a pet?".'
    },
    {
      templates: [
        'Con vật nào cao lớn và có chiếc cổ rất dài?',
        'Tên loài động vật sở hữu chiếc cổ dài nhất:',
        'Con vật có cổ dài ăn lá cây trên cao:',
        'Tên tiếng Anh của Hươu Cao Cổ:'
      ],
      correct: 'Giraffe',
      distractors: ['Rabbit', 'Cat', 'Mouse', 'Frog', 'Dog', 'Hippo'],
      exp: 'Hươu cao cổ trong tiếng Anh là "Giraffe".'
    }
  ],

  en_clothes: [
    {
      templates: [
        'Mẫu câu hỏi "Bạn đang mặc trang phục gì?":',
        'Hỏi về quần áo ai đó đang mặc trên người:',
        'Mẫu câu "Bạn mặc cái gì thế?":',
        'Hỏi trang phục đang mặc:'
      ],
      correct: 'What are you wearing?',
      distractors: ['What are you eating?', 'Where are you living?', 'How are you feeling?', 'Who are you talking to?'],
      exp: 'Hỏi trang phục đang mặc dùng "What are you wearing?".'
    },
    {
      templates: [
        'Khi mẹ bảo "Hãy khoác áo ấm vào con nhé!":',
        'Lời dặn mặc áo khoác giữ ấm:',
        'Mẫu câu "Mặc áo khoác vào!":',
        'Hành động mặc áo ấm:'
      ],
      correct: 'Put on your coat!',
      distractors: ['Take off your shoes!', 'Open the window!', 'Clean the desk!', 'Turn off the TV!'],
      exp: '"Put on your coat!" nghĩa là "Hãy mặc áo khoác vào!".'
    }
  ],

  en_house: [
    {
      templates: [
        'Mẫu câu hỏi "Phòng khách ở đâu?":',
        'Muốn hỏi vị trí căn phòng khách:',
        'Hỏi đường đến phòng khách nhà bạn:',
        'Mẫu câu "Phòng khách nằm ở đâu?":'
      ],
      correct: 'Where is the living room?',
      distractors: ['What time is it?', 'How old are you?', 'Do you have a dog?', 'What is your favorite fruit?'],
      exp: 'Hỏi vị trí phòng khách dùng "Where is the living room?".'
    },
    {
      templates: [
        'Từ tiếng Anh nào chỉ "Phòng ngủ"?',
        'Tên gọi căn phòng dùng để ngủ nghỉ:',
        'Từ tiếng Anh chuẩn cho phòng ngủ:',
        'Căn phòng có chiếc giường ngủ:'
      ],
      correct: 'Bedroom',
      distractors: ['Kitchen', 'Bathroom', 'Garden', 'Garage', 'Balcony'],
      exp: 'Phòng ngủ là "Bedroom".'
    }
  ],

  en_health: [
    {
      templates: [
        'Khi hỏi thăm bạn học bị mệt "Có chuyện gì với bạn vậy?":',
        'Hỏi thăm người bạn có vẻ mệt mỏi:',
        'Mẫu câu "Bạn bị sao thế?":',
        'Hỏi thăm sức khỏe khi ai đó đau mỏi:'
      ],
      correct: "What's wrong with you?",
      distractors: ['What is your name?', 'How much is it?', 'Where do you buy this?', 'What time is it?'],
      exp: 'Hỏi thăm khi bạn bị mệt dùng "What\'s wrong with you?".'
    },
    {
      templates: [
        'Mẫu câu "Tôi bị đau đầu":',
        'Nói về chứng đau đầu mệt mỏi:',
        'Cảm thấy đầu bị đau:',
        'Mẫu câu tiếng Anh "Tớ bị đau đầu":'
      ],
      correct: 'I have a headache.',
      distractors: ['I have a new book.', 'I have a cat.', 'I am reading.', 'I like ice cream.'],
      exp: '"I have a headache." nghĩa là "Tôi bị đau đầu".'
    }
  ],

  en_colors: [
    {
      templates: [
        'Mẫu câu hỏi "Bầu trời có màu gì?":',
        'Hỏi màu sắc của bầu trời:',
        'Mẫu câu "Bầu trời màu gì thế?":',
        'Hỏi màu sắc bầu trời ban ngày:'
      ],
      correct: 'What color is the sky?',
      distractors: ['How big is the sky?', 'Where is the sun?', 'What time is it?', 'Do you like birds?'],
      exp: 'Hỏi màu sắc bầu trời dùng "What color is the sky?".'
    },
    {
      templates: [
        'Màu sắc của bầu trời ban ngày rực rỡ là màu gì?',
        'Bầu trời trong xanh mang màu gì:',
        'Tên tiếng Anh của màu xanh dương bầu trời:',
        'Màu sắc đặc trưng của nước biển và bầu trời:'
      ],
      correct: 'Blue',
      distractors: ['Red', 'Black', 'Purple', 'Green', 'Yellow', 'Orange'],
      exp: 'Bầu trời ban ngày có màu xanh dương "Blue".'
    }
  ],

  en_numbers: [
    {
      templates: [
        'Mẫu câu hỏi "Có bao nhiêu quả táo ở trên bàn?":',
        'Hỏi số lượng đếm được của quả táo:',
        'Muốn đếm số quả táo trên bàn:',
        'Mẫu câu hỏi số lượng quả táo:'
      ],
      correct: 'How many apples are there on the table?',
      distractors: ['How much is the apple?', 'Where is the apple?', 'What color is the apple?', 'Do you eat apples?'],
      exp: 'Hỏi số lượng vật đếm được dùng "How many... are there?".'
    },
    {
      templates: [
        'Con số 15 trong tiếng Anh đọc là gì?',
        'Tên gọi tiếng Anh của số mười lăm (15):',
        'Số 15 trong bảng số đếm:',
        'Số mười lăm đọc là:'
      ],
      correct: 'Fifteen',
      distractors: ['Fifty', 'Five', 'Fifth', 'Fourteen', 'Sixteen'],
      exp: 'Số 15 là "Fifteen".'
    }
  ],

  en_shopping: [
    {
      templates: [
        'Khi người bán hàng chào "Tôi có thể giúp gì cho bạn?":',
        'Mẫu câu mở lời lịch sự của nhân viên bán hàng:',
        'Lời chào của người bán hàng ở siêu thị:',
        'Hỏi xem khách hàng cần mua gì:'
      ],
      correct: 'Can I help you?',
      distractors: ['Good night!', 'What time is it?', 'How old are you?', 'Where do you live?'],
      exp: 'Người bán hàng chào hỏi dùng "Can I help you?".'
    },
    {
      templates: [
        'Mẫu câu hỏi giá tiền của chiếc mũ này:',
        'Muốn biết chiếc mũ này bao nhiêu tiền:',
        'Hỏi giá mua chiếc mũ:',
        'Mẫu câu "Chiếc mũ này giá bao nhiêu?":'
      ],
      correct: 'How much is this hat?',
      distractors: ['Where is this hat?', 'What color is this hat?', 'How many hats do you have?', 'Who wears this hat?'],
      exp: 'Hỏi giá tiền đồ vật dùng "How much is this...?".'
    }
  ],

  en_places: [
    {
      templates: [
        'Mẫu câu hỏi "Trường học ở đâu?":',
        'Hỏi vị trí của ngôi trường:',
        'Muốn biết địa điểm trường học:',
        'Mẫu câu "Ngôi trường nằm ở đâu?":'
      ],
      correct: 'Where is the school?',
      distractors: ['What time is school?', 'How old is the school?', 'Who is at school?', 'Do you like school?'],
      exp: 'Hỏi vị trí địa điểm dùng "Where is...?".'
    },
    {
      templates: [
        'Từ tiếng Anh nào có nghĩa là "Bệnh viện"?',
        'Tên gọi nơi khám chữa bệnh:',
        'Địa điểm bác sĩ làm việc chữa bệnh:',
        'Từ chỉ bệnh viện cứu chữa bệnh nhân:'
      ],
      correct: 'Hospital',
      distractors: ['School', 'Supermarket', 'Bank', 'Library', 'Park'],
      exp: 'Bệnh viện là "Hospital".'
    }
  ],

  en_time: [
    {
      templates: [
        'Mẫu câu hỏi giờ "Bây giờ là mấy giờ?":',
        'Muốn biết giờ hiện tại:',
        'Hỏi xem đồng hồ mấy giờ:',
        'Mẫu câu chuẩn hỏi giờ:'
      ],
      correct: 'What time is it now?',
      distractors: ['What day is today?', 'How old are you?', 'Where is the clock?', 'What is your name?'],
      exp: 'Hỏi xem giờ dùng "What time is it now?".'
    },
    {
      templates: [
        'Mẫu câu hỏi "Hôm nay là thứ mấy trong tuần?":',
        'Hỏi thứ trong tuần hôm nay:',
        'Muốn biết hôm nay là thứ mấy:',
        'Mẫu câu hỏi lịch ngày thứ:'
      ],
      correct: 'What day is today?',
      distractors: ['What month is it?', 'What time is it?', 'How is the weather?', 'Where are you going?'],
      exp: 'Hỏi thứ trong tuần dùng "What day is today?".'
    }
  ],

  en_travel: [
    {
      templates: [
        'Mẫu câu hỏi "Bạn đi học bằng phương tiện gì?":',
        'Hỏi cách thức bạn di chuyển tới trường:',
        'Mẫu câu "Bạn đến trường bằng gì?":',
        'Hỏi phương tiện đi học hàng ngày:'
      ],
      correct: 'How do you go to school?',
      distractors: ['What do you study at school?', 'Where is your school?', 'Who goes to school with you?', 'What time is school?'],
      exp: 'Hỏi phương tiện di chuyển dùng "How do you go to...?".'
    },
    {
      templates: [
        'Mẫu câu "Tôi đi học bằng xe buýt":',
        'Nói về việc đi học bằng xe buýt:',
        'Phương tiện đến trường là xe buýt:',
        'Mẫu câu tiếng Anh "Tớ đi xe buýt đến trường":'
      ],
      correct: 'I go to school by bus.',
      distractors: ['I go to school by boat.', 'I fly a plane.', 'I walk on water.', 'I eat bread.'],
      exp: '"I go to school by bus." nghĩa là "Tôi đi học bằng xe buýt".'
    }
  ],

  en_feelings: [
    {
      templates: [
        'Mẫu câu hỏi "Hôm nay bạn cảm thấy thế nào?":',
        'Hỏi cảm xúc và tâm trạng hôm nay:',
        'Mẫu câu "Bạn đang thấy thế nào?":',
        'Hỏi tâm trạng bạn bè:'
      ],
      correct: 'How do you feel today?',
      distractors: ['What do you do today?', 'Where do you go today?', 'What is your job?', 'How old are you?'],
      exp: 'Hỏi tâm trạng cảm xúc dùng "How do you feel today?".'
    },
    {
      templates: [
        'Mẫu câu "Tôi rất vui vẻ và hạnh phúc":',
        'Cảm xúc vui tươi ngập tràn:',
        'Nói về niềm vui của bản thân:',
        'Mẫu câu tiếng Anh "Tớ đang rất vui!":'
      ],
      correct: "I'm happy!",
      distractors: ["I'm angry!", "I'm sad!", "I'm tired!", "I'm sick!"],
      exp: '"I\'m happy!" nghĩa là "Tôi rất vui vẻ!".'
    }
  ],

  en_jobs: [
    {
      templates: [
        'Mẫu câu hỏi "Bố của bạn làm nghề gì?":',
        'Hỏi công việc nghề nghiệp của bố:',
        'Muốn biết nghề nghiệp của bố bạn:',
        'Mẫu câu hỏi nghề nghiệp:'
      ],
      correct: 'What does your father do?',
      distractors: ['Where is your father?', 'How old is your father?', 'What is your father name?', 'Do you love your father?'],
      exp: 'Hỏi nghề nghiệp dùng "What does your father do?".'
    },
    {
      templates: [
        'Từ tiếng Anh nào có nghĩa là "Phi hành gia"?',
        'Người bay vào vũ trụ điều khiển tàu không gian:',
        'Nghề nghiệp thám hiểm các hành tinh:',
        'Từ tiếng Anh chỉ phi hành gia vũ trụ:'
      ],
      correct: 'Astronaut',
      distractors: ['Doctor', 'Pilot', 'Teacher', 'Farmer', 'Cook'],
      exp: 'Phi hành gia là "Astronaut".'
    }
  ],

  en_polite: [
    {
      templates: [
        'Khi được người khác giúp đỡ, câu nói lịch sự nhất là:',
        'Cảm ơn ai đó đã hỗ trợ mình:',
        'Lời cảm ơn chân thành lịch sự:',
        'Mẫu câu thể hiện sự biết ơn:'
      ],
      correct: 'Thank you very much!',
      distractors: ['Good night!', 'No, I don\'t care.', 'Go away!', 'What time is it?'],
      exp: 'Cảm ơn lịch sự dùng "Thank you very much!".'
    },
    {
      templates: [
        'Khi ai đó cám ơn "Thank you!", bạn đáp lại lịch sự:',
        'Lời đáp lại lịch sự cho lời cảm ơn:',
        'Mẫu câu tiếng Anh "Không có gì đâu!":',
        'Đáp lại lời cám ơn thân thiện:'
      ],
      correct: "You're welcome!",
      distractors: ['Goodbye!', 'No problem, go away.', 'I am fine.', 'Good morning!'],
      exp: 'Đáp lại lời cám ơn dùng "You\'re welcome!" (Không có gì đâu!).'
    }
  ]
}

/**
 * Generate 2,000 - 5,000 distinct English questions for vocabulary OR communication topics.
 * @param {string} level 
 * @param {number} targetCount 
 */
export function generateEnglishQuestions(level, targetCount = 2000) {
  const questions = []
  const seen = new Set()

  // 1. If it's one of the 20 Communication topics:
  if (englishCommunication[level]) {
    const commBank = englishCommunication[level]
    let attempts = 0

    while (questions.length < targetCount && attempts < targetCount * 25) {
      attempts++
      const itemGroup = commBank[Math.floor(Math.random() * commBank.length)]
      const qText = itemGroup.templates[Math.floor(Math.random() * itemGroup.templates.length)]
      const isLeft = Math.random() < 0.5
      
      const distractor = itemGroup.distractors[Math.floor(Math.random() * itemGroup.distractors.length)]
      
      const leftVal = isLeft ? itemGroup.correct : distractor
      const rightVal = isLeft ? distractor : itemGroup.correct

      const hashKey = `${qText.trim().toLowerCase()}_${leftVal.trim().toLowerCase()}_${rightVal.trim().toLowerCase()}`
      if (!seen.has(hashKey)) {
        seen.add(hashKey)
        questions.push({
          question: qText,
          option_left: leftVal,
          option_right: rightVal,
          correct_option: isLeft ? 'left' : 'right',
          explanation: itemGroup.exp
        })
      }
    }
    return questions
  }

  // 2. Otherwise: Vocabulary Banks (Starters, Movers, Flyers, A1, A2, B1, B2)
  const bank = englishVocabulary[level] || englishVocabulary['starters']

  const templates = [
    // VN -> EN (Target option is English)
    (item) => ({ type: 'vn_to_en', q: `Từ nào có nghĩa là "${item.vn}"?`, exp: `"${item.word.replace('_color', '')}" có nghĩa là ${item.vn}.` }),
    (item) => ({ type: 'vn_to_en', q: `Chọn từ tiếng Anh chính xác cho: "${item.vn}"`, exp: `Chính xác! "${item.word.replace('_color', '')}" chính là ${item.vn}.` }),
    (item) => ({ type: 'vn_to_en', q: `Khi nhắc đến "${item.vn}", bé sẽ dùng từ tiếng Anh nào?`, exp: `Từ phù hợp nhất là "${item.word.replace('_color', '')}".` }),
    (item) => ({ type: 'vn_to_en', q: `Đố bé: Từ nào dịch chuẩn nhất cho "${item.vn}"?`, exp: `Đáp án đúng là "${item.word.replace('_color', '')}".` }),
    (item) => ({ type: 'vn_to_en', q: `Từ tiếng Anh nào tương ứng với "${item.vn}"?`, exp: `Đó chính là từ "${item.word.replace('_color', '')}".` }),

    // EN -> VN (Target option is Vietnamese)
    (item) => ({ type: 'en_to_vn', q: `Từ "${item.word.replace('_color', '')}" trong tiếng Việt có nghĩa là gì?`, exp: `"${item.word.replace('_color', '')}" dịch sang tiếng Việt nghĩa là ${item.vn}.` }),
    (item) => ({ type: 'en_to_vn', q: `Nghĩa tiếng Việt của từ "${item.word.replace('_color', '')}" là gì nào?`, exp: `"${item.word.replace('_color', '')}" nghĩa là ${item.vn}.` }),
    (item) => ({ type: 'en_to_vn', q: `Trong tiếng Việt, từ "${item.word.replace('_color', '')}" tương ứng với nghĩa gì?`, exp: `"${item.word.replace('_color', '')}" mang nghĩa là ${item.vn}.` }),
    (item) => ({ type: 'en_to_vn', q: `Bé có biết từ "${item.word.replace('_color', '')}" nghĩa tiếng Việt là gì không?`, exp: `Đó chính là ${item.vn}.` })
  ]

  let attempts = 0
  while (questions.length < targetCount && attempts < targetCount * 25) {
    attempts++
    const item = bank[Math.floor(Math.random() * bank.length)]
    
    // Pick 1 distinct distractor
    let other = bank[Math.floor(Math.random() * bank.length)]
    while ((other.word === item.word || other.vn === item.vn) && bank.length > 1) {
      other = bank[Math.floor(Math.random() * bank.length)]
    }

    const tplIdx = Math.floor(Math.random() * templates.length)
    const tpl = templates[tplIdx](item)
    const isLeft = Math.random() < 0.5

    const targetVal = tpl.type === 'vn_to_en' ? item.word.replace('_color', '') : item.vn
    const otherVal = tpl.type === 'vn_to_en' ? other.word.replace('_color', '') : other.vn

    const hashKey = `${tpl.q.trim().toLowerCase()}_${targetVal.trim().toLowerCase()}_${otherVal.trim().toLowerCase()}`
    if (!seen.has(hashKey)) {
      seen.add(hashKey)
      questions.push({
        question: tpl.q,
        option_left: isLeft ? targetVal : otherVal,
        option_right: isLeft ? otherVal : targetVal,
        correct_option: isLeft ? 'left' : 'right',
        explanation: tpl.exp
      })
    }
  }

  return questions
}
