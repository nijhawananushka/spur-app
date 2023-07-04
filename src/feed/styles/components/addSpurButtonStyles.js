import { StyleSheet } from "react-native";

const addSpurButtonStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
    },    
    button1: {
        top: 0,
        left: 0,
        position: 'absolute',
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#f7cebd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button2: {
        top: 0,
        right: 0,
        position: 'absolute',
        backgroundColor: '#fdefe9',
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
        backgroundColor: '#2E765E',
    },
    plusButtonText: {
        color: '#fff',
        fontSize: 40,
        bottom: 2,
        fontFamily: 'Inter-Regular',
    },
});
    
export default addSpurButtonStyles;