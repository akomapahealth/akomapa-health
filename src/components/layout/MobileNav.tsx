"use client";

import { Fragment, Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/ThemeProvider";

type NavigationItem = {
  name: string;
  href: string;
  children?: NavigationItem[];
  onClick?: (e: React.MouseEvent) => void;
};

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
};

function MobileNavContent({ isOpen, onClose, navigation }: MobileNavProps) {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      if (theme === "system") {
        setIsDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
      } else {
        setIsDark(theme === "dark");
      }
    };
    checkTheme();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", checkTheme);
    return () => mediaQuery.removeEventListener("change", checkTheme);
  }, [theme]);
  
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 xl:hidden" onClose={onClose}>
        {/* Backdrop */}
        <TransitionChild 
          as={Fragment}
          enter="transition-opacity ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div 
            className="fixed inset-0 bg-[#4F5554]/50" 
          />
        </TransitionChild>

        <div className="fixed inset-0 z-50 flex">
          {/* Sidebar */}
          <TransitionChild 
            as="div"
            className="relative ml-auto flex h-full w-full max-w-xs"
            enter="transform transition ease-out duration-500"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transform transition ease-in duration-500"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
          >
            <DialogPanel 
              className="flex h-full w-full flex-col overflow-y-auto bg-[#FCFAEF] dark:bg-[#2F3332] py-4 pb-12 shadow-xl"
            >
              <div className="flex items-center justify-between px-4">
                <Link href="/" onClick={onClose} className="flex items-center">
                  <Image
                    src={isDark ? "/images/akomapa-logo-dark.png" : "/images/akomapa-logo.png"}
                    alt="Akomapa Health Foundation"
                    width={150}
                    height={30}
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <button
                  type="button"
                  className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-[#757A79] dark:text-[#FCFAEF]/70 hover:bg-[#eeba2b]/10 hover:text-[#eeba2b] focus:outline-none"
                  onClick={onClose}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="mt-6 px-4 space-y-3">
                {navigation.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <Link 
                      href={item.href}
                      onClick={onClose}
                      className={`block px-3 py-2 text-base font-subheading font-medium rounded-md ${
                        pathname === item.href || pathname.startsWith(`${item.href}/`) 
                          ? 'bg-[#0097b2]/10 dark:bg-[#0097b2]/20 text-[#0097b2] dark:text-[#FCFAEF]' 
                          : 'text-[#252828] dark:text-[#FCFAEF] hover:bg-[#eeba2b]/10 dark:hover:bg-[#eeba2b]/20 hover:text-[#eeba2b]'
                      }`}
                    >
                      {item.name}
                    </Link>
                    
                    {item.children && (
                      <div className="pl-4 space-y-1 border-l-2 border-[#E6E7E7] dark:border-[#757A79]">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={(e) => {
                              if (child.onClick) {
                                child.onClick(e);
                              }
                              onClose();
                            }}
                            className={`block px-3 py-1.5 text-sm font-body rounded-md ${
                              pathname === child.href 
                                ? 'bg-[#0097b2]/10 dark:bg-[#0097b2]/20 text-[#0097b2] dark:text-[#FCFAEF]' 
                                : 'text-[#252828] dark:text-[#FCFAEF] hover:bg-[#eeba2b]/10 dark:hover:bg-[#eeba2b]/20 hover:text-[#eeba2b]'
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="pt-4 mt-4 border-t border-[#E6E7E7] dark:border-[#757A79] space-y-3">
                  <Button 
                    className="w-full bg-[#0097b2] text-[#FCFAEF] hover:bg-[#0097b2]/80 hover:text-[#FCFAEF] font-subheading font-medium"
                  >
                    <Link href="/partner" onClick={onClose}>Partner With Us</Link>
                  </Button>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  );
}

export default function MobileNav(props: MobileNavProps) {
  return (
    <Suspense fallback={null}>
      <MobileNavContent {...props} />
    </Suspense>
  );
}