import { PrimaryButtton } from '@/components/ui/PrimaryButtton'
import { router } from 'expo-router'
import { type AndroidSymbol, type SFSymbol } from 'expo-symbols'
import { View } from 'react-native'
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
  register?: boolean;
  iconGoogle?: boolean;
  step?: number;
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
  iconGoogle,
  justifyTitle,
  step = 0,
  register = false,
  body = undefined,
  image = undefined }: PopUpOnboardingProps) => {

  const animatedStyle = useHeigthTransition(customHeight!)
  return (
    <Animated.View entering={FadeInDown} className='w-full p-8 bg-linear-to-br from-white to-gray-300 rounded-2xl gap-8 shadow-lg'
      style={{ height: customHeight, ...animatedStyle }}

    >
      <Animated.Text
        entering={FadeIn.delay(100).duration(500 * step)}
        className={`text-text text-3xl font-hanken-regular text-${justifyTitle}`}
      >{title}
      </Animated.Text>
      {
        body ? (
          <Animated.View
            className='items-center justify-center gap-8 '>
            {
              body.filter((item, index) => index !== 2 && index !== 3).map((item, index) => (
                <Animated.Text key={item} entering={FadeIn.delay(100).duration(500)} className='text-text text-[18px] font-hanken-regular text-start'>
                  {item}
                </Animated.Text>
              ))
            }
            {
              image && (
                <Animated.Image
                  source={{ uri: "https://api.arasaac.org/v1/pictograms/2780?download=false" }}
                  style={[{
                    width: 200,
                    height: 200,
                  }]}
                  entering={FadeIn.delay(100).duration(500)}
                />
              )
            }
            {
              body.filter((item, index) => index !== 0 && index !== 1).map((item) => (
                <Animated.Text key={item} entering={FadeIn.delay(200).duration(200)}  className='text-text text-[18px] font-hanken-regular text-start px-4'>
                  {item}
                </Animated.Text>
              ))
            }

            {
              !register && (
                <Animated.View >
                  <PrimaryButtton
                    text={labelOne}
                    distanceTop={20}
                    variant={buttonVariant!}
                    size="lg"
                    onPress={onPressOne}
                    icon={icon ? { ios: icon.ios as SFSymbol, android: icon.android as AndroidSymbol } : undefined}
                  />
                </Animated.View>
              )
            }


          </Animated.View>
        ) : (
          !register && (
            <Animated.View className='gap-4 justify-center items-center'>
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
            </Animated.View>

          )

        )
      }
      {
        register && (
          <View className='gap-4 justify-center items-center'>
            <PrimaryButtton
              text="Regístrate con Google"
              variant='filled'
              size="lg"
              onPress={onPressOne}
              backgroundColor='bg-black'
              iconRight={true}
              //icon={{ ios: 'apple.logo', android: 'google_home_devices' }}
              iconGoogle={iconGoogle}


            />
            <PrimaryButtton
              text="Regístrate con Email"
              variant='outline'
              size="lg"
              icon={{ ios: 'envelope', android: 'email' }}
              iconRight={true}
              onPress= {() => router.push('/register')}
            />
          </View>

        )
      }
    </Animated.View>
  )
}

