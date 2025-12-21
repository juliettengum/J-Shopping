"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { MenuIcon, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import MenuDropdown from "@/components/menu-dropdown";
import MenuNavigation from "@/components/menu-navigation";
import type { NavigationSection } from "@/components/menu-navigation";
import { ThemeSwitcher } from "@/components/theme-switcher";

import { cn } from "@/lib/utils";

import Logo from "@/components/layout/Logo";

type HeaderProps = {
  navigationData: NavigationSection[];
  className?: string;
};

const Header = ({ navigationData, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 w-full rounded-xl transition-all duration-300",
        {
          "bg-card/75 backdrop-blur": isScrolled,
        },
        className
      )}
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/">
          <Logo className="gap-3" />
        </Link>

        {/* Navigation */}
        <MenuNavigation
          navigationData={navigationData}
          className="grow max-md:hidden"
        />

        {/* Desktop Actions */}
        <div className="flex items-center gap-3 max-md:hidden">
          {/* Cart Icon */}
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-lg"
            asChild
          >
            <a href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <Badge
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                variant="destructive"
              >
                0
              </Badge>
              <span className="sr-only">Shopping Cart</span>
            </a>
          </Button>

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Login Button */}
          <Button className="rounded-lg" asChild>
            <a href="/login">Login</a>
          </Button>
        </div>

        {/* Mobile Actions */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Cart Icon */}
          <Button
            variant="outline"
            size="icon"
            className="relative rounded-lg"
            asChild
          >
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <Badge
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                variant="destructive"
              >
                0
              </Badge>
              <span className="sr-only">Shopping Cart</span>
            </Link>
          </Button>

          {/* Theme Switcher */}
          <ThemeSwitcher />

          {/* Login Button */}
          <Button className="rounded-lg" asChild>
            <Link href="/login">Login</Link>
          </Button>

          {/* Menu Dropdown */}
          <MenuDropdown
            align="end"
            navigationData={navigationData}
            trigger={
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden rounded-lg"
              >
                <MenuIcon />
                <span className="sr-only">Menu</span>
              </Button>
            }
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
