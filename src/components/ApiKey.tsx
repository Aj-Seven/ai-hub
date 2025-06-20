"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2, Pencil, Key } from "lucide-react";

const providers = ["openai", "google", "cohere", "anthropic"];

export default function APIKeys() {
  const [provider, setProvider] = useState("openai");
  const [apiKey, setApiKey] = useState("");
  const [storedKeys, setStoredKeys] = useState<Record<string, string>>({});

  // Load all stored API keys from localStorage
  const loadStoredKeys = () => {
    const keys: Record<string, string> = {};
    providers.forEach((p) => {
      const key = localStorage.getItem(`api_key_${p}`);
      if (key) keys[p] = key;
    });
    setStoredKeys(keys);
  };

  // Load all on mount
  useEffect(() => {
    loadStoredKeys();
  }, []);

  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("API key cannot be empty");
      return;
    }
    localStorage.setItem(`api_key_${provider}`, apiKey.trim());
    toast.success(`API Key for ${provider} saved`);
    setApiKey("");
    loadStoredKeys();
  };

  const handleEdit = (prov: string) => {
    setProvider(prov);
    setApiKey(storedKeys[prov]);
  };

  const handleDelete = (prov: string) => {
    localStorage.removeItem(`api_key_${prov}`);
    toast.success(`API Key for ${prov} deleted`);
    if (provider === prov) setApiKey("");
    loadStoredKeys();
  };

  return (
    <>
      {/* List of stored API keys */}
      <div className="mb-4 space-y-2">
        <Label className="text-sm">Saved API Keys</Label>
        {Object.entries(storedKeys).length === 0 ? (
          <p className="text-sm text-muted-foreground">No API keys stored</p>
        ) : (
          <ul className="space-y-1">
            {Object.entries(storedKeys).map(([prov, key]) => (
              <li
                key={prov}
                className="flex items-center justify-between bg-muted/90 py-2 rounded-md p-1 text-sm"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{prov}</span>
                  <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                    {key}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleEdit(prov)}
                    title="Edit"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDelete(prov)}
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Input form */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>Select Provider</Label>
          <Select value={provider} onValueChange={setProvider}>
            <SelectTrigger>
              <SelectValue placeholder="Select provider" />
            </SelectTrigger>
            <SelectContent>
              {providers.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="apiKey">API Key</Label>
          <Input
            id="apiKey"
            type="text"
            placeholder={`Enter API key for ${provider}`}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>

        <div className="flex justify-start">
          <Button
            disabled={!apiKey}
            variant="outline"
            className=" cursor-pointer"
            onClick={handleSave}
          >
            <Key className="h-4 w-4" />
            Save API Key
          </Button>
        </div>
      </div>
    </>
  );
}
