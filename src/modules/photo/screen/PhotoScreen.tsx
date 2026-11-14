import { Platform, Text, View } from 'react-native'

const PhotoScreen = () => {
  return (
    <View className="flex-1 items-center pt-3">
      {Platform.OS === 'android' && (
        <View className="mb-4 h-1 w-20 rounded-full bg-gray-300" />
      )}
      <View className="flex-1 items-center justify-center">
        <Text>PhotoScreen</Text>
      </View>
    </View>
  )
}

export default PhotoScreen