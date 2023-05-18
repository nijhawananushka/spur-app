import { StyleSheet } from 'react-native';

const addEventStyles = StyleSheet.create({
    container: {
        backgroundColor: '#A5A5A5',
    },
      eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      eventDate: {
        marginTop: 30,
        fontSize: 16,
        marginBottom: 5,
      },
      eventLocation: {
        fontSize: 16,
        marginBottom: 5,
      },
      eventDescription: {
        fontSize: 14,
      },
    header: {
        height: '30%',
    },
    testHeader: {
        height: '20%',
    },
    heading: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    headerText: {
        fontSize: 30,
        fontFamily: 'Inter-ExtraBold',
        fontWeight: 300,
        color: '#483F3F',
        lineHeight: 50,
    },
    roundedContainer2: {
        backgroundColor: '#FEFDF9',
        borderTopRightRadius: 25,
        borderTopWidth: 5,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopLeftRadius: 25,
        height: '85%',
        width: '100%',
        bottom: '3%',

    },
    roundedContainer: {
        backgroundColor: '#FEFDF9',
        borderTopRightRadius: 25,
        borderTopWidth: 5,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopLeftRadius: 25,
        height: '85%',
        width: '100%',
        bottom: '3%',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '90%',
    },
    calendarContainer: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
    },
    imagePreview: {
        width: '100%',
        height: '100%',
    },
    navigationButtonsContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
    }
});

export default addEventStyles;