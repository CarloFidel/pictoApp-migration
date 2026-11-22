import { useMutation } from "@tanstack/react-query";
import { axiosUploadPhoto } from "../api/axios.photo.service";

interface Props {
    url: string;
}

export const useUploadPhotoMutation = () => useMutation({
    mutationFn: ({ url }: Props) => axiosUploadPhoto( url ),
    mutationKey: ["upload-photo"],
})
