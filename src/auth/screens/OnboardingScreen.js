import { View, Text } from 'react-native';
import LogOutButton from '../../feed/components/logOutButton';


// Create components for adding Username
    // query database to ensure username is unique
    // add user and related info to 'UserProfile' in firestore
// Set Async state to hold userToken!!! VERY IMPORTANT
// Navigate to Main Feed if successful
// Navigate back to sign up creen if unsuccessful

const OnboardingScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Onboarding Screen</Text>
        <LogOutButton navigation={navigation} />   
    </View>
  );
};

export default OnboardingScreen;