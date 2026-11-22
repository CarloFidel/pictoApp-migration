import { customApiConfig } from "@/config/api/custom.api.config";
import { UserLogin, UserRegister } from "../interfaces/user.interface";
import { AUTH_ENDPOINTS } from "./auth.enpoints";


export const axiosRegister = async (data: UserRegister, roles: string[]) => {
    const response = await customApiConfig.post(AUTH_ENDPOINTS.REGISTER, {
        ...data,
        roles: roles
    });
    return response.data;
};


export const axiosLogin = async (data: UserLogin,) => {
    const response = await customApiConfig.post(AUTH_ENDPOINTS.LOGIN, {
        ...data,
    });
    return response.data;
};


export const axiosLoginGoogle = async (googleToken: string, roles: string[]) => {
    const response = await customApiConfig.post(AUTH_ENDPOINTS.LOGIN_GOOGLE, {
        token: googleToken,
        roles: roles || []
    });
    return response.data;
}