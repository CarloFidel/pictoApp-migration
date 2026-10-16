import { globalStyle } from '@/styles/global.style';
import { AndroidSymbol, SFSymbol, SymbolView } from 'expo-symbols';
import { Pressable, Text, View } from 'react-native';

interface Props {
    icon: {
        ios: SFSymbol;
        android: AndroidSymbol;
    }
    title: string
    redirect?: () => void
    onPress?: () => void
}



const DashboardItem = ({ icon, title, redirect, onPress }: Props) => {
    return (
        <View className='flex-row w-full justify-between items-center'>
            <Pressable onPress={redirect ? redirect : onPress}>
                <View className='flex-row gap-4 justify-between items-center'>
                    <SymbolView name={icon} tintColor={globalStyle.color.text} size={20} />
                    <Text className='text-text text-xl'>{title}</Text>
                </View>
            </Pressable>
            <SymbolView name={{ ios: 'arrow.forward', android: 'arrow_forward' }} tintColor={globalStyle.color.text} size={14} />
        </View>
    )
}

export default DashboardItem