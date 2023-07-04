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
    fontFamily: 'Georgia',
    fontWeight: 400,
    marginTop: '5%',
    // color: '#2E765E',
  },
  myEventsContainer: {
    height: '25%',
    marginTop: '1.5%', 
    marginLeft: '6%',
    marginBottom: '5%',

  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '4%',
  },
  otherEventsContainer: {
    flex: 2,
    marginBottom: '30%',
    
  },
  headerText: {
    marginTop: '2.5%',
    marginLeft: '5%', 
    fontFamily: 'Inter',
    fontSize: 20,
    color: '#75226D',
  },
  headerTextOtherEvents: {
    marginLeft: '5%',
    fontFamily: 'Inter',
    fontSize: 20,
    color: '#75226D',
  },
  contentContainer: {
    flex: 1,  // This line is necessary for the scroll view to work
    flexDirection: 'column',
  },
});

export default styles;


