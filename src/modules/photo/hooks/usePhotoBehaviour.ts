import { CameraView } from "expo-camera";
import { Asset, requestPermissionsAsync } from "expo-media-library";
import React, { useState } from "react";

interface UsePhotoBehaviourProps {
    photoType: 'avatar' | 'pictogram';
    camaraRef: React.RefObject<CameraView | null>;
    addPicture: (picture: string) => void;
    Asset: typeof Asset;
}

export const usePhotoBehaviour = ({ photoType, camaraRef, addPicture }: UsePhotoBehaviourProps) => {
    const [facing, setFacing] = useState<'back' | 'front'>('back');
    const [selectedImage, setselectedImage] = useState<string>();
    const [libraryDenied, setLibraryDenied] = useState(false);





    const toggleCameraFacing = () => {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
        camaraRef: typeof CameraView;
    };

    const handleOnShutter = async () => {
        if (!camaraRef.current) return;

        const picture = await camaraRef.current.takePictureAsync({
            quality: 0.7,
        });
        setselectedImage(picture.uri);
    };

    const handleSaveAvatarPhoto = async () => {
        if (!selectedImage) return;

        try {
            const mediaPermission = await requestPermissionsAsync(true, ["photo"]);
            if (!mediaPermission.granted) {
                setLibraryDenied(true);
                return;
            }
        } catch {
            setLibraryDenied(true);
            return;
        }

        return selectedImage;
    };




    return {
        facing,
        selectedImage,
        libraryDenied,
        setselectedImage,
        
        setLibraryDenied,
        setFacing,
        toggleCameraFacing,
        handleOnShutter,
        handleSaveAvatarPhoto,
    }
}