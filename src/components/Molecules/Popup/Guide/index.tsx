import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import { LAND_CONFIG } from '@constants/common'

type LandKey = 'Sơn Tinh' | 'Thánh Gióng' | 'Chử Đồng Tử' | 'Liễu Hạnh'

const Guide = ({ isOpen, onClose, land }: { isOpen: boolean, onClose: () => void, land: LandKey }) => {
    const kyChu = LAND_CONFIG[land];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className='relative mx-3 w-full lg:max-w-5xl max-w-3xl'
                    >
                        <div className='relative lg:top-[60px] lg:-left-[330px] top-[130px] -left-[120px] z-10'>
                            <div className='absolute lg:w-[400px] lg:h-[630px] w-[200px] h-[280px]'>
                                <Image src={kyChu?.img} alt={land} fill />
                            </div>
                        </div>

                        <>
                            <div className='relative bg-primary-light border-4 border-secondary rounded-2xl my-4 sm:my-6 md:my-10 px-4 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8'>
                                <button
                                    className="absolute top-2 right-2 sm:top-3 sm:right-3 md:top-4 md:right-4 cursor-pointer p-1 sm:p-2"
                                    onClick={onClose}
                                    aria-label="Đóng"
                                >
                                    <span className="block relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12">
                                        <Image
                                            src="https://res.cloudinary.com/dznt9yias/image/upload/v1760721841/X_lqpgdp.svg"
                                            alt="Đóng"
                                            fill
                                            sizes="(max-width: 640px) 32px, (max-width: 768px) 40px, 48px"
                                            style={{ objectFit: "contain" }}
                                        />
                                    </span>
                                </button>

                                <div className="max-h-[80vh] overflow-y-auto ancient-scrollbar">
                                    {/* --- Title --- */}
                                    <h1 className="lg:text-6xl text-4xl pt-3 text-center font-bd-street-sign" style={{ color: kyChu?.color }}>CHÀO MỪNG ĐẾN VỚI HÀNH TRÌNH “KHAI NHÂN MỞ ẤN”</h1>
                                    <div className="flex items-center justify-center">
                                        <div className='relative w-[300px] lg:w-[400px] h-[80px] lg:h-[117px] flex items-center justify-center my-5'>
                                            <Image src="https://res.cloudinary.com/dznt9yias/image/upload/v1760726766/frame_hfc9ot.svg" alt="frame" fill />
                                            <div className='absolute inset-0 flex items-center justify-center '>
                                                <div className='flex items-center justify-center w-[80%]'>
                                                    <span className='text-center lg:text-xl text-sm font-extrabold text-[#CE7346]'>Trang sử còn đợi ai đưa,
                                                        Khai Nhân Mở Ấn, chuyện xưa hóa gần.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* --- Content --- */}
                                    <div className='flex items-center justify-around pb-2'>
                                        <div className='relative w-[200px] lg:w-[400px] h-[240px] lg:h-[370px]'>
                                            <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760865503/POST_TBT_1_js9xab.png' alt='POST_TBT_1' fill />
                                        </div>

                                        <div className='w-1/2'>
                                            <span className='lg:text-xl text-sm font-extrabold text-secondary text-justify leading-relaxed'>
                                                Từ thuở xa xưa, tồn tại một vùng đất linh thiêng mang tên Kỳ Giới, nơi những Kỳ Nhân giữ gìn hồn cốt và linh khí của dân tộc.
                                            </span>
                                            <br />
                                            <br />
                                            <span className='lg:text-xl text-sm font-extrabold text-secondary text-justify leading-relaxed'>
                                                Kỳ Giới có bốn miền linh địa, mỗi vùng lại được bảo hộ bởi một vị thần trong Tứ Bất Tử.
                                            </span>
                                            <br />
                                            <br />
                                            <span className='lg:text-xl text-sm font-extrabold text-secondary text-justify leading-relaxed'>
                                                đã xâm nhập vào Kỳ Giới, khiến linh khí suy yếu và các Kỳ Nhân bị phong ấn trong những cuộn giấy cổ, gọi là Kỳ Ấn.
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    </motion.div>

                </div>
            )}
        </AnimatePresence>
    )
}

export default Guide