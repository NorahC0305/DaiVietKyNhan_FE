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
        };
        accessToken: string;
        refreshToken: string;
    }
}