import { StyleSheet } from 'react-native';

const addEventStyles = StyleSheet.create({
    container: {
        backgroundColor: '#A5A5A5',
    },
    header: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        zIndex: -1,
        height: '30%',
        // alignSelf: 'center',
    },
    headerText: {
        fontSize: 20,
        fontFamily: 'Inter-Regular',
        fontWeight: 300,
        color: '#483F3F',
        lineHeight: 20,
    },
    roundedContainer: {
        backgroundColor: '#FEFDF9',
        borderTopRightRadius: 20,
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