import { Text, View } from 'react-native';

interface PrimaryButttonProps {
  text: string;
  backgroundColor: string;
  textColor: string;
  onPress: () => void;
}

const PrimaryButtton = () => {
  return (
    <View>
      <Text>PrimaryButtton</Text>
    </View>
  )
}

export default PrimaryButtton