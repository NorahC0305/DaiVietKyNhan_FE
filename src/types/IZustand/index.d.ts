declare namespace ZUSTAND {
    interface IUserState {
        email: string;
        setEmail: (email: string) => void;
    }
}