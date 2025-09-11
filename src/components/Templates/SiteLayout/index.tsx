"use client";

import React from "react";
import Header from "@components/Molecules/Header";
import SocialMediaIcons from "@components/Atoms/SocialMediaIcons";

type Props = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Props) {
  return (
    <>
      <div className="fixed top-0 z-50 w-full transform pointer-events-auto">
        <Header />
      </div>
      <div className="relative min-h-screen pt-20">
        {children}
        <div className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 pointer-events-auto">
          <SocialMediaIcons />
        </div>
      </div>
    </>
  );
}


