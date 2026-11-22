import { useMutation } from "@tanstack/react-query"
import { axiosEditProfile, axiosRemoveProfile } from "../api/axios.dashboard.service"
import { EditProfileData } from "../interface/edit-profile.interface"

export const useEditProfileMutation = () => useMutation({
    mutationFn: (data: EditProfileData) => axiosEditProfile( data),
    mutationKey: ["edit-profile"],
})
export const useRemoveProfileMutation = () => useMutation({
    mutationFn: () => axiosRemoveProfile(),
    mutationKey: ["remove-profile"],
})


