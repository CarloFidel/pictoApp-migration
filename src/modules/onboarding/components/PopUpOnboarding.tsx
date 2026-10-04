import { PrimaryButtton } from '@/components/ui/PrimaryButtton'
import { type AndroidSymbol, type SFSymbol } from 'expo-symbols'
import { Text, View } from 'react-native'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'
import { useHeigthTransition } from '../animation/HeigthTransition'

interface PopUpOnboardingProps {
  buttonVariant?: "outline" | "filled"
  icon?: { ios: string, android: string } | undefined
  twoButtons: boolean
  title: string
  justifyTitle: 'center' | 'start' | 'end'
  labelOne: string
  labelTwo: string
  customHeight?: number
  body?: string[];
  image?: boolean;
  onPressOne: () => void
  onPressTwo?: () => void
}

export const PopUpOnboarding = ({
  twoButtons,
  onPressOne,
  onPressTwo,
  title,
  labelOne,
  labelTwo,
  customHeight,
  buttonVariant,
  icon,
  justifyTitle,
  body = undefined,
  image = undefined }: PopUpOnboardingProps) => {

  const animatedStyle = useHeigthTransition(customHeight!)

  return (
    <Animated.View entering={FadeInDown} className='w-full p-8 bg-linear-to-br from-background-light to-gray-400 rounded-2xl gap-8 shadow-lg'
      style={{ height: customHeight, ...animatedStyle }}

    >
      <Text
        className={`text-text text-3xl font-hanken-regular text-${justifyTitle}`}
      >{title}</Text>
      {
        body ? (
          <Animated.View
            entering={FadeIn.delay(100).duration(300)}
            className='items-center justify-center gap-8 '>
            {
              body.filter((item, index) => index !== 2 && index !== 3).map((item) => (
                <Text key={item} className='text-text text-[18px] font-hanken-regular text-center'>
                  {item}
                </Text>
              ))
            }
            {
              image && (
                <Animated.Image
                  source={{ uri: "https://api.arasaac.org/v1/pictograms/2780?download=false" }}
                  style={{
                    width: 200,
                    height: 200,
                  }}
                  entering={FadeIn.delay(100).duration(200)}
                />
              )
            }
                        {
              body.filter((item, index) => index !== 0 && index !== 1).map((item) => (
                <Text key={item} className='text-text text-[18px] font-hanken-regular text-start'>
                  {item}
                </Text>
              ))
            }

            <PrimaryButtton
              text={labelOne}
              variant={buttonVariant!}
              size="lg"
              onPress={onPressOne}
              icon={icon ? { ios: icon.ios as SFSymbol, android: icon.android as AndroidSymbol } : undefined}

            />

          </Animated.View>
        ) : (
          <View className='gap-4'>
            <PrimaryButtton
              text={labelOne}
              variant={buttonVariant!}
              size="lg"
              onPress={onPressOne}
              icon={icon ? { ios: icon.ios as SFSymbol, android: icon.android as AndroidSymbol } : undefined}

            />
            {
              twoButtons && (
                <PrimaryButtton
                  text={labelTwo}
                  variant={buttonVariant!}
                  size="lg"
                  onPress={onPressTwo}
                />

              )
            }

          </View>

        )
      }
    </Animated.View>
  )
}

