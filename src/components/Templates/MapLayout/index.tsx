"use client";

import { GameFrame } from "@components/Molecules/GameFrame";
import React from "react";
import { IMeResponse } from "@models/user/response";
import { UserDataProvider, useUserDataContext } from "@contexts/UserDataContext";

interface MapsLayoutProps {
  children: React.ReactNode;
  className?: string;
  user: IMeResponse["data"] | null;
}

// Inner component that has access to context
const MapsLayoutInner: React.FC<{
  children: React.ReactNode;
  className?: string;
  initialUser: IMeResponse["data"] | null;
}> = ({ children, className = "", initialUser }) => {
  const { userData } = useUserDataContext();
  const user = userData || initialUser;

  return (
    <GameFrame className="" user={user}>
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
}) => {
  return (
    <UserDataProvider initialUser={user}>
      <MapsLayoutInner className={className} initialUser={user}>
        {children}
      </MapsLayoutInner>
    </UserDataProvider>
  );
};

export default MapsLayoutClient;
