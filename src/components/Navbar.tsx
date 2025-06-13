"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Activity,
  AlertCircle,
  RefreshCw,
  Settings2,
} from "lucide-react";
import { apiClient } from "@/lib/api-client";
import { Label } from "@/components/ui/label";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import Settings from "./Settings";
import Link from "next/link";

export default function Navbar() {
  const [apiStatus, setApiStatus] = useState<"loading" | "online" | "offline">(
    "loading"
  );
  const [availableProviders, setAvailableProviders] = useState<string[]>([]);

  const checkApiStatus = async () => {
    try {
      const response = await apiClient.getStatus();
      if (response.success) {
        setApiStatus("online");
        setAvailableProviders(response.providers || []);
      } else {
        setApiStatus("offline");
      }
    } catch (error) {
      setApiStatus("offline");
    }
  };

  useEffect(() => {
    checkApiStatus();
  }, []);

  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo & Title */}
          <Link href="/" className="flex items-center space-x-1">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mt-auto">
              AI Hub
            </h1>
          </Link>

          {/* Status + Settings */}
          <div className="flex items-center space-x-4">
            {/* API Status */}
            <div className="flex items-center space-x-2">
              <div
                className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs ${
                  apiStatus === "online"
                    ? "bg-green-100 text-green-800"
                    : apiStatus === "offline"
                    ? "bg-red-100 text-red-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {apiStatus === "online" ? (
                  <>
                    <Activity className="h-3 w-3" />
                    <span>Online</span>
                    {availableProviders.length > 0 && (
                      <Label>{availableProviders.length}</Label>
                    )}
                  </>
                ) : apiStatus === "offline" ? (
                  <>
                    <AlertCircle className="h-3 w-3" />
                    <span>Offline</span>
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    <span>Checking...</span>
                  </>
                )}
              </div>
            </div>

            {/* Settings Drawer Trigger */}
            <Drawer>
              <DrawerTrigger asChild>
                <button
                  aria-label="Settings"
                  className="p-2 hover:bg-slate-100 border-1 border-slate-200 bg-gray-100 rounded-lg transition"
                >
                  <Settings2 className="h-6 w-6 text-gray-600" />
                </button>
              </DrawerTrigger>
              <DrawerContent className="p-4">
                <Settings />
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </nav>
  );
}
