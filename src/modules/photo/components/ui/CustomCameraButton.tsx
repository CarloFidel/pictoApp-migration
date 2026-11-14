import { globalStyle } from '@/styles/global.style';
import { AndroidSymbol, SFSymbol, SymbolView } from 'expo-symbols';
import { Pressable } from 'react-native';

interface Props {
    icon: {
        ios: SFSymbol;
        android: AndroidSymbol;
    }

    onPress: () => void
    position: string
}

const CustomCameraButton = ({ icon, onPress, position }: Props) => {
    return (
        <Pressable onPress={onPress} className={`p-4 rounded-full bg-white/80 z-10 active:bg-gray-300 absolute ${position} active:scale-95 transition-all duration-100`}>
            <SymbolView name={icon} size={20} tintColor={globalStyle.color.gray[55]} />
        </Pressable>
    )
}

export default CustomCameraButton