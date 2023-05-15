import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      position: 'relative',
      width: 428,
      height: 926,
      backgroundColor: '#FFFFFF',
      borderRadius: 40,
    },
    usernameContainer: {
        position: 'absolute',
        width: 333,
        height: 31,
        left: 39,
        top: 342,
      },
      text: {
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: 26,
        lineHeight: 31,
        display: 'flex',
        alignItems: 'center',
        color: '#6B6B6B',
      },
  });

export default styles;