import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFDF9',
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: 'Inter-Regular',
    fontWeight: 300,
    marginTop: '5%',
  },
  myEventsContainer: {
    flex: 1,
    marginTop: 5, 
    justifyContent: 'space-between',
    marginLeft: 20,
    marginRight: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  myEvents: {
    flex: 1,
  },
  otherEventsContainer: {
    flex: 2,
    marginTop: 10,  // Changed the negative value to positive
    marginBottom: 100,  // Increased marginBottom to provide more spacing at the bottom
  },
  headerText: {
    marginTop: 20,
    marginLeft: 20, 
    fontFamily: 'Inter',
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,  // This line is necessary for the scroll view to work
  },
  addSpurContainer: {
    alignItems: 'center',
    marginRight: 20,
  },
});

export default styles;


