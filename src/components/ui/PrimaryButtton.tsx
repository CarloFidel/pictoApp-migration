import { globalStyle } from '@/styles/global.style';
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

export const PrimaryButtton = ({ text, variant, backgroundColor, size, icon, ...props }: PrimaryButttonProps) => {

  const { width, height } = useWindowDimensions();
  const buttonWidth = size === 'sm' ? width * 0.4 : size === 'md' ? width * 0.6 : width * 0.8;
  const buttonPadding = size === 'sm' ? 10 : size === 'md' ? 15 : 20;
  const buttonBackground =
    variant === 'outline' ? 'bg-background-light' :
      variant === 'filled' ? 'bg-primary-500' :
        variant === 'alert' ? 'bg-alert' : 'bg-primary-500';

  const textColor = variant === 'outline' ? 'text-text' :
    variant === 'filled' ? 'text-white' :
      variant === 'alert' ? 'text-white' : 'text-white';

  const iconColor = variant === 'outline' ? '#333333' :
    variant === 'filled' ? 'white' :
      variant === 'alert' ? 'white' : 'white';

  const border = {
    borderWidth: variant === 'outline' ? 1 : 0,
    borderColor: variant === 'outline' ? '#3333' : 'transparent',
  }
  return (
    <Pressable
      className={`${buttonBackground} rounded-2xl flex-row items-center justify-center gap-2 ${globalStyle.buttonPress}`}
      style={[{
        width: buttonWidth,
        padding: buttonPadding,
        borderColor: border.borderColor,
        borderWidth: border.borderWidth,
       // backgroundColor: backgroundColor ? backgroundColor : '#f5f5f5',
      },
      globalStyle.shadow.small,
      ]}
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

