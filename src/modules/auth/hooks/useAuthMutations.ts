import { useMutation } from "@tanstack/react-query"
import { axiosLogin, axiosLoginGoogle, axiosRegister } from "../api/axios.service"
import { UserLogin, UserRegister } from "../interfaces/user.interface"

interface RegisterProps {
    data: UserRegister
    roles: string[]
}

interface LoginProps {
    data: UserLogin
}

interface LoginGoogleProps {
    token: string
    roles: string[]
}


export const useRegisterMutation = () => useMutation({
    mutationFn: ({ data, roles }: RegisterProps) => axiosRegister(data, roles),
    mutationKey: ["register"],
})


export const useLoginMutation = () => useMutation({
    mutationFn: ({ data }: LoginProps) => axiosLogin(data),
    mutationKey: ["login"],
})


export const useLoginGoogleMutation = () => useMutation({
    mutationFn: ({ token, roles }: LoginGoogleProps) => axiosLoginGoogle(token, roles),
    mutationKey: ["login-google"],
})