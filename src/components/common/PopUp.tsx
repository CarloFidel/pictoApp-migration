import { globalStyle } from "@/styles/global.style";
import { SymbolView } from "expo-symbols";
import { Text, useWindowDimensions } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { PrimaryButtton } from "../ui/PrimaryButtton";

interface Props {
  warning?: boolean;
  text: string;
  buttonText?: string;
  onPress: () => void;
}
const CustomPopUp = ({
  onPress,
  buttonText = "Ok",
  text,
  warning = false,
}: Props) => {
  const { width, height } = useWindowDimensions();

  return (
    <Animated.View
      entering={FadeInDown.springify().duration(800)}
      exiting={FadeOutDown.springify().duration(800)}
      className="absolute bg-white justify-center border border-gray-200 items-center p-2 py-8 rounded-2xl gap-5 mt-2"
      style={{
        zIndex: 11,
      }}
    >
      {warning ? (
        <SymbolView
          name={{
            ios: "exclamationmark.triangle",
            android: "warning"
          }}
          size={50}
          tintColor={globalStyle.color.gray[55]}
        />
      ) : (
        <Animated.View
          entering={FadeInDown.springify().duration(800)}
        >
          <SymbolView
            name={{
              ios: "checkmark.circle",
              android: "check"
            }}
            size={50}
            tintColor={globalStyle.color.primary[600]}
          />
        </Animated.View>
      )}
      <Text className="text-center text-text font-hanken text-lg" style={{ width: width * 0.5 }}>
        {text}
      </Text>
      <PrimaryButtton
        onPress={onPress}
        text={buttonText}
        variant="outline"
        size="md"
      />
    </Animated.View>
  );
};

export default CustomPopUp;
