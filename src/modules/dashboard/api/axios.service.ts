import { customApiConfig } from "@/config/api/custom.api.config";
import { EditProfileData } from "../interface/edit-profile.interface";

export const axiosEditProfile = async (token: string, data: EditProfileData) => {
    const response = await customApiConfig.patch("/auth/user", {
        name: data.name,
        lastName: data.lastName
    }, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}
export const axiosRemoveProfile = async (token: string) => {
    const response = await customApiConfig.delete("/auth/user", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return response.data;
}