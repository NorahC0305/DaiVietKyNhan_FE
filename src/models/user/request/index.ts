import { z } from "zod";
import { UserSchema } from "../entity";

/**
 * Login form data request
 */
export const loginFormDataRequest = z.object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});
export type ILoginFormDataRequest = z.infer<typeof loginFormDataRequest>;
//-----------------End-Login-Request-----------------//


/**
 * Register form data request
 */
export const registerFormDataRequest = z.object({
    name: z.string().min(3, 'Họ và tên phải có ít nhất 3 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    phoneNumber: z.string()
        .min(10, { message: "Số điện thoại phải từ 10 đến 11 ký tự" })
        .max(11, { message: "Số điện thoại phải từ 10 đến 11 ký tự" })
        .regex(/^[0-9]+$/, { message: "Số điện thoại phải là số" }),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});
export type IRegisterFormDataRequest = z.infer<typeof registerFormDataRequest>;
//-----------------End-Register-Request-----------------//


/**
 * Verify OTP form data request
 */
export const verifyOtpFormDataRequest = z.object({
    email: z.string().email('Email không hợp lệ'),
    code: z.string().min(6, 'Mã OTP phải có 6 ký tự'),
});
export type IVerifyOtpFormDataRequest = z.infer<typeof verifyOtpFormDataRequest>;
//-----------------End-Verify-Otp-Request-----------------//


/**
 * Update me body schema
 */
export const UpdateMeBodySchema = UserSchema.pick({
    name: true,
    phoneNumber: true,
    gender: true,
    birthDate: true,
    avatar: true
})
    .partial()
    .strict()
export type IUpdateMeBodySchema = z.infer<typeof UpdateMeBodySchema>
//-----------------End-----------------//


/**
 * Reset password form data request
 */
export const resetPasswordFormDataRequest = z.object({
    email: z.string().email('Email không hợp lệ'),
    newPassword: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmNewPassword: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmNewPassword"],
});
export type IResetPasswordFormDataRequest = z.infer<typeof resetPasswordFormDataRequest>;
//-----------------End-Reset-Password-Request-----------------//

/**
 * Update user points request
 */
export const updateUserPointsRequest = z.object({
    userId: z.number().min(1, 'User ID không hợp lệ'),
    reason: z.string().min(1, 'Lý do không được để trống'),
    newPoint: z.number().min(0, 'Điểm không được âm'),
    newCoin: z.number().min(0, 'Coin không được âm'),
    newHeart: z.number().min(0, 'Heart không được âm'),
});
export type IUpdateUserPointsRequest = z.infer<typeof updateUserPointsRequest>;
//-----------------End-Update-User-Points-Request-----------------//