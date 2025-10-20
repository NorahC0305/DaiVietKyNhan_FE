import { ROUTES } from "@/routes";
import { AuthError } from "@constants/errors";
import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { loginWithCredentials } from "@services/auth/loginService";


export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
                accessToken: { label: "Access Token", type: "text" },
                refreshToken: { label: "Refresh Token", type: "text" },
                name: { label: "Name", type: "text" },
            },

            async authorize(credentials) {
                if (!credentials) return null;

                if (credentials.accessToken) {
                    const decoded: any = jwtDecode(credentials.accessToken);

                    return {
                        id: decoded.userId,
                        email: credentials.email,
                        role: decoded.roleId,
                        name: credentials.name,
                        accessToken: credentials.accessToken,
                        refreshToken: credentials.refreshToken,
                    };
                }

                try {
                    const res = await loginWithCredentials({
                        email: credentials.email,
                        password: credentials.password,
                    }) as { statusCode: number; data: any; message: string };

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

                    const decodedAccessToken: any = jwtDecode(res.data.accessToken);

                    const user = {
                        id: res.data.id,
                        email: res.data.email,
                        role: res.data.role.id,
                        name: res.data.name,
                        accessToken: res.data.accessToken,
                        refreshToken: res.data.refreshToken,
                        accessTokenExpires: decodedAccessToken.exp * 1000,
                    }

                    return user;
                } catch (error: any) {
                    console.error("Authorization error:", error);
                    throw new Error(error.message || "Đăng nhập thất bại");
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            // Khi user đăng nhập lần đầu
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.name = user.name;
                token.accessToken = user.accessToken;
                token.refreshToken = user.refreshToken;
                token.accessTokenExpires = user.accessTokenExpires;
                return token;
            }

            // Kiểm tra nếu token hết hạn
            if (Date.now() >= token.accessTokenExpires) {
                // Trả về null để force NextAuth xóa session
                return null;
            }

            return token;
        },
        async session({ session, token }: any) {
            // Kiểm tra nếu token là null (đã hết hạn)
            if (!token) {
                return null;
            }

            session.user.id = token.id;
            session.user.role = token.role;
            session.user.name = token.name;
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            (session as any).accessToken = token.accessToken;
            return session;
        },
    },
    pages: {
        signIn: ROUTES.AUTH.LOGIN,
        error: ROUTES.AUTH.LOGIN,
    },
    session: {
        strategy: "jwt" as SessionStrategy,
    },
    secret: process.env.NEXTAUTH_SECRET || "your-secret-key",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };