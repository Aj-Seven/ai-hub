"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings2, Menu, X, Activity, ScrollText, Info } from "lucide-react";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Settings from "./Settings";
import { apiClient } from "@/lib/api-client";
import Image from "next/image";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState<"loading" | "online" | "offline">(
    "loading"
  );

  const checkApiStatus = async () => {
    try {
      const response = await apiClient.getStatus();
      setApiStatus(response.success ? "online" : "offline");
    } catch {
      setApiStatus("offline");
    }
  };

  useEffect(() => {
    checkApiStatus();
  }, []);

  const navLinks = [
    { name: "Prompts", href: "/prompts", icon: ScrollText },
    { name: "About", href: "/about", icon: Info },
  ];

  const renderApiStatus = () => {
    switch (apiStatus) {
      case "online":
        return <Activity className="h-4 w-4 text-green-500" />;
      case "offline":
        return <Activity className="h-4 w-4 text-red-500" />;
      case "loading":
      default:
        return <Activity className="h-4 w-4 animate-spin text-gray-400" />;
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <div className="rounded-lg">
              <Image
                src="/assets/logo-nobg.png"
                alt="AI Hub Logo"
                width={42}
                height={42}
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              AI Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-1 font-medium transition hover:bg-gray-800 rounded-md p-1 ${
                  pathname === link.href
                    ? "text-blue-600"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                <link.icon className="h-4 w-4" />
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-4">
            {/* API status */}
            {renderApiStatus()}

            {/* Settings Drawer */}
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings2 />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="p-3 max-w-3xl mx-auto">
                <Settings />
              </DrawerContent>
            </Drawer>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center ">
            <div className="mr-2 flex items-center justify-center">
              {renderApiStatus()}
            </div>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  {mobileOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-[250px] p-3">
                <SheetTitle className="text-xl mb-2">Menu</SheetTitle>
                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-1 p-1 text-base font-medium transition hover:bg-gray-800 rounded-md ${
                        pathname === link.href
                          ? "text-blue-600"
                          : "text-gray-800 dark:text-gray-200"
                      }`}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.name}
                    </Link>
                  ))}

                  <div className="pt-3 border-t border-muted">
                    <Drawer>
                      <DrawerTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-start gap-2"
                        >
                          <Settings2 className="h-5 w-5" />
                          Settings
                        </Button>
                      </DrawerTrigger>
                      <DrawerContent className="p-4 max-w-3xl mx-auto">
                        <Settings />
                      </DrawerContent>
                    </Drawer>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
