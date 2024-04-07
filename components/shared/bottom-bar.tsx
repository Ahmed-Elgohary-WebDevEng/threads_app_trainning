import React from "react";
import { sidebarLinks } from "@/constants";
import SidebarLinkItem from "@/components/main-layout/left-sidebar/sidebar-link-item";

const BottomBar = ({}) => {
  return (
    <section className={"bottombar"}>
      <div className={"bottombar_container"}>
        {sidebarLinks.map((link) => (
          <SidebarLinkItem link={link} key={link.label} isMobile={true} />
        ))}
      </div>
    </section>
  );
};

export default BottomBar;
