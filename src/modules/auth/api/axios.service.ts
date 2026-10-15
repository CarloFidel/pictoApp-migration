import { customApiConfig } from "@/config/api/custom.api.config";
import { UserRegister } from "../interfaces/user.interface";

export const axiosRegister = async (data: UserRegister, roles: string[]) => {
    const response = await customApiConfig.post("/auth/register", {
        ...data,
        roles: roles
    });
    return response.data;
};
