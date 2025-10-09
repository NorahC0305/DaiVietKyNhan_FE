import 'next-auth/jwt';
declare module 'next-auth/jwt' {
    interface JWT {
        id: string;
        role: string;
        name: string;
        accessToken: string;
        refreshToken: string;
        gender: string;
        birthDate: string;
    }
}