declare namespace ZUSTAND {
    interface IUserState {
        email: string;
        setEmail: (email: string) => void;
    }

    interface IEntryTestState {
        answers: Record<number, number>;
        setAnswer: (questionId: number, answerId: number) => void;
        reset: () => void;
    }
}