import * as ImagePicker from 'expo-image-picker';

export const getGalleryImages = async (): Promise<ImagePicker.ImagePickerAsset[]> => {
    try {

        const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if(status !== 'granted') {
            return []
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsMultipleSelection: true,
            quality: 0.7,
            aspect: [4, 3],
            selectionLimit: 4,
        });

        if(result.canceled) {
            return []
        }

        console.log({assets: result.assets});
        

        return result.assets
        
    } catch (error) {
        console.log(error);
        
        return []
    }
}