"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Heart, Compass, User } from "lucide-react";

export function FloatingNavDock() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Projects", href: "/projects", icon: Compass },
    { label: "About", href: "/about", icon: Heart },
    { label: "Contact", href: "/contact", icon: User },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-40 px-4 flex justify-center pointer-events-none">
      <nav
        aria-label="Bottom Navigation Dock"
        className="pointer-events-auto bg-charcoal/95 backdrop-blur-xl border border-pure-white/10 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 shadow-2xl flex items-center space-x-3 sm:space-x-8"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center space-x-1.5 transition-all text-xs font-medium ${
                isActive
                  ? "text-pure-white bg-pure-white/20 px-3.5 py-1.5 rounded-full"
                  : "text-pure-white/60 hover:text-pure-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className={isActive ? "inline" : "hidden sm:inline"}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
