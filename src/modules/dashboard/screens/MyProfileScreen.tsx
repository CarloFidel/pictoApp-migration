import { useAuthStore } from '@/modules/auth/store/authStore'
import { globalStyle } from '@/styles/global.style'
import { router } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import { Image, Pressable, StatusBar, Text, View } from 'react-native'
import Animated, { FadeInDown, FadeInLeft, FadeInRight } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import DashboardItem from '../components/DashboardItem'
import { DASHBOARD_AYUDA_ITEMS, DASHBOARD_CUENTA_ITEMS, DASHBOARD_PREFERENCIAS_ITEMS } from '../config/dasboard.items.config'

export const MyProfileScreen = () => {

    const { email, name, logOut, avatar, role } = useAuthStore.getState()

    return (
        <SafeAreaView edges={['top']} style={{ backgroundColor: globalStyle.color.primary[500], flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <View className='w-full flex-row justify-between items-center px-4' >
                <View className='py-10 gap-2'>
                    <Animated.Text entering={FadeInLeft.delay(400).duration(600)} className='text-white font-hanken-medium text-3xl'>{`${name}`} </Animated.Text>
                    <Animated.Text entering={FadeInLeft.delay(500).duration(800)} className='text-white font-hanken-light text-xl'>{email}</Animated.Text>
                </View>
                <Animated.View className='relative aspect-square w-18 rounded-full border border-white bg-white overflow-hidden'
                    style={globalStyle.shadow.large}
                    entering={FadeInRight.delay(600).duration(800)}
                >
                    <Image
                        source={
                            avatar
                                ? { uri: avatar }
                                : require('@/assets/images/generic-user-image.jpg')
                        }
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: "contain",
                        }}
                    />

                </Animated.View>
                <Pressable className='absolute top-24 right-3 p-2 rounded-full bg-white/80 z-10 active:bg-gray-300'>
                    <SymbolView name={{ ios: 'pencil', android: 'edit' }} size={18} tintColor={globalStyle.color.gray[55]} />
                </Pressable>

            </View>
            <Animated.View
                className='bg-white flex-1 rounded-t-4xl py-12 px-4 gap-12'
                entering={FadeInDown.duration(1000).delay(1000)}
                style={globalStyle.shadow.medium}
            >
                <View className='gap-3'>
                    <Text className='text-2xl text-gray-600 font-hanken-light mb-2'>Cuenta</Text>
                    {
                        DASHBOARD_CUENTA_ITEMS.map((item, index) => (
                            <DashboardItem
                                key={item.title}
                                icon={item.icon}
                                redirect={() => router.push(item.redirect!)}
                                title={item.title}
                            />
                        ))
                    }
                </View>
                <View className='gap-3'>
                    <Text className='text-2xl text-gray-600 font-hanken-light mb-2'>Ayuda</Text>
                    {
                        DASHBOARD_AYUDA_ITEMS.map((item, index) => (
                            <DashboardItem
                                key={item.title}
                                icon={item.icon}
                                redirect={() => router.push(item.redirect!)}
                                title={item.title}
                            />
                        ))
                    }
                </View>
                <View className='gap-3'>
                    <Text className='text-2xl text-gray-600 font-hanken-light mb-2'>Preferencias</Text>
                    {
                        DASHBOARD_PREFERENCIAS_ITEMS.map((item, index) => (
                            <DashboardItem
                                key={item.title}
                                icon={item.icon}
                                redirect={() => router.push(item.redirect!)}
                                title={item.title}
                            />
                        ))
                    }
                </View>
                <View>
                    <DashboardItem
                        icon={{ ios: 'arrow.left.square', android: 'logout' }}
                        title='Cerrar sesión'
                        onPress={() => {
                            logOut()
                            router.push('/login')
                        }}
                    />
                </View>
            </Animated.View>
        </SafeAreaView>
    )
}