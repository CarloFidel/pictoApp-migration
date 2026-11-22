import { BlurComponent, CustomLoading, CustomPopUp } from '@/components/common';
import { CustomColorBg } from '@/components/common/CustomColorBg';
import { BackButton, PrimaryButtton } from '@/components/ui';
import { getAxiosError } from '@/utility/getAxiosError';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from "expo-image-picker";
import { Asset } from "expo-media-library";
import { router } from 'expo-router';
import { useRef } from 'react';
import { Image, Linking, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import ShutterButton from '../components/ShutterButton';
import CustomCameraButton from '../components/ui/CustomCameraButton';
import { usePhotoBehaviour } from '../hooks/usePhotoBehaviour';
import { useSaveAvatarImage } from '../hooks/useSaveAvatarImage';
import { useCamaraStore } from '../store/useCamaraStore';
import { errorMessageMapperPhoto } from '../utility/error.message.mapper';

interface PhotoScreenProps {
    photoType: 'avatar' | 'pictogram'
}


const CameraScreen = ({ photoType }: PhotoScreenProps) => {
    const [permission, requestPermission] = useCameraPermissions();
    const { width } = useWindowDimensions();

    const camaraRef = useRef<CameraView>(null);
    const { addPicture } = useCamaraStore();
    const { mutate, isError, isPending, isSuccess, errorMessage, showPopUp, setShowPopUp } = useSaveAvatarImage()

    const {
        facing,
        setFacing,
        selectedImage,
        libraryDenied,

        toggleCameraFacing,
        setLibraryDenied,
        setselectedImage,
        handleSaveAvatarPhoto,
        handleOnShutter }
        = usePhotoBehaviour({
            photoType,
            camaraRef,
            addPicture,
            Asset
        })

    const handlePermissionDenied = () => {
        Linking.openSettings();
        router.dismissAll();
    }

    const onPickImages = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "videos"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.5,
            allowsMultipleSelection: false,
        });

        if (result.canceled) return;

        setselectedImage(result.assets[0].uri);
    };


    const sustitudeAvatarPhoto = async () => {

        const url = await handleSaveAvatarPhoto()

        if (!url) return

        mutate({ url: url })


    }





    if (!permission) {
        // Camera permissions are still loading.
        return (
            <>
                <BlurComponent>
                    <CustomLoading />
                </BlurComponent>
            </>

        );
    }

    if (permission.status === "denied") {
        return (
            <View className="flex-1 justify-center items-center">
                <CustomPopUp
                    onPress={() => handlePermissionDenied()}
                    text="Es necesario tu permiso para mostrar la cámara"
                    info
                />
            </View>
        );
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <>
                <BlurComponent>
                    <CustomPopUp text="We need your permission to show the camera" onPress={requestPermission} info />
                </BlurComponent>

            </>
        );
    }



    if (selectedImage && photoType === 'avatar') {
        return (
            <View className='flex-1 justify-start items-center p-20'>
                <CustomColorBg />
                <BackButton
                    onPress={() => setselectedImage('')}
                    top={26}
                />
                <Animated.View
                    entering={FadeInDown.duration(400)}
                    exiting={FadeOutDown.duration(400)}
                    className='rounded-full overflow-hidden aspect-square self-center' style={{ width: width * 0.8 }}>
                    <Image source={{ uri: selectedImage }} className='w-full h-full object-cover' />
                </Animated.View>
                <View className='flex-row justify-center items-center w-full gap-6 mt-8'>
                    <PrimaryButtton
                        variant='filled'
                        size='sm'
                        text='Guardar'
                        onPress={sustitudeAvatarPhoto}
                    />
                    <PrimaryButtton
                        variant='outline'
                        size='sm'
                        text='Cancelar'
                        onPress={() => setselectedImage('')}
                    />
                </View>
                {libraryDenied && (
                    <CustomPopUp
                        info
                        text="Necesitamos permiso para guardar la foto en tu galería"
                        onPress={() => {
                            setLibraryDenied(false);
                            Linking.openSettings();
                        }}
                    />
                )}
                {isPending && (
                    <BlurComponent>
                        <CustomLoading />
                    </BlurComponent>
                )}
                {showPopUp && (
                    <BlurComponent onTap={() => setShowPopUp(false)}>
                        <CustomPopUp text={errorMessageMapperPhoto(getAxiosError(errorMessage))} onPress={() => setShowPopUp(false)} />
                    </BlurComponent>
                )}
            </View>
        );
    }

    if (selectedImage && photoType === 'pictogram') {
        return (
            <View className='flex-1 justify-start items-center p-20'>
                <BackButton
                    onPress={() => setselectedImage('')}
                    top={26}
                />
                <Image source={{ uri: selectedImage }} className='w-full h-full object-cover' />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView ref={camaraRef} style={styles.camera} facing={facing} />

            <CustomCameraButton
                icon={{ ios: 'camera.rotate', android: 'flip_camera_ios' }}
                onPress={toggleCameraFacing}
                position="right-4 top-8"
            />
            <CustomCameraButton
                icon={{ ios: 'photo', android: 'photo' }}
                onPress={() => { onPickImages() }}
                position="right-4 bottom-12"
            />
            <ShutterButton
                onPress={() => { handleOnShutter() }}
            />
            <BackButton top={26} left={12} onPress={() => router.back()} />
        </View>
    );
};

export default CameraScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 64,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        width: '100%',
        paddingHorizontal: 64,
    },
    button: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
