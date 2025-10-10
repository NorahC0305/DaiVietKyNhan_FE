"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import underscoreImage from "../../../../public/underscore.png";
import logoImage from "../../../../public/logo_dvkn.svg";
import { ROUTES } from "@routes";
import effectGif from "../../../../public/effect-1.gif";
import { AnimatePresence, motion } from "framer-motion";
import { IUser } from "@models/user/entity";
import {
  ContactIcon,
  HomeIcon,
  InfoIcon,
  LibraryIcon,
  MapIcon,
  MenuIcon,
  PackageIcon,
} from "lucide-react";

interface HeaderProps {
  className?: string;
  user: IUser;
}

const navigationItems = [
  { href: ROUTES.PUBLIC.HOME, label: "Trang chủ" },
  { href: ROUTES.PUBLIC.LIBRARY, label: "Thư viện Kỳ Nhân" },
  { href: ROUTES.PUBLIC.MAP, label: "Bản đồ Kỳ Nhân" },
  { href: ROUTES.PUBLIC.PRODUCTS, label: "Sản phẩm" },
  { href: ROUTES.PUBLIC.ABOUT, label: "Về chúng tôi" },
  { href: ROUTES.PUBLIC.CONTACT, label: "Liên hệ" },
];
const mobileFooterItems = [
  { href: ROUTES.PUBLIC.HOME, label: "Trang chủ", Icon: HomeIcon },
  { href: ROUTES.PUBLIC.LIBRARY, label: "Thư viện", Icon: LibraryIcon },
  { href: ROUTES.PUBLIC.MAP, label: "Bản đồ", Icon: MapIcon },
  { href: ROUTES.PUBLIC.PRODUCTS, label: "Sản phẩm", Icon: PackageIcon },
  { href: ROUTES.PUBLIC.ABOUT, label: "Về chúng tôi", Icon: InfoIcon },
  { href: ROUTES.PUBLIC.CONTACT, label: "Liên hệ", Icon: ContactIcon },

  // Item cuối sẽ là nút Mở Menu
];

const MemoizedLogo = React.memo(({ logoImage, ROUTES }: any) => (
  <Link
    href={ROUTES.PUBLIC.HOME}
    className="flex items-center group relative overflow-hidden rounded-lg"
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
));
MemoizedLogo.displayName = "MemoizedLogo";

const Header: React.FC<HeaderProps> = ({ className, user }) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  // Default avatar URL
  const defaultAvatarUrl =
    "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSL6QUqKxXrttERd_g8g1dNcuIwydqok49E6tlwEJWU7TBVSphW3EYy4lJb-bGerm7D2Shzl-KKOPqtu9md2zjHYdIHdmJYWbJRSbipK74";

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        avatarRef.current &&
        !avatarRef.current.contains(event.target as Node)
      ) {
        setAvatarDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const NavLink = ({
    href,
    label,
    index = 0,
  }: {
    href: string;
    label: string;
    index?: number;
  }) => {
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
          className={`text-white no-underline text-sm md:text-base font-bold font-inter relative py-2 px-4 rounded-lg overflow-hidden group transition-colors duration-300 ${
            isActive ? "text-yellow-400 font-semibold" : "hover:text-yellow-400"
          }`}
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

  // Avatar Component with Dropdown
  const AvatarDropdown = () => {
    return (
      <div className="relative" ref={avatarRef}>
        <button
          onClick={() => setAvatarDropdownOpen(!avatarDropdownOpen)}
          className="flex cursor-pointer items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30">
            <Image
              src={user.avatar || defaultAvatarUrl}
              alt={user.name || "User Avatar"}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to default avatar if user avatar fails to load
                const target = e.target as HTMLImageElement;
                target.src = defaultAvatarUrl;
              }}
            />
          </div>
          <svg
            className={`w-4 h-4 text-white transition-transform ${
              avatarDropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        <AnimatePresence>
          {avatarDropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-2 w-48 bg-white/95 backdrop-blur-md rounded-lg shadow-xl border border-white/20 overflow-hidden z-50"
            >
              <div className="py-2">
                <div className="px-4 py-3 border-b border-gray-200/50">
                  <p className="text-sm font-semibold text-gray-800">
                    {user.name || "User"}
                  </p>
                  <p className="text-xs text-gray-600">{user.email}</p>
                </div>

                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100/50 transition-colors"
                  onClick={() => setAvatarDropdownOpen(false)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Hồ sơ
                </Link>

                <Link
                  href={ROUTES.AUTH.LOGOUT}
                  className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-100/50 transition-colors"
                  onClick={() => setAvatarDropdownOpen(false)}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Đăng xuất
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // USE MEMO ĐỂ TRÁNH NAVIGATION LINKS RE-RENDER
  const MemoizedNavLinks = useMemo(
    () => (
      <motion.nav
        id="site-primary-nav"
        // Ẩn Navigation truyền thống trên mobile
        className={`hidden lg:flex items-center gap-3 md:gap-4 lg:gap-8 order-3 lg:order-2 flex-row justify-center mt-2 lg:mt-0`}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.05 } },
        }}
      >
        {navigationItems.map((item, idx) => (
          <NavLink
            key={item.href}
            href={item.href}
            label={item.label}
            index={idx}
          />
        ))}
      </motion.nav>
    ),
    [pathname]
  );

  // MOBILE FOOTER BAR COMPONENT
  const MobileFooterBar = () => {
    return (
      // Chỉ hiển thị trên màn hình nhỏ, ẩn trên lg (desktop/tablet lớn)
      <motion.div
        className="fixed bottom-0 left-0 right-0 lg:hidden z-30 
                     bg-[#1f1f1f]/95 backdrop-blur-md border-t border-white/10 shadow-2xl"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="flex justify-around items-center h-16 max-w-xl mx-auto">
          {mobileFooterItems.map((item, index) => {
            const isActive = pathname === item.href;
            const Icon = item.Icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center p-2 transition-colors duration-200 ${
                  isActive
                    ? "text-yellow-400"
                    : "text-white/60 hover:text-yellow-400"
                }`}
                onClick={() => setMenuOpen(false)} // Đóng menu nếu có
              >
                <Icon className="w-5 h-5" />
                <span className="text-[10px] font-medium mt-0.5">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </motion.div>
    );
  };

  // RENDER HEADER
  return (
    <>
      <header className="p-3 rounded-xl">
        <div className="max-w-6xl mx-auto px-5 flex flex-wrap justify-between items-center relative z-10 gap-3 lg:gap-0">
          {/* Logo - SỬ DỤNG MEMOIZED COMPONENT */}
          <div className="flex items-center order-1 lg:order-1 ml-0 lg:-ml-12 shrink-0">
            <MemoizedLogo logoImage={logoImage} ROUTES={ROUTES} />
          </div>

          {/* Hamburger (mobile only) - ẨN NÚT NÀY ĐI VÌ NÓ ĐÃ Ở FOOTER */}
          <button
            type="button"
            aria-label="Mở/đóng menu"
            aria-expanded={menuOpen}
            aria-controls="site-primary-nav"
            className="hidden" // Đã ẩn
            onClick={() => setMenuOpen((v) => !v)}
          >
            {/* ... (SVG) ... */}
          </button>

          {/* Navigation Links - Chỉ hiện trên Desktop/Tablet */}
          {MemoizedNavLinks}

          {/* Auth Buttons - Chỉ hiện trên desktop */}
          <div className="hidden lg:flex gap-3 md:gap-5 order-4 lg:order-3 justify-center lg:justify-end mt-2 lg:mt-0">
            {user ? (
              <AvatarDropdown />
            ) : (
              <Link
                href={ROUTES.AUTH.LOGIN}
                className="group relative bg-primary text-holder px-4 lg:px-6 py-2 lg:py-2.5 rounded-lg no-underline text-xs lg:text-sm font-semibold font-inter border-none cursor-pointer min-w-[96px] text-center shadow-[0_2px_8px_rgba(0,0,0,0.1)] overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                onClick={() => setMenuOpen(false)}
              >
                <span className="relative z-10">Đăng Nhập</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile menu as overlay panel with animation */}
        <AnimatePresence>
          {/* Giữ nguyên Mobile Menu Overlay khi bấm nút Menu ở Footer */}
          {menuOpen && (
            <motion.div
              className="lg:hidden fixed inset-0 z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* ... (Phần Overlay và Menu logic) ... */}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* FOOTER BAR CHO MOBILE */}
      <MobileFooterBar />
    </>
  );
};

export default Header;
