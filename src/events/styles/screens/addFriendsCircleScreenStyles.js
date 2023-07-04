import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // This is necessary to position the back button absolute
  },
  backButton: {
    position: 'absolute', 
    top: '8%%', // Adjust according to your needs
    left: '8%', // Adjust according to your needs
    zIndex: 1, // To make sure the button is above other elements
  },
  buttonStyle: {
    backgroundColor: '#75226D',
    borderRadius: 10, 
    borderWidth: 1, 
    marginTop: '8%', 
    width: '83%',
    alignSelf: 'center',
    marginBottom: '10%',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    margin: '3%',
    color: 'white',
  },
  searchContainer: {
    borderRadius: 10, 
    borderWidth: 1, 
    paddingTop: '1%', 
    paddingBottom: '1%', 
    marginTop: '3.5%', 
    width: '83%', 
    alignSelf: 'center', 
    justifyContent: 'center', 
  },
});

  export default styles; 
  