"use client";

import { useEffect, useState } from "react";
import { Activity } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { apiClient } from "@/lib/api-client";

type Status = "loading" | "online" | "offline";

export default function ApiStatus() {
  const [apiStatus, setApiStatus] = useState<Status>("loading");

  const DEFAULT_OLLAMA_HOST = "http://localhost:11434";

  const ensureOllamaHost = () => {
    if (typeof window !== "undefined") {
      const existingHost = localStorage.getItem("ollama_host");
      if (!existingHost) {
        localStorage.setItem("ollama_host", DEFAULT_OLLAMA_HOST);
      }
    }
  };

  const checkApiStatus = async () => {
    try {
      const response = await apiClient.getStatus();
      setApiStatus(response.ollamaStatus ? "online" : "offline");
    } catch {
      setApiStatus("offline");
    }
  };

  useEffect(() => {
    ensureOllamaHost();
    checkApiStatus();
  }, []);

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
          onClick={() => checkApiStatus()}
        >
          <Activity
            className={`h-6 w-6 ${
              apiStatus === "loading" ? "animate-ping" : "animate-pulse"
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
}
