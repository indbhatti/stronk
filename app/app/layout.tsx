import Sidebar from "./(sidebar)/sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar />
      <div className="md:ml-[300px] ml-16">{children}</div>
    </>
  );
}
