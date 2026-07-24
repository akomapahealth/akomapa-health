const skipLinkClassName =
  "sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-[#0097b2] focus:px-4 focus:py-2 focus:font-subheading focus:font-medium focus:text-[#FCFAEF] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#eeba2b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#FCFAEF] dark:focus:bg-[#eeba2b] dark:focus:text-[#1C1F1E] dark:focus-visible:ring-[#F5C94D] dark:focus-visible:ring-offset-[#121514]";

export default function SkipToMainContent() {
  return (
    <a href="#main-content" className={skipLinkClassName}>
      Skip to main content
    </a>
  );
}
