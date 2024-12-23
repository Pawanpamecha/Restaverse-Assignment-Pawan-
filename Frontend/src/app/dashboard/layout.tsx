import Navbar from "@/components/Navbar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
