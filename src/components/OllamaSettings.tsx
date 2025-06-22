"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function OllamaSettings() {
  const [ollamaHost, setOllamaHost] = useState("");

  // Load saved host from localStorage once on mount
  useEffect(() => {
    const savedHost = localStorage.getItem("ollama_host");
    setOllamaHost(savedHost || "http://localhost:11434");
  }, []);

  const handleSaveHost = () => {
    const trimmedHost = ollamaHost.trim();

    if (trimmedHost) {
      localStorage.setItem("ollama_host", trimmedHost);
      toast.success("Ollama host saved successfully");
    } else {
      localStorage.removeItem("ollama_host");
      toast.error("Please enter a valid host URL");
    }
  };

  return (
    <div className="w-full">
      <div className="space-y-4">
        <h2 className="font-bold">Ollama Settings</h2>

        <div className="text-sm">
          <p>
            <span className="font-medium">Current host:</span>{" "}
            {ollamaHost ? (
              <span className="text-blue-600 dark:text-blue-400 break-all">
                {ollamaHost}
              </span>
            ) : (
              <span className="italic text-gray-400">
                Ollama's default host
              </span>
            )}
          </p>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="ollama-host"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Set Host URL:
          </label>

          <Input
            id="ollama-host"
            type="text"
            value={ollamaHost}
            onChange={(e) => setOllamaHost(e.target.value)}
            placeholder="http://127.0.0.1:11434"
          />

          <div className="justify-start flex">
            <Button
              onClick={handleSaveHost}
              variant="outline"
              className="w-auto whitespace-nowrap"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
