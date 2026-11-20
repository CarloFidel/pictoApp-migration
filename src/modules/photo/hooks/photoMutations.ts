import { useMutation } from "@tanstack/react-query";
import { axiosUploadPhoto } from "../api/axios.service";

interface Props {
    url: string;
    token: string;
}

export const useUploadPhotoMutation = () => useMutation({
    mutationFn: ({ url, token }: Props) => axiosUploadPhoto({ url, token }),
    mutationKey: ["upload-photo"],
})
