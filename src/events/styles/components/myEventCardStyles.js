import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    myEvents: {
        marginTop: 10, 
        marginBottom: 10,
    },
    card: {
        width: 250,
        height: 150,
        backgroundColor: '#FFFFFF',
        borderColor: '#AEABAB',
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        marginTop: 20,
        marginRight: 20,
    },
    title: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Inter-Regular',
    },
    dateTime: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'darkgrey',
        fontFamily: 'Inter-Regular',
    },
    locationWrapper: {
        position: 'absolute',
        bottom: '5%',  
        left: 0, 
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        marginLeft: 5,
        fontFamily: 'Inter-Regular',
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
    participantImageContainer: {
        flexDirection: 'row',
        bottom: 20,
        position: 'absolute',
        right: 20,
    },
});

export default styles;