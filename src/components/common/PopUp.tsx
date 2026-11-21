import { globalStyle } from "@/styles/global.style";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { SymbolView } from "expo-symbols";
import { Platform, StyleSheet, Text, useWindowDimensions } from "react-native";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import { PrimaryButtton } from "../ui/PrimaryButtton";

interface Props {
  warning?: boolean;
  info?: boolean;
  text: string;
  buttonText?: string;
  buttonVariant?: 'filled' | 'outline' | 'alert';
  onPress: () => void;
}
const CustomPopUp = ({
  info,
  onPress,
  buttonText = "Ok",
  text,
  warning = false,
  buttonVariant = 'outline',
}: Props) => {
  const { width } = useWindowDimensions();

  const AnimatedGlassView = Animated.createAnimatedComponent(GlassView)
  const InnerContent = () => {
    return (
      <>
        {warning ? (
          <SymbolView
            name={{
              ios: "exclamationmark.triangle",
              android: "warning"
            }}
            size={50}
            tintColor={globalStyle.color.gray[55]}
          />
        ) : info ?
          (
            <Animated.View
              entering={FadeInDown.springify().duration(800)}
            >
              <SymbolView
                name={{
                  ios: "info.circle",
                  android: "info"
                }}
                size={24}
                tintColor={globalStyle.color.primary[600]}
              />
            </Animated.View>

          ) : (
            <Animated.View
              entering={FadeInDown.springify().duration(800)}
            >
              <SymbolView
                name={{
                  ios: "checkmark.circle",
                  android: "check"
                }}
                size={30}
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
          variant={buttonVariant}
          size="md"
        />

      </>
    )
  }

  if (Platform.OS === 'ios' && isLiquidGlassAvailable()) {

    return (
      <AnimatedGlassView 
      glassEffectStyle={'regular'}

      style={styles.glasViewStyle} 
      entering={FadeInDown.springify().duration(800)} 
      exiting={FadeOutDown.springify().duration(800)}
      
      >
        <InnerContent />
      </AnimatedGlassView>
    )

  }

  return (
    <Animated.View
      entering={FadeInDown.springify().duration(800)}
      exiting={FadeOutDown.springify().duration(800)}
      className="absolute bg-white justify-center border border-gray-200 items-center p-2 py-8 rounded-2xl gap-5 mt-2"
      style={{
        zIndex: 11,
      }}
    >
      <InnerContent />
    </Animated.View>


  );
};

export default CustomPopUp;


const styles = StyleSheet.create({
  glasViewStyle: {
    position: 'absolute',
    backgroundColor: 'rgba(248, 243, 243, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    padding: 10,
    marginTop: 10,
    gap: 14,
  },


})