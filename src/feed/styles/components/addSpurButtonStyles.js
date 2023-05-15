import { StyleSheet } from "react-native";

const addSpurButtonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button1: {
        top: 0,
        left: 0,
        position: 'absolute',
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: 'rgba(225, 91, 33, 0.3)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button2: {
        top: 0,
        right: 0,
        position: 'absolute',
        backgroundColor: 'rgba(225, 91, 33, 0.1)',
        borderRadius: 35,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
    },
    plusButton: {
        borderRadius: 70 / 2,
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#979CF9',
    },
    buttonText: {
        color: '#fff',
        fontSize: 40,
        bottom: 2,
        fontFamily: 'Inter-Regular',
    },
});
    
export default addSpurButtonStyles;