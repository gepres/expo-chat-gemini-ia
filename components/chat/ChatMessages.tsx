import { useThemeColor } from '@/hooks/useThemeColor';
import {
  ImagesMessage,
  Message,
  TextMessage,
} from '@/interfaces/chat.interfaces';
import { Layout, List, Text } from '@ui-kitten/components';
import { Fragment } from 'react';
import { Image } from 'react-native';
import Markdown from 'react-native-markdown-display';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Props {
  messages: Message[];
  isGeminiWriting: boolean;
}

export const ChatMessages = ({ messages, isGeminiWriting }: Props) => {
  const primaryColor = useThemeColor({}, 'icon');

  const bgColor = useThemeColor({}, 'background');

  return (
    <Layout style={{ flex: 1 }}>
      <List
        data={messages}
        inverted
        style={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => {
          if (item.type === 'text') {
            return (
              <MessageItem
                message={item as TextMessage}
                userColor={primaryColor}
              />
            );
          }

          return (
            <MessageItemImage
              message={item as ImagesMessage}
              userColor={primaryColor}
            />
          );
        }}
      />

      {
        isGeminiWriting && (
          <Animated.View style={{
            paddingHorizontal: 16,
            paddingVertical: 10,
            backgroundColor: bgColor,
          }}
            entering={FadeInDown}
          >
            <Text>Gemini está escribiendo...</Text>
          </Animated.View>
        )
      }
    </Layout>
  );
};

const MessageItem = ({
  message,
  userColor,
}: {
  message: TextMessage;
  userColor: string;
}) => {
  const isCurrentUser = message.sender === 'user';

  const markdownStyles = {
    body: {
      color: isCurrentUser ? 'white' : 'black',
    },
    paragraph: {
      color: isCurrentUser ? 'white' : 'black',
    },
    text: {
      color: isCurrentUser ? 'white' : 'black',
    }
  };

  return (
    <Layout
      style={{
        marginVertical: 4,
        alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
        backgroundColor: isCurrentUser ? userColor : '#EBEBEB',
        padding: 10,
        borderRadius: 16,
        borderBottomLeftRadius: isCurrentUser ? 0 : 16,
        borderBottomRightRadius: isCurrentUser ? 16 : 0,
        maxWidth: '80%',
        alignSelf: isCurrentUser ? 'flex-end' : 'flex-start',
      }}
    >
      <Markdown style={markdownStyles}>{message.text}</Markdown>
    </Layout>
  );
};

const MessageItemImage = ({
  message,
  userColor,
}: {
  message: ImagesMessage;
  userColor: string;
}) => {
  const isCurrentUser = message.sender === 'user';
  const isMultipleImages = message.images && message.images.length > 1;

  return (
    <Fragment>
      <Layout
        style={{
          marginVertical: 4,
          alignItems: isCurrentUser ? 'flex-end' : 'flex-start',
          backgroundColor: 'transparent',
        }}
      >
        <Layout
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {message.images &&
            message.images.map((imageUrl, index) => (
              <Image
                key={index}
                source={{ uri: imageUrl }}
                style={{
                  width: isMultipleImages ? 150 : 250,
                  height: isMultipleImages ? 150 : 200,
                  borderRadius: 12,
                }}
                resizeMode="cover"
              />
            ))}
        </Layout>
      </Layout>
      {message.text && (
        <MessageItem message={message as TextMessage} userColor={userColor} />
      )}
    </Fragment>
  );
};
