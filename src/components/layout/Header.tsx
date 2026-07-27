"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MobileNav from "./MobileNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import BrandLogo from "@/components/shared/BrandLogo";
import {
  isNavigationItemActive,
  isNavigationGroup,
  isNavigationPathActive,
  mainNavigation,
  type NavigationGroup,
} from "@/config/navigation";

const navLinkClass = (isActive: boolean) =>
  `flex items-center gap-1 whitespace-nowrap text-[13px] 2xl:text-sm font-subheading font-medium leading-none transition-colors hover:text-[#eeba2b] dark:hover:text-[#eeba2b] ${
    isActive ? "text-[#0097b2]" : "text-[#2F3332] dark:text-[#FCFAEF]"
  }`;

const dropdownPanelClass =
  "w-56 rounded-md shadow-lg bg-[#FCFAEF] dark:bg-[#2F3332] ring-1 ring-[#C1C3C3] ring-opacity-5 dark:ring-[#FCFAEF] dark:ring-opacity-10";

const dropdownItemClass = (isActive: boolean) =>
  `block px-4 py-2 text-sm font-body cursor-pointer ${
    isActive
      ? "bg-[#0097b2]/10 dark:bg-[#0097b2]/20 text-[#0097b2] dark:text-[#FCFAEF]"
      : "text-[#2F3332] dark:text-[#FCFAEF] hover:bg-[#eeba2b]/10 dark:hover:bg-[#eeba2b]/20 hover:text-[#eeba2b]"
  }`;

function NavDropdown({
  item,
  pathname,
}: {
  item: NavigationGroup;
  pathname: string;
}) {
  const isActive = isNavigationItemActive(pathname, item);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={navLinkClass(isActive)}
          aria-haspopup="menu"
        >
          {item.name}
          <ChevronDown className="h-4 w-4" aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className={dropdownPanelClass}>
        {item.children!.map((child) => (
          <DropdownMenuItem key={child.name} asChild>
            <Link
              href={child.href}
              aria-current={
                isNavigationPathActive(pathname, child.href)
                  ? "page"
                  : undefined
              }
              className={dropdownItemClass(
                isNavigationPathActive(pathname, child.href),
              )}
            >
              {child.name}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HeaderContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#FCFAEF] shadow-md py-2 dark:bg-[#121514]"
          : "bg-[#FCFAEF]/80 backdrop-blur-md py-4 dark:bg-[#121514]/90"
      }`}
    >
      <div className="site-container mx-auto px-4">
        <div className="flex items-center gap-4">
          <BrandLogo className="flex-shrink-0" priority />

          <div className="ml-auto hidden items-center gap-4 min-[1360px]:flex 2xl:gap-8">
            <nav className="flex items-center gap-x-2.5 2xl:gap-5" aria-label="Main">
              {mainNavigation.map((item) =>
                isNavigationGroup(item) ? (
                  <NavDropdown key={item.name} item={item} pathname={pathname} />
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    aria-current={
                      isNavigationPathActive(pathname, item.href)
                        ? "page"
                        : undefined
                    }
                    className={navLinkClass(isNavigationItemActive(pathname, item))}
                  >
                    {item.name}
                  </Link>
                )
              )}
            </nav>

            <div className="flex items-center gap-2.5">
              <Button
                asChild
                className="bg-[#0097b2] px-4 text-[#FCFAEF] hover:bg-[#0097b2]/80 hover:text-[#FCFAEF] font-subheading font-medium"
              >
                <Link href="/donate">Donate</Link>
              </Button>
              <ThemeToggle />
            </div>
          </div>

          <div className="ml-auto flex items-center space-x-2 min-[1360px]:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#2F3332] dark:text-[#FCFAEF] hover:text-[#eeba2b] hover:bg-[#eeba2b]/10 dark:hover:bg-[#eeba2b]/20 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={mainNavigation}
      />
    </header>
  );
}

export default function Header() {
  return (
    <Suspense
      fallback={
        <header className="sticky top-0 z-50 w-full bg-[#FCFAEF] dark:bg-[#121514] py-4">
          <div className="site-container mx-auto px-4">
            <div className="flex items-center">
              <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-12 w-48 rounded"></div>
              <div className="ml-auto hidden items-center space-x-4 min-[1360px]:flex">
                <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 w-32 rounded"></div>
              </div>
            </div>
          </div>
        </header>
      }
    >
      <HeaderContent />
    </Suspense>
  );
}
