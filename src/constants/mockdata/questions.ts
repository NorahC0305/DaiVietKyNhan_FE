import { Question } from '@/types/IComponents/Question';

export const mockQuestions: Question[] = [
  {
    id: 1,
    title: "Câu hỏi về Thánh Gióng",
    content: "Thánh Gióng là một trong những vị thần quan trọng trong tín ngưỡng dân gian Việt Nam. Theo truyền thuyết, Thánh Gióng sinh ra ở đâu?",
    options: [
      { id: 1, text: "Làng Phù Đổng, huyện Gia Lâm, Hà Nội" },
      { id: 2, text: "Làng Đồng Xâm, huyện Kiến Xương, Thái Bình" },
      { id: 3, text: "Làng Đồng Kỵ, huyện Từ Sơn, Bắc Ninh" },
      { id: 4, text: "Làng Đồng Nhân, huyện Hưng Hà, Thái Bình" }
    ],
    correctAnswer: 1,
    explanation: "Thánh Gióng sinh ra ở làng Phù Đổng, huyện Gia Lâm, Hà Nội. Đây là một trong những địa danh lịch sử quan trọng gắn liền với truyền thuyết Thánh Gióng.",
    difficulty: 'easy',
    category: "Lịch sử Việt Nam"
  },
  {
    id: 2,
    title: "Câu hỏi về Sơn Tinh",
    content: "Theo truyền thuyết, Sơn Tinh và Thủy Tinh tranh giành ai?",
    options: [
      { id: 1, text: "Công chúa Mị Nương" },
      { id: 2, text: "Công chúa Tiên Dung" },
      { id: 3, text: "Công chúa Ngọc Hoa" },
      { id: 4, text: "Công chúa Huyền Trân" }
    ],
    correctAnswer: 1,
    explanation: "Sơn Tinh và Thủy Tinh tranh giành công chúa Mị Nương - con gái của vua Hùng Vương thứ 18.",
    difficulty: 'easy',
    category: "Truyền thuyết"
  },
  {
    id: 3,
    title: "Câu hỏi về Chử Đồng Tử",
    content: "Chử Đồng Tử và Tiên Dung gặp nhau lần đầu tiên ở đâu?",
    options: [
      { id: 1, text: "Sông Hồng" },
      { id: 2, text: "Biển Đông" },
      { id: 3, text: "Đầm Dạ Trạch" },
      { id: 4, text: "Hồ Tây" }
    ],
    correctAnswer: 3,
    explanation: "Chử Đồng Tử và Tiên Dung gặp nhau lần đầu tiên ở Đầm Dạ Trạch, nơi mà sau này trở thành vùng đất thánh của họ.",
    difficulty: 'medium',
    category: "Truyền thuyết"
  },
  {
    id: 4,
    title: "Câu hỏi về Làng Phù Đổng",
    content: "Đền Gióng ở Phù Đổng được xây dựng từ thời nào?",
    options: [
      { id: 1, text: "Thời Lý" },
      { id: 2, text: "Thời Trần" },
      { id: 3, text: "Thời Lê" },
      { id: 4, text: "Thời Nguyễn" }
    ],
    correctAnswer: 1,
    explanation: "Đền Gióng ở Phù Đổng được xây dựng từ thời Lý, thể hiện tầm quan trọng của truyền thuyết Thánh Gióng trong lịch sử dân tộc.",
    difficulty: 'hard',
    category: "Lịch sử Việt Nam"
  },
  {
    id: 5,
    title: "Câu hỏi về Núi Tản Viên",
    content: "Núi Tản Viên có độ cao khoảng bao nhiêu mét?",
    options: [
      { id: 1, text: "1,200m" },
      { id: 2, text: "1,296m" },
      { id: 3, text: "1,350m" },
      { id: 4, text: "1,400m" }
    ],
    correctAnswer: 2,
    explanation: "Núi Tản Viên có độ cao 1,296m, là ngọn núi cao nhất trong dãy núi Ba Vì.",
    difficulty: 'medium',
    category: "Địa lý"
  },
  {
    id: 6,
    title: "Câu hỏi về Phủ Tây Hồ",
    content: "Phủ Tây Hồ thờ ai?",
    options: [
      { id: 1, text: "Liễu Hạnh công chúa" },
      { id: 2, text: "Mẫu Thượng Thiên" },
      { id: 3, text: "Mẫu Thoải" },
      { id: 4, text: "Mẫu Địa" }
    ],
    correctAnswer: 1,
    explanation: "Phủ Tây Hồ thờ Liễu Hạnh công chúa - một trong những vị thần quan trọng trong tín ngưỡng thờ Mẫu của Việt Nam.",
    difficulty: 'easy',
    category: "Tín ngưỡng"
  },
  {
    id: 7,
    title: "Câu hỏi về Kỳ Linh Việt Hỏa",
    content: "Kỳ Linh Việt Hỏa là gì?",
    options: [
      { id: 1, text: "Một loại lửa thiêng" },
      { id: 2, text: "Tên của một vị thần" },
      { id: 3, text: "Một loại vũ khí cổ" },
      { id: 4, text: "Tên của một ngọn núi" }
    ],
    correctAnswer: 1,
    explanation: "Kỳ Linh Việt Hỏa là một loại lửa thiêng trong truyền thuyết Việt Nam, thường gắn liền với các nghi lễ tâm linh.",
    difficulty: 'hard',
    category: "Truyền thuyết"
  },
  {
    id: 8,
    title: "Câu hỏi về Đầm Dạ Trạch",
    content: "Đầm Dạ Trạch nằm ở tỉnh nào?",
    options: [
      { id: 1, text: "Hà Nội" },
      { id: 2, text: "Hưng Yên" },
      { id: 3, text: "Thái Bình" },
      { id: 4, text: "Hải Dương" }
    ],
    correctAnswer: 2,
    explanation: "Đầm Dạ Trạch nằm ở huyện Khoái Châu, tỉnh Hưng Yên - nơi gắn liền với truyền thuyết Chử Đồng Tử và Tiên Dung.",
    difficulty: 'medium',
    category: "Địa lý"
  },
  {
    id: 9,
    title: "Câu hỏi về Liễu Hạnh",
    content: "Liễu Hạnh công chúa được tôn vinh là gì?",
    options: [
      { id: 1, text: "Thánh Mẫu" },
      { id: 2, text: "Mẫu Liễu Hạnh" },
      { id: 3, text: "Chúa Liễu" },
      { id: 4, text: "Tất cả các đáp án trên" }
    ],
    correctAnswer: 4,
    explanation: "Liễu Hạnh công chúa được tôn vinh với nhiều danh hiệu khác nhau: Thánh Mẫu, Mẫu Liễu Hạnh, Chúa Liễu...",
    difficulty: 'easy',
    category: "Tín ngưỡng"
  },
  {
    id: 10,
    title: "Câu hỏi về Làng Phù Đổng",
    content: "Lễ hội Gióng ở Phù Đổng được tổ chức vào thời gian nào?",
    options: [
      { id: 1, text: "Mùng 6 tháng 4 âm lịch" },
      { id: 2, text: "Mùng 9 tháng 4 âm lịch" },
      { id: 3, text: "Mùng 12 tháng 4 âm lịch" },
      { id: 4, text: "Mùng 15 tháng 4 âm lịch" }
    ],
    correctAnswer: 2,
    explanation: "Lễ hội Gióng ở Phù Đổng được tổ chức vào mùng 9 tháng 4 âm lịch hàng năm, thu hút đông đảo du khách và người dân địa phương.",
    difficulty: 'medium',
    category: "Văn hóa"
  },
  {
    id: 11,
    title: "Câu hỏi về Sơn Tinh",
    content: "Sơn Tinh có khả năng gì đặc biệt?",
    options: [
      { id: 1, text: "Điều khiển núi rừng" },
      { id: 2, text: "Tạo ra mưa" },
      { id: 3, text: "Bay lượn trên không" },
      { id: 4, text: "Biến hóa thành các loài vật" }
    ],
    correctAnswer: 1,
    explanation: "Sơn Tinh có khả năng điều khiển núi rừng, đây là sức mạnh đặc biệt của vị thần núi trong truyền thuyết Việt Nam.",
    difficulty: 'easy',
    category: "Truyền thuyết"
  },
  {
    id: 12,
    title: "Câu hỏi về Thủy Tinh",
    content: "Thủy Tinh thường gây ra thiên tai gì?",
    options: [
      { id: 1, text: "Hạn hán" },
      { id: 2, text: "Lũ lụt" },
      { id: 3, text: "Bão tố" },
      { id: 4, text: "Động đất" }
    ],
    correctAnswer: 2,
    explanation: "Thủy Tinh thường gây ra lũ lụt khi tức giận, đây là biểu hiện của sức mạnh điều khiển nước của vị thần này.",
    difficulty: 'easy',
    category: "Truyền thuyết"
  },
  {
    id: 13,
    title: "Câu hỏi về Chử Đồng Tử",
    content: "Chử Đồng Tử xuất thân từ gia đình như thế nào?",
    options: [
      { id: 1, text: "Gia đình giàu có" },
      { id: 2, text: "Gia đình nghèo khó" },
      { id: 3, text: "Gia đình quý tộc" },
      { id: 4, text: "Gia đình thương gia" }
    ],
    correctAnswer: 2,
    explanation: "Chử Đồng Tử xuất thân từ gia đình nghèo khó, nhưng sau này trở thành một vị thần quan trọng trong tín ngưỡng dân gian.",
    difficulty: 'easy',
    category: "Truyền thuyết"
  },
  {
    id: 14,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",
    options: [
      { id: 1, text: "Vua Hùng Vương thứ 3" },
      { id: 2, text: "Vua Hùng Vương thứ 6" },
      { id: 3, text: "Vua Hùng Vương thứ 9" },
      { id: 4, text: "Vua Hùng Vương thứ 12" }
    ],
    correctAnswer: 1,
    explanation: "Tiên Dung là con gái của vua Hùng Vương thứ 3, một trong những vị vua đầu tiên của nước Văn Lang.",
    difficulty: 'hard',
    category: "Lịch sử Việt Nam"
  },
  
  {
    id: 15,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",
    options: [
      { id: 1, text: "Vua Hùng Vương thứ 3" },
      { id: 2, text: "Vua Hùng Vương thứ 6" },
      { id: 3, text: "Vua Hùng Vương thứ 9" },
      { id: 4, text: "Vua Hùng Vương thứ 12" }
    ],
    correctAnswer: 1,
    explanation: "Tiên Dung là con gái của vua Hùng Vương thứ 3, một trong những vị vua đầu tiên của nước Văn Lang.",
    difficulty: 'hard',
    category: "Lịch sử Việt Nam"
  },
  
  {
    id: 16,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",
    options: [
      { id: 1, text: "Vua Hùng Vương thứ 3" },
      { id: 2, text: "Vua Hùng Vương thứ 6" },
      { id: 3, text: "Vua Hùng Vương thứ 9" },
      { id: 4, text: "Vua Hùng Vương thứ 12" }
    ],
    correctAnswer: 1,
    explanation: "Tiên Dung là con gái của vua Hùng Vương thứ 3, một trong những vị vua đầu tiên của nước Văn Lang.",
    difficulty: 'hard',
    category: "Lịch sử Việt Nam"
  },
  
  
  {
    id: 17,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",
    options: [
      { id: 1, text: "Vua Hùng Vương thứ 3" },
      { id: 2, text: "Vua Hùng Vương thứ 6" },
      { id: 3, text: "Vua Hùng Vương thứ 9" },
      { id: 4, text: "Vua Hùng Vương thứ 12" }
    ],
    correctAnswer: 1,
    explanation: "Tiên Dung là con gái của vua Hùng Vương thứ 3, một trong những vị vua đầu tiên của nước Văn Lang.",
    difficulty: 'hard',
    category: "Lịch sử Việt Nam"
  },
  {
    id: 18,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",
    options: [
      { id: 1, text: "Vua Hùng Vương thứ 3" },
      { id: 2, text: "Vua Hùng Vương thứ 6" },
      { id: 3, text: "Vua Hùng Vương thứ 9" },
      { id: 4, text: "Vua Hùng Vương thứ 12" }
    ],
    correctAnswer: 1,
    explanation: "Tiên Dung là con gái của vua Hùng Vương thứ 3, một trong những vị vua đầu tiên của nước Văn Lang.",
    difficulty: 'hard',
    category: "Lịch sử Việt Nam"
  },
  {
    id: 19,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",
    options: [
      { id: 1, text: "Vua Hùng Vương thứ 3" },
      { id: 2, text: "Vua Hùng Vương thứ 6" },
      { id: 3, text: "Vua Hùng Vương thứ 9" },
      { id: 4, text: "Vua Hùng Vương thứ 12" }
    ],
    correctAnswer: 1,
    explanation: "Tiên Dung là con gái của vua Hùng Vương thứ 3, một trong những vị vua đầu tiên của nước Văn Lang.",
    difficulty: 'hard',
    category: "Lịch sử Việt Nam"
  },
  {
    id: 20,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",
    options: [
      { id: 1, text: "Vua Hùng Vương thứ 3" },
      { id: 2, text: "Vua Hùng Vương thứ 6" },
      { id: 3, text: "Vua Hùng Vương thứ 9" },
      { id: 4, text: "Vua Hùng Vương thứ 12" }
    ],
    correctAnswer: 1,
    explanation: "Tiên Dung là con gái của vua Hùng Vương thứ 3, một trong những vị vua đầu tiên của nước Văn Lang.",
    difficulty: 'hard',
    category: "Lịch sử Việt Nam"
  },
  {
    id: 21,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",
    options: [
      { id: 1, text: "Vua Hùng Vương thứ 3" },
      { id: 2, text: "Vua Hùng Vương thứ 6" },
      { id: 3, text: "Vua Hùng Vương thứ 9" },
      { id: 4, text: "Vua Hùng Vương thứ 12" }
    ],
    correctAnswer: 1,
    explanation: "Tiên Dung là con gái của vua Hùng Vương thứ 3, một trong những vị vua đầu tiên của nước Văn Lang.",
    difficulty: 'hard',
    category: "Lịch sử Việt Nam"
  }
];

export const getQuestionById = (id: number): Question | undefined => {
  return mockQuestions.find(question => question.id === id);
};
