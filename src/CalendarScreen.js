import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const onDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Date</Text>

      <CalendarPicker
        onDateChange={onDateChange}
        startFromMonday={true}
        allowRangeSelection={false}
        selectedDayColor="#4CAF50"
        selectedDayTextColor="#fff"
        todayBackgroundColor="#f2e6ff"
        todayTextStyle={{ color: '#000' }}
      />

      {selectedDate && (
        <Text style={styles.selectedText}>
          Selected Date: {selectedDate.toString()}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  selectedText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
});

export default CalendarScreen;
