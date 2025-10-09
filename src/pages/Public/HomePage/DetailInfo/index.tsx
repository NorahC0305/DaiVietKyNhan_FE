import Image from 'next/image'
import React from 'react'
import ScrollPaper from "../../../../../public/ScrollPaper.svg"
import frame from "../../../../../public/frame.svg"
import ButtonImage from "../../../../../public/Button.svg"

const DetailInfo = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='relative w-full max-w-5xl mx-auto'>
                <Image src={ScrollPaper} alt="Scroll Paper" width={1000} height={1000} className="w-full h-auto" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] md:w-[80%] flex items-center justify-center flex-col">

                    <h1 className='text-center text-2xl sm:text-4xl lg:text-6xl font-bd-street-sign text-secondary mb-2 md:mb-4'>
                        THÔNG TIN CHI TIẾT
                    </h1>

                    <div className='relative w-full flex justify-center'>
                        <Image src={frame} alt="Frame" width={600} height={800} className="w-full h-auto max-w-[600px]" />

                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] md:w-[45%] flex items-center justify-start flex-col space-y-2 sm:space-y-4 md:space-y-6'>
                            <div className='w-full flex items-center justify-start gap-2'>
                                <p className='text-center text-xl md:text-3xl lg:text-4xl font-bd-street-sign text-third'>
                                    GIỚI TÍNH
                                </p>
                                <div className='flex items-center justify-center gap-x-6 text-base md:text-xl ml-7'>
                                    <div className='flex items-center'>
                                        <label className='flex items-center cursor-pointer'>
                                            <input type="radio" name="gender" id="male" className='appearance-none peer' />
                                            <span className='w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center transition peer-checked:border-primary'>
                                                <span className='w-2.5 h-2.5 bg-primary rounded-full scale-0 transition-transform peer-checked:scale-100'></span>
                                            </span>
                                            <span className='ml-2'>Nam</span>
                                        </label>
                                    </div>
                                    <div className='flex items-center'>
                                        <label className='flex items-center cursor-pointer'>
                                            <input type="radio" name="gender" id="female" className='appearance-none peer' />
                                            <span className='w-5 h-5 border-2 border-gray-400 rounded-full flex items-center justify-center transition peer-checked:border-primary'>
                                                <span className='w-2.5 h-2.5 bg-primary rounded-full scale-0 transition-transform peer-checked:scale-100'></span>
                                            </span>
                                            <span className='ml-2'>Nữ</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className='w-full flex items-center justify-start gap-2'>
                                <p className='text-center text-xl md:text-3xl lg:text-4xl font-bd-street-sign text-third'>
                                    NĂM SINH
                                </p>
                                <div className='flex items-center justify-center hover:opacity-95 ml-3'>
                                    <div className='relative flex items-center justify-center gap-x-2'>
                                        <Image src={ButtonImage} alt='Button' width={110} height={110} className='cursor-pointer w-[80px] h-auto sm:w-[90px] lg:w-[110px]' />
                                        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer'>
                                            <select className='text-center text-base md:text-xl lg:text-2xl font-bd-street-sign text-third bg-transparent border-none outline-none cursor-pointer'>
                                                <option value="1990">1990</option>
                                                <option value="1991">1991</option>
                                                <option value="1992">1992</option>
                                                <option value="1993">1993</option>
                                                <option value="1994">1994</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailInfo;