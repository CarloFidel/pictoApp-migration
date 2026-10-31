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
    googleToken: string
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
    mutationFn: ({ googleToken }: LoginGoogleProps) => axiosLoginGoogle(googleToken),
    mutationKey: ["login-google"],
})