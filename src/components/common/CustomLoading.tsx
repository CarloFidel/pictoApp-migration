import { ActivityIndicator, useWindowDimensions } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";

const CustomLoading = () => {
  const { width } = useWindowDimensions();

  return (
    <Animated.View
      entering={FadeInDown.springify().duration(400)}
      exiting={FadeOutDown.springify().duration(100)}
      className="absolute bg-white justify-center items-center border border-gray-200 p-2 py-8 rounded-xl gap-5 px-5"
      style={{
        width: width * 0.25,
        left: width * 0.375,
        top: "40%",
        zIndex: 11,
      }}
    >
      <ActivityIndicator size={40} />
    </Animated.View>
  );
};

export default CustomLoading;
