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
        fontFamily: 'Inter-Medium',
        fontWeight: 400,
        fontSize: 30,
        lineHeight: 36,
        width: 64,
        height: 41,
        color: '#000000',
    },
    subheadings: {
        /* your spurs */
        width: 534,
        height: 75,
        fontFamily: 'Inter',
        fontStyle: 'normal',
        fontWeight: 500,
        fontSize: 20,
        lineHeight: 24,
        color: '#000000',
    },
    scrollContainer: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    buttonContainer: {
        alignItems: 'center',
    },
});

export default mainScreenStyles;