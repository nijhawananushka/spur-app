import { StyleSheet } from 'react-native';

const addEventStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A5A5A5',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20%',
        marginLeft: '5%',
        marginRight: '5%',
        marginBottom: '5%',
    },
    headerText: {
        fontSize: 20,
        fontFamily: 'Inter-Regular',
        fontWeight: 300,
        color: '#483F3F',
        lineHeight: 24.2,
    },
    roundedContainer: {
        backgroundColor: '#FEFDF9',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: '85%',
        width: '100%',
        bottom: 0,
        flexDirection: 'column',
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '85%',
    },
});

export default addEventStyles;