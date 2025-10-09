declare namespace UTILS {
    export interface INavLink {
        className?: string;
        href: string;
        children: React.ReactNode;
    }

    export interface ISession {
        user: {
            id: string;
            name: string;
            email: string;
            role: number;
            gender: string;
            birthDate: string;
        };
        accessToken: string;
        refreshToken: string;
    }
}