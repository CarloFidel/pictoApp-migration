import { customApiConfig } from "@/config/api/custom.api.config";
import { UserLogin, UserRegister } from "../interfaces/user.interface";
import { AUTH_ENDPOINTS } from "./auth.enpoints";
import { UserDto } from "./contract/userdto.contract";


export const axiosRegister = async (data: UserRegister, roles: string[]): Promise<UserDto> => {
    const response = await customApiConfig.post(AUTH_ENDPOINTS.REGISTER, {
        ...data,
        roles: roles
    });
    return response.data;
};


export const axiosLogin = async (data: UserLogin): Promise<UserDto>  => {
    const response = await customApiConfig.post(AUTH_ENDPOINTS.LOGIN, {
        ...data,
    });
    return response.data;
};


export const axiosLoginGoogle = async (googleToken: string, roles: string[]): Promise<UserDto>  => {
    const response = await customApiConfig.post(AUTH_ENDPOINTS.LOGIN_GOOGLE, {
        token: googleToken,
        roles: roles || []
    });
    return response.data;
}