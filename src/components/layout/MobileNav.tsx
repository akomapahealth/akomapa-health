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
  type NavigationNode,
} from "@/config/navigation";

type MobileNavProps = {
  isOpen: boolean;
  onClose: () => void;
  navigation: readonly NavigationItem[];
};

function MobileNavigationNodes({
  items,
  pathname,
  onClose,
  depth = 0,
}: {
  items: readonly NavigationNode[];
  pathname: string;
  onClose: () => void;
  depth?: number;
}) {
  return (
    <div
      className={`space-y-1 border-l-2 pl-3 ${
        depth === 0
          ? "border-[#0097b2]/20 dark:border-[#66C4DC]/25"
          : "ml-3 border-[#0F4C5C]/12 dark:border-[#FCFAEF]/12"
      }`}
    >
      {items.map((item) =>
        isNavigationGroup(item) ? (
          <div key={item.name} className="space-y-1.5 py-1">
            <p
              className={`px-3 py-1 font-subheading text-sm font-semibold ${
                isNavigationItemActive(pathname, item)
                  ? "text-[#007F96] dark:text-[#66C4DC]"
                  : "text-[#3F4443] dark:text-[#FCFAEF]/85"
              }`}
            >
              {item.name}
            </p>
            <MobileNavigationNodes
              items={item.children}
              pathname={pathname}
              onClose={onClose}
              depth={depth + 1}
            />
          </div>
        ) : (
          <Link
            key={item.name}
            href={item.href}
            onClick={onClose}
            aria-current={
              isNavigationPathActive(pathname, item.href) ? "page" : undefined
            }
            className={`flex min-h-11 items-center rounded-md px-3 py-2 font-body text-sm leading-snug transition-colors ${
              isNavigationPathActive(pathname, item.href)
                ? "bg-[#0097b2]/10 font-medium text-[#007F96] dark:bg-[#66C4DC]/12 dark:text-[#66C4DC]"
                : "text-[#252828] hover:bg-[#eeba2b]/10 hover:text-[#8A6100] dark:text-[#FCFAEF] dark:hover:bg-[#eeba2b]/12 dark:hover:text-[#F5C94D]"
            }`}
          >
            {item.name}
          </Link>
        ),
      )}
    </div>
  );
}

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
              className="relative ml-auto flex h-full w-full max-w-[22rem] flex-col overflow-hidden border-l border-[#0F4C5C]/12 bg-[#FCFAEF] shadow-[-16px_0_40px_rgba(15,76,92,0.14)] dark:border-[#FCFAEF]/10 dark:bg-[#202423]"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-[#0F4C5C]/10 bg-[#FCFAEF]/96 px-5 py-4 backdrop-blur-xl dark:border-[#FCFAEF]/10 dark:bg-[#202423]/96">
                <Link href="/" onClick={onClose} className="flex items-center">
                  <BrandLogo href="" width={150} height={42} imageClassName="h-8" />
                </Link>
                <button
                  type="button"
                  className="-mr-2 inline-flex min-h-11 min-w-11 items-center justify-center rounded-md p-2 text-[#5F6463] transition-colors hover:bg-[#eeba2b]/10 hover:text-[#8A6100] focus:outline-none dark:text-[#FCFAEF]/70 dark:hover:bg-[#eeba2b]/12 dark:hover:text-[#F5C94D]"
                  onClick={onClose}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              <div className="flex-1 space-y-6 overflow-y-auto px-5 py-6">
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
                            ? "bg-[#0097b2]/10 text-[#007F96] dark:bg-[#66C4DC]/12 dark:text-[#66C4DC]"
                            : "text-[#252828] hover:bg-[#eeba2b]/10 hover:text-[#8A6100] dark:text-[#FCFAEF] dark:hover:bg-[#eeba2b]/12 dark:hover:text-[#F5C94D]"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ) : (
                      <p
                        className={`px-3 font-subheading text-xs font-bold uppercase leading-5 tracking-[0.14em] ${
                          isNavigationItemActive(pathname, item)
                            ? "text-[#007F96] dark:text-[#66C4DC]"
                            : "text-[#5F6463] dark:text-[#FCFAEF]/70"
                        }`}
                      >
                        {item.name}
                      </p>
                    )}
                    
                    {isNavigationGroup(item) && (
                      <MobileNavigationNodes
                        items={item.children}
                        pathname={pathname}
                        onClose={onClose}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="shrink-0 border-t border-[#0F4C5C]/10 bg-[#FCFAEF]/96 p-5 backdrop-blur-xl dark:border-[#FCFAEF]/10 dark:bg-[#202423]/96">
                <Button
                  asChild
                  className="min-h-12 w-full rounded-md bg-[#0097b2] font-subheading font-semibold text-[#FCFAEF] shadow-sm hover:bg-[#007F96] hover:text-[#FCFAEF]"
                >
                  <Link href="/donate" onClick={onClose}>Donate</Link>
                </Button>
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
