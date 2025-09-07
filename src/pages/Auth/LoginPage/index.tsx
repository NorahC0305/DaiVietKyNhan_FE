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

const LoginPageClient = () => {
    return (
        <div className="w-xl flex flex-col px-16">
            <section className="py-6 flex justify-center">
                <Image src={logo} alt='logo' width={100} height={100} />
            </section>


            <H1 className="pb-6">Đăng nhập</H1>
            <section className="flex flex-col gap-2 mb-6">
                <label className="text-md text-holder">Email</label>
                <Input placeholder="Nhập email" />
            </section>

            <section className="flex flex-col gap-2 mb-3">
                <label className="text-md text-holder">Mật khẩu</label>
                <Input placeholder="Nhập mật khẩu" />
            </section>

            <section className="flex justify-end mb-3">
                <p className="text-sm text-primary">Quên mật khẩu?</p>
            </section>

            <section>
                <Button size="full">Đăng nhập <MoveRight /></Button>
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
        </div >
    )
}

export default LoginPageClient