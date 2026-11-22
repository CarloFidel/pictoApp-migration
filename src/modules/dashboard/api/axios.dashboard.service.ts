import { customApiConfig } from "@/config/api/custom.api.config";
import { EditProfileData } from "../interface/edit-profile.interface";

export const axiosEditProfile = async (data: EditProfileData) => {
    const response = await customApiConfig.patch("/auth/user", {
        name: data.name,
        lastName: data.lastName
    });
    return response.data;
}
export const axiosRemoveProfile = async () => {
    const response = await customApiConfig.delete("/auth/user");
    return response.data;
}