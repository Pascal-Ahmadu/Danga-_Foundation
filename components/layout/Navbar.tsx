"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Who We Are", href: "/who-we-are" },
  { name: "What We Do", href: "/what-we-do" },
  { name: "Scholarship", href: "/scholarship" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/98 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <div className="relative w-20 h-20 lg:w-28 lg:h-28">
              <Image
                src="/Logo.png"
                alt="Danga Memorial Foundation Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10 xl:space-x-12">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative text-sm lg:text-base font-medium uppercase tracking-wide transition-colors duration-200 ${
                  isActive(item.href)
                    ? "text-brand"
                    : "text-gray-700 hover:text-brand"
                }`}
              >
                {item.name}
                {/* Underline animation */}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-brand transition-all duration-300 ${
                    isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Donate Button */}
          <div className="hidden lg:block flex-shrink-0">
            <Link
              href="/donate"
              className="bg-brand text-white px-8 py-3 text-sm font-bold uppercase tracking-wide
                         hover:bg-brand/90 transition-all duration-200 focus:outline-none 
                         focus:ring-2 focus:ring-brand focus:ring-offset-2 transform hover:scale-105"
            >
              Donate
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="py-6 space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-base font-medium uppercase tracking-wide transition-colors duration-200 ${
                    isActive(item.href)
                      ? "text-brand"
                      : "text-gray-700 hover:text-brand"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/donate"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-brand text-white px-6 py-4 text-base font-bold uppercase tracking-wide
                           hover:bg-brand/90 transition-all duration-200 mt-6"
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
