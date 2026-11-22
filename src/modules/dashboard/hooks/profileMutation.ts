import { useMutation } from "@tanstack/react-query"
import { EditProfileData } from "../interface/edit-profile.interface"
import { axiosEditProfile, axiosRemoveProfile } from "../service/axios.dashboard.service"

export const useEditProfileMutation = () => useMutation({
    mutationFn: (data: EditProfileData) => axiosEditProfile(data),
    mutationKey: ["edit-profile"],
})
export const useRemoveProfileMutation = () => useMutation({
    mutationFn: () => axiosRemoveProfile(),
    mutationKey: ["remove-profile"],
})


