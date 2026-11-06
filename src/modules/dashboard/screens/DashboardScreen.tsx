import { useAuthStore } from '@/modules/auth/store/authStore'
import { globalStyle } from '@/styles/global.style'
import { router } from 'expo-router'
import { SymbolView } from 'expo-symbols'
import { Pressable, StatusBar, Text, View } from 'react-native'
import Animated, { FadeInDown, FadeInLeft, ZoomIn } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import { CustomAvatar } from '../components/CustomAvatar'
import { DashboaedBackgroundSvg } from '../components/DashboaedBackgroundSvg'
import DashboardItem from '../components/DashboardItem'
import { DASHBOARD_AYUDA_ITEMS, DASHBOARD_CUENTA_ITEMS, DASHBOARD_PREFERENCIAS_ITEMS } from '../config/dasboard.items.config'


export const DashboardScreen = () => {

    const { email, name, logOut, avatar, roles } = useAuthStore.getState()

    let istherapist: boolean = false
    if (roles?.includes('therapist')) {
        istherapist = true
    }

    return (
        <SafeAreaView edges={['top']} style={{ backgroundColor: globalStyle.color.primary[500], flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <View className='w-full flex-row justify-between items-center px-4 overflow-visible' >
                <View className=' py-10 gap-2'>
                    <Animated.View entering={FadeInLeft.duration(600)} className={'flex-row gap-8 justify-start items-center'}>
                        <Text className='text-white font-hanken-medium text-3xl'>
                            {name}
                        </Text>
                    </Animated.View>
                    <Animated.Text entering={FadeInLeft.delay(500).duration(400)} className='text-white font-hanken-light text-xl'>{email}</Animated.Text>
                </View>
                <CustomAvatar avatar={avatar!} istherapist={false} size={'small'} enteringDirection={'right'} />

                <Animated.View
                    entering={ZoomIn.delay(1000).springify().damping(10).stiffness(100).mass(1)}
                    className='absolute top-24 right-3 rounded-full'
                    style={globalStyle.shadow.small}
                >
                    <Pressable className='p-2 rounded-full bg-white/80 z-10 active:bg-gray-300' >
                        <SymbolView name={{ ios: 'pencil', android: 'edit' }} size={18} tintColor={globalStyle.color.gray[55]} />
                    </Pressable>
                </Animated.View>

            </View>
            <Animated.View
                className={`relative flex-1 overflow-hidden rounded-t-4xl py-12 px-4 gap-12 border border-primary-600 bg-white`}
                entering={FadeInDown.duration(600).delay(1000)}
                style={globalStyle.shadow.dashboard}
            >
                {
                    istherapist && (
                        <DashboaedBackgroundSvg />
                    )
                }
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
                            router.push({ pathname: '/login', params: { from: 'dashboard' } })
                            logOut()
                        }}
                    />
                </View>
            </Animated.View>
        </SafeAreaView>
    )
}