import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="grid place-items-center">{children}</main>;
};

export default RootLayout;
