import { customApiConfig } from "@/config/api/custom.api.config";


export const axiosUploadPhoto = async (url: string) => {
    const formData = new FormData();

    formData.append("file", {
        uri: url,
        name: "photo.jpg",
        type: "image/jpeg",
    } as any);

    const response = await customApiConfig.post("/photo/avatar", 
       formData,
       {
        headers: {
            "Content-Type": "multipart/form-data",
        },
       }
    )
    return response.data;
};
