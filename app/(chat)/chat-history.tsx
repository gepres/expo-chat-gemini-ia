import { Layout } from '@ui-kitten/components';

import { ChatMessages } from '@/components/chat/ChatMessages';
import CustomInputBox from '@/components/chat/CustomInputBox';
import { useChatContextStore } from '@/store/chat-context/chatContext.store';



const ChatHistoryScreen = () => {

  const messages= useChatContextStore((state) => state.messages);
  const geminiWriting= useChatContextStore((state) => state.geminiWriting);
  const addMessage= useChatContextStore((state) => state.addMessage);

  return (
    <Layout style={{ flex: 1 }}>
      <ChatMessages messages={messages} isGeminiWriting={geminiWriting} />

      <CustomInputBox onSendMessage={addMessage} />
    </Layout>
  );
};

export default ChatHistoryScreen;
