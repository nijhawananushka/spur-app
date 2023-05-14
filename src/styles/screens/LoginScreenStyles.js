import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    ellipse1: {
        position: 'absolute',
        width: 445,
        height: 445,
        left: -70,
        top: 42,
        fill: 'rgba(225, 91, 33, 0.1)',
    },
    ellipse2: {
        position: 'absolute',
        width: 425,
        height: 425,
        left: 100,
        zIndex: -2,
        top: 351,
        fill: 'rgba(225, 91, 33, 0.3)',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 50,
    },
    logo: {
        width: 150,
        height: 150,
    },
    logoText: {
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
    },
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

export default styles;