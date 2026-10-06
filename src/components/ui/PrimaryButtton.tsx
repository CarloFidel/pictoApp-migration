import { globalStyle } from '@/styles/global.style';
import { SymbolView, type AndroidSymbol, type SFSymbol } from 'expo-symbols';
import { Image, Pressable, PressableProps, Text, useWindowDimensions } from 'react-native';

interface PrimaryButttonProps extends PressableProps {
  text: string;
  variant: 'outline' | 'filled' | 'alert';
  size: 'sm' | 'md' | 'lg';
  icon?: {
    ios: SFSymbol;
    android: AndroidSymbol;
  }
  backgroundColor?: string;
  distanceTop?: number;
  iconRight?: boolean;
  iconGoogle?: boolean
}

export const PrimaryButtton = ({ text, variant, backgroundColor, size, icon, distanceTop, iconRight, iconGoogle, ...props }: PrimaryButttonProps) => {

  const { width, height } = useWindowDimensions();
  const buttonWidth = size === 'sm' ? width * 0.4 : size === 'md' ? width * 0.6 : width * 0.87;
  const buttonPadding = size === 'sm' ? 10 : size === 'md' ? 14 : 18;
  const buttonBackground =
    variant === 'outline' ? 'bg-background-light' :
      variant === 'filled' ? 'bg-primary-600' :
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
      className={`${backgroundColor ? backgroundColor : buttonBackground} rounded-2xl  items-center justify-center gap-2 ${globalStyle.buttonPress} ${iconRight ? 'flex-row-reverse' : 'flex-row'}`}
      style={[{
        width: buttonWidth,
        padding: buttonPadding,
        borderColor: border.borderColor,
        borderWidth: border.borderWidth,
        marginTop: distanceTop ? distanceTop : 0,
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
      {
        iconGoogle ? (
          <Image source={require('../../modules/onboarding/assets/logo-google.png')} className='w-6 h-6' />
        ) : null
      }
    </Pressable>
  )
}

