import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="max-w-[1440px] mx-auto">{children}</main>;
};

export default RootLayout;
