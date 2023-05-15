import { StyleSheet } from "react-native";

const addSpurButtonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    button: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#979CF9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 40,
        bottom: 2,
        fontFamily: 'Inter-Regular',
    },
});
    
export default addSpurButtonStyles;