import styles from '../styles/components/onboardingCompleteButtonStyles';
import { Text, TouchableOpacity, Alert } from 'react-native';

const OnboardingCompleteButton = ({ navigation }) => {
    // Handle "Done" button press
    const handleDone = async () => {
        navigation.replace('EventsRendering');
    };
    
    return (
      <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
        <Text style={styles.doneButtonText}>Done</Text>
      </TouchableOpacity>
    )
  };

export default OnboardingCompleteButton;
