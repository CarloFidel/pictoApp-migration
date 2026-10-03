import { SymbolView, type AndroidSymbol, type SFSymbol } from 'expo-symbols';
import { Pressable, PressableProps, Text, useWindowDimensions } from 'react-native';

interface PrimaryButttonProps extends PressableProps {
  text: string;
  variant: 'outline' | 'filled' | 'alert';
  size: 'sm' | 'md' | 'lg';
  icon?: {
    ios: SFSymbol;
    android: AndroidSymbol;
  };
  backgroundColor?: string;
}

export const PrimaryButtton = ({ text, variant, backgroundColor, onPress, size, icon, ...props }: PrimaryButttonProps) => {

  const { width, height } = useWindowDimensions();
  const buttonWidth = size === 'sm' ? width * 0.4 : size === 'md' ? width * 0.6 : width * 0.8;
  const buttonPadding = size === 'sm' ? 10 : size === 'md' ? 15 : 20;
  const buttonBackground =
    variant === 'outline' ? 'bg-white' :
      variant === 'filled' ? 'bg-primary-500' :
        variant === 'alert' ? 'bg-alert' : 'bg-primary-500';

  const textColor = variant === 'outline' ? 'text-text' :
    variant === 'filled' ? 'text-white' :
      variant === 'alert' ? 'text-white' : 'text-white';

  const iconColor = variant === 'outline' ? '#333333' :
    variant === 'filled' ? 'white' :
      variant === 'alert' ? 'white' : 'white';
  return (
    <Pressable
      onPress={onPress}
      className={`${buttonBackground} rounded-2xl flex-row items-center justify-center gap-2`}
      style={{
        width: buttonWidth,
        padding: buttonPadding,
      }}
      {...props}
    >
      <Text className={`${textColor} text-center font-hanken text-lg`}>{text}</Text>
      {icon ? (
        <SymbolView
          name={icon}
          tintColor={iconColor}
          size={23}
        />
      ) : null}
    </Pressable>
  )
}

