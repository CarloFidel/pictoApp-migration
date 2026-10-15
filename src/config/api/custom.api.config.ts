import * as axios from "axios";


export const customApiConfig = axios.create({
    baseURL: process.env.EXPO_PUBLIC_CUSTOM_API,
})