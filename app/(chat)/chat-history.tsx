import { Layout } from '@ui-kitten/components';

import { ChatMessages } from '@/components/chat/ChatMessages';
import CustomInputBox from '@/components/chat/CustomInputBox';
import { useChatContextStore } from '@/store/chat-context/chatContext.store';



const ChatHistoryScreen = () => {

  const { messages, addMessage, geminiWriting } = useChatContextStore();

  return (
    <Layout style={{ flex: 1 }}>
      <ChatMessages messages={messages} isGeminiWriting={geminiWriting} />

      <CustomInputBox onSendMessage={addMessage} />
    </Layout>
  );
};

export default ChatHistoryScreen;
