import { useMutation } from "@tanstack/react-query"
import { axiosEditProfile } from "../api/axios.service"
import { EditProfileData } from "../interface/edit-profile.interface"

interface EditProfileMutationProps {
    token: string
    data: EditProfileData
}

export const useEditProfileMutation = () => useMutation({
    mutationFn: ({ token, data }: EditProfileMutationProps) => axiosEditProfile(token, data),
    mutationKey: ["edit-profile"],
})


