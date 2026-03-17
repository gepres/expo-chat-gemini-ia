import uuid from 'react-native-uuid';
import { Layout } from '@ui-kitten/components';

import { ChatMessages } from '@/components/chat/ChatMessages';
import CustomInputBox from '@/components/chat/CustomInputBox';
import { Message } from '@/interfaces/chat.interfaces';

const messages: Message[] = [
  {
    id: uuid.v4(),
    text: 'Hola Gemini!, ¿cómo estás?',
    createdAt: new Date(),
    sender: 'user',
    type: 'text',
  },
  {
    id: uuid.v4(),
    text: 'Estoy bien, gracias por preguntar.',
    createdAt: new Date(),
    sender: 'gemini',
    type: 'text',
  },
  {
    id: uuid.v4(),
    images: ['https://picsum.photos/400/300', 'https://picsum.photos/400/300'],
    createdAt: new Date(),
    sender: 'gemini',
    type: 'image',
    text: 'Qué logras con esta imagen?',
  },
];

const ChatHistoryScreen = () => {
  return (
    <Layout style={{ flex: 1 }}>
      <ChatMessages messages={messages} />

      <CustomInputBox onSendMessage={() => {}} />
    </Layout>
  );
};

export default ChatHistoryScreen;
