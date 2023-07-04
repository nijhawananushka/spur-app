import { StyleSheet } from 'react-native';

const circleCardStyles = StyleSheet.create({
    friendContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      marginTop: 10,
      width: '100%',
    },
    friendPicture: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginLeft: 30,
      
    },
    friendTextContainer: {
      flexDirection: 'column',
      flex: 1, // To allow the text to take remaining width
    },
    friendName: {
      fontWeight: 'bold',
      marginLeft: 10, // Adjust left margin as desired
    },
    friendUserId: {
      marginLeft: 10, // Adjust left margin as desired
    },
    addButton: {
        width: 90, // Set the desired width
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginRight: 30,
        backgroundColor: '#0095F6',
        alignItems: 'center',
      },
  });

export default circleCardStyles;