import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFDF9',
    // justifyContent: 'space-between',
  },
  header: {
    fontSize: 20,
    marginBottom: '5%',
    fontFamily: 'Inter-Regular',
    fontWeight: 300,
    marginTop: '5%',
  },
  myEventsContainer: {
    height: '25%',
    marginTop: '1.5%', 
    marginLeft: '6%',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '4%',
  },
  otherEventsContainer: {
    flex: 2,
  },
  headerText: {
    marginTop: '2.5%',
    marginLeft: '5%', 
    fontFamily: 'Inter',
    fontSize: 20,
  },
  headerTextOtherEvents: {
    marginLeft: '5%',
    fontFamily: 'Inter',
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,  // This line is necessary for the scroll view to work
    flexDirection: 'column',
  },
});

export default styles;


