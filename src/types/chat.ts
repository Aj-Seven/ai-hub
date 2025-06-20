export type Role = "user" | "assistant";

export type Message = {
  role: Role;
  content: string;
  timestamp?: string;
};

export type Chat = {
  id: string;
  title: string;
  messages: Message[];
};
