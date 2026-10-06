import CustomInput from '@/components/ui/CustomInput'
import { PrimaryButtton } from '@/components/ui/PrimaryButtton'
import { globalStyle } from '@/styles/global.style'
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Platform, Pressable, Text, useWindowDimensions, View } from 'react-native'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
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
            style={{ height: Platform.OS === 'ios' ? height - 70 : height, gap: 40, paddingTop: 80 }}
            className="justify-start items-center w-full py-10"
        >
            <Text className="text-4xl font-hanken-light text-text text-start w-full px-6">{formType === 'register' ? 'Registro' : 'Iniciar sesión'}</Text>

            {formType === 'register' && (
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
                                value={value}
                                error={errors.name ? true : false}
                            />
                            {errors.name && (
                                <Animated.View
                                    entering={FadeIn}
                                    className="flex-row justify-start items-center gap-2 mt-2"
                                >
                                    <SymbolView name={{ ios: 'exclamationmark.triangle', android: 'warning_amber' }} size={18} tintColor={"red"} />
                                    <Text style={{ color: "red" }} className="text-left">
                                        {errors.name.message}
                                    </Text>
                                </Animated.View>
                            )}
                        </View>
                    )}
                />

            )}

            {formType === 'register' && (
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
                                value={value}
                                error={errors.lastName ? true : false}
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
                        </View>
                    )}
                />


            )}
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
                            value={value}
                            error={errors.email ? true : false}
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

            <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                    <View className="relative">
                        <CustomInput
                            placeholder="Contraseña"
                            secureTextEntry={!isPasswordVisible ? true : false}
                            onChange={onChange}
                            value={value}
                            error={errors.password ? true : false}
                        />
                        {errors.password && (
                            <Animated.View
                                entering={FadeIn}
                                style={{ width: width * 0.9 }}
                                className="flex-row justify-start items-center gap-2 mt-2"
                            >
                                <SymbolView name={{ ios: 'exclamationmark.triangle', android: 'warning_amber' }} size={18} tintColor={"red"} />
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
            {
                formType === 'register' ? (<Animated.View
                    entering={FadeInDown.duration(1000)}
                    className="absolute bottom-10"
                >
                    <Text className=" text-[16px] font-hanken-light">
                        Ya tienes una cuenta? <Link href="/login" style={{ color: globalStyle.color.primary[700] }}>Inicia sesión</Link>
                    </Text>
                </Animated.View>
                ) : (
                    <Animated.View
                        entering={FadeInDown.duration(1000)}
                        className="absolute bottom-10"
                    >
                        <Text className=" text-[16px] font-hanken-light">
                            No tienes una cuenta? <Link href="/register" style={{ color: globalStyle.color.primary[700] }}>Registrate</Link>
                        </Text>
                    </Animated.View>
                )}
        </View>
    );
};

export default CustomForm;