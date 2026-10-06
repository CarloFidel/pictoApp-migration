import CustomInput from '@/components/ui/CustomInput'
import { PrimaryButtton } from '@/components/ui/PrimaryButtton'
import { zodResolver } from "@hookform/resolvers/zod"
import { SymbolView } from 'expo-symbols'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, Text, useWindowDimensions, View } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { UserRegister } from '../interfaces/User.interface'
import { RegisterSchema } from '../schema/form.schema'

interface Props {
    onSubmitTrigger: 'register' | 'login'
    formType: 'register' | 'login'
}


const CustomForm = ({ onSubmitTrigger, formType }: Props) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { height, width } = useWindowDimensions()
    const { control, handleSubmit, formState: { errors } } = useForm<UserRegister>({ resolver: zodResolver(RegisterSchema) })


    const onSubmit = handleSubmit((data) => {
        console.log(data)
        if (onSubmitTrigger === 'register') {
            console.log('register')
        } else {
            console.log('login')
        }
    })

    return (
        <View
            style={{ height: height, gap: 40, marginTop: 40 }}
            className="justify-start items-center w-full py-10"
        >
            <Text className="text-4xl font-hanken-light text-text text-start w-full px-6">{formType === 'register' ? 'Registro' : 'Iniciar sesión'}</Text>

            <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                    <View>
                        <CustomInput
                            placeholder="Nombre"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChange={onChange}
                            value={value} />
                        {errors.name && (
                            <Animated.View
                                entering={FadeIn}
                                className="flex-row justify-start items-center gap-2 mt-2"
                            >
                                <Text style={{ color: "red" }} className="text-left">
                                    {errors.name.message as string}
                                </Text>
                            </Animated.View>
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="lastName"
                render={({ field: { onChange, value } }) => (
                    <View>
                        <CustomInput
                            placeholder="Apellido"
                            keyboardType="default"
                            autoCapitalize="none"
                            onChange={onChange}
                            value={value} />
                        {errors.lastName && (
                            <Animated.View
                                entering={FadeIn}
                                className="flex-row justify-start items-center gap-2 mt-2"
                            >
                                <Text style={{ color: "red" }} className="text-left">
                                    {errors.lastName.message as string}
                                </Text>
                            </Animated.View>
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                    <View>
                        <CustomInput
                            placeholder="Email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            onChange={onChange}
                            value={value} />
                        {errors.email && (
                            <Animated.View
                                entering={FadeIn}
                                className="flex-row justify-start items-center gap-2 mt-2"
                            >
                                <Text style={{ color: "red" }} className="text-left">
                                    {errors.email.message as string}
                                </Text>
                            </Animated.View>
                        )}
                    </View>
                )}
            />

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <View className="relative">
                        <CustomInput
                            placeholder="Contraseña"
                            secureTextEntry={!isPasswordVisible ? true : false}
                            onChange={onChange}
                            value={value} />
                        {errors.password && (
                            <Animated.View
                                entering={FadeIn}
                                style={{ width: width * 0.9 }}
                                className="flex-row justify-start items-center gap-2 mt-2"
                            >
                                <SymbolView name={'exclamationmark.triangle'} size={18} tintColor={"red"} />
                                <Text style={{ color: "red" }} className="text-left">
                                    {errors.password.message!}
                                </Text>
                            </Animated.View>
                        )}
                        <Pressable
                            onPress={() => setIsPasswordVisible((prev) => !prev)}
                            className="absolute right-4 top-5"
                        >
                            {isPasswordVisible ? (
                                <SymbolView name="eye" size={18} tintColor={"gray"} />
                            ) : (
                                <SymbolView name="eye.slash" size={18} tintColor={"gray"} />
                            )}
                        </Pressable>
                    </View>
                )}
            />
            <PrimaryButtton
                size='lg'
                icon={{ ios: 'arrow.forward.circle', android: 'arrow_circle_right' }}
                variant='filled'
                text='Confirmar'
                onPress={onSubmit}
            />

        </View>)
}

export default CustomForm