import { Layout, List, Text } from '@ui-kitten/components';
import { StyleSheet, TouchableOpacity } from 'react-native';

const DEFAULT_ART_STYLES = [
  'Realista',
  'Anime',
  'Manga',
  'Pixel Art',
  'Vectorial',
  'Abstracto',
];

interface Props {
  artStyles?: string[];
  selectedStyle?: string;
  onSelectStyle: (style: string) => void;
}

const StyleSelector = ({ artStyles = DEFAULT_ART_STYLES, selectedStyle, onSelectStyle }: Props) => {

  const handleSelectStyle = (style: string) => {
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
    height: 50,
    flexGrow: 0,
    backgroundColor: 'white'
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
