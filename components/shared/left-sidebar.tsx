"use client";
import React from "react";
import { sidebarLinks } from "@/constants";
import Image from "next/image";
import SidebarLinkItem from "@/components/main-layout/left-sidebar/sidebar-link-item";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const LeftSidebar = ({}) => {
  const router = useRouter();
  return (
    <section className={"custom-scrollbar leftsidebar"}>
      <div className={"flex w-full flex-1 flex-col gap-6 px-6"}>
        {sidebarLinks.map((link) => (
          <SidebarLinkItem link={link} key={link.label} />
        ))}
      </div>
      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/sign-in")}>
            <div className="flex cursor-pointer gap-4 p-4">
              <Image
                src={"/assets/logout.svg"}
                alt={"logout"}
                width={24}
                height={24}
              />
              <span className={"text-light-2 max-lg:hidden"}>Logout</span>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
