import { BackButton } from '@/components/ui/BackButton';
import { PrimaryButtton } from '@/components/ui/PrimaryButtton';
import { globalStyle } from '@/styles/global.style';
import { Link } from 'expo-router';
import { Image, StatusBar, Text, useWindowDimensions, View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PopUpOnboarding } from '../components/PopUpOnboarding';
import { CustomProgressBar } from '../components/PropgressBar';
import { useOnboarding } from '../hooks/useOnboarding';

const OnBoardingScreen = () => {


  const { width, height } = useWindowDimensions();

  const {
    twoButtons,
    handleStart,
    showBackbutton,
    landingPage,
    showProgressBar,
    handleBack,
    progressValue,
    handlePressOne,
    handlePressTwo,
    title,
    labelOne,
    labelTwo,
    customHeight,
    buttonVariant,
    icon,
    justifyTitle,
    body,
    register,
    image,
    iconGoogle,
    step,
  } = useOnboarding();

  return (
    <SafeAreaView edges={['top']} className="h-full" style={{ backgroundColor: globalStyle.color.primary[400] }}>
      <StatusBar barStyle="light-content" />
      <View className="h-full items-center justify-center bg-linear-to-b from-primary-400 to-primary-700 px-4"
      >
        {
          showBackbutton && (
            <BackButton onPress={handleBack} />
          )
        }
        {
          showProgressBar && (
            <CustomProgressBar progressValue={progressValue} />
          )
        }

        {
          landingPage ? (
            <>
              <Animated.View
                entering={FadeIn.duration(300)}
                className="justify-center items-center gap-4">
                <Image
                  source={require("@/assets/images/icons.png")}
                  style={{
                    width: width * 0.8,
                    height: width * 0.3,
                    resizeMode: "contain",
                  }}
                />
                <Text
                  className="text-white text-3xl text-center mb-4 font-hanken-light"
                  style={{ width: width * 0.8 }}
                >
                  El mundo es más fácil con pictogramas
                </Text>
              </Animated.View>
              <View className="absolute bottom-8 mt-8 justify-end p-8">
                <PrimaryButtton
                  text="Empezar"
                  variant="outline"
                  size="lg"
                  icon={{ ios: 'arrow.forward.circle', android: 'arrow_circle_right' }}
                  onPress={handleStart}

                />
              </View>

            </>
          ) : (
            <PopUpOnboarding
              twoButtons={twoButtons}
              onPressOne={handlePressOne}
              onPressTwo={handlePressTwo}
              title={title!} labelOne={labelOne!}
              labelTwo={labelTwo!}
              customHeight={customHeight!}
              buttonVariant={buttonVariant as "outline" | "filled"}
              icon={icon!}
              justifyTitle={justifyTitle!}
              body={body}
              image={image}
              register={register}
              iconGoogle={iconGoogle}
              step={step}
            />
          )
        }



      </View>
      {
        step === 6 && (
          <Animated.View entering={FadeInDown.duration(600)} exiting={FadeOutDown.duration(600)} className="absolute bottom-0 left-0 right-0 p-4 w-full flex justify-center items-center">
            <Text className="text-white text-center text-[16px] mb-8"  >
              Ya tienes cuenta?
              <Link href="/login"> Inicia sesión</Link>
            </Text>
          </Animated.View>
        )
      }


    </SafeAreaView>
  )
}

export default OnBoardingScreen