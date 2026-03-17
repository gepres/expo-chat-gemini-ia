import { List, Layout, Text } from '@ui-kitten/components';
import { useState } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';

const artStyles = [
  'Realista',
  'Anime',
  'Manga',
  'Pixel Art',
  'Vectorial',
  'Abstracto',
];

interface Props {
  onSelectStyle: (style: string) => void;
}

const StyleSelector = ({ onSelectStyle }: Props) => {
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  const handleSelectStyle = (style: string) => {
    if (selectedStyle === style) {
      setSelectedStyle(null);
      onSelectStyle('');
      return;
    }

    setSelectedStyle(style);
    onSelectStyle(style);
  };

  return (
    <List
      horizontal
      data={artStyles}
      style={styles.list}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handleSelectStyle(item)}
          activeOpacity={0.7}
        >
          <Layout
            style={[styles.pill, selectedStyle === item && styles.selectedPill]}
          >
            <Text
              style={[
                styles.pillText,
                selectedStyle === item && styles.selectedPillText,
              ]}
            >
              {item}
            </Text>
          </Layout>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 60,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 6,
    backgroundColor: '#EDF1F7',
  },
  selectedPill: {
    backgroundColor: '#3366FF',
  },
  pillText: {
    color: '#2E3A59',
    fontWeight: '500',
  },
  selectedPillText: {
    color: 'white',
  },
});

export default StyleSelector;
