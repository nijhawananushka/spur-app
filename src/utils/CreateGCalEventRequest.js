import { Linking, Alert } from 'react-native';

const generateGoogleCalendarEventUrl = ({ eventDetails }) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedStartTime = encodeURIComponent(startTime);
    const encodedEndTime = encodeURIComponent(endTime);
    const encodedLocation = encodeURIComponent(location);
    const encodedDescription = encodeURIComponent(description);
  
    const eventUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${encodedStartTime}/${encodedEndTime}&location=${encodedLocation}&details=${encodedDescription}`;
  
    return eventUrl;
};
  
export const CreateGCalEventRequest = ({ eventDetails }) => {
  const handleAddToGoogleCalendar = async () => {
    try {
      const eventUrl = generateGoogleCalendarEventUrl(eventDetails);
      const supported = await Linking.canOpenURL(eventUrl);

      if (supported) {
        await Linking.openURL(eventUrl);
      } else {
        Alert.alert('Cannot open Google Calendar. Please make sure the app is installed.');
      }
    } catch (error) {
      console.error('Error opening Google Calendar:', error);
    }
  };
};