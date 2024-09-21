import Header from "@/components/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="">
      <Header />
      <div className="flex flex-col items-center justify-center">
        {children}
      </div>
    </main>
  );
};

export default MainLayout;
