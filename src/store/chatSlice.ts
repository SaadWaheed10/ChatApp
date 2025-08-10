import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Chat, Message } from '../@types/Types';
import { AppDispatch } from '.';

interface ChatState {
  chatList: Chat[];
}

const initialChatState: ChatState = {
  chatList: [],
};

const chatSlice = createSlice({
  name: 'chatData',
  initialState: initialChatState,
  reducers: {
    appendMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: Message }>,
    ) => {
      const { chatId, message } = action.payload;
      const targetChat = state.chatList.find(chat => chat.id === chatId);
      if (targetChat) {
        targetChat.messages.push(message);
      }
    },
    updateChats: (state, action: PayloadAction<Chat[]>) => {
      state.chatList = action.payload;
    },
  },
});

export const { appendMessage, updateChats } = chatSlice.actions;

export const postMessage =
  ({ chatId, content }: { chatId: string; content: string }) =>
  (dispatch: AppDispatch) => {
    const newChatMessage: Message = {
      id: `${Date.now()}`,
      text: content,
      timestamp: Date.now(),
      sender: 'user',
    };

    dispatch(appendMessage({ chatId, message: newChatMessage }));
  };

export default chatSlice.reducer;
