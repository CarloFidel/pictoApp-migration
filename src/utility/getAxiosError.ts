import axios from "axios"

export const getAxiosError = (error: unknown): number => {
    if (!axios.isAxiosError(error) || error.response?.status == null) {
        return 0
    }
    return error.response.status
}