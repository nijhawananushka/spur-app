import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFDF9',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 20,
    marginBottom: '5%',
    fontFamily: 'Inter-Regular',
    fontWeight: 300,
    marginTop: '5%',
},
  myEventsContainer: {
    flex: 1,
    marginTop: 5, // Adjust the margin top as per your preference
    marginBottom: -80, // Adjust the margin bottom as per your preference
    justifyContent: 'space-between',
    marginTop: 5,
    marginBottom: 10,
    marginLeft: 20,
    marginRight:0,
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
  otherEvents: {
    flex: 2,
  },
  headerText: {
    marginTop: 20,
    marginLeft: 20, 
    fontFamily: 'Inter',
    fontSize: 20,
  },
  contentContainer: {
    flex: 1,
    marginBottom:60,
  },
  addSpurContainer: {
    alignItems: 'center', // Align the button to the right side
    marginRight: 20,
  },
});


export default styles;

