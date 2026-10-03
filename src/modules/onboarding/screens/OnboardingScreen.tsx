import { PrimaryButtton } from '@/components/ui/PrimaryButtton';
import { Image, StatusBar, Text, useWindowDimensions, View } from 'react-native';

const OnBoardingScreen = () => {

  const { width, height } = useWindowDimensions();

  return (
    <>
      <StatusBar barStyle="light-content" />
      <View className="flex-1 items-center justify-center bg-linear-to-b from-primary-400 to-primary-700"
      >
        <View className="justify-center items-center gap-4">
          <Image
            source={require("@/assets/images/icons.png")}
            style={{
              width: width * 0.6,
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
        </View>
        <View className="absolute bottom-8 mt-8 justify-end p-8">
          <PrimaryButtton
            text="Empezar"
            variant="outline"
            size="lg"
            icon={{ ios: 'arrow.forward.circle', android: 'arrow_circle_right' }}
            onPress={() => { }}
            backgroundColor="white"
          />
        </View>
      </View>

    </>
  )
}

export default OnBoardingScreen