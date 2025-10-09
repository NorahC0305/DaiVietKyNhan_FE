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