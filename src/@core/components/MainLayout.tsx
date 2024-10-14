"use client";
import React from "react";
import Banner from "./Banner";

/**
 * MainLayout provides the main structure of the application, including the Banner, content section, and Modal.
 */

const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <main className="w-full">
    <Banner />
    <section className="w-full px-[4%] sm:px-0 ">{children}</section>
  </main>
);

export default MainLayout;
