import { customApiConfig } from "@/config/api/custom.api.config";

interface Props {
    url: string;
    token: string;
}

export const axiosUploadPhoto = async ({ url, token }: Props) => {
    const formData = new FormData();

    formData.append("file", {
        uri: url,
        name: "photo.jpg",
        type: "image/jpeg",
    } as any);

    const response = await customApiConfig.post("/photo/upload", {
        data: formData,
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    });
    
    return response.data;
};
