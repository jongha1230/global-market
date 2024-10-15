import Header from "@/components/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <Header />
      <main className="flex flex-col items-center justify-center">
        {children}
      </main>
    </main>
  );
};

export default MainLayout;
