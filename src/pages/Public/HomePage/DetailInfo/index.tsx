import Image from 'next/image'
import React from 'react'
import ScrollPaper from "../../../../../public/ScrollPaper.svg"
import frame from "../../../../../public/frame.svg"

const DetailInfo = () => {
    return (
        <div className='w-full flex items-center justify-center'>
            <div className='relative'>
                <Image src={ScrollPaper} alt="Scroll Paper" width={1000} height={1000} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex items-center justify-center flex-col">
                    <h1 className='text-6xl font-bd-street-sign text-secondary'>THÔNG TIN CHI TIẾT</h1>
                    <div className='relative'>
                        <Image src={frame} alt="Frame" width={600} height={800} />
                        <div className='absolute top-11 right-1/7 w-full flex items-center justify-center flex-col'>
                            <div className='flex items-center justify-center gap-4 mb-4'>
                                <p className='text-4xl font-bd-street-sign text-third'>GIỚI TÍNH</p>
                                <div className='flex items-center justify-center gap-2'>
                                    <input type="radio" name="gender" id="male" className='w-4 h-4' />
                                    <label htmlFor="male">Nam</label>
                                </div>
                                <div className='flex items-center justify-center gap-2'>
                                    <input type="radio" name="gender" id="female" className='w-4 h-4' />
                                    <label htmlFor="female">Nữ</label>
                                </div>
                            </div>

                            <div className='flex items-center justify-center gap-4 mb-4'>
                                <p className='text-4xl font-bd-street-sign text-third'>NĂM SINh</p>
                                <div className='flex items-center justify-center gap-2'>
                                    <input type="radio" name="gender" id="male" className='w-4 h-4' />
                                    <label htmlFor="male">Nam</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailInfo