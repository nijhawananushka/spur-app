import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    myEvents: {
    marginTop: 10, // Adjust the margin top as per your preference
    marginBottom: 10, // Adjust the margin bottom as per your preference
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
        fontFamily: 'Inter-Regular',
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
        bottom: '5%',  // This will align the locationWrapper to the bottom of the card
        left: 0,  // This will align the locationWrapper to the start (left) of the card
        flexDirection: 'row',
        alignItems: 'center',
      
    },
    location: {
        marginLeft: 5,
        fontFamily: 'Inter-Regular',
    },
});

export default styles;