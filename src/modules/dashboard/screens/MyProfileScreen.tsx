import { globalStyle } from '@/styles/global.style'
import { router } from 'expo-router'
import { StatusBar, Text, View } from 'react-native'
import Animated, { FadeInDown, FadeInLeft } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import DashboardItem from '../components/DashboardItem'
import { DASHBOARD_AYUDA_ITEMS, DASHBOARD_CUENTA_ITEMS, DASHBOARD_PREFERENCIAS_ITEMS } from '../config/dasboard.items.config'

export const MyProfileScreen = () => {
    return (
        <SafeAreaView edges={['top']} style={{ backgroundColor: globalStyle.color.primary[500], flex: 1 }}>
            <StatusBar barStyle="light-content" />
            <View className='px-4 py-10 gap-2'>
                <Animated.Text entering={FadeInLeft} className='text-white font-hanken-medium text-3xl'>Jhon Dow </Animated.Text>
                <Animated.Text entering={FadeInLeft.delay(200)} className='text-white font-hanken-light text-xl'>johndoww@test.com</Animated.Text>
            </View>
            <Animated.View
                className='bg-white flex-1 rounded-t-4xl py-12 px-6 gap-12'
                entering={FadeInDown.delay(400)}
                style={globalStyle.shadow.medium}
            >
                <View className='gap-4'>
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
                <View className='gap-4'>
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
                <View className='gap-4'>
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
            </Animated.View>
        </SafeAreaView>
    )
}