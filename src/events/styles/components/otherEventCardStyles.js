import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        borderWidth: 4,
        padding: 10,
        margin: 20,
        borderRadius: 15,
        height: '80%',
        fontFamily: 'Inter',
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Inter',
    },
    dateTime: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'darkgrey',
    },
    locationWrapper: {
        position: 'absolute',
        bottom: 10,  // This will align the locationWrapper to the bottom of the card
        left: 0,  // This will align the locationWrapper to the start (left) of the card
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        marginLeft: 5,
    },
});

export default styles;

