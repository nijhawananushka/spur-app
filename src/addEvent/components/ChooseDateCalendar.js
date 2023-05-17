import React, { useState } from 'react';
import { Alert, StyleSheet, Dimensions, View, Text } from 'react-native';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';

const darkenColor = (color, saturate, darken) => {
    const hslRegex = /^hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)$/;
    const [, hue, saturation, lightness] = color.match(hslRegex);
    const newLightness = Math.max(Number(lightness) - darken, 0);
    const newSaturation = Math.min(Number(saturation) + saturate, 100);
    const newColor = `hsl(${hue}, ${newSaturation}%, ${newLightness}%)`;  
    return newColor;
};
  
const CalendarView = ({color, returnSelectedDate, setEventDate}) => {
  const date = new Date();
  const currentDate = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
  const accent = color !== '#FFFFFF' ? color : `hsl(0, 0%, 75%)`;
  const darkenedAccent = color !== '#FFFFFF' ? darkenColor(accent, 60, 40): `hsl(0, 0%, 20%)`;
  const [selectedMonth, setSelectedMonth] = useState(currentDate);

  // Extract year from selectedMonth
  const selectedYear = selectedMonth.split('-')[0];

  return (
    <>
      <View style={styles.outerContainer}>
        <View style={[styles.innerContainer, {backgroundColor: accent}]}>
          <Text style={[styles.dateHeaderText]}>{`${new Date(selectedMonth).toLocaleString('default', { month: 'long' })} ${selectedYear}`}</Text>
        </View>
      </View>
      <CalendarProvider
        date={currentDate}
        onDateChanged={(date) => {
          const selectedDate = new Date(date);
          setSelectedMonth(selectedDate.getFullYear() + '-' + ('0' + (selectedDate.getMonth() + 1)).slice(-2));
          setEventDate(selectedDate);
        }}
      >
        <WeekCalendar
          animateScroll={false}
          staticHeader={true}
          theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#ffffff',
            todayTextColor: darkenedAccent,
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: accent,
            selectedDayTextColor: 'black',
            dayTextColor: '#2d4150',
          }}
        />
      </CalendarProvider>
    </>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    paddingTop: '2%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
  },
  innerContainer: {
    backgroundColor: '#ffffff',
    alignContent: 'center',
    paddingTop: '3%',
    paddingBottom: '2%',
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
  },
  dateHeaderText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    paddingRight: 5,
  }
});

export default CalendarView;