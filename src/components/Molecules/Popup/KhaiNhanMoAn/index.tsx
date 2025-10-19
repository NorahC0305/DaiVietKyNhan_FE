"use client";

import ContentKhaiNhanMoAn from "@components/Atoms/ContentKhaiNhanMoAn";
import ModalBackdrop from "@components/Atoms/ModalBackdrop";
import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

export type KhaiNhanMoAnProps = {
    isOpen: boolean;
    onClose: () => void;
    onClaim: (achievementId: string) => void;
};

export default function KhaiNhanMoAn({
    isOpen,
    onClose,
    onClaim,
}: KhaiNhanMoAnProps) {

    const [an, setAn] = useState<string>('');
    const isHidden = useMemo(() => !an || an === '', [an]);
    const handleSetAn = useCallback((selectedAn: string) => {
        if (an === selectedAn) {
            setAn('');
        } else {
            setAn(selectedAn);
        }
    }, [an]);

    return (
        <ModalBackdrop isOpen={isOpen} onClose={onClose} className="w-full lg:max-w-5xl max-w-3xl mx-auto">
            <div className="max-h-[80vh] overflow-y-auto ancient-scrollbar">
                <div className="p-4">
                    {/* --- Title --- */}
                    <div className="flex items-center justify-center gap-2">
                        <div className="relative w-[230px] lg:w-[300px] h-[106px] lg:h-[117px]">
                            <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760859516/MayNuiTrai_ffxbum.svg' alt="May Nui Trai" fill />
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <h1
                                className="font-bd-street-sign text-center lg:text-6xl text-3xl text-[#C93728]"
                                style={{
                                    WebkitTextStrokeWidth: 2,
                                    WebkitTextStrokeColor: '#FBBF24',
                                    strokeWidth: 2,
                                    stroke: '#FBBF24',
                                    paintOrder: 'stroke fill',
                                }}
                            >
                                KHAI NHÂN MỞ ẤN
                            </h1>
                            <h2 className="font-bd-street-sign text-center text-3xl lg:text-4xl text-secondary">CHUYỆN CHƯA KỂ</h2>
                        </div>
                        <div className="relative w-[230px] lg:w-[300px] h-[106px] lg:h-[117px]">
                            <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760859543/MayNuiPhai_imfhgx.svg' alt="May Nui Phai" fill />
                        </div>
                    </div>

                    {/* --- Description --- */}
                    <div className="w-full mt-5 flex items-center justify-center">
                        <span className="text-center font-semibold text-xl text-secondary w-xl">Với mỗi vùng đất được chinh phục, mỗi Kỳ Văn được thu thập, bạn sẽ mở khóa được một phần sự thật về biến cố đã xảy ra với Kỳ Giới và khai mở vùng đất thứ năm - vùng đất cuối cùng. Hãy hoàn thành hành trình để mở khóa toàn bộ câu chuyện nhé!</span>
                    </div>

                    {/* --- Khai Nhan Mo An Card --- */}
                    <div className="w-full mt-5 flex items-center justify-center gap-4">
                        <div
                            className={`relative inset-0 flex items-center justify-center lg:w-[200px] lg:h-[250px] w-[150px] h-[200px] cursor-pointer transition-all duration-300 ${an === 'Sơn Tinh' ? 'scale-105' : ''
                                }`}
                            onClick={() => handleSetAn('Sơn Tinh')}
                        >
                            {an === 'Sơn Tinh' && (
                                <div className="absolute -inset-1 rounded-2xl border border-transparent bg-gradient-to-r from-green-400 via-lime-500 to-green-400 animate-led-border -z-10" />
                            )}
                            <Image src='https://res.cloudinary.com/dznt9yias/image/upload/v1760861674/Sơn_Tinh_-_Chương_1_tmi2kx.png' alt="Sơn Tinh - Chương 1" fill className="relative z-10" />
                        </div>

                        <div
                            className={`relative flex items-center justify-center lg:w-[200px] lg:h-[248px] w-[150px] h-[200px] bg-[#6E6B63] rounded-xl border-2 border-[#2B638F] cursor-pointer transition-all duration-300 ${an === 'Chử Đồng Tử' ? 'scale-105' : ''
                                }`}
                            onClick={() => handleSetAn('Chử Đồng Tử')}
                        >
                            {an === 'Chử Đồng Tử' && (
                                <div className="absolute -inset-1 rounded-2xl border border-transparent bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-400 animate-led-border -z-10" />
                            )}
                            <div className="absolute inset-0.5 bg-[#6E6B63] rounded-xl z-10"></div>
                        </div>
                        <div
                            className={`relative flex items-center justify-center lg:w-[200px] lg:h-[248px] w-[150px] h-[200px] bg-[#6E6B63] rounded-xl border-2 border-[#EF493D] cursor-pointer transition-all duration-300 ${an === 'Thánh Gióng' ? 'scale-105' : ''
                                }`}
                            onClick={() => handleSetAn('Thánh Gióng')}
                        >
                            {an === 'Thánh Gióng' && (
                                <div className="absolute -inset-1 rounded-2xl border border-transparent bg-gradient-to-r from-red-400 via-pink-500 to-red-400 animate-led-border -z-10" />
                            )}
                            <div className="absolute inset-0.5 bg-[#6E6B63] rounded-xl z-10" />
                        </div>
                        <div
                            className={`relative flex items-center justify-center lg:w-[200px] lg:h-[248px] w-[150px] h-[200px] bg-[#6E6B63] rounded-xl border-2 border-[#8D3BBB] cursor-pointer transition-all duration-300 ${an === 'Liễu Hạnh' ? 'scale-105' : ''
                                }`}
                            onClick={() => handleSetAn('Liễu Hạnh')}
                        >
                            {an === 'Liễu Hạnh' && (
                                <div className="absolute -inset-1 rounded-2xl border border-transparent bg-gradient-to-r from-purple-400 via-violet-500 to-purple-400 animate-led-border -z-10" />
                            )}
                            <div className="absolute inset-0.5 bg-[#6E6B63] rounded-xl z-10" />
                        </div>
                    </div>

                    {/* --- Main Content --- */}
                    <ContentKhaiNhanMoAn isHidden={isHidden} an={an} />
                </div>
            </div>
        </ModalBackdrop >
    );
}
