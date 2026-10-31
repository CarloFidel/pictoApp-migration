import { BlurView } from "expo-blur";
import { Pressable, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface Props {
  onClick?: () => void;
  children: React.ReactNode;
  blurTarget?: React.RefObject<View | null>;
}
const BlurComponent = ({ onClick, children, blurTarget }: Props) => {
  return (
    <Pressable
      onPress={onClick}
      style={{
        flex: 1,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 10,
        elevation: 100,
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        entering={FadeIn.springify().duration(400)}
        exiting={FadeOut.springify().duration(400)}
      >
        {children}
        <BlurView
          intensity={35}
          tint="systemMaterialDark"
          blurTarget={blurTarget}
          blurMethod="dimezisBlurView"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default BlurComponent;
