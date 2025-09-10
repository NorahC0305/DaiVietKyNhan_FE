'use client'

import type React from "react"
import Link from "next/link"
import { ROUTES } from "@routes"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import TransitionWrapper from "@components/Atoms/TransitionWrapper"
import { ArrowLeft, KeyRoundIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import authService from "@services/auth"
import { signIn } from "next-auth/react"
import { Input } from "@components/Atoms/ui/input"
import { Button } from "@components/Atoms/ui/button"
import H1 from "@components/Atoms/H1"
import { useGetLocalStorage } from "@hooks/useLocalStorage"

const ResetPassswordPage = () => {
    /**
     * Get email and otp from local storage
     */
    const { value, isReady } = useGetLocalStorage('email')
    const { value: otp } = useGetLocalStorage('otp')
    //-----------------------------End-----------------------------//


    //#region Handle form submit
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<any>({
        // resolver: zodResolver(UserResetPasswordRequest),
    })

    const onSubmit = async (data: any) => {
        //#region api reset password
        // const res = await authService.resetPassword(data) as IBackendResponse<any>

        // if (res.statusCode !== 201) {
        //     toast.error(res.message || 'Đặt lại mật khẩu thất bại')
        //     return
        // }
        // localStorage.removeItem('email');
        // localStorage.removeItem('otp');
        // toast.success('Đặt lại mật khẩu thành công')
        // //#endregion

        // //#region login after reset password
        // const resLogin = await signIn('credentials', {
        //     email: data.email,
        //     password: data.password,
        //     redirect: false,
        // })
        // if (resLogin?.error) {
        //     toast.error(resLogin?.error || 'Đăng nhập thất bại')
        //     return
        // }
        // router.push(ROUTES.PUBLIC.HOME)
        //#endregion
    }
    //#endregion

    /**
       * Handle confirm password
       * @param value 
       * @returns 
       */
    const handleConfirmPassword = (value: string) => {
        if (value !== watch('password')) {
            return 'Password does not match';
        }
        return true;
    };
    //---------------------------Handle confirm password---------------------------//


    //#region check if email is exist in local storage
    // useEffect(() => {
    //     if (!isReady) return;
    //     if (!value) {
    //         router.push(ROUTES.AUTH.FORGOT_PASSWORD)
    //     } else {
    //         setValue('email', value)
    //         setValue('otp', otp || '')
    //     }
    // }, [isReady, value, otp, router])
    //#endregion

    return (
        <>
            {/* Forgot - form */}
            < div className="w-full p-8 md:p-12" >
                {/* Center logo */}
                <div className="flex justify-center items-center mb-4" >
                    <div className="rounded-full flex justify-center items-center w-16 h-16 bg-gray-300">
                        <KeyRoundIcon className="w-8 h-8 text-primary font-bold" />
                    </div>
                </div >

                <div className="flex flex-col items-center">
                    <H1 className="text-2xl font-bold mb-2">Đặt lại mật khẩu</H1>
                    <p className="text-holder text-center mb-8 whitespace-pre-line">Nhập và ghi nhớ mật khẩu mới</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email */}
                    <Input type="hidden" {...register('email')} />

                    {/* New Password */}
                    <div className="flex flex-col space-y-2  mb-2">
                        <label htmlFor="password" className=" text-holder text-sm font-medium">
                            Mật khẩu mới
                        </label>

                        <div className="flex flex-col space-y-2 mb-2">
                            <Input
                                id="password"
                                type="password"
                                togglePassword={true}
                                placeholder="Nhập mật khẩu mới"
                                {...register("password")}
                                className={errors.password ? 'input-error' : ''}
                            />
                            {/* {errors.password && <span className="text-red-500 text-sm">{errors.password?.message}</span>} */}
                        </div>
                    </div>

                    {/* Confirm Password */}
                    <div className="flex flex-col space-y-2 mb-4">
                        <label htmlFor="confirmPassword" className="text-holder text-sm font-medium">
                            Xác nhận mật khẩu
                        </label>

                        <div className="flex flex-col space-y-2 mb-2">
                            <Input
                                id="confirmPassword"
                                type="password"
                                togglePassword={true}
                                placeholder="Xác nhận mật khẩu mới"
                                {...register("confirmPassword", {
                                    required: true,
                                    validate: handleConfirmPassword,
                                })}
                                className={errors.confirmPassword ? 'input-error' : ''}
                            />
                            {/* {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword?.message}</span>} */}
                        </div>
                    </div>

                    <Button type="submit" size="full">
                        Xác nhận
                    </Button>
                </form>

                <p className="flex mt-5 justify-center items-center text-holder">
                    <ArrowLeft size={20} className="text-dark mr-2" />
                    <Link href={ROUTES.AUTH.FORGOT_PASSWORD} className="font-sm text-dark hover:underline" onClick={() => localStorage.removeItem('email')}>
                        Quay lại
                    </Link>
                </p>
            </div >
            {/* --- End --- */}
        </>
    )
}

export default ResetPassswordPage