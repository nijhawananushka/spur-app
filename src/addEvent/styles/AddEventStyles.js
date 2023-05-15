import { StyleSheet } from 'react-native';

const addEventStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFDF9',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
    },
    headerText: {
        fontSize: 20,
        fontFamily: 'Inter-Regular',
        fontWeight: 300,
        color: '#483F3F',
        lineHeight: 24.2,
    },
    roundedContainer: {
        backgroundColor: '#F7CEBD',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        height: '85%',
        width: '100%',
        bottom: 0,
    }
});

export default addEventStyles;