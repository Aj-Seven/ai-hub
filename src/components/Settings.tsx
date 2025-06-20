"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import APIKeys from "./ApiKey";
import { Bot, Key } from "lucide-react";
import OllamaSettings from "./OllamaSettings";

export default function Settings() {
  const [selectedTab, setSelectedTab] = useState("api-keys");

  return (
    <div>
      <Tabs
        defaultValue={selectedTab}
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
        className="w-full"
      >
        {/* Tab Navigation */}
        <TabsList className="flex flex-wrap gap-2 justify-start sm:justify-start">
          <TabsTrigger value="api-keys" className="cursor-pointer">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="set-ollama" className="cursor-pointer">
            <Bot className="h-4 w-4" />
            Ollama
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value="api-keys">
          <APIKeys />
        </TabsContent>

        <TabsContent value="set-ollama">
          <OllamaSettings />
        </TabsContent>
      </Tabs>
    </div>
  );
}
