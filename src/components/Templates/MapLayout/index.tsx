"use client";

import { GameFrame } from "@components/Molecules/GameFrame";
import React from "react";
import { IMeResponse } from "@models/user/response";
import { UserDataProvider, useUserDataContext } from "@contexts/UserDataContext";

interface MapsLayoutProps {
  children: React.ReactNode;
  className?: string;
  user: IMeResponse["data"] | null;
  slug: string;
}

// Inner component that has access to context
const MapsLayoutInner: React.FC<{
  children: React.ReactNode;
  className?: string;
  initialUser: IMeResponse["data"] | null;
  slug: string;
}> = ({ children, className = "", initialUser, slug }) => {
  const { userData } = useUserDataContext();
  const user = userData || initialUser;

  return (
    <GameFrame className="" user={user} slug={slug}>
      <div
        className={`absolute w-full top-0 left-0 overflow-hidden -z-1 ${className}`}
      >
        {/* Content */}
        <div className="relative min-h-screen">{children}</div>
      </div>
    </GameFrame>
  );
};

const MapsLayoutClient: React.FC<MapsLayoutProps> = ({
  children,
  className = "",
  user,
  slug,
}) => {
  return (
    <UserDataProvider initialUser={user}>
      <MapsLayoutInner className={className} initialUser={user} slug={slug}>
        {children}
      </MapsLayoutInner>
    </UserDataProvider>
  );
};

export default MapsLayoutClient;
