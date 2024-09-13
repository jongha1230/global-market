const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex flex-col min-w-full min-h-screen justify-center items-center">
      {children}
    </main>
  );
};

export default MainLayout;
