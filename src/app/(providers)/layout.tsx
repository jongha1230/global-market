import QueryProvider from "@/provider/QueryProvider";

const ProvidersLayout = ({ children }: { children: React.ReactNode }) => {
  return <QueryProvider>{children}</QueryProvider>;
};

export default ProvidersLayout;
