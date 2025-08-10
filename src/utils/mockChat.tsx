import { Conversation } from '../@types/Types';

export const chatData: Conversation[] = [
  {
    id: 'c1',
    name: 'Laila Shah',
    avatarUrl: 'https://randomuser.me/api/portraits/women/70.jpg',
    isOnline: true,
    isTyping: true,
    messages: [
      {
        id: 'msg001',
        text: 'Hey there!',
        sender: 'other',
        timestamp: Date.now() - 4500,
      },
      {
        id: 'msg002',
        text: 'Hey! How’s it going?',
        sender: 'user',
        timestamp: Date.now() - 3500,
      },
    ],
  },
  {
    id: 'c2',
    name: 'Hassan Mir',
    avatarUrl: 'https://randomuser.me/api/portraits/men/88.jpg',
    isOnline: false,
    isTyping: false,
    messages: [
      {
        id: 'msg003',
        text: 'Up for a quick call later?',
        sender: 'other',
        timestamp: Date.now() - 7000,
      },
    ],
  },
  {
    id: 'c3',
    name: 'Amina Qureshi',
    avatarUrl: 'https://randomuser.me/api/portraits/women/60.jpg',
    isOnline: true,
    isTyping: false,
    messages: [
      {
        id: 'msg004',
        text: 'Got the files ready?',
        sender: 'other',
        timestamp: Date.now() - 8500,
      },
      {
        id: 'msg005',
        text: 'Yup, sent them over.',
        sender: 'user',
        timestamp: Date.now() - 7500,
      },
    ],
  },
  {
    id: 'c4',
    name: 'Bilal Zafar',
    avatarUrl: 'https://randomuser.me/api/portraits/men/65.jpg',
    isOnline: false,
    isTyping: false,
    messages: [
      {
        id: 'msg006',
        text: 'You free this afternoon?',
        sender: 'other',
        timestamp: Date.now() - 2500,
      },
    ],
  },
];
