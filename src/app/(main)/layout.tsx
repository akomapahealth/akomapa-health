import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SkipToMainContent from "@/components/layout/SkipToMainContent";
import IntakeDialogProvider from "@/components/intake/IntakeDialogProvider";
import IntakeFormDialogProvider from "@/components/intake/IntakeFormDialogProvider";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IntakeDialogProvider>
      <IntakeFormDialogProvider>
        <div className="flex flex-col min-h-screen">
          <SkipToMainContent />
          <Header />
          <main
            id="main-content"
            tabIndex={-1}
            className="flex-grow outline-none"
          >
            {children}
          </main>
          <Footer />
        </div>
      </IntakeFormDialogProvider>
    </IntakeDialogProvider>
  );
}
