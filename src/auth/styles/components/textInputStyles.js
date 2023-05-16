import { StyleSheet } from 'react-native';

const textInputStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '80%',
    paddingBottom: '8%',
    marginBottom: '10%',
    lineHeight: 36,
    fontFamily: 'Inter',
  },
  textInput: {
    borderBottomWidth: 2,
    borderColor: '#000000',
    paddingBottom: '2%',
    paddingTop: '5%', 
    fontSize: 20,
    lineHeight: 30,
    fontFamily: 'Inter',
  },
  placeholderContainer: {
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
  },
  placeholderText: {
    fontSize: 20,
    color: '#9E9E9E',
    lineHeight: 30,
    fontFamily: 'Inter',
  },
});

export default textInputStyles;
