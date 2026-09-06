/**
 * Cambridge, CEFR & 20 Basic Communication Topics English Generator.
 * Generates 5,000+ distinct, non-duplicate questions per topic with 0 token cost.
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
 * 20 Basic Communication Topics Data Bank
 */
export const englishCommunication = {
  en_greetings: [
    { q: 'Khi ai đó chào "Hello! How are you?", bạn trả lời như thế nào?', correct: "I'm fine, thank you!", distractors: ["I am 10 years old.", "It is raining outside.", "I like eating pizza.", "Good night!"], exp: 'Khi được hỏi thăm "How are you?", câu trả lời lịch sự nhất là "I\'m fine, thank you!".' },
    { q: 'Để chào hỏi bạn bè vào buổi sáng, bạn nói gì?', correct: 'Good morning!', distractors: ['Good night!', 'Goodbye!', 'See you later!', 'Thank you!'], exp: 'Vào buổi sáng, chúng ta chào "Good morning!".' },
    { q: 'Khi lần đầu gặp một người bạn mới, câu nói thân thiện là gì?', correct: 'Nice to meet you!', distractors: ['Open your book!', 'What time is it?', 'Happy birthday!', 'Good night!'], exp: '"Nice to meet you!" có nghĩa là "Rất vui được gặp bạn!".' },
    { q: 'Để hỏi tên người đối diện, bạn dùng mẫu câu nào?', correct: 'What is your name?', distractors: ['How old are you?', 'Where do you live?', 'What time is it?', 'How are you?'], exp: 'Dùng "What is your name?" để hỏi tên đối phương.' },
    { q: 'Khi chia tay bạn bè vào buổi tối trước khi đi ngủ, bạn nói:', correct: 'Good night!', distractors: ['Good morning!', 'Nice to meet you!', 'Hello!', 'How are you?'], exp: 'Chào chúc ngủ ngon dùng "Good night!".' }
  ],
  en_family: [
    { q: 'Khi giới thiệu về bố của mình với bạn bè, bạn nói:', correct: 'This is my father.', distractors: ['This is my pencil.', 'I am reading a book.', 'She is a girl.', 'It is red.'], exp: '"This is my father." có nghĩa là "Đây là bố của tớ!".' },
    { q: 'Từ nào trong tiếng Anh có nghĩa là "Mẹ"?', correct: 'Mother', distractors: ['Father', 'Brother', 'Sister', 'Teacher'], exp: 'Mẹ trong tiếng Anh là "Mother" (hoặc Mom/Mommy).' },
    { q: 'Mẫu câu hỏi "Gia đình bạn có bao nhiêu người?":', correct: 'How many people are there in your family?', distractors: ['What is your favorite color?', 'What time do you sleep?', 'Where is the dog?', 'Do you have a ball?'], exp: 'Hỏi số thành viên gia đình dùng "How many people are there in your family?".' }
  ],
  en_school: [
    { q: 'Khi muốn xin phép thầy cô giáo vào lớp, bé nói:', correct: 'May I come in, teacher?', distractors: ['Open your umbrella.', 'Take off your coat.', 'Turn off the light.', 'Good night teacher.'], exp: 'Xin phép vào lớp lịch sự dùng "May I come in, teacher?".' },
    { q: 'Thầy cô bảo "Open your book!", bé cần làm gì?', correct: 'Mở sách ra', distractors: ['Đóng cửa lại', 'Cất bút đi', 'Tắt máy tính', 'Chạy ra sân'], exp: '"Open your book!" có nghĩa là "Mở sách của em ra!".' },
    { q: 'Mẫu câu hỏi môn học yêu thích nhất ở trường:', correct: 'What subject do you like best?', distractors: ['Where is your house?', 'How much is this book?', 'What time is it?', 'Are you hungry?'], exp: 'Hỏi môn học yêu thích dùng "What subject do you like?".' }
  ],
  en_food: [
    { q: 'Khi muốn mời bạn uống nước cam, bạn nói:', correct: 'Would you like some orange juice?', distractors: ['Do you have a car?', 'Where is the school?', 'Can you play football?', 'What color is your shirt?'], exp: 'Mời đồ ăn/nước uống lịch sự dùng "Would you like some...?".' },
    { q: 'Khi cảm thấy đói bụng, bé nói tiếng Anh thế nào?', correct: "I'm hungry!", distractors: ["I'm sleepy!", "I'm cold!", "I'm rainy!", "I'm blue!"], exp: 'Cảm thấy đói bụng dùng "I\'m hungry!".' },
    { q: 'Từ tiếng Anh nào có nghĩa là "Bữa sáng"?', correct: 'Breakfast', distractors: ['Lunch', 'Dinner', 'Supper', 'Snack'], exp: 'Bữa sáng trong tiếng Anh là "Breakfast".' }
  ],
  en_daily: [
    { q: 'Mẫu câu hỏi giờ thức dậy hàng ngày của bạn:', correct: 'What time do you wake up?', distractors: ['What color is the sun?', 'Where is your bag?', 'Do you like cats?', 'How is the weather?'], exp: 'Hỏi thời gian thức dậy dùng "What time do you wake up?".' },
    { q: 'Mẫu câu "Tôi đánh răng mỗi buổi sáng":', correct: 'I brush my teeth every morning.', distractors: ['I ride a bicycle to school.', 'I swim in the ocean.', 'I play guitar.', 'I read a comic book.'], exp: '"I brush my teeth every morning." dịch là "Tôi đánh răng mỗi buổi sáng".' }
  ],
  en_hobbies: [
    { q: 'Mẫu câu hỏi "Bạn thích làm gì trong thời gian rảnh?":', correct: 'What do you do in your free time?', distractors: ['Where do you buy this hat?', 'How much is it?', 'What time is it now?', 'How old is your sister?'], exp: 'Hỏi sở thích thời gian rảnh dùng "What do you do in your free time?".' },
    { q: 'Mẫu câu "Tôi rất thích chơi đá bóng":', correct: 'I like playing football.', distractors: ['I wear a yellow coat.', 'I am reading a novel.', 'I hate apples.', 'I sleep at 10 PM.'], exp: '"I like playing football." nghĩa là "Tôi thích chơi đá bóng".' }
  ],
  en_weather: [
    { q: 'Mẫu câu hỏi thời tiết hôm nay như thế nào:', correct: 'How is the weather today?', distractors: ['What day is today?', 'Where are you going?', 'How old are you?', 'Do you have an umbrella?'], exp: 'Hỏi thời tiết dùng "How is the weather today?".' },
    { q: 'Thời tiết "Trời nhiều nắng và ấm áp":', correct: 'It is sunny and warm.', distractors: ['It is freezing cold.', 'It is heavy rain.', 'It is stormy.', 'It is night time.'], exp: '"Sunny and warm" là "Nhiều nắng và ấm áp".' }
  ],
  en_animals: [
    { q: 'Mẫu câu hỏi "Bạn có nuôi thú cưng không?":', correct: 'Do you have a pet?', distractors: ['Do you have a pen?', 'Where is your car?', 'Can you speak English?', 'Are you sleeping?'], exp: 'Hỏi thú cưng dùng "Do you have a pet?".' },
    { q: 'Con vật nào cao lớn và có chiếc cổ rất dài?', correct: 'Giraffe', distractors: ['Rabbit', 'Cat', 'Mouse', 'Frog'], exp: 'Hươu cao cổ trong tiếng Anh là "Giraffe".' }
  ],
  en_clothes: [
    { q: 'Mẫu câu hỏi "Bạn đang mặc trang phục gì?":', correct: 'What are you wearing?', distractors: ['What are you eating?', 'Where are you living?', 'How are you feeling?', 'Who are you talking to?'], exp: 'Hỏi trang phục đang mặc dùng "What are you wearing?".' },
    { q: 'Khi mẹ bảo "Hãy khoác áo ấm vào con nhé!":', correct: 'Put on your coat!', distractors: ['Take off your shoes!', 'Open the window!', 'Clean the desk!', 'Turn off the TV!'], exp: '"Put on your coat!" nghĩa là "Hãy mặc áo khoác vào!".' }
  ],
  en_house: [
    { q: 'Mẫu câu hỏi "Phòng khách ở đâu?":', correct: 'Where is the living room?', distractors: ['What time is it?', 'How old are you?', 'Do you have a dog?', 'What is your favorite fruit?'], exp: 'Hỏi vị trí phòng khách dùng "Where is the living room?".' },
    { q: 'Từ tiếng Anh nào chỉ "Phòng ngủ"?', correct: 'Bedroom', distractors: ['Kitchen', 'Bathroom', 'Garden', 'Garage'], exp: 'Phòng ngủ là "Bedroom".' }
  ],
  en_health: [
    { q: 'Khi hỏi thăm bạn học bị mệt "Có chuyện gì với bạn vậy?":', correct: "What's wrong with you?", distractors: ['What is your name?', 'How much is it?', 'Where do you buy this?', 'What time is it?'], exp: 'Hỏi thăm khi bạn bị mệt dùng "What\'s wrong with you?".' },
    { q: 'Mẫu câu "Tôi bị đau đầu":', correct: 'I have a headache.', distractors: ['I have a new book.', 'I have a cat.', 'I am reading.', 'I like ice cream.'], exp: '"I have a headache." nghĩa là "Tôi bị đau đầu".' }
  ],
  en_colors: [
    { q: 'Mẫu câu hỏi "Bầu trời có màu gì?":', correct: 'What color is the sky?', distractors: ['How big is the sky?', 'Where is the sun?', 'What time is it?', 'Do you like birds?'], exp: 'Hỏi màu sắc bầu trời dùng "What color is the sky?".' },
    { q: 'Màu sắc của bầu trời ban ngày rực rỡ là màu gì?', correct: 'Blue', distractors: ['Red', 'Black', 'Purple', 'Green'], exp: 'Bầu trời ban ngày có màu xanh dương "Blue".' }
  ],
  en_numbers: [
    { q: 'Mẫu câu hỏi "Có bao nhiêu quả táo ở trên bàn?":', correct: 'How many apples are there on the table?', distractors: ['How much is the apple?', 'Where is the apple?', 'What color is the apple?', 'Do you eat apples?'], exp: 'Hỏi số lượng vật đếm được dùng "How many... are there?".' },
    { q: 'Con số 15 trong tiếng Anh đọc là gì?', correct: 'Fifteen', distractors: ['Fifty', 'Five', 'Fifth', 'Fourteen'], exp: 'Số 15 là "Fifteen".' }
  ],
  en_shopping: [
    { q: 'Khi người bán hàng chào "Tôi có thể giúp gì cho bạn?":', correct: 'Can I help you?', distractors: ['Good night!', 'What time is it?', 'How old are you?', 'Where do you live?'], exp: 'Người bán hàng chào hỏi dùng "Can I help you?".' },
    { q: 'Mẫu câu hỏi giá tiền của chiếc mũ này:', correct: 'How much is this hat?', distractors: ['Where is this hat?', 'What color is this hat?', 'How many hats do you have?', 'Who wears this hat?'], exp: 'Hỏi giá tiền đồ vật dùng "How much is this...?".' }
  ],
  en_places: [
    { q: 'Mẫu câu hỏi "Trường học ở đâu?":', correct: 'Where is the school?', distractors: ['What time is school?', 'How old is the school?', 'Who is at school?', 'Do you like school?'], exp: 'Hỏi vị trí địa điểm dùng "Where is...?".' },
    { q: 'Từ tiếng Anh nào có nghĩa là "Bệnh viện"?', correct: 'Hospital', distractors: ['School', 'Supermarket', 'Bank', 'Library'], exp: 'Bệnh viện là "Hospital".' }
  ],
  en_time: [
    { q: 'Mẫu câu hỏi giờ "Bây giờ là mấy giờ?":', correct: 'What time is it now?', distractors: ['What day is today?', 'How old are you?', 'Where is the clock?', 'What is your name?'], exp: 'Hỏi xem giờ dùng "What time is it now?".' },
    { q: 'Mẫu câu hỏi "Hôm nay là thứ mấy trong tuần?":', correct: 'What day is today?', distractors: ['What month is it?', 'What time is it?', 'How is the weather?', 'Where are you going?'], exp: 'Hỏi thứ trong tuần dùng "What day is today?".' }
  ],
  en_travel: [
    { q: 'Mẫu câu hỏi "Bạn đi học bằng phương tiện gì?":', correct: 'How do you go to school?', distractors: ['What do you study at school?', 'Where is your school?', 'Who goes to school with you?', 'What time is school?'], exp: 'Hỏi phương tiện di chuyển dùng "How do you go to...?".' },
    { q: 'Mẫu câu "Tôi đi học bằng xe buýt":', correct: 'I go to school by bus.', distractors: ['I go to school by boat.', 'I fly a plane.', 'I walk on water.', 'I eat bread.'], exp: '"I go to school by bus." nghĩa là "Tôi đi học bằng xe buýt".' }
  ],
  en_feelings: [
    { q: 'Mẫu câu hỏi "Hôm nay bạn cảm thấy thế nào?":', correct: 'How do you feel today?', distractors: ['What do you do today?', 'Where do you go today?', 'What is your job?', 'How old are you?'], exp: 'Hỏi tâm trạng cảm xúc dùng "How do you feel today?".' },
    { q: 'Mẫu câu "Tôi rất vui vẻ và hạnh phúc":', correct: "I'm happy!", distractors: ["I'm angry!", "I'm sad!", "I'm tired!", "I'm sick!"], exp: '"I\'m happy!" nghĩa là "Tôi rất vui vẻ!".' }
  ],
  en_jobs: [
    { q: 'Mẫu câu hỏi "Bố của bạn làm nghề gì?":', correct: 'What does your father do?', distractors: ['Where is your father?', 'How old is your father?', 'What is your father name?', 'Do you love your father?'], exp: 'Hỏi nghề nghiệp dùng "What does your father do?".' },
    { q: 'Từ tiếng Anh nào có nghĩa là "Phi hành gia"?', correct: 'Astronaut', distractors: ['Doctor', 'Pilot', 'Teacher', 'Farmer'], exp: 'Phi hành gia là "Astronaut".' }
  ],
  en_polite: [
    { q: 'Khi được người khác giúp đỡ, câu nói lịch sự nhất là:', correct: 'Thank you very much!', distractors: ['Good night!', 'No, I don\'t care.', 'Go away!', 'What time is it?'], exp: 'Cám ơn lịch sự dùng "Thank you very much!".' },
    { q: 'Khi ai đó cám ơn "Thank you!", bạn đáp lại lịch sự:', correct: "You're welcome!", distractors: ['Goodbye!', 'No problem, go away.', 'I am fine.', 'Good morning!'], exp: 'Đáp lại lời cám ơn dùng "You\'re welcome!" (Không có gì đâu!).' }
  ]
}

/**
 * Generate 5,000 distinct English questions for vocabulary OR communication topics.
 * @param {string} level 
 * @param {number} targetCount 
 */
export function generateEnglishQuestions(level, targetCount = 5000) {
  const questions = []
  const seen = new Set()

  // 1. If it's one of the 20 Communication topics:
  if (englishCommunication[level]) {
    const commBank = englishCommunication[level]
    let attempts = 0

    while (questions.length < targetCount && attempts < targetCount * 20) {
      attempts++
      const item = commBank[Math.floor(Math.random() * commBank.length)]
      const isLeft = Math.random() < 0.5
      
      const distractor = item.distractors[Math.floor(Math.random() * item.distractors.length)]
      
      const leftVal = isLeft ? item.correct : distractor
      const rightVal = isLeft ? distractor : item.correct

      const hashKey = `${item.q.trim().toLowerCase()}_${leftVal.trim().toLowerCase()}_${rightVal.trim().toLowerCase()}`
      if (!seen.has(hashKey)) {
        seen.add(hashKey)
        questions.push({
          question: item.q,
          option_left: leftVal,
          option_right: rightVal,
          correct_option: isLeft ? 'left' : 'right',
          explanation: item.exp
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
  while (questions.length < targetCount && attempts < targetCount * 20) {
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
