import { useMutation } from "@tanstack/react-query";
import { axiosUploadPhoto } from "../api/axios.service";

interface Props {
    url: string;
    token: string;
    photoType?: "avatar" | "pictogram";
    word?: string;
}

export const useUploadPhotoMutation = () => useMutation({
    mutationFn: ({ url, token, photoType = "avatar", word }: Props) =>
        axiosUploadPhoto({ url, token, photoType, word }),
    mutationKey: ["upload-photo"],
})
