"use client";

import { Fragment } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type NavigationItem = {
  name: string;
  href: string;
  children?: NavigationItem[];
};

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
};

export default function MobileNav({ isOpen, onClose, navigation }: MobileNavProps) {
  const pathname = usePathname();
  
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 lg:hidden" onClose={onClose}>
        {/* Backdrop */}
        <TransitionChild as={Fragment}>
          <div 
            className="fixed inset-0 bg-[#4F5554]/50 transition duration-300 ease-in-out data-closed:opacity-0" 
          />
        </TransitionChild>

        <div className="fixed inset-0 z-50 flex">
          {/* Sidebar */}
          <TransitionChild as={Fragment}>
            <DialogPanel 
              className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-[#FCFAEF] dark:bg-[#2F3332] py-4 pb-12 shadow-xl transition duration-300 ease-in-out transform data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <Link href="/" onClick={onClose} className="flex items-center">
                  <Image
                    src="/images/logo.svg"
                    alt="Akomapa Health Foundation"
                    width={150}
                    height={30}
                    className="h-8 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  className="-mr-2 inline-flex items-center justify-center rounded-md p-2 text-[#757A79] dark:text-[#FCFAEF]/70 hover:bg-[#C37B1E]/10 hover:text-[#C37B1E] focus:outline-none"
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
                      className={`block px-3 py-2 text-base font-subheading font-bold rounded-md ${
                        pathname === item.href || pathname.startsWith(`${item.href}/`) 
                          ? 'bg-[#007A73]/10 dark:bg-[#007A73]/20 text-[#007A73] dark:text-[#FCFAEF]' 
                          : 'text-[#252828] dark:text-[#FCFAEF] hover:bg-[#C37B1E]/10 dark:hover:bg-[#C37B1E]/20 hover:text-[#C37B1E]'
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
                            onClick={onClose}
                            className={`block px-3 py-1.5 text-sm font-body rounded-md ${
                              pathname === child.href 
                                ? 'bg-[#007A73]/10 dark:bg-[#007A73]/20 text-[#007A73] dark:text-[#FCFAEF]' 
                                : 'text-[#252828] dark:text-[#FCFAEF] hover:bg-[#C37B1E]/10 dark:hover:bg-[#C37B1E]/20 hover:text-[#C37B1E]'
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
                    className="w-full bg-[#007A73] text-[#FCFAEF] hover:bg-[#C37B1E] hover:text-[#FCFAEF] font-subheading font-bold"
                  >
                    <Link href="/join" onClick={onClose}>Get Involved</Link>
                  </Button>
                  <Button 
                    className="w-full bg-[#C37B1E] text-[#FCFAEF] hover:bg-[#A36419] hover:text-[#FCFAEF] font-subheading font-bold"
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