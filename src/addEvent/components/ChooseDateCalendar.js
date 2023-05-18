import React, { useState, useRef } from 'react';
import { Alert, StyleSheet, Dimensions, View, Text } from 'react-native';
import CalendarStrip from 'react-native-scrollable-calendar-strip';

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
  const calendarRef = useRef(null);

  return (
    <>
      <CalendarStrip 
        scrollable
        ref={calendarRef}
        calendarAnimation={{type: 'sequence', duration: 30}}
        onHeaderSelected={(d1, d2) => {calendarRef.current.setSelectedDate(currentDate); calendarRef.current.scrollToInitialIndex();}}
        style={styles.outerContainer}
        onDateSelected={(date) => setEventDate(new Date(date))}
        selectedDate={currentDate}
        calendarHeaderStyle={styles.dateHeaderText}
        innerStyle={{backgroundColor: '#ffffff', flex:1}}
        calendarHeaderContainerStyle={[styles.innerContainer, {backgroundColor: accent}]}
        dateNumberStyle={{fontWeight: 300, fontSize: 17}}
        dateNameStyle={{color: '#2d4150', marginBottom: '10%', fontSize: 10, fontWeight: '300'}}
        highlightDateNumberStyle={{color: darkenedAccent}}
        calendarHeaderFormat={'MMMM YYYY'}
        daySelectionAnimation={{type: 'background', duration: 200, highlightColor: accent}}
        highlightDateNameStyle={{color: 'black'}}
        iconContainer={{flex: 0.1}}
      />
    </>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    height: '12.5%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: '#ffffff',
  },
  innerContainer: {
    backgroundColor: '#ffffff',
    alignContent: 'center',
    paddingTop: '3%',
    paddingBottom: '2%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateHeaderText: {
    fontSize: 18,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  }
});

export default CalendarView;