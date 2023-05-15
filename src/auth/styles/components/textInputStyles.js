import { StyleSheet } from 'react-native';

const textInputStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: 349,
    height: 50,
    left: 39,
    top: 381.5,
    padding: 10,
    marginBottom: 20,
  },
  textInput: {
    borderBottomWidth: 2,
    borderColor: '#000000',
    paddingBottom: 5,
    paddingTop: 0, // Adjust this value to vertically align the cursor with the placeholder
    fontSize: 20,
  },
  placeholderContainer: {
    position: 'absolute',
    top: 10, // Adjust this value to vertically align the placeholder with the cursor
    left: 0,
    right: 0,
  },
  placeholder: {
    fontSize: 20,
    color: '#9E9E9E',
    paddingLeft: 12,
  },
});

export default textInputStyles;
