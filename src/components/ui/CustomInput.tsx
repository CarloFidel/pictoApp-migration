import { Ref } from "react"
import { TextInput, TextInputProps, useWindowDimensions } from "react-native"

interface Props extends TextInputProps {
  placeholder: string
  error?: boolean
  ref?: Ref<TextInput>
  colorText?: string
  positionText?: 'left' | 'center' | 'right'
}

export const CustomInput = ({
  placeholder,
  error,
  ref,
  colorText,
  positionText,
  className,
  style,
  ...rest
}: Props) => {
  const { height, width } = useWindowDimensions()

  const baseClassName = [
    'bg-gray-04 rounded-lg py-2 placeholder:text-gray-400',
    error && 'border border-alert',
    positionText === 'center' ? 'text-center' : positionText === 'left' ? 'text-left' : 'text-right',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <TextInput
      ref={ref}
      {...rest}
      className={baseClassName}
      style={[{ width: width * 0.9, height: height * 0.06, paddingHorizontal: 16, color: colorText }, style]}
      placeholder={placeholder}
    />
  )
}

