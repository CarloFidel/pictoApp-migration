import { globalStyle } from '@/styles/global.style'
import { Image } from 'react-native'
import Animated, { FadeInDown, FadeInLeft, FadeInRight, FadeInUp } from 'react-native-reanimated'

interface Props {
  avatar: string
  istherapist: boolean
  size: 'small' | 'medium' | 'large'
  enteringDirection: 'left' | 'right' | 'top' | 'bottom'
  delay?: number
}


export const CustomAvatar = ({ avatar, istherapist, size, enteringDirection, delay }: Props) => {
  return (
    <Animated.View className={`relative aspect-square ${size === 'small' ? 'w-22' : size === 'medium' ? 'w-28' : 'w-32'} rounded-full  ${istherapist ? 'border-3' : 'border'} ${istherapist ? 'border-primary-700' : 'border-white'} bg-white overflow-hidden`}
    style={globalStyle.shadow.medium}
    entering={enteringDirection === 'left' ? FadeInLeft.delay(delay ?? 600).duration(300) : enteringDirection === 'right' ? FadeInRight.delay(delay ?? 600).duration(300) : enteringDirection === 'top' ? FadeInUp.delay(delay ?? 600).duration(300) : FadeInDown.delay(delay ?? 600).duration(300)}
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

</Animated.View>  )
}
