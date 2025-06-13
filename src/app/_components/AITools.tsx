import {
  Mail,
  Twitter,
  CheckCircle,
  Type,
  FileText,
  RefreshCw,
  PenTool,
  Camera,
} from "lucide-react";
import { Tool } from "@/utils/types";

export const tools: Tool[] = [
  {
    id: "email-writer",
    title: "Email Writer",
    description:
      "Generate professional emails for any purpose with customizable tone and style",
    icon: <Mail className="h-6 w-6" />,
    category: "Communication",
    popular: true,
  },
  {
    id: "tweet-generator",
    title: "Tweet Generator",
    description:
      "Create engaging tweets with optimal hashtags and trending content",
    icon: <Twitter className="h-6 w-6" />,
    category: "Social Media",
    popular: true,
  },
  {
    id: "grammar-checker",
    title: "Grammar Checker",
    description:
      "Identify and fix grammar, spelling, and punctuation errors instantly",
    icon: <CheckCircle className="h-6 w-6" />,
    category: "Writing",
    popular: true,
  },
  {
    id: "sentence-builder",
    title: "Sentence Builder",
    description: "Transform ideas into well-structured, clear sentences",
    icon: <Type className="h-6 w-6" />,
    category: "Writing",
  },
  {
    id: "text-summarizer",
    title: "Text Summarizer",
    description: "Convert long articles into concise, key-point summaries",
    icon: <FileText className="h-6 w-6" />,
    category: "Content",
    new: true,
  },
  {
    id: "content-rewriter",
    title: "Content Rewriter",
    description:
      "Rewrite content with different tones, styles, and complexity levels",
    icon: <RefreshCw className="h-6 w-6" />,
    category: "Content",
  },
  {
    id: "blog-generator",
    title: "Blog Post Generator",
    description:
      "Create SEO-optimized blog posts with outlines and engaging content",
    icon: <PenTool className="h-6 w-6" />,
    category: "Content",
    new: true,
  },
  {
    id: "caption-generator",
    title: "Social Caption Generator",
    description:
      "Generate catchy captions for Instagram, Facebook, and LinkedIn posts",
    icon: <Camera className="h-6 w-6" />,
    category: "Social Media",
  },
];
