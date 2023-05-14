import { View, Text } from 'react-native';
import LogOutButton from '../../feed/components/logOutButton';

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Onboarding Screen</Text>
        <LogOutButton navigation={navigation} />   
      </View>
  );
};

export default OnboardingScreen;