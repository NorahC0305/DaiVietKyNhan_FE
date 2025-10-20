
declare namespace ICOMPONENTS {
  type TransitionMode =
    | "wait"
    | "popLayout"
    | "beforeChildren"
    | "afterChildren";
  interface TransitionWrapperProps {
    children: React.ReactNode;
    className?: string;
    initial?: { opacity: number; y: number };
    animate?: { opacity: number; y: number };
    exit?: { opacity: number; y: number };
    transition?: { duration: number; ease: EasingFunction[] };
    mode?: TransitionMode;
  }
  interface IconProps {
    icon?: keyof typeof import("lucide-react");
    iconSize?: number;
    iconColor?: string;
  }

  interface LucideIconProps extends IconProps {
    name: keyof typeof import("lucide-react");
    className?: string;
    spin?: boolean;
    fill?: string;
  }

  interface OTPInputProps {
    length?: number;
    onChange?: (otp: string) => void;
    error?: boolean;
  }

  interface DayStatus {
    day: string;
    label: string;
    checked: boolean;
    dayName: string;
    isSpecial?: boolean;
  }

  interface DailyCheckinProps {
    className?: string;
    isModal?: boolean;
    isOpen?: boolean;
    onClose?: () => void;
  }

  interface LayoutProps {
    weeklyProgress: DayStatus[];
    currentProgress: number;
    currentReward: number;
    todayChecked: boolean;
    onCheckin: () => void;
  }

  interface RewardDisplayProps {
    reward: number;
    className?: string;
  }

  interface ProgressBarProps {
    current: number;
    total: number;
    className?: string;
  }

  interface WeeklyGridProps {
    weeklyProgress: DayStatus[];
    variant?: "mobile" | "desktop";
  }

  interface DayCardProps {
    day: DayStatus;
    variant: "mobile" | "desktop";
  }

  interface CheckinButtonProps {
    checked: boolean;
    onCheckin: () => void;
    className?: string;
    variant?: "mobile" | "desktop";
  }
  interface BonusInfoProps {
    variant?: "mobile" | "desktop";
    bonusReward?: number;
  }

  interface ModalWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    className?: string;
  }

  export interface ReleaseDateData {
    id?: number;
    date: Date | undefined;
    description: string;
    isActive: boolean;
    createdAt?: Date;
  }

  export interface ReleaseDateMessage {
    type: "success" | "error";
    text: string;
  }

  export interface CountdownState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

  export interface Position {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    transform?: string;
  }

  export interface Size {
    width: number;
    height: number;
  }

  export interface Region {
    id: string;
    name: string;
    imageSrc: string;
    position: Position;
    size: Size;
    zIndex?: number;
    hitboxScale?: number;
    hitboxOffset?: {
      x?: number; // Offset theo chiều ngang (âm = trái, dương = phải), tính theo % của width
      y?: number; // Offset theo chiều dọc (âm = lên, dương = xuống), tính theo % của height
    };
    description?: string;
  }
  interface RegionDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    region: Region | null;
  }

  export interface Question {
    id: number;
    title?: string;
    content?: string;
    text?: string;
    category?: string;
    answerOptionType?: "ONE" | "TWO";
    userAnswerLogs?: Array<{
      id: number;
      isCorrect: boolean;
      text: string;
    }>;
  }

  export interface QuestionModalProps {
    question: Question | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (text: string[], questionId: number) => void;
    isSubmitting?: boolean;
    isAnswered?: boolean;
  }

  interface ScrollPosition {
    top: string;
    left: string;
    rotate: string;
  }

  interface MapRegionDetailProps {
    backgroundImage?: string;
    scrollPositions: ScrollPosition[];
    landId: number;
    questions?: IQuestion[];
    answeredQuestionIds?: number[];
  }

  interface CommonModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
}
