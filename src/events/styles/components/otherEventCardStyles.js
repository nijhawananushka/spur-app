import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    card: {
        borderWidth: 4,
        padding: 10,
        borderRadius: 15,
        height: 200,
        fontFamily: 'Inter',
        marginTop: '10%',
        marginBottom: '-5%',
        marginLeft: 15,
        marginRight: 15,
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
    participantImageContainer: {
        flexDirection: 'row',
        bottom: 20,
        position: 'absolute',
        right: 20,
    },
    joinButton: {
        position: 'absolute',
        bottom: 40,
        right: 0,
        padding: 10,
    },
    participantImage: {
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        marginLeft: -10,
    },
});

export default styles;

