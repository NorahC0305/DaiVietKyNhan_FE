// app/api/auth/login/route.ts

import envConfig from '@configs/env';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { loginFormDataRequest } from '@models/user/request';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // 2. Xác thực dữ liệu bằng Zod
        const validation = loginFormDataRequest.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { message: "Dữ liệu không hợp lệ", errors: validation.error.flatten().fieldErrors },
                { status: 400 } // Bad Request
            );
        }

        const { email, password } = validation.data;

        // 3. Gọi đến backend thật
        const apiResponse = await fetch(`${envConfig?.BACKEND_API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await apiResponse.json();

        if (!apiResponse.ok) {
            // Trả lỗi từ backend về client
            return NextResponse.json(data, { status: apiResponse.status });
        }

        // 4. Xử lý token một cách an toàn (Quan trọng nhất)
        const { accessToken, refreshToken, ...userData } = data; // Tách token ra khỏi dữ liệu người dùng

        if (!accessToken) {
            return NextResponse.json({ message: 'Login failed, token not provided.' }, { status: 401 });
        }

        // Đặt accessToken vào cookie HttpOnly
        (await cookies()).set({
            name: 'accessToken',
            value: accessToken,
            httpOnly: true, // Chỉ server có thể truy cập, chống XSS
            secure: process.env.NODE_ENV === 'production', // Chỉ gửi qua HTTPS ở môi trường production
            path: '/',
            sameSite: 'strict', // Chống CSRF
            // maxAge: 60 * 60 * 24, // Tùy chọn: thời gian sống của cookie (ví dụ 1 ngày)
        });

        // (Tùy chọn) Xử lý refreshToken tương tự nếu có
        if (refreshToken) {
            (await cookies()).set('refreshToken', refreshToken, { httpOnly: true, path: '/' });
        }

        // 5. Chỉ trả về dữ liệu người dùng an toàn, không chứa token
        return NextResponse.json(userData);

    } catch (error) {
        console.error('[LOGIN_API_ROUTE]', error);
        // Xử lý lỗi nếu request body không phải là JSON hợp lệ
        if (error instanceof SyntaxError) {
            return NextResponse.json({ message: 'Invalid JSON format.' }, { status: 400 });
        }
        return NextResponse.json({ message: 'An unexpected error occurred.' }, { status: 500 });
    }
}