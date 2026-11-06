import { customApiConfig } from "@/config/api/custom.api.config";
import { EditProfileData } from "../interface/edit-profile.interface";

export const axiosEditProfile = async (token: string, data: EditProfileData) => {
    console.log(token, data)
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