import { StyleSheet } from 'react-native';


const addFriendsCirclesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    backgroundColor: '#0095F6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  headerText: {
    marginTop: 20,
    marginLeft: 20, 
    fontFamily: 'Inter',
    fontSize: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default addFriendsCirclesStyles;