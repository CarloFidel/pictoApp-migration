import { customApiConfig } from "@/config/api/custom.api.config";
import { EditProfileData } from "../interface/edit-profile.interface";
import { DashboardContract } from "./contracts/dashboard.contract";
import { DASHBOARD_ENDPOINTS } from "./dashboard.endpoints";

export const axiosEditProfile = async (data: EditProfileData): Promise<DashboardContract> => {
    const response = await customApiConfig.patch(DASHBOARD_ENDPOINTS.user, {
        name: data.name,
        lastName: data.lastName
    });
    return response.data;
}
export const axiosRemoveProfile = async () => {
    const response = await customApiConfig.delete(DASHBOARD_ENDPOINTS.user);
    return response.data;
}