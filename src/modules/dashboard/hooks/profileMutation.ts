import { useMutation } from "@tanstack/react-query"
import { axiosEditProfile, axiosRemoveProfile } from "../api/axios.service"
import { EditProfileData } from "../interface/edit-profile.interface"

interface EditProfileMutationProps {
    token: string
    data: EditProfileData
}

export const useEditProfileMutation = () => useMutation({
    mutationFn: ({ token, data }: EditProfileMutationProps) => axiosEditProfile(token, data),
    mutationKey: ["edit-profile"],
})
export const useRemoveProfileMutation = () => useMutation({
    mutationFn: (token: string) => axiosRemoveProfile(token),
    mutationKey: ["remove-profile"],
})


