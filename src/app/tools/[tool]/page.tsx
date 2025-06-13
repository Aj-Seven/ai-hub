"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import {
  ArrowLeft,
  Copy,
  Download,
  RefreshCw,
  Sparkles,
  Send,
  CheckCircle,
  Zap,
  AlertCircle,
} from "lucide-react";
import { toolConfigs } from "@/app/tools/_components/ToolConfig";

export default function ToolPage() {
  const params = useParams();
  const router = useRouter();
  const toolId = params.tool as any;

  const [input, setInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("openai");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [usage, setUsage] = useState<any>(null);
  const [apiKey, setApiKey] = useState("");
  const [availableProviders, setAvailableProviders] = useState<string[]>([]);

  const toolConfig = toolConfigs[toolId];

  const checkApiStatus = async () => {
    try {
      const response = await apiClient.getStatus();

      if (response.success) {
        setAvailableProviders((response.aiProviders as any) || []);
      }
    } catch (error) {
      console.error("Failed to check API status:", error);
    }
  };

  useEffect(() => {
    checkApiStatus();
  }, []);

  useEffect(() => {
    const key = localStorage.getItem(`api_key_${selectedProvider}`);
    setApiKey(key as string);
  }, [selectedProvider]);

  useEffect(() => {
    if (toolConfig?.options && toolConfig.options.length > 0) {
      setSelectedOption(toolConfig.options[0].value);
    }
  }, [toolConfig]);

  if (!toolConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Tool Not Found
          </h1>
          <p className="text-slate-600 mb-6">
            The requested AI tool could not be found.
          </p>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  const buildPrompt = (input: string, option?: string): string => {
    const basePrompt = input.trim();

    if (!option) return basePrompt;

    const optionPrompts = {
      "email-writer": `Write a single ${option} email about: ${basePrompt}`,
      "tweet-generator": `Write one ${option} tweet about: ${basePrompt}`,
      "sentence-builder": `Convert this idea into one ${option} sentence: ${basePrompt}`,
      "text-summarizer": `Provide a concise ${option} summary of the following: ${basePrompt}`,
      "content-rewriter": `Rewrite this content into a single, ${option} version: ${basePrompt}`,
      "blog-generator": `Write one ${option} blog post about: ${basePrompt}`,
      "caption-generator": `Write one ${option} social media caption for: ${basePrompt}`,
      "grammar-checker": `Check and return the corrected version of this text: ${basePrompt}`,
    };

    return optionPrompts[toolId as keyof typeof optionPrompts] || basePrompt;
  };

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast("Input Required", {
        description: "Please enter some text to generate content.",
      });
      return;
    }

    setIsGenerating(true);
    setOutput("");
    setUsage(null);

    try {
      const prompt = buildPrompt(input, selectedOption);

      const response = await apiClient.generate({
        prompt,
        tool: toolId,
        provider: selectedProvider,
        apiKey: apiKey,
        options: {
          [toolConfig.optionLabel?.toLowerCase() || "style"]: selectedOption,
          maxTokens: 1500,
          temperature: 0.7,
        },
      });

      if (response.success && response.content) {
        setOutput(response.content);
        setUsage(response.usage);

        toast("Content Generated!", {
          description: `Successfully generated content using ${
            response.provider || selectedProvider
          }.`,
        });
      } else {
        throw new Error(
          response.details || response.error || "Failed to generate content"
        );
      }
    } catch (error) {
      console.error("Generation error:", error);

      toast("Generation Failed", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);

      toast("Copied!", {
        description: "Content copied to clipboard.",
      });
    } catch (error) {
      toast("Copy Failed", {
        description: "Failed to copy content to clipboard.",
      });
    }
  };

  const handleDownload = () => {
    try {
      const blob = new Blob([output], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${toolConfig.title
        .toLowerCase()
        .replace(/\s+/g, "-")}-${Date.now()}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast("Downloaded!", {
        description: "Content saved to your device.",
      });
    } catch (error) {
      toast("Download Failed", {
        description: "Failed to download content.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-3">
          <div className="flex items-center min-h-[72px]">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white">
                {toolConfig.icon}
              </div>

              <div className="flex flex-col">
                <div className="flex items-center space-x-2 flex-wrap">
                  <h1 className="text-xl font-semibold text-slate-900">
                    {toolConfig.title}
                  </h1>
                  {selectedProvider && (
                    <Badge variant="outline" className="text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      {selectedProvider}
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-slate-600 line-clamp-1 max-w-[90vw] sm:max-w-none">
                  {toolConfig.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-3 py-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="bg-white/60 backdrop-blur-sm border-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="h-5 w-5 text-blue-600" />
                <span>Input</span>
              </CardTitle>
              <CardDescription>
                Provide the details for your content generation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="input">{toolConfig.inputLabel}</Label>
                <Textarea
                  id="input"
                  placeholder={toolConfig.inputPlaceholder}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  rows={6}
                  className="resize-none"
                />
              </div>
              <div className="flex flex-row space-x-2">
                {toolConfig.options && (
                  <div className="space-y-2">
                    <Label htmlFor="options">{toolConfig.optionLabel}</Label>
                    <Select
                      value={selectedOption}
                      onValueChange={setSelectedOption}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={`Select ${toolConfig.optionLabel?.toLowerCase()}`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {toolConfig.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {toolConfig.aiProviderVisible && (
                  <div className="space-y-2">
                    <Label
                      htmlFor="provider"
                      className="flex items-center space-x-2"
                    >
                      <span>AI Provider</span>
                    </Label>
                    <Select
                      value={selectedProvider}
                      onValueChange={setSelectedProvider}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select AI provider" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableProviders.map((providers) => (
                          <SelectItem
                            key={providers.value}
                            value={providers.value}
                          >
                            {providers.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!input.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="bg-white/60 backdrop-blur-sm border-1">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Output</span>
                </div>
                {output && (
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                      className="text-slate-600 hover:text-slate-900"
                    >
                      {isCopied ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDownload}
                      className="text-slate-600 hover:text-slate-900"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                )}
              </CardTitle>
              <CardDescription>
                Your generated content will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {output ? (
                <div className="space-y-4">
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 min-h-[400px]">
                    <pre className="whitespace-pre-wrap text-sm text-slate-800 font-medium leading-relaxed">
                      {output}
                    </pre>
                  </div>

                  {usage && (
                    <div className="bg-blue-50 rounded-lg p-2 border border-blue-200">
                      <h4 className="text-sm font-semibold text-blue-900 mb-2">
                        Usage Statistics
                      </h4>
                      <div className="grid grid-cols-3 gap-4 text-xs text-blue-800">
                        <div>
                          <span className="font-medium">Prompt:</span>{" "}
                          {usage.promptTokens} tokens
                        </div>
                        <div>
                          <span className="font-medium">Response:</span>{" "}
                          {usage.completionTokens} tokens
                        </div>
                        <div>
                          <span className="font-medium">Total:</span>{" "}
                          {usage.totalTokens} tokens
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-slate-50 rounded-lg p-8 border border-dashed border-slate-300 min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-slate-500">
                    <Sparkles className="h-12 w-12 mx-auto mb-4 text-slate-400" />
                    <p className="text-lg font-medium mb-2">
                      Ready to generate
                    </p>
                    <p className="text-sm">
                      Enter your input above and click "Generate Content" to see
                      the magic happen!
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Tips Section */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-blue-900">
              <Sparkles className="h-5 w-5" />
              <span>Pro Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-blue-800">
              <div>
                <h4 className="font-semibold mb-2">📝 Better Input</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Be specific about your requirements</li>
                  <li>• Include context and target audience</li>
                  <li>• Mention desired tone and style</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⚡ Best Results</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• Review and edit the generated content</li>
                  <li>• Try different providers for variety</li>
                  <li>• Combine multiple generations for best output</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔧 AI Providers</h4>
                <ul className="space-y-1 text-blue-700">
                  <li>• OpenAI: Best for general content</li>
                  <li>• Claude: Excellent for analysis</li>
                  <li>• Gemini: Great for creative writing</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
