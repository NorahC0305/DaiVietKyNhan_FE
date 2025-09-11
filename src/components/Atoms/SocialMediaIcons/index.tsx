"use client";

import React from "react";
import Image from "next/image";
import styles from "./index.module.scss";

// Import images
import facebookIcon from "../../../../public/facebook.png";
import communityIcon from "../../../../public/community.png";
import youtubeIcon from "../../../../public/youtube.png";
import discordIcon from "../../../../public/discord.png";
import tiktokIcon from "../../../../public/tiktok.png";
import verticalDivider from "../../../../public/VerticalDivider.png";
import verticalDividerUpper from "../../../../public/VerticalDividerUpper.png";

interface SocialMediaIconsProps {
  className?: string;
}

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({ className }) => {
  const socialIcons = [
    {
      id: "facebook",
      name: "Facebook",
      icon: facebookIcon,
      alt: "Facebook",
      url: "https://www.facebook.com/DaiVietKyNhan",
    },
    {
      id: "community",
      name: "Community",
      icon: communityIcon,
      alt: "Community",
      url: "#",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: youtubeIcon,
      alt: "YouTube",
      url: "https://www.youtube.com/@SuKyToanThu-vk3wi/featured",
    },
    {
      id: "discord",
      name: "Discord",
      icon: discordIcon,
      alt: "Discord",
      url: "https://discord.com",
    },
    {
      id: "tiktok",
      name: "TikTok",
      icon: tiktokIcon,
      alt: "TikTok",
      url: "https://www.tiktok.com/@daivietkynhan",
    },
  ];

  return (
    <div className={`${styles.socialMediaIcons} ${className || ""}`}>
      {/* Top divider */}
      <Image
        src={verticalDivider}
        alt="Top Divider"
        width={2}
        height={2}
        style={{
          display: "block",
          marginBottom: "-1px",
        }}
      />

      {socialIcons.map((social, index) => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialLink}
          style={{
            marginBottom: index < socialIcons.length - 1 ? "-1px" : "-1px",
          }}
        >
          {/* Particles */}
          <div className={styles.particles}>
            <div className={styles.particle1} />
            <div className={styles.particle2} />
            <div className={styles.particle3} />
            <div className={styles.particle4} />
            <div className={styles.particle5} />
          </div>

          <Image
            src={social.icon}
            alt={social.alt}
            width={60}
            height={60}
            className={styles.iconImage}
          />
        </a>
      ))}

      {/* Bottom divider */}
      <Image
        src={verticalDividerUpper}
        alt="Bottom Divider"
        width={2}
        height={2}
        style={{
          display: "block",
        }}
      />
    </div>
  );
};

export default SocialMediaIcons;
