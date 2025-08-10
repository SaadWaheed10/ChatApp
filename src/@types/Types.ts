export interface Message {
  id: string;
  text: string;
  timestamp: number;
  sender: 'user' | 'other';
}

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
  avatarUrl: string;
  isOnline: boolean;
  isTyping: boolean;
}
