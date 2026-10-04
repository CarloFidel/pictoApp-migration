import { PrimaryButtton } from '@/components/ui/PrimaryButtton'
import { Text, View } from 'react-native'

interface PopUpOnboardingProps {
  title: string
  labelOne: string
  labelTwo: string
  onPressOne: () => void
  onPressTwo: () => void
}

export const PopUpOnboarding = ({ onPressOne, onPressTwo, title, labelOne, labelTwo }: PopUpOnboardingProps) => {
  return (
    <View className='w-full p-8 bg-linear-to-br from-background-light to-gray-400 rounded-2xl gap-8 shadow-lg'
    
    >
      <Text className='text-text text-3xl font-hanken-regular'>{title}</Text>
      <View className='gap-4'>
        <PrimaryButtton
          text={labelOne}
          variant="outline"
          size="lg"
          onPress={onPressOne}

        />
        <PrimaryButtton
          text={labelTwo}
          variant="outline"
          size="lg"
          onPress={onPressTwo}
        />

      </View>
    </View>
)
}

