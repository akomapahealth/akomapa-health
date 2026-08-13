import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipToMainContent from "@/components/layout/SkipToMainContent";
import ImmersionInterestProvider from "@/components/immersion/ImmersionInterestProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ImmersionInterestProvider>
      <div className="flex flex-col min-h-screen">
        <SkipToMainContent />
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-grow outline-none">
          {children}
        </main>
        <Footer />
      </div>
    </ImmersionInterestProvider>
  );
}
