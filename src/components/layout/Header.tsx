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
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
  type NavigationNode,
} from "@/config/navigation";

const navLinkClass = (isActive: boolean) =>
  `relative flex min-h-11 items-center gap-1.5 whitespace-nowrap rounded-md px-2 font-subheading text-sm font-medium leading-none transition-colors after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:bg-[#0097b2] after:transition-transform hover:bg-[#eeba2b]/8 hover:text-[#9A6A00] dark:hover:bg-[#eeba2b]/10 dark:hover:text-[#F5C94D] ${
    isActive
      ? "bg-[#0097b2]/8 text-[#007F96] after:scale-x-100 dark:bg-[#66C4DC]/10 dark:text-[#66C4DC]"
      : "text-[#2F3332] dark:text-[#FCFAEF]"
  }`;

const dropdownPanelClass =
  "min-w-64 rounded-lg border border-[#0F4C5C]/12 bg-[#FCFAEF] p-1.5 shadow-[0_18px_45px_rgba(15,76,92,0.16)] dark:border-[#FCFAEF]/10 dark:bg-[#202423]";

const dropdownItemClass = (isActive: boolean) =>
  `flex min-h-11 items-center rounded-md px-3.5 py-2.5 text-sm font-body cursor-pointer outline-none transition-colors ${
    isActive
      ? "bg-[#0097b2]/10 text-[#007F96] dark:bg-[#66C4DC]/12 dark:text-[#66C4DC]"
      : "text-[#2F3332] hover:bg-[#eeba2b]/10 hover:text-[#8A6100] dark:text-[#FCFAEF] dark:hover:bg-[#eeba2b]/12 dark:hover:text-[#F5C94D]"
  }`;

function NavDropdownNode({
  item,
  pathname,
}: {
  item: NavigationNode;
  pathname: string;
}) {
  const isActive = isNavigationItemActive(pathname, item);

  if (isNavigationGroup(item)) {
    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className={dropdownItemClass(isActive)}>
          {item.name}
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent
          sideOffset={6}
          className={dropdownPanelClass}
        >
          {item.children.map((child) => (
            <NavDropdownNode
              key={child.name}
              item={child}
              pathname={pathname}
            />
          ))}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    );
  }

  return (
    <DropdownMenuItem asChild>
      <Link
        href={item.href}
        aria-current={
          isNavigationPathActive(pathname, item.href) ? "page" : undefined
        }
        className={dropdownItemClass(isActive)}
      >
        {item.name}
      </Link>
    </DropdownMenuItem>
  );
}

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
        {item.children.map((child) => (
          <NavDropdownNode
            key={child.name}
            item={child}
            pathname={pathname}
          />
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
      className={`sticky top-0 z-50 w-full border-b border-[#0F4C5C]/10 backdrop-blur-xl transition-all duration-300 dark:border-[#FCFAEF]/10 ${
        isScrolled
          ? "bg-[#FCFAEF]/98 py-2 shadow-[0_8px_24px_rgba(15,76,92,0.08)] dark:bg-[#121514]/98"
          : "bg-[#FCFAEF]/94 py-3 dark:bg-[#121514]/94"
      }`}
    >
      <div className="site-container mx-auto px-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 2xl:gap-10">
          <BrandLogo className="flex-shrink-0" priority />

          <nav
            className="hidden items-center justify-self-center gap-x-3 xl:flex 2xl:gap-x-5"
            aria-label="Main"
          >
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

          <div className="col-start-3 hidden items-center gap-2.5 xl:flex">
            <Button
              asChild
              className="min-h-11 rounded-md bg-[#0097b2] px-5 font-subheading font-semibold text-[#FCFAEF] shadow-sm hover:bg-[#007F96] hover:text-[#FCFAEF]"
            >
              <Link href="/donate">Donate</Link>
            </Button>
            <ThemeToggle />
          </div>

          <div className="col-start-3 flex items-center space-x-2 xl:hidden">
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
              <div className="ml-auto hidden items-center space-x-4 xl:flex">
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
