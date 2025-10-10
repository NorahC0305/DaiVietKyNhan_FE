'use client'

import H1 from '@components/Atoms/H1';
import Link from 'next/link';
import { Input } from '@components/Atoms/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerFormDataRequest, IRegisterFormDataRequest } from '@models/user/request';
import authService from '@services/auth';
import Image from 'next/image';
import React, { useState } from 'react'
import { Button } from '@components/Atoms/ui/button';
import { MoveRight } from 'lucide-react';
import GoogleIcon from '@components/Atoms/GoogleIcon';
import { ROUTES } from '@routes';
import logo from '../../../../public/logo_dvkn.svg'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { IBackendResponse } from '@models/backend';
import { useUserSetEmail } from '@stores/user/selectors';

const RegisterPageClient = () => {
    /**
     * Define variables hooks
     */
    const router = useRouter();
    //-----------------------------End-----------------------------//


    /**
     * Define variables zustand
     */
    const setEmail = useUserSetEmail();
    //-----------------------------End-----------------------------//


    /**
     * Handle form submit
     * @returns 
     */
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<IRegisterFormDataRequest>({
        resolver: zodResolver(registerFormDataRequest),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const [loading, setLoading] = useState<boolean>(false);
    const onSubmit = async (data: IRegisterFormDataRequest) => {
        try {
            setLoading(true);

            const res = await authService.register(data) as IBackendResponse<any>;
            if (res.statusCode === 201) {
                toast.success(res.message || "Đăng ký thành công");
                router.push(ROUTES.AUTH.LOGIN);
                setEmail(data.email);
                console.log('res', res);
            }

        } catch (error: any) {
            toast.error(error.message || "Đăng ký thất bại");
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };
    //-----------------------------End-----------------------------//


    /**
     * Handle google login
     */
    const handleGoogleLogin = async () => {
        try {
            const res = await authService.googleLogin() as IBackendResponse<any>;
            if (res.statusCode === 200) {
                window.location.href = res.data.url;
            }
        } catch (error) {
            toast.error("Đã xảy ra lỗi, vui lòng thử lại");
            console.error(error);
        }
    }
    //-----------------------------End-----------------------------//


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-xl flex flex-col  px-8 md:px-16">
            <section className="py-6 flex justify-center">
            </section>

            <div className="flex justify-between items-center">
                <H1>Tạo tài khoản</H1>
                <Image src={logo} alt='logo' width={60} height={60} />
            </div>

            <section className="flex flex-col gap-2 mb-6">
                <label className="text-md text-holder">Họ và tên</label>
                <Input
                    {...register("name")}
                    placeholder="Nhập họ và tên"
                    type="text"
                    className={errors.name ? "input-error" : ""}
                />
                {errors.name && (
                    <span className="text-error text-sm">{errors.name.message}</span>
                )}
            </section>

            <section className="flex flex-col gap-2 mb-6">
                <label className="text-md text-holder">Email</label>
                <Input
                    {...register("email")}
                    placeholder="Nhập email"
                    type="email"
                    className={errors.email ? "input-error" : ""}
                />
                {errors.email && (
                    <span className="text-error text-sm">{errors.email.message}</span>
                )}
            </section>

            <section className="flex flex-col gap-2 mb-6">
                <label className="text-md text-holder">Số điện thoại</label>
                <Input
                    {...register("phoneNumber")}
                    placeholder="Nhập số điện thoại"
                    type="text"
                    className={errors.phoneNumber ? "input-error" : ""}
                />
                {errors.phoneNumber && (
                    <span className="text-error text-sm">{errors.phoneNumber.message}</span>
                )}
            </section>

            <section className="flex flex-col gap-2 mb-6">
                <label className="text-md text-holder">Mật khẩu</label>
                <Input
                    {...register("password")}
                    placeholder="Nhập mật khẩu"
                    type="password"
                    togglePassword={true}
                    className={errors.password ? "input-error" : ""}
                />
                {errors.password && (
                    <span className="text-error text-sm">{errors.password.message}</span>
                )}
            </section>

            <section>
                <Button
                    type="submit"
                    size="full"
                    disabled={isSubmitting || loading}
                    isLoading={isSubmitting || loading}
                >
                    {isSubmitting || loading ? "Đang đăng ký..." : "Đăng ký"} <MoveRight />
                </Button>
            </section>

            <div className="mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                    </div>
                    <div className="relative flex justify-center items-center text-sm mb-6">
                        <div className="line"></div>
                        <span className={`px-2 font-bold text-center text-holder`}>HOẶC TIẾP TỤC VỚI</span>
                        <div className="line"></div>
                    </div>
                </div>

                <div className="flex justify-center items-center gap-3 w-full">
                    <button
                        type="button"
                        className="cursor-pointer w-full h-12 flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                        onClick={handleGoogleLogin}
                    >
                        <GoogleIcon size="default" />
                        Google
                    </button>
                </div>
            </div>

            <p className="my-8 text-center text-sm text-holder">
                Bạn đã có tài khoản?{" "}
                <Link href={ROUTES.AUTH.LOGIN} className='text-primary'>
                    Đăng nhập ngay
                </Link>
            </p>
        </form>
    )
}

export default RegisterPageClient