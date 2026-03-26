import { getGalleryImages } from '@/actions/image-picker/get-gallery-images';
import { useThemeColor } from '@/hooks/useThemeColor';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button, Input, Layout } from '@ui-kitten/components';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform } from 'react-native';

interface Props {
  onSendMessage: (message: string, attachments: ImagePicker.ImagePickerAsset[]) => void;
}

const CustomInputBox = ({ onSendMessage }: Props) => {
  const isAndroid = Platform.OS === 'android';
  const iconColor = useThemeColor({}, 'icon');

  const [text, setText] = useState('');
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);

  const handleSendMessage = () => {
    if(text.length === 0) return;
    // TODO:
    
    onSendMessage(text.trim(), images);
    setText('');
    setImages([]);
  };

  const handlePickImage = async () => {
    const selectedImages = await getGalleryImages();
    if(selectedImages.length === 0 || images.length >= 4) return;

    const availableSpace = 4 - images.length;
    const imagesToAdd = selectedImages.slice(0, availableSpace);
    
    if(imagesToAdd.length > 0) {
      setImages(prevImages => [...prevImages, ...imagesToAdd]);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={isAndroid ? 'height' : 'padding'}
      keyboardVerticalOffset={isAndroid ? 0 : 85}
    >
      {/* Imágenes */}
      <Layout
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image.uri }}
            style={{ width: 50, height: 50, marginTop: 5, borderRadius: 5}}
          />
        ))}
      </Layout>

      {/* Espacio para escribir y enviar mensaje */}
      <Layout
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: isAndroid ? 10 : 20,
        }}
      >
        <Button
          appearance="ghost"
          onPress={handlePickImage}
          accessoryRight={
            <Ionicons name="attach-outline" size={22} color={iconColor} />
          }
        />
        <Input
          placeholder="Escribe tu mensaje"
          multiline
          numberOfLines={4}
          style={{ flex: 1 }}
          value={text}
          onChangeText={setText}
          onPress={handleSendMessage}
        />
        <Button
          appearance="ghost"
          accessoryRight={
            <Ionicons name="paper-plane-outline" size={22} color={iconColor} />
          }
          onPress={handleSendMessage}
        />
      </Layout>
    </KeyboardAvoidingView>
  );
};


export default CustomInputBox;
