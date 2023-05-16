import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  myEventsContainer: {
    flex: 1,
    marginTop: 5, // Adjust the margin top as per your preference
    marginBottom: -40, // Adjust the margin bottom as per your preference
  },
  myEvents: {
    flex: 1,
  },
  otherEvents: {
    flex: 2,
  },
  headerText: {
    marginTop: 20,
    marginLeft: 20, 
    fontFamily: 'Inter',
    fontSize: 20,
  },
});

export default styles;

