

export const mockQuestions: ICOMPONENTS.Question[] = [
  {
    id: 1,
    title: "Câu hỏi về Thánh Gióng",
    content:
      "Thánh Gióng là một trong những vị thần quan trọng trong tín ngưỡng dân gian Việt Nam. Theo truyền thuyết, Thánh Gióng sinh ra ở đâu?",

    category: "Lịch sử Việt Nam",
  },
  {
    id: 2,
    title: "Câu hỏi về Sơn Tinh",
    content: "Theo truyền thuyết, Sơn Tinh và Thủy Tinh tranh giành ai?",

    category: "Truyền thuyết",
  },
  {
    id: 3,
    title: "Câu hỏi về Chử Đồng Tử",
    content: "Chử Đồng Tử và Tiên Dung gặp nhau lần đầu tiên ở đâu?",

    category: "Truyền thuyết",
  },
  {
    id: 4,
    title: "Câu hỏi về Làng Phù Đổng",
    content: "Đền Gióng ở Phù Đổng được xây dựng từ thời nào?",

    category: "Lịch sử Việt Nam",
  },
  {
    id: 5,
    title: "Câu hỏi về Núi Tản Viên",
    content: "Núi Tản Viên có độ cao khoảng bao nhiêu mét?",

    category: "Địa lý",
  },
  {
    id: 6,
    title: "Câu hỏi về Phủ Tây Hồ",
    content: "Phủ Tây Hồ thờ ai?",

    category: "Tín ngưỡng",
  },
  {
    id: 7,
    title: "Câu hỏi về Kỳ Linh Việt Hỏa",
    content: "Kỳ Linh Việt Hỏa là gì?",

    category: "Truyền thuyết",
  },
  {
    id: 8,
    title: "Câu hỏi về Đầm Dạ Trạch",
    content: "Đầm Dạ Trạch nằm ở tỉnh nào?",

    category: "Địa lý",
  },
  {
    id: 9,
    title: "Câu hỏi về Liễu Hạnh",
    content: "Liễu Hạnh công chúa được tôn vinh là gì?",

    category: "Tín ngưỡng",
  },
  {
    id: 10,
    title: "Câu hỏi về Làng Phù Đổng",
    content: "Lễ hội Gióng ở Phù Đổng được tổ chức vào thời gian nào?",

    category: "Văn hóa",
  },
  {
    id: 11,
    title: "Câu hỏi về Sơn Tinh",
    content: "Sơn Tinh có khả năng gì đặc biệt?",

    category: "Truyền thuyết",
  },
  {
    id: 12,
    title: "Câu hỏi về Thủy Tinh",
    content: "Thủy Tinh thường gây ra thiên tai gì?",

    category: "Truyền thuyết",
  },
  {
    id: 13,
    title: "Câu hỏi về Chử Đồng Tử",
    content: "Chử Đồng Tử xuất thân từ gia đình như thế nào?",

    category: "Truyền thuyết",
  },
  {
    id: 14,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",

    category: "Lịch sử Việt Nam",
  },

  {
    id: 15,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",

    category: "Lịch sử Việt Nam",
  },

  {
    id: 16,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",
    category: "Lịch sử Việt Nam",
  },

  {
    id: 17,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",
    category: "Lịch sử Việt Nam",
  },
  {
    id: 18,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",
    category: "Lịch sử Việt Nam",
  },
  {
    id: 19,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",
    category: "Lịch sử Việt Nam",
  },
  {
    id: 20,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",
    category: "Lịch sử Việt Nam",
  },
  {
    id: 21,
    title: "Câu hỏi về Tiên Dung",
    content: "Tiên Dung là con gái của ai?",
    category: "Lịch sử Việt Nam",
  },
];

export const getQuestionById = (id: number): ICOMPONENTS.Question | undefined => {
  return mockQuestions.find((question) => question.id === id);
};
