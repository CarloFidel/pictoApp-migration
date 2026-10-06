import { useEffect, useRef } from "react"
import { useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated"

export const TransitionOpacity = (trigger: number, delay: number = 0) => {
    const animatedOpacity = useSharedValue(0)
    const previousTrigger = useRef(trigger)

    if (previousTrigger.current !== trigger) {
        previousTrigger.current = trigger
        animatedOpacity.value = 0
    }

    useEffect(() => {
        animatedOpacity.value = withDelay(delay, withTiming(1, { duration: 200 }))
    }, [trigger, animatedOpacity])

    return useAnimatedStyle(() => ({
        opacity: animatedOpacity.value,
    }))
}
