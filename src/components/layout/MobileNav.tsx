"use client";

import { Fragment, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import BrandLogo from "@/components/shared/BrandLogo";
import {
  isNavigationItemActive,
  isNavigationGroup,
  isNavigationPathActive,
  type NavigationItem,
} from "@/config/navigation";

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
  navigation: readonly NavigationItem[];
};

function MobileNavContent({ isOpen, onClose, navigation }: MobileNavProps) {
  const pathname = usePathname();
  
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50 xl:hidden"
        onClose={onClose}
      >
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
            as={Fragment}
            enter="transform transition ease-out duration-500"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-100"
            leave="transform transition ease-in duration-500"
            leaveFrom="translate-x-0 opacity-100"
            leaveTo="translate-x-full opacity-0"
          >
            <DialogPanel 
              className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-[#FCFAEF] dark:bg-[#2F3332] py-4 pb-12 shadow-xl"
            >
              <div className="flex items-center justify-between px-4">
                <Link href="/" onClick={onClose} className="flex items-center">
                  <BrandLogo href="" width={150} height={42} imageClassName="h-8" />
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

              <div className="mt-6 space-y-5 px-4">
                {navigation.map((item) => (
                  <div key={item.name} className="space-y-2">
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        aria-current={
                          isNavigationPathActive(pathname, item.href)
                            ? "page"
                            : undefined
                        }
                        className={`flex min-h-11 items-center rounded-md px-3 py-2.5 font-subheading text-[15px] font-medium leading-none ${
                          isNavigationItemActive(pathname, item)
                            ? "bg-[#0097b2]/10 text-[#0097b2] dark:bg-[#0097b2]/20 dark:text-[#FCFAEF]"
                            : "text-[#252828] hover:bg-[#eeba2b]/10 hover:text-[#eeba2b] dark:text-[#FCFAEF] dark:hover:bg-[#eeba2b]/20"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <p
                        className={`px-3 font-subheading text-xs font-bold uppercase leading-5 tracking-[0.14em] ${
                          isNavigationItemActive(pathname, item)
                            ? "text-[#0097b2] dark:text-[#66C4DC]"
                            : "text-[#5F6463] dark:text-[#FCFAEF]/70"
                        }`}
                      >
                        {item.name}
                      </p>
                    )}
                    
                    {isNavigationGroup(item) && (
                      <div className="space-y-1 border-l-2 border-[#0097b2]/20 pl-3 dark:border-[#66C4DC]/25">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={onClose}
                            aria-current={
                              isNavigationPathActive(pathname, child.href)
                                ? "page"
                                : undefined
                            }
                            className={`flex min-h-11 items-center rounded-md px-3 py-2 font-body text-sm leading-snug ${
                              isNavigationPathActive(pathname, child.href)
                                ? "bg-[#0097b2]/10 text-[#0097b2] dark:bg-[#0097b2]/20 dark:text-[#FCFAEF]"
                                : "text-[#252828] hover:bg-[#eeba2b]/10 hover:text-[#eeba2b] dark:text-[#FCFAEF] dark:hover:bg-[#eeba2b]/20"
                            }`}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="mt-4 space-y-3 border-t border-[#E6E7E7] pt-4 dark:border-[#757A79]">
                  <Button
                    asChild
                    className="min-h-12 w-full bg-[#0097b2] text-[#FCFAEF] hover:bg-[#0097b2]/80 hover:text-[#FCFAEF] font-subheading font-medium"
                  >
                    <Link href="/donate" onClick={onClose}>Donate</Link>
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
