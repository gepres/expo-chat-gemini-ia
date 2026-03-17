import { Fragment, useEffect, useState } from 'react';
import { Image, StyleSheet } from 'react-native';

import { Layout, Spinner, ViewPager } from '@ui-kitten/components';
interface Props {
  images: string[];
  isGenerating?: boolean;
  onLastImage?: () => void;
}

const Slideshow = ({ images, isGenerating = false, onLastImage }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Determinar si es la última imagen y llamar a la función onLastImage
  useEffect(() => {
    if (selectedIndex === images.length - 1) {
      onLastImage?.();
    }
  }, [selectedIndex, images, onLastImage]);

  return (
    <Fragment>
      {/* Image Slideshow */}
      <ViewPager
        selectedIndex={selectedIndex}
        style={{ marginTop: 15 }}
        onSelect={(index) => setSelectedIndex(index)}
      >
        {images.map((image) => (
          <Layout style={styles.tab} key={image}>
            <Image
              source={{
                uri: image,
              }}
              style={styles.imageSlide}
            />
          </Layout>
        ))}
      </ViewPager>

      {/* Bullet Container */}
      <Layout style={{ marginTop: 20 }}>
        <Layout style={styles.bulletContainer}>
          {images.map((_, index) => (
            <Layout
              key={index}
              style={[
                styles.bullet,
                {
                  backgroundColor:
                    selectedIndex === index ? '#3366FF' : '#E4E9F2',
                },
              ]}
            />
          ))}

          {/* Loading Spinner - Cuando estemos generando una nueva imagen */}
          {isGenerating && (
            <Layout style={{ marginLeft: 5 }}>
              <Spinner size="tiny" />
            </Layout>
          )}
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default Slideshow;

const styles = StyleSheet.create({
  tab: {
    height: 192,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bulletContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  bullet: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  imageSlide: {
    width: 200,
    height: 200,
    borderRadius: 16,
  },
});
