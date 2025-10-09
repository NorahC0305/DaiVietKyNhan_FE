import { ROUTES } from "@/routes";
import { AuthError } from "@constants/errors";
import authService from "@services/auth";
import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                accessToken: { label: "Access Token", type: "text" },
                refreshToken: { label: "Refresh Token", type: "text" },
            },

            async authorize(credentials) {
                if (!credentials) return null;

                if (credentials.accessToken) {
                    const decoded: any = jwtDecode(credentials.accessToken);

                    return {
                        id: decoded.sub,
                        role: decoded.role,
                        email: credentials.email,
                        accessToken: credentials.accessToken,
                        refreshToken: credentials.refreshToken,
                    };
                }

                const res = await authService.login({
                    email: credentials.email,
                    password: credentials.password,
                }) as { statusCode: number; data: any; message: string };


                console.log('res', res);
                switch (res.statusCode) {
                    case 404:
                        throw new Error(res.message || AuthError.USER_NOT_FOUND);
                    case 422:
                        throw new Error(res.message || AuthError.WRONG_CREDENTIALS);
                    case 401:
                        throw new Error(res.message || AuthError.INACTIVE);
                    case 200:
                    case 201:
                        break;

                    default:
                        throw new Error(res.message || "Đăng nhập thất bại");
                }
                const user = {
                    id: res.data.id,
                    email: res.data.email,
                    role: res.data.role.id,
                    name: res.data.name,
                    gender: res.data.gender,
                    birthDate: res.data.birthDate,
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken,
                }

                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.name = user.name;
                token.gender = user.gender;
                token.birthDate = user.birthDate;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user.id = token.id;
            session.user.role = token.role;
            session.user.name = token.name;
            session.user.gender = token.gender;
            session.user.birthDate = token.birthDate;
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            (session as any).accessToken = token.accessToken;
            return session;
        },
    },
    pages: {
        signIn: ROUTES.AUTH.LOGIN,
    },
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };