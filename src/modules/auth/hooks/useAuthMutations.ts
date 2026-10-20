import { useMutation } from "@tanstack/react-query"
import { axiosLogin, axiosRegister } from "../api/axios.service"
import { UserLogin, UserRegister } from "../interfaces/user.interface"

interface RegisterProps {
    data: UserRegister
    roles: string[]
}

interface LoginProps {
    data: UserLogin
}


export const useRegisterMutation = () => useMutation({
    mutationFn: ({ data, roles }: RegisterProps) => axiosRegister(data, roles),
}
)
export const useLoginMutation = () => useMutation({
    mutationFn: ({ data }: LoginProps) => axiosLogin(data),
}
)