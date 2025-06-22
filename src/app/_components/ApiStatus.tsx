"use client";

import { Button } from "@/components/ui/button";
import { apiClient } from "@/lib/api-client";
import { AlertCircle, RefreshCw } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

export default function ApiStatus() {
  const [apiStatus, setApiStatus] = useState<"loading" | "online" | "offline">(
    "loading"
  );

  const checkApiStatus = useCallback(async () => {
    setApiStatus("loading");
    try {
      const response = await apiClient.getStatus();
      if (response.success) {
        setApiStatus("online");
      } else {
        setApiStatus("offline");
      }
    } catch (error) {
      setApiStatus("offline");
    }
  }, []);

  useEffect(() => {
    checkApiStatus();
  }, [checkApiStatus]);

  const renderOfflineBanner = () => (
    <div className="bg-red-50 border-b border-red-200 px-3 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 text-red-800">
          <AlertCircle className="h-5 w-5" />
          <span className="font-medium">AI Services Offline</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={checkApiStatus}
          disabled={apiStatus === "loading"}
          className="border-red-300 text-red-700 hover:bg-red-100 flex items-center"
        >
          <RefreshCw
            className={`h-4 w-4 mr-2 ${
              apiStatus === "loading" ? "animate-spin" : ""
            }`}
          />
          Retry
        </Button>
      </div>
      <span className="text-red-600">Please store your API keys locally.</span>
    </div>
  );

  const renderLoadingBanner = () => (
    <div className="bg-yellow-50 border-b border-yellow-200 px-3 py-3 text-yellow-800 max-w-7xl mx-auto">
      Checking AI Services status...
    </div>
  );

  const renderOnlineBanner = () => null as any; // Or add a green banner if needed

  return (
    <>
      {apiStatus === "offline" && renderOfflineBanner()}
      {apiStatus === "loading" && renderLoadingBanner()}
      {apiStatus === "online" && renderOnlineBanner()}
    </>
  );
}
