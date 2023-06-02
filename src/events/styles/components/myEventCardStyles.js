import { StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

const cardWidth = Dimensions.get('window').width * 0.65;
const cardHeight = Dimensions.get('window').height * 0.15;
const imageRadius = Dimensions.get('window').width * 0.075;
const overlapMargin = Dimensions.get('window').width * -0.022;

const styles = StyleSheet.create({
    myEvents: {
        marginTop: '5%', 
        // marginBottom: '5%',
        paddingRight: '40%',
    },
    card: {
        width: cardWidth,
        height: cardHeight,
        backgroundColor: '#FFFFFF',
        borderColor: '#AEABAB',
        borderWidth: 2,
        borderRadius: 15,
        padding: '3%',
        paddingLeft: '5%',
        marginTop: '5%',
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
        bottom: '10%',
        right: '5%',
    },
    participantImage: {
        width: imageRadius, 
        height: imageRadius, 
        borderRadius: imageRadius * 0.5, 
        marginLeft: overlapMargin,
    },
    participantImageContainer: {
        flexDirection: 'row',
        bottom: '10%',
        position: 'absolute',
        left: '9%',
    },
});

export default styles;