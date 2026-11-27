import { globalStyle } from '@/styles/global.style'
import { SymbolView } from 'expo-symbols'
import { Pressable } from 'react-native'
import Animated, { ZoomIn } from 'react-native-reanimated'

interface Props {
  delay?: number
}

export const EditBubble = ({ delay }: Props) => {
  return (
    <Animated.View
    entering={ZoomIn.delay(delay ?? 1000).springify().damping(10).stiffness(100).mass(1)}
    className='absolute top-24 right-3 rounded-full'
    style={globalStyle.shadow.small}
>
    <Pressable className='p-2 rounded-full bg-white/80 z-10 active:bg-gray-300' >
        <SymbolView name={{ ios: 'pencil', android: 'edit' }} size={18} tintColor={globalStyle.color.gray[55]} />
    </Pressable>
</Animated.View>
)
}
