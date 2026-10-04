import { globalStyle } from '@/styles/global.style';
import { AndroidSymbol, SFSymbol, SymbolView } from 'expo-symbols';
import { Platform, Pressable, PressableProps } from 'react-native';
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';

interface BackButtonProps extends PressableProps {
    icon?: {
        ios: SFSymbol;
        android: AndroidSymbol;
    };
}

const defaultIcon = {
    ios: 'arrow.left',
    android: 'arrow_left',
} as const;


export const BackButton = ({ icon = defaultIcon, ...props }: BackButtonProps) => {
    return (
        <Animated.View
            entering={FadeInLeft.duration(500)}
            exiting={FadeOutLeft.duration(500)}
            className={`absolute top-4 left-4`}
        >

            <Pressable
                className={`bg-background-light rounded-2xl p-4 ${globalStyle.buttonPress} `}
                style={globalStyle.shadow.small}
                {...props}
            >
                <SymbolView
                    name={icon}
                    size={Platform.OS === 'ios' ? 20 : 24}
                    tintColor='black' />
            </Pressable>
        </Animated.View>

    )
}

