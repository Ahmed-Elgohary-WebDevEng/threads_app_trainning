import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import TopBar from "@/components/shared/top-bar";
import LeftSidebar from "@/components/shared/left-sidebar";
import RightSidebar from "@/components/shared/right-sidebar";
import BottomBar from "@/components/shared/bottom-bar";
import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Threads",
  description: "A Threads Application Social Media App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          <TopBar />
          <main className={"flex flex-row"}>
            <LeftSidebar />
            <section className="main-container">
              <div className={"w-full max-w-4xl"}>{children}</div>
            </section>
            <RightSidebar />
          </main>
          <BottomBar />
        </ClerkProvider>
      </body>
    </html>
  );
}
