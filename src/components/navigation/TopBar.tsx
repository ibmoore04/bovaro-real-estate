"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ChevronDown, Bell, MapPin, X } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

export function TopBar() {
  const [isLocationMenuOpen, setIsLocationMenuOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Dubai & UAE");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const locationMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (
        locationMenuRef.current &&
        !locationMenuRef.current.contains(event.target as Node)
      ) {
        setIsLocationMenuOpen(false);
      }
    }
    if (isLocationMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
      });
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isLocationMenuOpen]);

  const locations = [
    { name: "Dubai & UAE", tag: "All Emirates" },
    { name: "Dubai", tag: "Business Bay, Downtown, Dubailand" },
    { name: "Ras Al Khaimah", tag: "Al Marjan Island" },
    { name: "Abu Dhabi", tag: "Sobha City" },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-pure-white/95 backdrop-blur-md border-b border-charcoal/5 px-3.5 sm:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          {/* Left Menu / Brand Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
            <button
              type="button"
              onClick={() => setIsMenuOpen(true)}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-light-grey hover:bg-soft-sage active:bg-soft-sage/80 text-charcoal flex items-center justify-center transition-all shrink-0 cursor-pointer active:scale-95 touch-manipulation select-none"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5 pointer-events-none" />
            </button>

            <Link href="/" className="flex items-center shrink-0">
              <Image
                src="/branding/logo.png"
                alt="Bovaro Real Estate"
                width={128}
                height={34}
                className="h-6 sm:h-8 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Center Location Dropdown matching reference */}
          <div ref={locationMenuRef} className="relative shrink min-w-0">
            <button
              type="button"
              onClick={() => setIsLocationMenuOpen(!isLocationMenuOpen)}
              className="inline-flex items-center space-x-1 sm:space-x-1.5 px-3 py-1.5 rounded-full bg-light-grey hover:bg-soft-sage text-charcoal text-[11px] sm:text-xs font-medium transition-colors max-w-full"
              aria-expanded={isLocationMenuOpen}
            >
              <MapPin className="w-3.5 h-3.5 text-deep-emerald shrink-0" />
              <span className="truncate max-w-[85px] sm:max-w-none">{selectedLocation}</span>
              <ChevronDown className="w-3 h-3 text-charcoal/60 shrink-0" />
            </button>

            {isLocationMenuOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 bg-pure-white border border-charcoal/10 rounded-2xl shadow-xl p-2 z-50">
                <span className="block px-3 py-1.5 text-[10px] uppercase font-semibold text-charcoal/40 tracking-wider">
                  Select Operating Emirate
                </span>
                {locations.map((loc) => (
                  <button
                    key={loc.name}
                    type="button"
                    onClick={() => {
                      setSelectedLocation(loc.name);
                      setIsLocationMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex flex-col transition-colors ${
                      selectedLocation === loc.name
                        ? "bg-soft-sage/70 text-deep-emerald font-semibold"
                        : "hover:bg-light-grey text-charcoal"
                    }`}
                  >
                    <span>{loc.name}</span>
                    <span className="text-[10px] text-charcoal/50 font-normal">
                      {loc.tag}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Notification Bell matching reference */}
          <div className="flex items-center space-x-2">
            <Link
              href="/contact"
              className="w-10 h-10 rounded-full bg-light-grey hover:bg-soft-sage text-charcoal flex items-center justify-center transition-colors relative"
              aria-label="Direct Consultations"
            >
              <Bell className="w-4 h-4 text-charcoal" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-deep-emerald" />
            </Link>
          </div>
        </div>
      </header>

      {/* Slide-out Menu Drawer */}
      {isMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex bg-charcoal/60 backdrop-blur-xs"
        >
          <div className="w-full max-w-sm bg-pure-white h-full p-6 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-charcoal/10">
                <Link href="/" onClick={() => setIsMenuOpen(false)}>
                  <Image
                    src="/branding/logo.png"
                    alt="Bovaro Real Estate"
                    width={136}
                    height={38}
                    className="h-8 w-auto object-contain"
                  />
                </Link>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="w-8 h-8 rounded-full bg-light-grey flex items-center justify-center text-charcoal hover:bg-soft-sage transition-colors"
                  aria-label="Close Menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="mt-8 space-y-4">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-lg font-light text-charcoal hover:text-deep-emerald transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/projects"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-lg font-light text-charcoal hover:text-deep-emerald transition-colors"
                >
                  All Developments
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-lg font-light text-charcoal hover:text-deep-emerald transition-colors"
                >
                  About Bovaro
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-lg font-light text-charcoal hover:text-deep-emerald transition-colors"
                >
                  Private Consultation
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-charcoal/10 text-xs text-charcoal/60 space-y-2.5">
              <p className="font-semibold text-charcoal">Downtown Dubai, UAE</p>
              <a
                href="https://wa.me/971567212983"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick("general", "header")}
                className="block text-deep-emerald font-medium hover:underline"
              >
                Direct WhatsApp: +971 56 721 2983
              </a>
              <a
                href="tel:+971567212983"
                className="block hover:text-deep-emerald"
              >
                Direct Phone: +971 56 721 2983
              </a>
              <p>Client Desk: enquiries@bovarorealestate.com</p>
            </div>
          </div>

          <div
            className="flex-1"
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
        </div>
      )}
    </>
  );
}

