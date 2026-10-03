import { Image, Pressable, Text, useWindowDimensions, View } from 'react-native';

const OnBoardingScreen = () => {

  const { width, height } = useWindowDimensions();

  return (
    <View className="flex-1 items-center justify-center bg-linear-to-b from-primary-500 to-primary-700"
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
          className="text-white text-3xl text-center mb-4 font-sans"
          style={{ width: width * 0.8 }}
        >
          El mundo es más fácil con pictogramas
        </Text>
        <Pressable onPress={() => {}}>
          <View className="bg-white rounded-full p-2">
            <Text className="text-black text-xl">Empezar</Text>
          </View>
        </Pressable>
        <Pressable onPress={() => {}}>
          <View className="bg-white rounded-full p-2">
            <Text className="text-black text-xl">Empezar</Text>
          </View>
        </Pressable>  
      </View>

    </View>
  )
}

export default OnBoardingScreen