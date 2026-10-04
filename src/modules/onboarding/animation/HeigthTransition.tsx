import { useEffect } from 'react';
import {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export const useHeigthTransition = (height: number) => {
    const customHeight = useSharedValue(270)

    useEffect(() => {
        customHeight.value = withTiming(height, { duration: 200 })
    }, [height, customHeight])

    const animatedStyle = useAnimatedStyle(() => ({
        height: customHeight.value,
       // overflow: 'hidden',
    }))

    return animatedStyle
}