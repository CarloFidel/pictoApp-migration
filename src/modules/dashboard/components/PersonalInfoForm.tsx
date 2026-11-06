import CustomInput from "@/components/ui/CustomInput"
import { PrimaryButtton } from "@/components/ui/PrimaryButtton"
import { UserRegister } from "@/modules/auth/interfaces/user.interface"
import { RegisterSchema } from "@/modules/auth/schema/form.schema"
import { useAuthStore } from "@/modules/auth/store/authStore"
import { globalStyle } from "@/styles/global.style"
import { zodResolver } from "@hookform/resolvers/zod"
import { SymbolView } from "expo-symbols"
import { Controller, useForm } from "react-hook-form"
import { Platform, Pressable, Text, useWindowDimensions, View } from "react-native"
import Animated, { FadeIn, FadeInDown, FadeOut, ZoomIn } from "react-native-reanimated"
import { useEditField } from "../hooks/useEditField"
import { getTherapistRole } from "../utility/getRole"
import { CustomAvatar } from "./CustomAvatar"





export const PersonalInfoForm = () => {

    const { email, name, lastName, avatar, roles } = useAuthStore.getState()


    const { height, width } = useWindowDimensions()
    const { control, handleSubmit, formState: { errors } } = useForm<UserRegister>({ resolver: zodResolver(RegisterSchema), defaultValues: { name: name, lastName: lastName, email: email } })

    const onSubmit = handleSubmit((data) => {
        console.log(data)
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
            style={{ height: height * 0.94, justifyContent: 'space-between', paddingTop: 70 }}
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


                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <View>
                            <CustomInput
                                placeholder={email ?? 'Email'}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                onChangeText={onChange}
                                value={email}
                                error={errors.email ? true : false}
                                editable={false}
                                colorText={globalStyle.color.gray[55]}
                                positionText="center"


                            />
                            {errors.email && (
                                <Animated.View
                                    entering={FadeIn}
                                    className="flex-row justify-start items-center gap-2 mt-2"
                                >
                                    <SymbolView name={{ ios: 'exclamationmark.triangle', android: 'warning_amber' }} size={18} tintColor={"red"} />
                                    <Text style={{ color: "red" }} className="text-left">
                                        {errors.email.message}
                                    </Text>
                                </Animated.View>
                            )}
                        </View>
                    )}
                />
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

                <Pressable>
                    <Text className="text-lg font-hanken-light text-center w-full px-6 text-primary">Cambiar contraseña</Text>
                </Pressable>

            </View>



            <Animated.View entering={FadeInDown.duration(800)} exiting={FadeOut.duration(300)} className='gap-5'>
                <Pressable>
                    <Text className="text-lg font-hanken-light text-center w-full px-6 text-alert">Eliminar cuenta</Text>
                </Pressable>
            </Animated.View>
        </View>
    )
}
