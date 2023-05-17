import { StyleSheet } from 'react-native';

const textInputStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '80%',
    paddingBottom: '8%',
    marginBottom: '10%',
    fontFamily: 'Inter',
    height: 100,
  },
  textInput: {
    borderBottomWidth: 2,
    borderColor: '#000000',
    paddingBottom: '2%',
    paddingTop: '5%', 
    fontSize: 20,
    lineHeight: 25,
    fontFamily: 'Inter',
  },
  placeholderContainer: {
    position: 'absolute',
    top: '20%',
    left: 0,
    right: 0,
  },
  placeholderText: {
    fontSize: 20,
    color: '#9E9E9E',
    lineHeight: 25,
    fontFamily: 'Inter',
  },
});

export default textInputStyles;
