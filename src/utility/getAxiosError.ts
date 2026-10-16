import axios from "axios"

export const getAxiosError = (error: unknown): string => {
    const serverMessage = axios.isAxiosError(error)
    ? error.response?.data?.message
    : error instanceof Error
    ? error.message
    : 'Ocurrió un error desconocido'

    return serverMessage
  
}