export interface Message {
  id: string;
  text: string;
  timestamp: number;
  sender: 'user' | 'other';
}

export interface Conversation {
  id: string;
  name: string;
  messages: Message[];
  avatarUrl: string;
  isOnline: boolean;
  isTyping: boolean;
}
