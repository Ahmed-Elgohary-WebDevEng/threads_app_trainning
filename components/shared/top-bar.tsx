import React from "react";
import Link from "next/link";
import Image from "next/image";
import { OrganizationSwitcher, SignedIn, SignOutButton } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const TopBar = ({}) => {
  return (
    <nav className={"topbar"}>
      <Link href={"/"} className={"flex items-center gap-4"}>
        <Image src="/logo.svg" alt={"logo image"} width={28} height={28} />
        <span className={"text-heading3-bold text-light-1 max-xs:hidden"}>
          Threads
        </span>
      </Link>
      <div className={"flex items-center gap-1"}>
        <div className={"block md:hidden"}>
          <SignedIn>
            <SignOutButton>
              <div className="flex">
                <Image
                  src={"/assets/logout.svg"}
                  alt={"logout"}
                  width={24}
                  height={24}
                />
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        />
      </div>
    </nav>
  );
};

export default TopBar;
