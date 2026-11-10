import { CustomInput } from "@/components/ui"
import { PrimaryButtton } from "@/components/ui/PrimaryButtton"
import { useAuthStore } from "@/modules/auth/store/authStore"
import { globalStyle } from "@/styles/global.style"
import { zodResolver } from "@hookform/resolvers/zod"
import { SymbolView } from "expo-symbols"
import { Controller, useForm } from "react-hook-form"
import { Platform, Pressable, Text, useWindowDimensions, View } from "react-native"
import Animated, { FadeIn, FadeOut, ZoomIn } from "react-native-reanimated"
import { useEditProfileMutation } from "../hooks/profileMutation"
import { useEditField } from "../hooks/useEditField"
import { EditProfileData } from "../interface/edit-profile.interface"
import { EditProfileSchema } from "../schema/edit-profile.schema"
import { getTherapistRole } from "../utility/getRole"
import { CustomAvatar } from "./CustomAvatar"

type editProfileMutate = ReturnType<typeof useEditProfileMutation>['mutate']


interface Props {
    setShowDeleteAccountPopup: (term: boolean) => void;
    setShowPasswordChangePopup: (term: boolean) => void;
    onEditProfile: editProfileMutate
}


export const PersonalInfoForm = ({ setShowDeleteAccountPopup, setShowPasswordChangePopup, onEditProfile }: Props) => {
    const { email, name, lastName, avatar, roles, token } = useAuthStore.getState()

    const { height, width } = useWindowDimensions()
    const { control, handleSubmit, formState: { errors } } = useForm<EditProfileData>({ resolver: zodResolver(EditProfileSchema), defaultValues: { name: name, lastName: lastName, avatar: avatar, } })

    const onSubmit = handleSubmit((data) => {
        onEditProfile({ token: token ?? '', data: data })
    })


    const {
        isEditingName,
        isEditingLastName,
        nameInputRef,
        lastNameInputRef,
        handleEdit,
    } = useEditField()


    return (
        <View
            style={{ height: height * 0.85, justifyContent: 'space-between', paddingTop: 70 }}
            className="justify-start items-center w-full py-10"

        >
            <View
                className={`flex-1 justify-start items-center gap-5 ${Platform.OS === 'ios' ? 'gap-8' : 'gap-10'}`}
            >

                <Text className="text-4xl font-hanken-light text-text text-center w-full px-6">Información Personal</Text>
                <Animated.View>
                    <CustomAvatar avatar={avatar!} istherapist={false} size={'medium'} enteringDirection={'top'} delay={200} />
                    <Animated.View
                        entering={ZoomIn.delay(1000).springify().damping(10).stiffness(100).mass(1)}
                        className='absolute top-24 right-3 rounded-full'
                        style={globalStyle.shadow.small}
                    >
                        <Pressable className='p-2 rounded-full bg-white/80 z-10 active:bg-gray-300' >
                            <SymbolView name={{ ios: 'pencil', android: 'edit' }} size={18} tintColor={globalStyle.color.gray[55]} />
                        </Pressable>
                    </Animated.View>
                </Animated.View>

                {
                    getTherapistRole(roles!) && (

                        <Text className="text-2xl font-hanken-light text-text text-center w-full px-6">Therapist</Text>
                    )
                }



                <Controller
                    control={control}
                    name="name"
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <CustomInput
                                ref={nameInputRef}
                                placeholder={name ?? ''}
                                keyboardType="default"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                error={errors.name ? true : false}
                                editable={isEditingName}
                                positionText="left"

                            />
                            {errors.name && (
                                <Animated.View
                                    entering={FadeIn}
                                    className="flex-row justify-start items-center gap-2 mt-2 w-full"
                                >
                                    <SymbolView name={{ ios: 'exclamationmark.triangle', android: 'warning_amber' }} size={18} tintColor={"red"} />
                                    <Text style={{ color: "red" }} className="text-left">
                                        {errors.name.message}
                                    </Text>
                                </Animated.View>
                            )}
                            {
                                isEditingName ? (
                                    <Pressable
                                        onPress={() => handleEdit({ item: 'name' })}
                                        className="absolute right-4 top-5"
                                    >
                                        <SymbolView name={{ ios: 'xmark', android: 'close' }} size={18} tintColor={"gray"} />
                                    </Pressable>

                                )
                                    :
                                    (
                                        <Pressable
                                            onPress={() => handleEdit({ item: 'name' })}
                                            className="absolute right-4 top-5"
                                        >
                                            <SymbolView name={{ ios: 'pencil', android: 'edit' }} size={18} tintColor={"gray"} />
                                        </Pressable>
                                    )
                            }

                        </View>
                    )}
                />


                <Controller
                    control={control}
                    name="lastName"
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <CustomInput
                                ref={lastNameInputRef}
                                placeholder={lastName ?? ''}
                                keyboardType="default"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={value}
                                error={errors.lastName ? true : false}
                                editable={isEditingLastName}
                                positionText="left"
                            />
                            {errors.lastName && (
                                <Animated.View
                                    entering={FadeIn}
                                    className="flex-row justify-start items-center gap-2 mt-2"
                                >
                                    <SymbolView name={{ ios: 'exclamationmark.triangle', android: 'warning_amber' }} size={18} tintColor={"red"} />
                                    <Text style={{ color: "red" }} className="text-left">
                                        {errors.lastName.message}
                                    </Text>
                                </Animated.View>
                            )}
                            {
                                isEditingLastName ? (
                                    <Pressable
                                        onPress={() => handleEdit({ item: 'lastName' })}
                                        className="absolute right-4 top-5"
                                    >
                                        <SymbolView name={{ ios: 'xmark', android: 'close' }} size={18} tintColor={"gray"} />
                                    </Pressable>
                                )
                                    :
                                    (
                                        <Pressable
                                            onPress={() => handleEdit({ item: 'lastName' })}
                                            className="absolute right-4 top-5"
                                        >
                                            <SymbolView name={{ ios: 'pencil', android: 'edit' }} size={18} tintColor={"gray"} />
                                        </Pressable>
                                    )
                            }

                        </View>
                    )}
                />


                <View>
                    <CustomInput
                        placeholder={email ?? 'Email'}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email ?? ''}
                        editable={false}
                        colorText={globalStyle.color.gray[55]}
                        positionText="center"


                    />
                </View>
                {

                    (isEditingName || isEditingLastName) && (
                        <Animated.View entering={FadeIn.duration(300)} exiting={FadeOut.duration(300)}>
                            <PrimaryButtton
                                size='lg'
                                icon={{ ios: 'arrow.forward.circle', android: 'arrow_circle_right' }}
                                variant={'filled'}
                                text='Confirmar'
                                onPress={onSubmit}
                            />

                        </Animated.View>
                    )
                }

                <Pressable onPress={() => { setShowPasswordChangePopup(true) }}>
                    <Text className="text-lg font-hanken-light text-center w-full px-6 text-primary">Cambiar contraseña</Text>
                </Pressable>

            </View>



        </View>
    )
}
