import { customApiConfig } from "@/config/api/custom.api.config";
import { UserLogin, UserRegister } from "../interfaces/user.interface";

export const axiosRegister = async (data: UserRegister, roles: string[]) => {
    const response = await customApiConfig.post("/auth/register", {
        ...data,
        roles: roles
    });
    return response.data;
};
export const axiosLogin = async (data: UserLogin,) => {
    const response = await customApiConfig.post("/auth/login", {
        ...data,
    });
    return response.data;
};

