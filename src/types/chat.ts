export type Role = "user" | "assistant" | "system";

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

export interface ChatMessagesProps {
  messages: Message[];
  apiStatus: string | null;
  loading: boolean;
}

export interface ChatSidebarProps {
  chats: Chat[];
  currentChatId: string | null;
  selectChat: (id: string) => void;
  createChat: () => void;
  deleteChat: (id: string) => void;
  editingTitleId: string | null;
  setEditingTitleId: (id: string | null) => void;
  editingTitleVal: string;
  setEditingTitleVal: (val: string) => void;
  updateChatTitle: () => void;
  onClose?: () => void;
}

export interface ChatInputProps {
  input: string;
  setInput: (val: string) => void;
  loading: boolean;
  onSend: () => void;
  stopStream: () => void;
  disabled?: boolean;
  setModel: (model: string) => void;
  setSystemMessage: (msg: string) => void;
  apiStatus: string | null;
  sidebarProps: {
    chats: Chat[];
    currentChatId: string | null;
    selectChat: (id: string) => void;
    createChat: () => void;
    deleteChat: (id: string) => void;
    editingTitleId: string | null;
    setEditingTitleId: (id: string | null) => void;
    editingTitleVal: string;
    setEditingTitleVal: (val: string) => void;
    updateChatTitle: () => void;
  };
}
