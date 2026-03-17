import { ChatMessages } from '@/components/chat/ChatMessages';
import CustomInputBox from '@/components/chat/CustomInputBox';
import { Message } from '@/interfaces/chat.interfaces';
import { Layout } from '@ui-kitten/components';
import uuid from 'react-native-uuid';

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
  {
    id: uuid.v4(),
    text: 'Veniam est commodo sunt esse magna culpa dolor velit reprehenderit id magna. Pariatur sint adipisicing consequat sunt. Consectetur in quis ad ut eiusmod voluptate fugiat amet. Officia consequat ullamco aute fugiat culpa laborum in duis elit consequat aute magna consequat.',
    createdAt: new Date(),
    sender: 'user',
    type: 'text',
  },
];

const BasicPromptScreen = () => {
  return (
    <Layout style={{ flex: 1 }}>
      <ChatMessages messages={messages} />

      <CustomInputBox onSendMessage={() => {}} />
    </Layout>
  );
};

export default BasicPromptScreen;
