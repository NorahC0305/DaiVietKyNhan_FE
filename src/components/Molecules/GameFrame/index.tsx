import Image from 'next/image';
import React from 'react';
import { cn } from '@/utils/CN';
import Avartar from '@components/Atoms/Avartar';
import frame from "../../../../public/frame.svg";
import heart from "../../../../public/Heart.svg";
import heart2 from "../../../../public/Heart (1).svg";
import frameCoin from "../../../../public/FrameCoin.svg";
import exit from "../../../../public/X.svg";
import { Plus } from 'lucide-react';
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

    return (
        <div className={cn('relative w-full h-full', className)}>
            {/* Avatar */}
            <div className='absolute top-0 left-0 flex items-center justify-center'>
                <Avartar>
                    <Image src='/game-frame/corner-tl.svg' alt='Top Left Corner' width={16} height={16} />
                </Avartar>
                <div className='flex items-center justify-center'>
                    <div className='relative top-0 left-0 flex items-center justify-center ml-5 drop-shadow-2xl '>
                        <Image src={frame} alt='frame' width={180} height={180} />
                        <div className='absolute top-0 left-0 flex justify-center items-center h-full w-full gap-2'>
                            <Image src={heart} alt='heart' width={30} height={30} />
                            <Image src={heart2} alt='heart' width={30} height={30} />
                            <Image src={heart2} alt='heart' width={30} height={30} />
                        </div>
                    </div>
                    <Plus color='red' className='ml-1 cursor-pointer drop-shadow-2xl' strokeWidth={3} size={30} />
                </div>
            </div>

            {/* Point/Coin */}
            <div className='absolute -top-3 right-0 flex items-center justify-center'>
                <div className='relative top-0 left-0 flex items-center justify-center'>
                    <Image src={frameCoin} alt='coin' width={180} height={180} className='mt-3' />
                    <div className='absolute top-0 left-0 flex justify-center items-center h-full w-full gap-2'>
                        <span className='text-2xl font-bold ml-8 text-amber-500'>10000</span>
                    </div>
                </div>
                <div className='relative top-0 left-0 flex items-center justify-center ml-3'>
                    <Image src={frame} alt='frame' width={165} height={165} />
                    <div className='absolute top-0 left-0 flex justify-center items-center h-full w-full gap-2'>
                        <span className='text-xl font-bold text-amber-500 mt-1'>10000</span>
                        <span className='text-xl font-bold text-amber-500'>ĐIỂM</span>
                    </div>
                </div>
                <button className='relative top-0 left-0 flex items-center justify-center ml-3 cursor-pointer'>
                    <Image src={exit} alt='exit' width={70} height={70} className='mt-3' />
                </button>
            </div>

{/* Gift */}
<></>
            <div className={cn('relative w-full h-full', padding)}>
                {children}
            </div>
        </div >
    );
};