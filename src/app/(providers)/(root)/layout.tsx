import { Toaster } from "@/components/ui/toaster";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="max-w-[1440px] mx-auto">
      {children}
      <Toaster />
    </main>
  );
};

export default RootLayout;
