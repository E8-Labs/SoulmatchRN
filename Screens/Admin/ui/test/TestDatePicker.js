import React, { useState } from 'react';
import { View, Button, Platform, Text, StatusBar, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const TestDatePicker = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [selectedTime, setSelectedTime] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        setSelectedTime(true); // Set selected to true when a date/time is selected
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    // const showDatepicker = () => {
    //     showMode('date');
    // };

    const showTimepicker = () => {
        showMode('time');
    };

    const formatTime = (date) => {
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    };

    return (
        <View style={{ padding: 20 }}>
            <StatusBar />
            {/*<View>
                <Button onPress={showDatepicker} title="Show date picker!" />
    </View>*/}
            {/*<View style={{ marginVertical: 10 }}>
                <Button onPress={showTimepicker} title="Show time picker!" />
    </View>*/}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={false}
                    display="default"
                    onChange={onChange}
                />
            )}
            <Text style={{ marginTop: 20, fontSize: 18 }}>
                {selectedTime ?
                    <View>
                        <TouchableOpacity onPress={showTimepicker}>
                            <Text>
                                Selected Time: {formatTime(date)}
                            </Text>
                        </TouchableOpacity>
                    </View> :
                    <View style={{ marginVertical: 10 }}>
                        <Button onPress={showTimepicker} title="Show time picker!" />
                    </View>
                }
            </Text>
        </View>
    );
};

export default TestDatePicker;
