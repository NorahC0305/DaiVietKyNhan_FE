
import Link from 'next/link';
import Image from 'next/image';
import { ROUTES } from '@routes';
import { Camera, ImageIcon, UsersRound } from 'lucide-react';
import { Button } from '@components/Atoms/ui/button';

const IntroduceLinks = [
    { id: 'about-project', href: '/#', label: 'Về dự án' },
    { id: 'vision-mission', href: '/#', label: 'Tầm nhìn & Sứ mệnh' },
    { id: 'founder', href: '/#', label: 'Người sáng lập' },
];

const DiscoverLinks = [
    { id: 'about-us', href: ROUTES.PUBLIC.LIBRARY, label: 'Về chúng tôi' },
    { id: 'character-library', href: ROUTES.PUBLIC.KYGIOI, label: 'Thư viện nhân vật' },
    { id: 'featured-content', href: ROUTES.PUBLIC.MAP, label: 'Nội dung nổi bật' },
];

const InfoLinks = [
    { id: 'terms', href: '/#', label: 'Điều khoản sử dụng' },
    { id: 'privacy', href: '/#', label: 'Chính sách bảo mật' },
    { id: 'contribute', href: '/#', label: 'Đóng góp nội dung' },
];


export const Footer = () => {
    return (
        <footer className="bg-white text-black pt-10 sm:pt-16 border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6">
                {/* === Main Content === */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 pb-10 sm:pb-12 text-center md:text-left">

                    {/* === Cột 1: Logo === */}
                    <div className="lg:col-span-1 min-w-0">
                        <Link href={ROUTES.PUBLIC.HOME} className="flex items-center gap-2 sm:gap-3 mb-4 no-underline text-black w-fit mx-auto md:mx-0">
                            <Image src="/logo_dvkn.svg" alt="Đại Việt Kỳ Nhân Logo" width={50} height={50} />
                            <h2 className="text-xl sm:text-2xl font-semibold">Đại Việt Kỳ Nhân</h2>
                        </Link>
                    </div>

                    {/* === Cột 2: Giới thiệu === */}
                    <div className="min-w-0">
                        <h3 className="text-black mb-4 sm:mb-6 text-base sm:text-lg font-semibold">Giới thiệu</h3>
                        <ul className="list-none p-0 m-0 flex flex-col gap-2 sm:gap-3">
                            {IntroduceLinks.map((link) => (
                                <li key={link.id}>
                                    <Link href={link.href} className="no-underline text-[#a0a0a0] transition-colors hover:text-black">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* === Cột 3: Khám phá === */}
                    <div className="min-w-0">
                        <h3 className="text-black mb-4 sm:mb-6 text-base sm:text-lg font-semibold">Khám phá</h3>
                        <ul className="list-none p-0 m-0 flex flex-col gap-2 sm:gap-3">
                            {DiscoverLinks.map((link) => (
                                <li key={link.id}>
                                    <Link href={link.href} className="no-underline text-[#a0a0a0] transition-colors hover:text-black">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* === Cột 4: Liên kết nhanh === */}
                    <div className="min-w-0">
                        <h3 className="text-black mb-4 sm:mb-6 text-base sm:text-lg font-semibold">Thông tin</h3>
                        <ul className="list-none p-0 m-0 flex flex-col gap-2 sm:gap-3">
                            {InfoLinks.map((link) => (
                                <li key={link.id}>
                                    <Link href={link.href} className="no-underline text-[#a0a0a0] transition-colors hover:text-black">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* === Cột 5 Kết nối với chúng tôi === */}
                    <div className="min-w-0">
                        <h3 className="text-black mb-4 sm:mb-6 text-base sm:text-lg font-semibold">Kết nối với chúng tôi</h3>
                        <div className="flex gap-3 sm:gap-4 mb-4 justify-center md:justify-start flex-wrap">
                            <div className="bg-gray-500 rounded-full p-2 sm:p-2.5">
                                <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" color='white' />
                            </div>
                            <div className="bg-gray-500 rounded-full p-2 sm:p-2.5">
                                <UsersRound className="w-5 h-5 sm:w-6 sm:h-6" color='white' />
                            </div>
                            <div className="bg-gray-500 rounded-full p-2 sm:p-2.5">
                                <Camera className="w-5 h-5 sm:w-6 sm:h-6" color='white' />
                            </div>
                        </div>
                        <Button className='bg-[#AF000C] mb-4 w-full sm:w-auto text-sm sm:text-base px-4 py-2 sm:px-5 sm:py-2.5'>Trở thành đối tác</Button>
                        <p className='text-xs sm:text-sm text-gray-500'>Đăng ký để nhận thông tin và cập nhật mới nhất</p>
                    </div>
                </div>
            </div>

            {/* === Phần bản quyền === */}
            <div className="py-4 sm:py-6 text-center text-xs sm:text-sm">
                <div className="container mx-auto px-4 sm:px-6">
                    <p className="m-0">© {new Date().getFullYear()} DAIVIETKYNHAN. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};