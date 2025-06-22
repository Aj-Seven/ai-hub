"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings2,
  Menu,
  X,
  Activity,
  ScrollText,
  Info,
  Settings2Icon,
  BotMessageSquare,
} from "lucide-react";
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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CustomDialog } from "./ui/custom-dialog";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [apiStatus, setApiStatus] = useState<"loading" | "online" | "offline">(
    "loading"
  );

  const checkApiStatus = async () => {
    try {
      const response = await apiClient.getStatus();
      setApiStatus(response.ollamaStatus ? "online" : "offline");
    } catch {
      setApiStatus("offline");
    }
  };

  useEffect(() => {
    checkApiStatus();
  }, []);

  const navLinks = [
    { name: "Chat", href: "/chat", icon: BotMessageSquare },
    { name: "Prompts", href: "/prompts", icon: ScrollText },
    { name: "About", href: "/about", icon: Info },
  ];

  const renderApiStatus = () => {
    const tooltip =
      apiStatus === "online"
        ? "Ollama is Running..."
        : apiStatus === "offline"
        ? "Ollama is currently offline."
        : "Checking service status...";

    const color =
      apiStatus === "online"
        ? "text-green-500"
        : apiStatus === "offline"
        ? "text-red-500"
        : "text-gray-400";

    return (
      <Popover>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label="API Status"
            className="focus:outline-none cursor-pointer"
          >
            <Activity
              className={`h-6 w-6 ${
                apiStatus === "loading" ? "animate-spin" : "animate-pulse"
              } ${color}`}
            />
          </button>
        </PopoverTrigger>

        <PopoverContent
          side="bottom"
          align="center"
          className="w-auto px-3 py-2 rounded-md shadow border z-90"
        >
          {tooltip}
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <nav className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="max-w-7xl mx-auto px-3">
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
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer"
                >
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
                      className={`flex items-center gap-1 p-1 text-base font-medium transition hover:bg-foreground/20 rounded-md ${
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
                    <CustomDialog
                      title="Settings"
                      description="Manage settings for AI Hub"
                      triggerLabel="Settings"
                      icon={<Settings2Icon />}
                    >
                      <Settings />
                    </CustomDialog>
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
