import { useMutation } from "@tanstack/react-query"
import { axiosRegister } from "../api/axios.service"
import { UserRegister } from "../interfaces/user.interface"

interface Props {
    data: UserRegister
    roles: string[]
}

export const useRegisterMutation = () => useMutation({
    mutationFn: ({data, roles}: Props) => axiosRegister(data, roles),
    onError: (error) => {
        console.log(error)
    },
    onSuccess: (data) => {
        console.log(data)
    }

})