import { BlurComponent, CustomLoading, CustomPopUp } from '@/components/common';
import { BackButton, PrimaryButtton } from '@/components/ui';
import { useAuthStore } from '@/modules/auth/store/authStore';
import { DashboaedBackgroundSvg } from '@/modules/dashboard/components/DashboaedBackgroundSvg';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Image, Linking, StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import ShutterButton from '../components/ShutterButton';
import CustomCameraButton from '../components/ui/CustomCameraButton';
import { useUploadPhotoMutation } from '../hooks/photoMutations';
import { useCamaraStore } from '../store/useCamaraStore';

interface PhotoScreenProps {
    photoType: 'avatar' | 'pictogram'
}


const CameraScreen = ({ photoType }: PhotoScreenProps) => {
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [libraryPermission, requestMediaPermission] = MediaLibrary.usePermissions();

    const [selectedImage, setselectedImage] = useState<string>();
    const [libraryDenied, setLibraryDenied] = useState(false);

    const { width } = useWindowDimensions();

    const { token } = useAuthStore()

    const targetRef = useRef<View>(null);

    const camaraRef = useRef<CameraView>(null);
    const { addPicture } = useCamaraStore();
    const { mutate, isError, isPending, isSuccess, data, error } = useUploadPhotoMutation()

    const onRequestPermission = async () => {
        try {
            const { status: camaraPermissionStatus } =
                await requestPermission();
            if (camaraPermissionStatus !== "granted") {
                return false;
            }
            const { status: mediaPermission } = await requestMediaPermission();
            if (mediaPermission !== "granted") {
                return false;
            }
        } catch (error: unknown) {
            return false;
        }
    };

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

    if (!permission.granted) {
        return (
            <View style={styles.container} className='flex-1 justify-center items-center'>
                <CustomPopUp
                    onPress={onRequestPermission}
                    text="Necesitamos algunos permisos"
                    info
                />
            </View>
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

    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    };

    const handlePermissionDenied = () => {
        Linking.openSettings();
        router.dismissAll();
    }

    const handleOnShutter = async () => {
        if (!camaraRef.current) return;

        const picture = await camaraRef.current.takePictureAsync({
            quality: 0.7,
        });
        setselectedImage(picture.uri);
    };

    const handleSavePhoto = async () => {
        if (!selectedImage) return;

        if (!libraryPermission?.granted) {
            setLibraryDenied(true);
            return;
        }

        try {
            await MediaLibrary.Asset.create(selectedImage);
        } catch {
            setLibraryDenied(true);
            return;
        }

        addPicture(selectedImage);
        setselectedImage("");
        setLibraryDenied(false);

        mutate({ url: selectedImage, token: token!, photoType });
        console.log(data);
        //router.back();
    };



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

    if (selectedImage && photoType === 'avatar') {
        return (
            <>
                <DashboaedBackgroundSvg />

                <View className='flex-1 justify-start items-center p-20'>
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
                            onPress={handleSavePhoto}
                        />
                        <PrimaryButtton
                            variant='outline'
                            size='sm'
                            text='Cancelar'
                            onPress={() => setselectedImage('')}
                        />
                    </View>
                    {libraryDenied && (
                        <>
                            <BlurComponent onTap={() => setLibraryDenied(false)}>
                                <CustomPopUp
                                    info
                                    text="Necesitamos permiso para guardar la foto en tu galería"
                                    onPress={() => {
                                        setLibraryDenied(false);
                                        Linking.openSettings();
                                    }}
                                />
                            </BlurComponent>
                        </>
                    )}
                    {isPending && (
                        <BlurComponent>
                            <CustomLoading />
                        </BlurComponent>
                    )}
                </View>
            </>
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
            {isError && (
                <BlurComponent blurTarget={targetRef}>
                    <CustomPopUp text="Error al subir la foto" onPress={() => router.back()} info />
                </BlurComponent>
            )}
            {isSuccess && (
                <BlurComponent blurTarget={targetRef}>
                    <CustomPopUp text="Foto subida correctamente" onPress={() => router.back()} info />
                </BlurComponent>
            )}
            {isPending && (
                <BlurComponent blurTarget={targetRef}>
                    <CustomLoading />
                </BlurComponent>
            )}
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
