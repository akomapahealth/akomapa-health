import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Newsletter from "@/components/shared/NewsLetter";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Newsletter />
      <Footer />
    </div>
  );
}