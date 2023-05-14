import { StyleSheet } from 'react-native';

const logInButtonStyles = StyleSheet.create({
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
    },
});

export default logInButtonStyles;