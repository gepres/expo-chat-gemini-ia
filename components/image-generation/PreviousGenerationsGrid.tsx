import { useThemeColor } from '@/hooks/useThemeColor';
import { List } from '@ui-kitten/components';
import { Image, TouchableOpacity } from 'react-native';

interface Props {
  images: string[];
  selectedImage: string;
  onSelectImage: (imageUrl: string) => void;
}

const PreviousGenerationsGrid = ({ images, selectedImage, onSelectImage }: Props) => {

  const primaryColor = useThemeColor({},'icon');
  return (
    <List
      data={images}
      numColumns={3}
      style={{ paddingHorizontal: 10 }}
      renderItem={({ item }) => (
        <TouchableOpacity
         onPress={() => onSelectImage(item)}
         style={{
          width: '33%', 
          height: 150,
          borderRadius: 10,
          margin: 2,
          borderWidth: 4,
          borderColor: selectedImage === item ? primaryColor : 'transparent',
          overflow: 'hidden',
         }}
        >
          <Image
            source={{ uri: item }}
            style={{ width: '100%', height: 150, borderRadius: selectedImage === item ? 4 : 0 }}
          />
        </TouchableOpacity>
      )}
    />
  );
};

export default PreviousGenerationsGrid;
