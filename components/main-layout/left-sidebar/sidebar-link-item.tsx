"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

type SidebarLink = {
  route: string;
  label: string;
  imgURL: string;
};

const SidebarLinkItem = ({
  link,
  isMobile = false,
}: {
  link: SidebarLink;
  isMobile?: boolean;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

  const isActive =
    (pathname.includes(link.route) && link.route.length > 1) ||
    pathname === link.route;

  if (link.route === "/profile") link.route = `${link.route}/${userId}`;
  /**
   * -------------------
   * ------- JSX -------
   * -------------------
   */
  return (
    <Link
      href={link.route}
      className={`${isMobile ? "bottombar_link" : "leftsidebar_link"} ${
        isActive && "bg-primary-500"
      }`}
    >
      <Image src={link.imgURL} alt={link.label} width={24} height={24} />
      <p
        className={`${
          isMobile
            ? "text-subtle-medium text-light-1 max-sm:hidden"
            : "text-light-1 max-lg:hidden"
        }`}
      >
        {isMobile ? link.label.split(/\s+/)[0] : link.label}
      </p>
    </Link>
  );
};

export default SidebarLinkItem;
