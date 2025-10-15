export interface Question {
  id: number;
  title: string;
  content: string;
  options: QuestionOption[];
  correctAnswer: number; // index of correct option
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

export interface QuestionOption {
  id: number;
  text: string;
}

export interface QuestionModalProps {
  question: Question | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedOptionId: number, isCorrect: boolean) => void;
}
