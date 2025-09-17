"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import underscoreImage from "../../../../public/underscore.png";
import logoImage from "../../../../public/logo_dvkn.svg";
import { ROUTES } from "@routes";
import effectGif from "../../../../public/effect-1.gif";
import { AnimatePresence, motion } from "framer-motion";

interface HeaderProps {
  className?: string;
}

const navigationItems = [
  { href: ROUTES.PUBLIC.HOME, label: "Trang chủ" },
  { href: ROUTES.PUBLIC.LIBRARY, label: "Thư viện Kỳ Nhân" },
  { href: ROUTES.PUBLIC.MAP, label: "Bản đồ Kỳ Nhân" },
  { href: ROUTES.PUBLIC.PRODUCTS, label: "Sản phẩm" },
  { href: ROUTES.PUBLIC.ABOUT, label: "Về chúng tôi" },
  { href: ROUTES.PUBLIC.CONTACT, label: "Liên hệ" },
];

const Header: React.FC<HeaderProps> = ({ className }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const NavLink = ({ href, label, index = 0 }: { href: string; label: string; index?: number }) => {
    const isActive = pathname === href;
    const EffectOverlay = ({ show }: { show: boolean }) => {
      if (!show) return null;

      return (
        <div className="absolute inset-3 pointer-events-none opacity-0 group-hover:opacity-60 transition-all duration-300 transform scale-90 group-hover:scale-100 origin-center rounded-md overflow-hidden hidden md:block">
          <Image
            src={effectGif}
            alt="Hover effect"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      );
    };
    return (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 * index, duration: 0.3, ease: "easeOut" }}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
      >
        <Link
          href={href}
          className={`text-white no-underline text-sm md:text-base font-bold font-inter relative py-2 px-4 rounded-lg overflow-hidden group transition-colors duration-300 ${isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-400"}`}
        >
          <span className="relative z-10">{label}</span>

          {/* GIF Effect on hover */}
          <EffectOverlay show={!isActive} />

          {/* Active state indicator */}
          {isActive && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex justify-center items-center w-full h-0 overflow-visible">
              <Image
                src={underscoreImage}
                alt="Active indicator"
                width={0}
                height={30}
                className="w-full h-12 md:h-16 object-fill drop-shadow-[0_0_12px_rgba(255,215,0,0.6)] transition-all duration-500 animate-pulse"
              />
            </div>
          )}
        </Link>
      </motion.div>
    );
  };

  return (
    <header className="p-3 rounded-xl">
      <div className="max-w-6xl mx-auto px-5 flex flex-wrap justify-between items-center relative z-10 gap-3 lg:gap-0">
        {/* Logo */}
        <div className="flex items-center order-1 lg:order-1 ml-0 lg:-ml-12 shrink-0">
          <Link
            href={ROUTES.PUBLIC.HOME}
            className="flex items-center group relative overflow-hidden rounded-lg"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex"
            >
              <Image
                src={logoImage}
                alt="Đại Việt Kỳ Nhân Logo"
                width={220}
                height={110}
                className="h-14 lg:h-16 w-auto"
              />
            </motion.div>
          </Link>
        </div>

        {/* Hamburger (mobile only) */}
        <button
          type="button"
          aria-label="Mở/đóng menu"
          aria-expanded={menuOpen}
          aria-controls="site-primary-nav"
          className="lg:hidden order-2 ml-auto inline-flex items-center justify-center w-10 h-10 rounded-md border border-white/30 text-white hover:bg-white/10 relative z-20"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* Navigation Links */}
        <motion.nav
          id="site-primary-nav"
          className={`hidden lg:flex items-center gap-3 md:gap-4 lg:gap-8 order-3 lg:order-2 flex-row justify-center mt-2 lg:mt-0`}
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {navigationItems.map((item, idx) => (
            <NavLink key={item.href} href={item.href} label={item.label} index={idx} />
          ))}
        </motion.nav>

        {/* Auth Buttons */}
        <div
          className={`hidden lg:flex gap-3 md:gap-5 order-4 lg:order-3 justify-center lg:justify-end mt-2 lg:mt-0`}
        >
          <Link
            href={ROUTES.AUTH.LOGIN}
            className="group relative bg-primary text-holder px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg no-underline text-xs lg:text-sm font-semibold font-inter border-none cursor-pointer min-w-[96px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
            onClick={() => setMenuOpen(false)}
          >
            <span className="relative z-10">Đăng Nhập</span>
          </Link>
        </div>
      </div>

      {/* Mobile menu as overlay panel with animation */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="lg:hidden fixed inset-0 z-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.button
              type="button"
              aria-label="Đóng menu"
              className="absolute inset-0 bg-black/40"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute top-0 left-0 right-0 bg-[#1f1f1f]/95 backdrop-blur-md border-b border-white/10 pt-20 pb-6 px-5 shadow-xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "tween", duration: 0.25 }}
            >
              <nav className="flex flex-col items-stretch gap-2">
                {navigationItems.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div key={item.href} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ delay: 0.03 * idx }}>
                      <Link
                        href={item.href}
                        aria-current={isActive ? "page" : undefined}
                        className={`${isActive ? "text-yellow-400 bg-white/5" : "text-white hover:bg-white/5"} no-underline text-base font-semibold py-3 px-4 rounded-lg`}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <motion.div className="mt-4 flex" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ delay: 0.15 }}>
                <Link
                  href={ROUTES.AUTH.LOGIN}
                  className="flex-1 text-center group relative bg-primary text-holder px-4 py-2.5 rounded-lg no-underline text-sm font-semibold font-inter border-none cursor-pointer shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="relative z-10">Đăng Nhập</span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
