"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useTheme } from "@/components/theme/ThemeProvider";

// Navigation structure
const navigation = [
  { name: "Home", href: "/" },
  { 
    name: "About", 
    href: "/about",
    children: [
      { 
        name: "Our Mission", 
        href: "/#mission", 
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          const currentPath = window.location.pathname;
          if (currentPath !== '/') {
            window.location.href = '/#mission';
          } else {
            const missionSection = document.getElementById('mission');
            if (missionSection) {
              missionSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      },
      { name: "Our Team", href: "/about/team" },
      // { 
      //   name: "Our Science", 
      //   href: "/research", 
      //   onClick: (e: React.MouseEvent) => {
      //     e.preventDefault();
      //     const currentPath = window.location.pathname;
      //     if (currentPath !== '/') {
      //       window.location.href = '/research';
      //     } else {
      //       const researchSection = document.getElementById('research');
      //       if (researchSection) {
      //         researchSection.scrollIntoView({ behavior: 'smooth' });
      //       }
      //     }
      //   }
      // },
      { 
        name: "Our Partners", 
        href: "/#research", 
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          const currentPath = window.location.pathname;
          if (currentPath !== '/') {
            window.location.href = '/#research';
          } else {
            const researchSection = document.getElementById('research');
            if (researchSection) {
              researchSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      },
    ]
  },
  { 
    name: "Our Clinics", 
    href: "/clinics",
    children: [
      { name: "Akomapa UCC", href: "/clinics/akomapa-ucc" },
      { name: "Akomapa UG", href: "/clinics/akomapa-ug" },
      { name: "Akomapa - NHP, Yale", href: "/clinics/akomapa-nhp" },
    ]
  },
  { 
    name: "Our Programs", 
    href: "/programs",
    children: [
      { name: "The Akomapa Network", href: "/programs/akomapa-network" },
      { name: "Akomapa GHLTP", href: "/programs/akomapa-ghltp" },
      { name: "Akomapa GHIP", href: "/programs/akomapa-ghip" },
      { name: "Akomapa Young Advocates", href: "/programs/akomapa-young-advocates" },
      { name: "Akomapa Foods", href: "/programs/akomapa-foods" },
    ]
  },
  { name: "Our Science", href: "/research" },
  { name: "Get Involved", href: "/join" },
  { name: "Contact", href: "/contact" },
];

function HeaderContent() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-[#FCFAEF] shadow-md py-2 dark:bg-[#4F5554]' : 'bg-[#FCFAEF]/80 backdrop-blur-md py-4 dark:bg-[#4F5554]/90'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <Image
              src={isDark ? "/images/akomapa-logo-dark.png" : "/images/akomapa-logo.png"}
              alt="Akomapa Health Foundation Logo"
              width={250}
              height={70}
              className="h-12 w-auto object-contain"
              style={{ objectFit: 'contain', objectPosition: 'center' }}
            />
          </Link>

          {/* Desktop Navigation and Actions - Right Aligned */}
          <div className="hidden xl:flex items-center ml-auto space-x-8">
            {/* Desktop Navigation */}
            <nav className="flex items-center space-x-8">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  <Link 
                    href={item.href}
                    className={`flex items-center gap-1 text-md font-subheading font-medium transition-colors hover:text-[#eeba2b] dark:hover:text-[#eeba2b] ${
                      pathname === item.href || pathname.startsWith(`${item.href}/`) 
                        ? 'text-[#0097b2]' 
                        : 'text-[#2F3332] dark:text-[#FCFAEF]'
                    }`}
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                    )}
                  </Link>
                  
                  {/* Dropdown for items with children */}
                  {item.children && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#FCFAEF] dark:bg-[#2F3332] ring-1 ring-[#C1C3C3] ring-opacity-5 dark:ring-[#FCFAEF] dark:ring-opacity-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right">
                      <div className="py-1" role="menu" aria-orientation="vertical">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            onClick={child.onClick}
                            className={`block px-4 py-2 text-sm font-body ${
                              pathname === child.href 
                                ? 'bg-[#0097b2]/10 dark:bg-[#0097b2]/20 text-[#0097b2] dark:text-[#FCFAEF]' 
                                : 'text-[#2F3332] dark:text-[#FCFAEF] hover:bg-[#eeba2b]/10 dark:hover:bg-[#eeba2b]/20 hover:text-[#eeba2b]'
                            }`}
                            role="menuitem"
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Partner button and Theme Toggle */}
            <div className="flex items-center space-x-4">
              <Button 
                className="bg-[#0097b2] text-[#FCFAEF] hover:bg-[#0097b2]/80 hover:text-[#FCFAEF] font-subheading font-medium"
              >
                <Link href="/partner">Partner With Us</Link>
              </Button>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button - Right Aligned */}
          <div className="xl:hidden flex items-center ml-auto space-x-2">
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

      {/* Mobile Navigation */}
      <MobileNav 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
      />
    </header>
  );
}

export default function Header() {
  return (
    <Suspense fallback={
      <header className="sticky top-0 z-50 w-full bg-[#FCFAEF] dark:bg-[#4F5554] py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center">
            <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-12 w-48 rounded"></div>
            <div className="hidden xl:flex items-center ml-auto space-x-4">
              <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-10 w-32 rounded"></div>
            </div>
          </div>
        </div>
      </header>
    }>
      <HeaderContent />
    </Suspense>
  );
}