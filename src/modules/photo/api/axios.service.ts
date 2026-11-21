import { customApiConfig } from "@/config/api/custom.api.config";

interface Props {
    url: string;
    token: string;
    photoType: "avatar" | "pictogram";
    word?: string;
}

export const axiosUploadPhoto = async ({ url, token, photoType, word }: Props) => {
    const formData = new FormData();

    formData.append("file", {
        uri: url,
        name: "photo.jpg",
        type: "image/jpeg",
    } as any);
    formData.append("name", photoType);
    if (word) {
        formData.append("word", word);
    }
    const response = await customApiConfig.post("/photo/avatar", formData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
        },
    });

    return response.data;
};
