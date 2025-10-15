'use client'

import type React from "react"
import Link from "next/link"
import { ROUTES } from "@routes"
import { useForm } from "react-hook-form"
import { ArrowLeft, KeyRoundIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import authService from "@services/auth"
import { Input } from "@components/Atoms/ui/input"
import { Button } from "@components/Atoms/ui/button"
import H1 from "@components/Atoms/H1"
import { useGetLocalStorage } from "@hooks/useLocalStorage"
import { toast } from "react-toastify"
import { IBackendResponse } from "@models/backend"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useCallback } from "react"
import { IResetPasswordFormDataRequest, resetPasswordFormDataRequest } from "@models/user/request"

const ResetPassswordPage = () => {
    const router = useRouter()

    /**
     * Get email and otp from local storage
     */
    const { value, isReady } = useGetLocalStorage('email')
    // const { value: otp } = useGetLocalStorage('otp')
    //-----------------------------End-----------------------------//


    //#region Handle form submit
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<IResetPasswordFormDataRequest>({
        resolver: zodResolver(resetPasswordFormDataRequest),
        defaultValues: {
            email: value || '',
            newPassword: '',
            confirmNewPassword: '',
        },
    })

    const onSubmit = async (data: IResetPasswordFormDataRequest) => {
        //#region api reset password
        const res = await authService.resetPassword(data) as IBackendResponse<any>

        if (res.statusCode === 201) {
            localStorage.removeItem('email');
            localStorage.removeItem('token');
            toast.success('Đặt lại mật khẩu thành công')
            router.push(ROUTES.AUTH.LOGIN)

        } else {
            toast.error(res.message || 'Đặt lại mật khẩu thất bại')
            return
        }
        //#endregion
    }
    //#endregion

    /**
       * Handle confirm password
       * @param value 
       * @returns 
       */
    const handleConfirmPassword = useCallback((value: string) => {
        if (value !== watch('newPassword')) {
            return 'Password does not match';
        }
        return true;
    }, [watch]);
    //---------------------------Handle confirm password---------------------------//


    //#region check if email is exist in local storage
    useEffect(() => {
        if (!isReady) return;
        if (!value) {
            router.push(ROUTES.AUTH.FORGOT_PASSWORD)
        } else {
            setValue('email', value)
            // setValue('otp', otp || '')
        }
    }, [isReady, value, router, setValue])
    //#endregion

    return (
        <>
            {/* Forgot - form */}
            <div className="w-full p-8 md:p-12">
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
                                {...register("newPassword")}
                                className={errors.newPassword ? 'input-error' : ''}
                            />
                            {errors.newPassword && <span className="text-red-500 text-sm">{errors.newPassword.message}</span>}
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
                                {...register("confirmNewPassword", {
                                    required: true,
                                    validate: handleConfirmPassword,
                                })}
                                className={errors.confirmNewPassword ? 'input-error' : ''}
                            />
                            {errors.confirmNewPassword && <span className="text-red-500 text-sm">{errors.confirmNewPassword.message}</span>}
                        </div>
                    </div>

                    <Button type="submit" size="full">
                        Xác nhận
                    </Button>
                </form>

                <p className="flex mt-5 justify-center items-center text-holder">
                    <Link href={ROUTES.AUTH.FORGOT_PASSWORD} className="flex flex-row items-center hover:underline" onClick={() => localStorage.removeItem('email')}>
                        <ArrowLeft size={20} className="text-dark mr-2" />
                        <p className="font-sm text-dark">
                            Quay lại
                        </p>
                    </Link>
                </p>
            </div>
            {/* --- End --- */}
        </>
    )
}

export default ResetPassswordPage