import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative', // This is necessary to position the back button absolute
    },
    backButton: {
      position: 'absolute', 
      top: 40, // Adjust according to your needs
      left: 10, // Adjust according to your needs
      zIndex: 1, // To make sure the button is above other elements
      marginLeft: 20,
   
    },
    backButtonText: {
      fontSize: 40, // Adjust according to your needs
      fontWeight: 'bold',
    },
  });

  export default styles; 
  