'use client'

import Image from "next/image";
import logo from '../../../../public/logo_dvkn.svg'
import H1 from "@components/Atoms/H1";
import { Input } from "@components/Atoms/ui/input";
import { Button } from "@components/Atoms/ui/button";
import { MoveRight } from "lucide-react";
import { ROUTES } from "@routes";
import styles from './index.module.scss';
import GoogleIcon from "@components/Atoms/GoogleIcon";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormDataRequest, loginFormDataRequest } from "@models/user/request";
import authService from "@services/auth";

const LoginPageClient = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormDataRequest>({
        resolver: zodResolver(loginFormDataRequest),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit = async (data: LoginFormDataRequest) => {
        try {
            console.log("Form data:", data);
            // TODO: Implement login logic here
            const res = await authService.login(data);
            console.log("Login response:", res);
        } catch (error) {
            console.error("Login error:", error);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-xl flex flex-col px-16">
            <section className="py-6 flex justify-center">
                <Image src={logo} alt='logo' width={100} height={100} />
            </section>

            <H1 className="pb-6">Đăng nhập</H1>

            <section className="flex flex-col gap-2 mb-6">
                <label className="text-md text-holder">Email</label>
                <Input
                    {...register("email")}
                    placeholder="Nhập email"
                    type="email"
                />
                {errors.email && (
                    <span className="text-red-500 text-sm">{errors.email.message}</span>
                )}
            </section>

            <section className="flex flex-col gap-2 mb-3">
                <label className="text-md text-holder">Mật khẩu</label>
                <Input
                    {...register("password")}
                    placeholder="Nhập mật khẩu"
                    type="password"
                />
                {errors.password && (
                    <span className="text-red-500 text-sm">{errors.password.message}</span>
                )}
            </section>

            <section className="flex justify-end mb-3">
                <Link href={ROUTES.AUTH.FORGOT_PASSWORD} className="text-sm text-primary">Quên mật khẩu?</Link>
            </section>

            <section>
                <Button
                    type="submit"
                    size="full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Đang đăng nhập..." : "Đăng nhập"} <MoveRight />
                </Button>
            </section>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                    </div>
                    <div className="relative flex justify-center items-center text-sm mb-6">
                        <div className={styles.line}></div>
                        <span className={`px-2 font-bold text-center text-holder`}>HOẶC TIẾP TỤC VỚI</span>
                        <div className={styles.line}></div>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-3 w-full">
                    <button
                        type="button"
                        className="cursor-pointer w-full h-12 flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                    // onClick={handleGoogleLogin}
                    >
                        <GoogleIcon size="default" />
                        Google
                    </button>
                </div>
            </div>

            <p className="my-8 text-center text-sm text-holder">
                Bạn chưa có tài khoản?{" "}
                <Link href={ROUTES.AUTH.REGISTER} className='text-primary'>
                    Đăng ký ngay
                </Link>
            </p>
        </form>
    )
}

export default LoginPageClient