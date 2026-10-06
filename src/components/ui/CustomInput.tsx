import { TextInput, TextInputProps, useWindowDimensions } from "react-native"

interface Props extends TextInputProps {
  placeholder: string
}

const CustomInput = ({ placeholder, ...props }: Props) => {

  const { height, width } = useWindowDimensions()

  return (
    <TextInput
    className='bg-gray-04 rounded-lg py-2 placeholder:text-gray-400'
      style={[{ width: width * 0.9, height: height * 0.06, paddingHorizontal: 16 }]}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default CustomInput