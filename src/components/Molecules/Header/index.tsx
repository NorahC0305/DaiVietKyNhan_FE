"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import underscoreImage from "../../../../public/underscore.png";
import logoImage from "../../../../public/logo_dvkn.svg";
import { ROUTES } from "@routes";

interface HeaderProps {
  className?: string;
}

const navigationItems = [
  { href: ROUTES.PUBLIC.HOME, label: "Trang chủ" },
  { href: ROUTES.PUBLIC.LIBRARY, label: "Thư viện Kỳ Nhân" },
  { href: ROUTES.PUBLIC.MAP, label: "Bản đồ Kỳ Nhân" },
  { href: ROUTES.PUBLIC.ABOUT, label: "Về chúng tôi" },
  { href: ROUTES.PUBLIC.CONTACT, label: "Liên hệ" },
];

const Header: React.FC<HeaderProps> = ({ className }) => {
  const pathname = usePathname();

  const NavLink = ({ href, label }: { href: string; label: string }) => {
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        className={`text-white no-underline text-sm md:text-base font-bold font-inter transition-all duration-300 relative py-2 hover:text-yellow-400 hover:-translate-y-0.5 ${
          isActive ? "text-yellow-400 font-semibold" : ""
        }`}
      >
        {label}
        {isActive && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center items-center w-full h-0 overflow-visible">
            <Image
              src={underscoreImage}
              alt="Active indicator"
              width={0}
              height={30}
              className="w-full h-16 object-fill drop-shadow-[0_0_8px_rgba(255,215,0,0.3)] transition-all duration-300"
            />
          </div>
        )}
      </Link>
    );
  };

  return (
    <header className="p-3 backdrop-blur-lg bg-gray-100/10 rounded-xl">
      <div className="max-w-6xl mx-auto px-5 flex flex-col lg:flex-row justify-between items-center relative z-10 gap-4 lg:gap-0">
        {/* Logo */}
        <div className="flex items-center order-1 lg:order-1 -ml-8 lg:-ml-12">
          <Link href={ROUTES.PUBLIC.HOME} className="flex items-center">
            <Image
              src={logoImage}
              alt="Đại Việt Kỳ Nhân Logo"
              width={300}
              height={150}
              className="h-20 lg:h-24 w-auto"
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-4 lg:gap-8 order-2 lg:order-2 flex-wrap justify-center">
          {navigationItems.map((item) => (
            <NavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="flex flex-col gap-2 order-3 lg:order-3">
          <Link
            href={ROUTES.AUTH.LOGIN}
            className="bg-white text-black px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg no-underline text-xs lg:text-sm font-semibold font-inter transition-all duration-300 border-none cursor-pointer min-w-[80px] lg:min-w-[100px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:bg-gray-100 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] active:translate-y-0"
          >
            Đăng Nhập
          </Link>
          <Link
            href={ROUTES.AUTH.REGISTER}
            className="bg-transparent text-white px-4 lg:px-6 py-2 lg:py-2.5 border border-white rounded-lg no-underline text-xs lg:text-sm font-semibold font-inter transition-all duration-300 cursor-pointer min-w-[80px] lg:min-w-[100px] text-center hover:bg-white hover:text-black hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,255,255,0.1)] active:translate-y-0"
          >
            Đăng kí
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
