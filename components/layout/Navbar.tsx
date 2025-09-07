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
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        isScrolled 
          ? "bg-white shadow-md transform translate-y-0" 
          : "bg-white/98 backdrop-blur-sm transform translate-y-0"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 lg:h-28">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 group">
            <div className="relative w-20 h-20 lg:w-28 lg:h-28 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/Logo.png"
                alt="Danga Memorial Foundation Logo"
                fill
                className="object-contain transition-opacity duration-300 group-hover:opacity-90"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10 xl:space-x-12">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group relative text-sm lg:text-base font-medium uppercase tracking-wide 
                           transition-all duration-300 ease-out transform hover:-translate-y-0.5
                           animate-in slide-in-from-top-4 fade-in-0 ${
                  isActive(item.href)
                    ? "text-brand scale-105"
                    : "text-gray-700 hover:text-brand hover:scale-105"
                }`}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationDuration: '600ms',
                }}
              >
                {item.name}
                {/* Underline animation with enhanced effects */}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-brand to-brand/70 
                             transition-all duration-300 ease-out ${
                    isActive(item.href) 
                      ? "w-full opacity-100 shadow-sm" 
                      : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100 group-hover:shadow-sm"
                  }`}
                />
                {/* Glow effect on hover */}
                <span
                  className={`absolute inset-0 rounded transition-all duration-300 ${
                    isActive(item.href)
                      ? "bg-brand/5"
                      : "bg-transparent group-hover:bg-brand/5"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* Donate Button */}
          <div className="hidden lg:block flex-shrink-0">
            <Link
              href="/donate"
              className="relative bg-brand text-white px-8 py-3 text-sm font-bold uppercase tracking-wide
                         hover:bg-brand/90 transition-all duration-300 ease-out focus:outline-none 
                         focus:ring-2 focus:ring-brand focus:ring-offset-2 transform hover:scale-105
                         hover:-translate-y-0.5 hover:shadow-lg active:scale-95
                         before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent 
                         before:via-white/20 before:to-transparent before:-skew-x-12 before:-translate-x-full
                         before:transition-transform before:duration-700 hover:before:translate-x-full
                         before:z-10 overflow-hidden"
            >
              <span className="relative z-20">Donate</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 transition-all duration-200 
                       transform hover:scale-110 active:scale-95 rounded-lg"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6">
              <Menu 
                className={`absolute h-6 w-6 text-gray-700 transition-all duration-300 
                           ${isOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`} 
              />
              <X 
                className={`absolute h-6 w-6 text-gray-700 transition-all duration-300 
                           ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-180 scale-0'}`} 
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
        isOpen 
          ? "max-h-96 opacity-100" 
          : "max-h-0 opacity-0"
      }`}>
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="py-6 space-y-4">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-base font-medium uppercase tracking-wide 
                             transition-all duration-300 ease-out py-2 px-4 -mx-4 rounded-lg
                             transform hover:translate-x-2 hover:bg-gray-50 ${
                    isActive(item.href)
                      ? "text-brand bg-brand/5 border-l-4 border-brand"
                      : "text-gray-700 hover:text-brand"
                  }`}
                  style={{
                    animationDelay: isOpen ? `${index * 100}ms` : '0ms',
                    transform: isOpen ? 'translateX(0)' : 'translateX(-20px)',
                    transition: `all 0.3s ease-out ${index * 50}ms`,
                  }}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/donate"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-brand text-white px-6 py-4 text-base 
                           font-bold uppercase tracking-wide hover:bg-brand/90 transition-all 
                           duration-300 ease-out mt-6 rounded-lg transform hover:scale-105
                           hover:shadow-lg active:scale-95"
                style={{
                  animationDelay: isOpen ? `${navigation.length * 100}ms` : '0ms',
                  transform: isOpen ? 'scale(1)' : 'scale(0.95)',
                  transition: `all 0.3s ease-out ${navigation.length * 50}ms`,
                }}
              >
                Donate
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}