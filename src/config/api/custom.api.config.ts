import { useAuthStore } from "@/modules/auth/store/authStore";
import * as axios from "axios";

const publicRoutes = ["/auth/login", "/auth/register", "/auth/google"];

export const customApiConfig = axios.create({
    baseURL: process.env.EXPO_PUBLIC_CUSTOM_API,
})

customApiConfig.interceptors.request.use((config) => {
    const isPublic = publicRoutes.some((route) => config.url?.includes(route));
    const token = useAuthStore.getState().token;
    
    if (!isPublic && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

