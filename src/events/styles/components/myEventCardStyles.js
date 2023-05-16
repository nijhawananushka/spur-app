import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    myEvents: {
    marginTop: 10, // Adjust the margin top as per your preference
    marginBottom: 10, // Adjust the margin bottom as per your preference
  },
    card: {
        width: '90%',
        height: '50%',
        backgroundColor: '#FFFFFF',
        borderColor: '#AEABAB',
        borderWidth: 2,
        borderRadius: 15,
        padding: 10,
        margin: 20,
        fontFamily: 'Inter',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        fontFamily: 'Inter',
    },
    dateTime: {
        fontSize: 16,
        color: 'darkgrey',
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
    },
});

export default styles;