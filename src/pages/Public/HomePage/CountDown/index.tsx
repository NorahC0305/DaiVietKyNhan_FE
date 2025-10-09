import Image from 'next/image'
import React from 'react'
import ScrollPaper from "../../../../../public/ScrollPaper.svg"
import frame from "../../../../../public/frame.svg"
import ButtonImage from "../../../../../public/Button.svg"
import { years } from '@utils/Date'

const CountDown = () => {

    return (
        <div className='w-full flex items-center justify-center'>
            <div className='relative w-full max-w-5xl mx-auto'>
                <Image src={ScrollPaper} alt="Scroll Paper" className="w-full h-auto max-w-[900px]" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[80%] flex items-center justify-center flex-col">
                    <h1 className='text-center text-xl sm:text-5xl lg:text-6xl font-bd-street-sign text-secondary mb-2'>
                        ĐẠI VIỆT KỲ NHÂN
                    </h1>

                    <h1 className='text-center text-xl sm:text-5xl lg:text-6xl font-bd-street-sign text-third mb-2'>
                        Trang web chính thức ra mắt
                    </h1>

                    <div className='relative w-full flex justify-center'>
                        <Image src={frame} alt="Frame" className="w-full h-auto max-w-[550px]" />

                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] md:w-[45%] flex items-center justify-start flex-col space-y-2 sm:space-y-4'>
                            {/* --- Hàng Giới tính --- */}
                            <div className='w-full flex items-center justify-start gap-2'>
                                <p className='text-center text-4xl font-bd-street-sign text-third'>
                                    GIỚI TÍNH
                                </p>
                                <div className='flex items-center justify-center gap-x-4 ml-7 text-sm md:text-xl md:justify-self-start'>
                                    <label className='flex items-center cursor-pointer'>
                                        <input type="radio" name="gender" checked id="male" className='appearance-none peer' />
                                        <span className='w-4 h-4 border-2 border-gray-700 rounded-full p-0.5 transition peer-checked:border-primary peer-checked:bg-primary bg-clip-content'></span>
                                        <span className='ml-2 font-dfvn-graphit text-third'>Nam</span>
                                    </label>
                                    <label className='flex items-center cursor-pointer'>
                                        <input type="radio" name="gender" id="female" className='appearance-none peer' />
                                        <span className='w-4 h-4 border-2 border-gray-700 rounded-full p-0.5 transition peer-checked:border-primary peer-checked:bg-primary bg-clip-content'></span>
                                        <span className='ml-2 font-dfvn-graphit text-third'>Nữ</span>
                                    </label>
                                </div>
                            </div>

                            {/* --- Hàng Năm sinh --- */}
                            <div className='w-full flex items-center justify-start gap-2'>
                                <p className='text-center text-4xl font-bd-street-sign text-third'>
                                    NĂM SINH
                                </p>
                                <div className='relative flex items-center justify-center hover:opacity-95 ml-3 md:justify-self-start'>
                                    <Image src={ButtonImage} alt='Button' className='cursor-pointer w-[100px] h-auto sm:w-[130px]' />
                                    <select className='absolute left-1/2 -translate-x-1/2 w-[80%] h-full text-center text-sm font-dfvn-graphit bg-transparent border-none outline-none cursor-pointer'>
                                        {years.map((year) => (
                                            <option key={year} value={year} >{year}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className='relative  flex justify-center cursor-pointer mt-4'>
                        <Image src={ButtonImage} alt="button" className="w-full h-auto max-w-[130px] md:max-w-[150px]" />
                        <div className='absolute w-full h-full flex items-center justify-start flex-col space-y-2 sm:space-y-4'>
                            <p className='flex items-center justify-center text-center font-dfvn-graphit h-full text-md'>
                                Xác Nhận
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountDown;