import CustomInputBox from '@/components/chat/CustomInputBox';
import NotImages from '@/components/image-generation/NotImages';
import PreviousGenerationsGrid from '@/components/image-generation/PreviousGenerationsGrid';
import Slideshow from '@/components/image-generation/Slideshow';
import StyleSelector from '@/components/image-generation/StyleSelector';
import { useImagePlaygroundStore } from '@/store/image-playground/imagePlayground.store';
import { Layout, Spinner } from '@ui-kitten/components';
const placeHolderImages: string[] = [
  // 'https://picsum.photos/id/10/200/300',
  // 'https://picsum.photos/id/20/200/300',
  // 'https://picsum.photos/id/30/200/300',
  // 'https://picsum.photos/id/40/200/300',
  // 'https://picsum.photos/id/50/200/300',
  // 'https://picsum.photos/id/60/200/300',
  // 'https://picsum.photos/id/70/200/300',
  // 'https://picsum.photos/id/80/200/300',
  // 'https://picsum.photos/id/90/200/300',
  // 'https://picsum.photos/id/100/200/300',
  // 'https://picsum.photos/id/110/200/300',
  // 'https://picsum.photos/id/120/200/300',
  // 'https://picsum.photos/id/130/200/300',
  // 'https://picsum.photos/id/140/200/300',
  // 'https://picsum.photos/id/150/200/300',
];

const ImageGenerationScreen = () => {

  const generateImages =  useImagePlaygroundStore((state) => state.images);

  const imagesHistory =  useImagePlaygroundStore((state) => state.history);

  const selectedStyle = useImagePlaygroundStore((state) => state.seletedStyle);

  const isGenerating = useImagePlaygroundStore((state) => state.isGenerating);

  const selectedImage = useImagePlaygroundStore((state) => state.selectedImage);


  const {setSelectedStyle, generateImage, generateNextImage, setSelectedImage} = useImagePlaygroundStore();

  return (
    <Layout style={{ flex: 1 }}>


    {
      generateImages.length === 0 && !isGenerating && (
        <NotImages />
      )
    }

    {
      generateImages.length === 0 && isGenerating && (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 300 }}>
          <Spinner size="giant" />
        </Layout>
      )
    }


      {
        generateImages.length > 0 && (
          <Slideshow
            images={generateImages}
            isGenerating={isGenerating}
            onLastImage={() => {
              console.log('en la ultima imagen');
              
              // generateNextImage()
            }}
          />
        )
      }
      {/* Selector de estilos */}
      <StyleSelector selectedStyle={selectedStyle} onSelectStyle={setSelectedStyle} />

      <PreviousGenerationsGrid images={imagesHistory} selectedImage={selectedImage} onSelectImage={setSelectedImage} />

      <CustomInputBox onSendMessage={generateImage} />
    </Layout>
  );
};

export default ImageGenerationScreen;
