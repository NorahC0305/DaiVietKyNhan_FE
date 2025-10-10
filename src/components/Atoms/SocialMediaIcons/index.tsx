"use client";

import React from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import { motion } from "framer-motion";

// Import images
import facebookIcon from "../../../../public/facebook.png";
import communityIcon from "../../../../public/community.png";
import youtubeIcon from "../../../../public/youtube.png";
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
      url: "https://www.facebook.com/groups/1084277652036931",
    },
    {
      id: "youtube",
      name: "YouTube",
      icon: youtubeIcon,
      alt: "YouTube",
      url: "https://www.youtube.com/@SuKyToanThu-vk3wi/featured",
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
    <motion.div
      className={`${styles.socialMediaIcons} ${className || ""}`}
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
    >
      {/* Top divider */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Image
          src={verticalDivider}
          alt="Top Divider"
          width={2}
          height={2}
          style={{
            display: "block",
            marginBottom: "-1px",
          }}
          priority
        />
      </motion.div>

      {socialIcons.map((social, index) => (
        <motion.div
          key={social.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04 * index, duration: 0.28, ease: "easeOut" }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <a
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
              width={56}
              height={56}
              sizes="(max-width: 640px) 48px, (max-width: 768px) 54px, 56px"
              className={styles.iconImage}
              priority={social.id === "facebook"}
            />
          </a>
        </motion.div>
      ))}

      {/* Bottom divider */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.05 * socialIcons.length }}
      >
        <Image
          src={verticalDividerUpper}
          alt="Bottom Divider"
          width={2}
          height={2}
          style={{
            display: "block",
          }}
          priority
        />
      </motion.div>
    </motion.div>
  );
};

export default SocialMediaIcons;
