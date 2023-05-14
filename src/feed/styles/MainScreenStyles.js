import { StyleSheet } from 'react-native';

const mainScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFDF9',
    },
    header: {
        fontSize: 20,
        marginBottom: 20,
        marginLeft: 20,
        fontFamily: 'Inter-Regular',
        fontWeight: 300,
        marginTop: '20%',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logo: {
        fontStyle: 'normal',
        fontFamily: 'Inter-Regular',
        fontWeight: 300,
        fontSize: 30,
        color: '#000000',
    }
});

export default mainScreenStyles;