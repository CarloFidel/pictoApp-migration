import { useAuthStore } from "@/modules/auth/store/authStore";
import { customApiConfig } from "../custom.api.config";

const publicRoutes = ["/auth/login", "/auth/register", "/auth/google"];

customApiConfig.interceptors.request.use((config) => {
    const isPublic = publicRoutes.some((route) => config.url?.includes(route));
    const token = useAuthStore.getState().token;
    
    if (!isPublic && token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});
