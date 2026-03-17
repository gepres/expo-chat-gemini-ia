import { Layout, List, Text } from '@ui-kitten/components';
import { Image } from 'react-native';

interface Props {
  images: string[];
}

const PreviousGenerationsGrid = ({ images }: Props) => {
  return (
    <List
      data={images}
      numColumns={3}
      style={{ paddingHorizontal: 10 }}
      renderItem={({ item }) => (
        <Image
          source={{ uri: item }}
          style={{ width: '33%', height: 150, borderRadius: 10, margin: 2 }}
        />
      )}
    />
  );
};

export default PreviousGenerationsGrid;
