import { globalStyle } from '@/styles/global.style';
import { useWindowDimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';

interface Props {
  progressValue: number
}

export const CustomProgressBar = ({ progressValue }: Props) => {

  const { width, height } = useWindowDimensions()

  return (
    <Animated.View
      entering={FadeInRight.duration(500)}
      exiting={FadeOutRight.duration(500)}
      style={{
        position: "absolute",
        left: width * 0.2,
        top: height * 0.045,
      }}

    >
      <Progress.Bar
        progress={progressValue}
        width={width * 0.7}
        color="white"
        unfilledColor={globalStyle.color.primary[300]}
        borderWidth={0}
        height={5}
        borderRadius={5}
      />
    </Animated.View>
  )
}