// src/components/Molecules/Footer/index.tsx

import Link from 'next/link';
import Image from 'next/image';
import SocialMediaIcons from '@components/Atoms/SocialMediaIcons';
import { ROUTES } from '@routes';
import { Camera, ImageIcon, UsersRound } from 'lucide-react';
import { Button } from '@components/Atoms/ui/button';

// Dữ liệu cho các liên kết nhanh để dễ dàng quản lý
const IntroduceLinks = [
    { href: '/#', label: 'Về dự án' },
    { href: '/#', label: 'Tầm nhìn & Sứ mệnh' },
    { href: '/#', label: 'Người sáng lập' },
];

const DiscoverLinks = [
    { href: ROUTES.PUBLIC.LIBRARY, label: 'Về chúng tôi' },
    { href: ROUTES.PUBLIC.KYGIOI, label: 'Thư viện nhân vật' },
    { href: ROUTES.PUBLIC.MAP, label: 'Nội dung nổi bật' },
];

const InfoLinks = [
    { href: '/#', label: 'Điều khoản sử dụng' },
    { href: '/#', label: 'Chính sách bảo mật' },
    { href: '/#', label: 'Đóng góp nội dung' },
];


export const Footer = () => {
    return (
        <footer className="bg-white text-black pt-16 border-t border-gray-200">
            <div className="container mx-auto px-6">
                {/* === Main Content === */}
                <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-6 pb-12 text-center md:text-left">

                    {/* === Cột 1: Logo === */}
                    <div className="flex-grow-[2] min-w-[220px]">
                        <Link href={ROUTES.PUBLIC.HOME} className="flex items-center gap-3 mb-4 no-underline text-black w-fit mx-auto md:mx-0">
                            <Image src="/logo_dvkn.svg" alt="Đại Việt Kỳ Nhân Logo" width={50} height={50} />
                            <h2 className="text-2xl font-semibold">Đại Việt Kỳ Nhân</h2>
                        </Link>
                    </div>

                    {/* === Cột 2: Giới thiệu === */}
                    <div className="flex-1 min-w-[220px]">
                        <h3 className="text-black mb-6 text-lg font-semibold">Giới thiệu</h3>
                        <ul className="list-none p-0 m-0 flex flex-col gap-3">
                            {IntroduceLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="no-underline text-[#a0a0a0] transition-colors hover:text-black">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* === Cột 3: Khám phá === */}
                    <div className="flex-1 min-w-[220px]">
                        <h3 className="text-black mb-6 text-lg font-semibold">Khám phá</h3>
                        <ul className="list-none p-0 m-0 flex flex-col gap-3">
                            {DiscoverLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="no-underline text-[#a0a0a0] transition-colors hover:text-black">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* === Cột 4: Liên kết nhanh === */}
                    <div className="flex-1 min-w-[220px]">
                        <h3 className="text-black mb-6 text-lg font-semibold">Thông tin</h3>
                        <ul className="list-none p-0 m-0 flex flex-col gap-3">
                            {InfoLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="no-underline text-[#a0a0a0] transition-colors hover:text-black">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* === Cột 5 Kết nối với chúng tôi === */}
                    <div className="flex-1 min-w-[220px]">
                        <h3 className="text-black mb-6 text-lg font-semibold">Kết nối với chúng tôi</h3>
                        <div className="flex gap-4 mb-4">
                            <div className="bg-gray-500 rounded-full p-2">
                                <ImageIcon size={24} color='white' />
                            </div>
                            <div className="bg-gray-500 rounded-full p-2">
                                <UsersRound size={24} color='white' />
                            </div>
                            <div className="bg-gray-500 rounded-full p-2">
                                <Camera size={24} color='white' />
                            </div>
                        </div>
                        <Button className='bg-[#AF000C] mb-4'>Trở thành đối tác</Button>
                        <p className='text-sm text-gray-500'>Đăng ký để nhận thông tin và cập nhật mới nhất</p>
                    </div>
                </div>
            </div>

            {/* === Phần bản quyền === */}
            <div className="py-6 text-center text-sm">
                <div className="container mx-auto px-6">
                    <p className="m-0">© {new Date().getFullYear()} DAIVIETKYNHAN. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};