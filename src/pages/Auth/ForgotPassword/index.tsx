'use client'

import type React from "react"
import Link from "next/link"
import { ROUTES } from "@routes"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import TransitionWrapper from "@components/Atoms/TransitionWrapper"
import { ArrowLeft, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import authService from "@services/auth"
import { useState } from "react"
import { Button } from "@components/Atoms/ui/button"
import { Input } from "@components/Atoms/ui/input"
import H1 from "@components/Atoms/H1"

const ForgotPasswordPageClient = () => {
    const router = useRouter();

    //#region Handle form submit
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<any>({
        // resolver: zodResolver(),
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true);

            // const res = await userService.getAUserByEmail(data.email) as IBackendResponse<any>;
            // if (!res.statusCode || ![200, 201].includes(res.statusCode)) {
            //     toast.error(res.message || "Email không tồn tại trong hệ thống");
            //     return;
            // }

            // const otpRes = await authService.sendOtp(data.email) as IBackendResponse<any>;
            // if (otpRes.statusCode !== 201) {
            //     toast.error(otpRes.message || "Gửi mã OTP thất bại");
            //     return;
            // }

            // localStorage.setItem('email', data.email);
            // toast.success("Chúng tôi đã gửi mã OTP đến email của bạn. Vui lòng kiểm tra email để tiếp tục đặt lại mật khẩu.", {
            //     duration: 5000,
            //     position: "top-right",
            // });

            // router.push(`${ROUTES.AUTH.VERIFY_OTP}?purpose=reset-password`);
        } catch (error) {
            // toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };
    //#endregion

    return (
        <>
            {/* Main card container */}
            {/* Forgot - form */}
            <div className="w-full p-8 md:p-12">
                {/* Center logo */}
                <div className="flex justify-center items-center mb-4">
                    <div className="rounded-full flex justify-center items-center w-16 h-16 bg-grey">
                        <Mail className="w-8 h-8 text-primary font-bold" />
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <H1 className="text-2xl font-bold mb-2">Quên mật khẩu</H1>
                    <p className="text-description text-center text-holder  mb-8 whitespace-pre-line">Nhập thông tin liên hệ của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className={"flex flex-col space-y-2"}>
                        <Input
                            id="email"
                            placeholder="Email của bạn"
                            {...register("email")}
                            className={errors.email ? 'input-error' : ''}
                        />
                        {/* {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>} */}
                    </div>

                    <Button type="submit" size="full" isLoading={isLoading} disabled={isLoading}>
                        Tiếp tục
                    </Button>
                </form>

                <p className="flex mt-5 justify-center items-center text-holder">
                    <ArrowLeft size={20} className="text-dark mr-2" />
                    <Link href={ROUTES.AUTH.LOGIN} className="font-sm text-dark hover:underline">
                        Quay lại trang đăng nhập
                    </Link>
                </p>
                {/* --- End --- */}
            </div>
        </>
    )
}

export default ForgotPasswordPageClient