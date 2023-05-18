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
    buttonStyle: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      borderRadius: 10, 
      borderWidth: 1, 
      marginTop: 30, 
      marginLeft: 30, 
      marginRight: 30,
  },
  buttonText: {
      fontSize: 16,
      height: 30,
      marginRight: 5,
      marginLeft: 5,
      marginTop: 10,
      textAlign: 'center',
      padding: 5,
      marginBottom: 10,
  },
  });

  export default styles; 
  