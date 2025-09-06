declare namespace ICOMPONENTS {

    type TransitionMode = "wait" | "popLayout" | "beforeChildren" | "afterChildren";
    interface TransitionWrapperProps {
        children: React.ReactNode;
        className?: string;
        initial?: { opacity: number; y: number };
        animate?: { opacity: number; y: number };
        exit?: { opacity: number; y: number };
        transition?: { duration: number; ease: EasingFunction[] };
        mode?: TransitionMode;
    }
}