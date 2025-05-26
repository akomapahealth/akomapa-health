"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileNav from "./MobileNav";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

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
      { 
        name: "Our Research", 
        href: "/#why-it-matters", 
        onClick: (e: React.MouseEvent) => {
          e.preventDefault();
          const currentPath = window.location.pathname;
          if (currentPath !== '/') {
            window.location.href = '/#why-it-matters';
          } else {
            const whyItMattersSection = document.getElementById('why-it-matters');
            if (whyItMattersSection) {
              whyItMattersSection.scrollIntoView({ behavior: 'smooth' });
            }
          }
        }
      },
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
    name: "Programs", 
    href: "/programs",
    children: [
      { name: "Community Clinics", href: "/programs/community-clinics" },
      { name: "Health Education", href: "/programs/health-education" },
      { name: "Medical Training", href: "/programs/medical-training" },
      { name: "Research Initiatives", href: "/programs/research" },
    ]
  },
  // { 
  //   name: "Resources", 
  //   href: "/resources",
  //   children: [
  //     { name: "Educational Materials", href: "/resources/education" },
  //     { name: "Research Publications", href: "/resources/research" },
  //   ]
  // },
  // { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-300 ${
      isScrolled ? 'bg-[#FCFAEF] shadow-md py-2 dark:bg-[#4F5554]' : 'bg-[#FCFAEF]/80 backdrop-blur-md py-4 dark:bg-[#4F5554]/90'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/akomapa.png"
              alt="Akomapa Health Foundation Logo"
              width={250}
              height={70}
              className="h-12 w-auto object-contain"
              style={{ objectFit: 'contain', objectPosition: 'center' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link 
                  href={item.href}
                  className={`text-md font-subheading font-bold transition-colors hover:text-[#C37B1E] dark:hover:text-[#C37B1E] ${
                    pathname === item.href || pathname.startsWith(`${item.href}/`) 
                      ? 'text-[#007A73]' 
                      : 'text-[#2F3332] dark:text-[#FCFAEF]'
                  }`}
                >
                  {item.name}
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
                              ? 'bg-[#007A73]/10 dark:bg-[#007A73]/20 text-[#007A73] dark:text-[#FCFAEF]' 
                              : 'text-[#2F3332] dark:text-[#FCFAEF] hover:bg-[#C37B1E]/10 dark:hover:bg-[#C37B1E]/20 hover:text-[#C37B1E]'
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

          {/* Contact button and Theme Toggle */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              className="bg-[#007A73] text-[#FCFAEF] hover:bg-[#C37B1E] hover:text-[#FCFAEF] font-subheading font-bold"
            >
              <Link href="/join">Get Involved</Link>
            </Button>
            <Button 
              className="bg-[#C37B1E] text-[#FCFAEF] hover:bg-[#A36419] hover:text-[#FCFAEF] font-subheading font-bold"
            >
              <Link href="/donate">Donate</Link>
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#2F3332] dark:text-[#FCFAEF] hover:text-[#C37B1E] hover:bg-[#C37B1E]/10 dark:hover:bg-[#C37B1E]/20 focus:outline-none"
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