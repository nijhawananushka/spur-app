import styles from '../styles/components/onboardingCompleteButtonStyles';
import { Text, TouchableOpacity, Alert } from 'react-native';

const OnboardingCompleteButton = ({ navigation }) => {
    // Handle "Done" button press
    const handleDone = () => {
        // Handle "Done" button press
        // You can add your logic here
        navigation.replace('Main');
      };

    return (
        <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    )
  };

export default OnboardingCompleteButton;
