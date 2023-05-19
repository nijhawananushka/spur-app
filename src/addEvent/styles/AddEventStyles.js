import { StyleSheet } from 'react-native';

const addEventStyles = StyleSheet.create({
    container: {
        backgroundColor: '#FEFDF9',
        flex: 1,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'Inter',
        marginTop: '5%',
    },
    eventDate: {
        marginTop: '5%',
        fontFamily: 'Inter',
        fontSize: 16,
        marginBottom: '5%',
    },
    eventLocation: {
        fontFamily: 'Inter',
        fontSize: 16,
        marginBottom: 5,
    },
    eventDescription: {
        fontFamily: 'Inter',
        fontSize: 16,
    },
    header: {
        height: '34%',
        backgroundColor: '#A5A5A5',
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
    roundedContainer: {
        flex: 1,
        backgroundColor: '#FEFDF9',
        borderTopRightRadius: 25,
        borderTopWidth: 5,
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderTopLeftRadius: 25,
        width: '100%',
        bottom: '3%',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
    },
    roundedContainer3: {
        backgroundColor: '#FEFDF9',
        alignItems: 'center',
        marginTop: 40,
    },
    inputContainer: {
        width: '90%',
    },
    calendarContainer: {
        width: '98%',
        height: '100%',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        marginTop: '1%',
        flex: 1,
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