import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-skobeloff text-floralwhite">
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and mission */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <Image
                src="/images/logo-white.svg" 
                alt="Akomapa Health Foundation"
                width={200}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-floralwhite/80 mt-4 font-body">
              Improving health outcomes and access to quality healthcare through community-centered solutions.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-floralwhite hover:text-amber transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-floralwhite hover:text-amber transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-floralwhite hover:text-amber transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-floralwhite hover:text-amber transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link href="/about" className="text-floralwhite/80 hover:text-amber transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/programs" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-floralwhite/80 hover:text-amber transition-colors">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/donate" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Our Programs</h3>
            <ul className="space-y-2 font-body">
              <li>
                <Link href="/programs/community-clinics" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Community Clinics
                </Link>
              </li>
              <li>
                <Link href="/programs/health-education" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Health Education
                </Link>
              </li>
              <li>
                <Link href="/programs/medical-training" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Medical Training
                </Link>
              </li>
              <li>
                <Link href="/programs/research" className="text-floralwhite/80 hover:text-amber transition-colors">
                  Research Initiatives
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-heading font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4 font-body">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 text-amber flex-shrink-0 mt-0.5" />
                <span className="text-floralwhite/80">
                  123 Health Avenue, Accra, Ghana
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-amber flex-shrink-0" />
                <span className="text-floralwhite/80">+233 (0) 302 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-amber flex-shrink-0" />
                <a href="mailto:info@akomapa.org" className="text-floralwhite/80 hover:text-amber transition-colors">
                  info@akomapa.org
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-floralwhite/20 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-floralwhite/70 text-sm font-body">
            &copy; {currentYear} Akomapa Health Foundation. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-floralwhite/70 text-sm font-body hover:text-amber transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-floralwhite/70 text-sm font-body hover:text-amber transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}