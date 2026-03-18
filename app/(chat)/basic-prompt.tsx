import { ChatMessages } from '@/components/chat/ChatMessages';
import CustomInputBox from '@/components/chat/CustomInputBox';
import { useBasicPromptStore } from '@/store/basic-prompt/basicPrompt.store';
import { Layout } from '@ui-kitten/components';


const BasicPromptScreen = () => {

  const messages  = useBasicPromptStore((state) => state.messages);
  const addMessage = useBasicPromptStore((state) => state.addMessage);
  const isGeminiWriting = useBasicPromptStore((state) => state.geminiWriting);

  const handleSendMessage = (message: string) => {
    addMessage(message);
  };

  return (
    <Layout style={{ flex: 1 }}>
      <ChatMessages messages={messages} isGeminiWriting={isGeminiWriting} />

      <CustomInputBox onSendMessage={handleSendMessage} />
    </Layout>
  );
};

export default BasicPromptScreen;
