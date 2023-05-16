import { StyleSheet } from 'react-native';

const addEventStyles = StyleSheet.create({
    container: {
        backgroundColor: '#A5A5A5',
    },
    header: {
        height: '30%',
    },
    heading: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    headerText: {
        fontSize: 30,
        fontFamily: 'Inter-ExtraBold',
        fontWeight: 300,
        color: '#483F3F',
        lineHeight: 50,
    },
    roundedContainer: {
        backgroundColor: '#FEFDF9',
        borderTopRightRadius: 20,
        borderTopWidth: 5,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopLeftRadius: 20,
        height: '85%',
        width: '100%',
        bottom: '3%',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '85%',
    },
    imagePreview: {
        width: '100%',
        height: '100%',
    },
});

export default addEventStyles;