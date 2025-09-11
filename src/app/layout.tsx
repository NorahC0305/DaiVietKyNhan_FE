import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from 'react-toastify';
import "./globals.css";
import QueryProviderWrapper from "@components/providers/QueryProviderWrapper";
import SocialMediaIcons from "@components/Atoms/SocialMediaIcons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Đại Việt Kỳ Nhân",
    default: "Đại Việt Kỳ Nhân",
  },
  description: "Dự án vẽ minh hoạ các tiền nhân lịch sử/văn hoá dân tộc❤️",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastContainer />
        <QueryProviderWrapper>
          {children}
          <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 pointer-events-auto">
            <SocialMediaIcons />
          </div>
        </QueryProviderWrapper>
      </body>
    </html>
  );
}
