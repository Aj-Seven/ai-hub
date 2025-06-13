export interface ToolConfig {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  inputLabel: string;
  inputPlaceholder: string;
  options?: Array<{ label: string; value: string }>;
  optionLabel?: string;
  aiProviderVisible?: boolean;
}

export interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  popular?: boolean;
  new?: boolean;
}
