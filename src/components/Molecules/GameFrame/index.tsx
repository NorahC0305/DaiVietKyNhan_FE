'use client';

import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { cn } from '@/utils/CN';
import Avartar from '@components/Atoms/Avartar';
import frame from "../../../../public/frame.svg";
import heart from "../../../../public/Heart.svg";
import heart2 from "../../../../public/Heart (1).svg";
import frameCoin from "../../../../public/FrameCoin.svg";
import { Plus } from 'lucide-react';
import AchievementsModal from '../Popup/AchievementsModal';
import AirEvent from '../Popup/AirEvent';
import RedeemModal from '../Popup/RedeemModal';
import BuyMoreLife from '../Popup/BuyMoreLife';
import CorrectGiftCode from '../Popup/CorrectGiftCode';
import InputGiftCode from '../Popup/InputGiftCode';
import IncorrectGiftCode from '../Popup/IncorrectGiftCode';
import Guide from '../Popup/Guide';
interface GameFrameProps {
    children: React.ReactNode;
    className?: string;
    padding?: string;
}

export const GameFrame: React.FC<GameFrameProps> = ({
    children,
    className,
    padding = 'p-12 md:p-16',
}) => {

    /**
     * Achievement Modal
     */
    const [isAchievementModalOpen, setIsAchievementModalOpen] = useState<boolean>(false);
    const onAchievementClick = useCallback(() => {
        setIsAchievementModalOpen(!isAchievementModalOpen);
    }, [isAchievementModalOpen]);
    //--------------------------End--------------------------//


    /**
     * Air Event Modal
     */
    const [isAirEventModalOpen, setIsAirEventModalOpen] = useState<boolean>(false);
    const onAirEventClick = useCallback(() => {
        setIsAirEventModalOpen(!isAirEventModalOpen);
    }, [isAirEventModalOpen]);
    //--------------------------End--------------------------//


    /**
     * Redeem Modal
     */
    const [isRedeemModalOpen, setIsRedeemModalOpen] = useState<boolean>(false);
    const onRedeemClick = useCallback(() => {
        setIsRedeemModalOpen(!isRedeemModalOpen);
    }, [isRedeemModalOpen]);
    //--------------------------End--------------------------//


    /**
     * Buy More Life Modal
     */
    const [isBuyMoreLifeModalOpen, setIsBuyMoreLifeModalOpen] = useState<boolean>(false);
    //TODO: Logic buy more life
    const onBuyMoreLifeClick = useCallback(() => {
        setIsBuyMoreLifeModalOpen(!isBuyMoreLifeModalOpen);
    }, [isBuyMoreLifeModalOpen]);
    //--------------------------End--------------------------//


    /**
     * Input Gift Code Modal
     * TODO: Logic input gift code
     */
    const [isInputGiftCodeModalOpen, setIsInputGiftCodeModalOpen] = useState<boolean>(false);
    const onInputGiftCodeClick = useCallback(() => {
        setIsInputGiftCodeModalOpen(!isInputGiftCodeModalOpen);
    }, [isInputGiftCodeModalOpen]);


    const [isIncorrectGiftCodeModalOpen, setIsIncorrectGiftCodeModalOpen] = useState<boolean>(false);
    const onIncorrectGiftCodeClick = useCallback(() => {
        setIsIncorrectGiftCodeModalOpen(!isIncorrectGiftCodeModalOpen);
    }, [isIncorrectGiftCodeModalOpen]);
    //--------------------------End--------------------------//


    const [isCorrectGiftCodeModalOpen, setIsCorrectGiftCodeModalOpen] = useState<boolean>(false);
    const onCorrectGiftCodeClick = useCallback(() => {
        setIsCorrectGiftCodeModalOpen(!isCorrectGiftCodeModalOpen);
    }, [isCorrectGiftCodeModalOpen]);
    //--------------------------End--------------------------//

    /**
     * Guide Modal
     */
    const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);
    const land = 'Sơn Tinh' as 'Sơn Tinh' | 'Thánh Gióng' | 'Chử Đồng Tử' | 'Liễu Hạnh'
    const onGuideClick = useCallback(() => {
        setIsGuideModalOpen(!isGuideModalOpen);
    }, [isGuideModalOpen]);
    //--------------------------End--------------------------//

    return (
        <div className={cn('relative w-full h-screen min-h-screen z-50', className)}>
            {/* Avatar */}
            <div className='absolute ml-4 lg:top-6 top-3 left-0 flex items-center justify-center'>
                <Avartar>
                    <div className='relative lg:w-[18px] lg:h-[18px] w-[14px] h-[14px]'>
                        <Image src='/game-frame/corner-tl.svg' alt='Top Left Corner' fill />
                    </div>
                </Avartar>
                <div className='flex items-center justify-center'>
                    <div className='relative top-0 left-0 flex items-center justify-center lg:ml-5 ml-3 drop-shadow-2xl '>
                        <div className='relative lg:w-[180px] lg:h-[55px] w-[100px] h-[40px]'>
                            <Image src={frame} alt='frame' fill />
                        </div>
                        <div className='absolute top-0 left-0 flex justify-center items-center h-full w-full gap-2'>
                            <div className='relative lg:w-[30px] lg:h-[30px] w-[18px] h-[18px]'>
                                <Image src={heart} alt='heart' fill />
                            </div>
                            <div className='relative lg:w-[30px] lg:h-[30px] w-[18px] h-[18px]'>
                                <Image src={heart2} alt='heart' fill />
                            </div>
                            <div className='relative lg:w-[30px] lg:h-[30px] w-[18px] h-[18px]'>
                                <Image src={heart2} alt='heart' fill />
                            </div>
                        </div>
                    </div>
                    <Plus color='red' className='ml-1 cursor-pointer drop-shadow-2xl hover:opacity-60 transition-all duration-300' strokeWidth={3} size={25} onClick={onBuyMoreLifeClick} />
                </div>
            </div>

            {/* Point/Coin */}
            <div className='absolute mr-4 top-1.5 -right-2 lg:right-0 flex items-center justify-center'>
                <div className='relative top-1 lg:top-2 left-0 flex items-center justify-center'>
                    <div className='relative w-[100px] h-[45px] lg:w-[180px] lg:h-[85px]'>
                        <Image src={frameCoin} alt='coin' className='mt-3' fill />
                        <div className='absolute top-2 lg:top-1.5 -left-1 lg:left-0 flex justify-center items-center h-full w-full gap-2'>
                            <span className='text-xs lg:text-xl font-bold ml-8 text-amber-500'>10000</span>
                        </div>
                    </div>

                    <Plus color='#FFDD3D' className='mt-3 -ml-1 cursor-pointer drop-shadow-2xl hover:opacity-60 transition-all duration-300' strokeWidth={3} size={25} onClick={onInputGiftCodeClick} />
                </div>

                <div className='relative top-0 left-0 flex items-center justify-center ml-2'>
                    <div className='relative w-[100px] h-[45px] lg:w-[180px] lg:h-[70px]' >
                        <Image src={frame} alt='frame' className='mt-3' fill />
                        <div className='absolute top-3 lg:top-3.5 left-0 flex justify-center items-center h-full w-full gap-2'>
                            <span className='text-xs lg:text-xl font-bold text-amber-500'>10000 ĐIỂM</span>
                        </div>
                    </div>

                    <button className='relative w-[35px] h-[35px] lg:w-[65px] lg:h-[65px] top-0 left-0 flex items-center justify-center ml-2 cursor-pointer hover:opacity-80 transition-all duration-300'>
                        <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760721841/X_lqpgdp.svg' alt='buy more life' className='mt-3' fill />
                    </button>
                </div>
            </div>

            {children}

            {/* Achievement */}
            <div className='absolute ml-4 bottom-0 left-0 flex items-end'>
                <div className='flex flex-col items-start justify-center'>
                    <div className='relative w-[130px] h-[50px] lg:w-[230px] lg:h-[90px] hover:opacity-80 transition-all duration-300 cursor-pointer' onClick={onAchievementClick}>
                        <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760727027/achievement_vi5gxo.svg' alt='achievement' className='mt-3 cursor-pointer' fill />
                    </div>
                    <div className='relative w-[110px] h-[49px] lg:w-[200px] lg:h-[100px] -left-2 lg:-left-1 hover:opacity-80 transition-all duration-300 cursor-pointer' onClick={onRedeemClick}>
                        <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760726864/gift_ubfyga.svg' alt='gift' className='cursor-pointer' fill />
                    </div>
                </div>
            </div>

            {/* Suggest */}
            <div className='absolute bottom-0 right-0 flex items-end'>
                <div className='flex flex-col items-end justify-center'>
                    <div className='relative w-[100px] h-[60px] lg:w-[180px] lg:h-[100px] hover:opacity-80 transition-all duration-300 cursor-pointer' onClick={onAirEventClick}>
                        <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760815558/Vi%E1%BA%BFt_Th%C6%B0_hmaabr.svg' alt='achievement' className='cursor-pointer' fill />
                    </div>
                    <div className='relative w-[50px] h-[50px] lg:w-[80px] lg:h-[80px] right-2 lg:right-4 hover:opacity-80 transition-all duration-300 cursor-pointer' onClick={onGuideClick}>
                        <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760726885/guide_pvrmm1.svg' alt='gift' className='cursor-pointer' fill />
                    </div>
                </div>
            </div>

            <AchievementsModal isOpen={isAchievementModalOpen} onClose={() => setIsAchievementModalOpen(false)} onClaim={() => { }} />
            <AirEvent isOpen={isAirEventModalOpen} onClose={() => setIsAirEventModalOpen(false)} />
            <RedeemModal isOpen={isRedeemModalOpen} onClose={() => setIsRedeemModalOpen(false)} onRedeem={() => { }} />
            <BuyMoreLife isOpen={isBuyMoreLifeModalOpen} onClose={() => setIsBuyMoreLifeModalOpen(false)} onBuy={onBuyMoreLifeClick} coinCost={200} />
            <InputGiftCode isOpen={isInputGiftCodeModalOpen} onClose={() => setIsInputGiftCodeModalOpen(false)} />
            <CorrectGiftCode isOpen={isCorrectGiftCodeModalOpen} onClose={() => setIsCorrectGiftCodeModalOpen(false)} coinsReward={500} />
            <IncorrectGiftCode isOpen={isIncorrectGiftCodeModalOpen} onClose={() => setIsIncorrectGiftCodeModalOpen(false)} coinsReward={500} />
            <Guide isOpen={isGuideModalOpen} onClose={() => setIsGuideModalOpen(false)} land={land} />
        </div >
    );
};