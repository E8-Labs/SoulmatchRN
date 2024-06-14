import {
    View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image, StyleSheet, Modal, TouchableWithoutFeedback, TextInput,
    ScrollView, Keyboard
} from 'react-native'
import React, { useState, useEffect } from 'react'
import GlobalStyles from '../../assets/styles/GlobalStyles';
import customFonts from '../../assets/fonts/Fonts';
import colors from '../../assets/colors/Colors';
import { getFormatedDate } from "react-native-modern-datepicker";
import DatePicker from "react-native-modern-datepicker";
import InviteDatePopup from '../../Components/InviteDatePopup';


const { height, width } = Dimensions.get('window');
const selectedImage = require('../../assets/images/selected.png');
const unselectedImage = require('../../assets/images/unSelected.png');

export default function PlanDateNigth(props) {

    const [numberofGuest, setNumberofGuest] = useState(2)
    const [startedDate, setStartedDate] = useState('')
    const [openDatePicker, setOpenDatePicker] = useState('')
    const [openTimePicker, setOpenTimePicker] = useState('')
    const [selectedDate, setSelectedDate] = useState("Select date");
    const [selectedTime, setSelectedTime] = useState("Select time");
    const [time, setTime] = useState("Select time");
    const [selected, setSelected] = useState(null);

    const [openModal, setOpenModal] = useState(false)
    const [selectedCat, setselectedCat] = useState(1);
    const [modalHeight, setModalHeight] = useState(height * 0.6)




    const increment = () => {
        setNumberofGuest(numberofGuest + 1)
    }
    const decrement = () => {
        if (numberofGuest > 2) {
            setNumberofGuest(numberofGuest - 1)
        } else {
            null
        }

    }


    const today = new Date();

    const startDate = getFormatedDate(
        today.setDate(today.getDate() + 1),
        "DD/MM/YYYY"
    );
    console.log('today date', startDate)


    function handleChangeDate(propDate) {
        setStartedDate(propDate);
        setOpenDatePicker(!openDatePicker)
    }


    const handleOnPressDate = () => {
        setOpenDatePicker(!openDatePicker);
    };

    const handleOnPressTime = () => {
        setOpenTimePicker(!openTimePicker);
    };
    function handleChangeTime(propDate) {
        // setStartedDate(propDate);
        setOpenTimePicker(!openTimePicker)
    }

    const genders = [
        {
            id: 1,
            name: '$'
        },
        {
            id: 2,
            name: '$$'
        },
        {
            id: 3,
            name: "$$$"
        },
        {
            id: 4,
            name: "$$$$"
        },
    ]

    const category = [
        {
            id: 1,
            name: 'All'
        },
        {
            id: 2,
            name: "Culinary Adventure"
        },
        {
            id: 3,
            name: "Outdoor Escapades"
        },
    ]


    useEffect(() => {
        console.log("Use Effect")
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            console.log("Keyboard show")
            setModalHeight(height * 0.9)
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            console.log("Keyboard hide")
            setModalHeight(height * 0.6);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);


    return (
        <SafeAreaView>
            <View style={{ alignItems: 'center', height: height - 85 / 930 * height, width: width, flexDirection: 'column', justifyContent: 'space-between' }}>
                <View style={{ alignItems: 'center', flexDirection: 'column', gap: 32 / 930 * height }}>
                    <View style={{ width: width - 60 / 430 * width, flexDirection: 'row', alignItems: 'center', gap: 20 / 430 * width }}>
                        <TouchableOpacity onPress={() => {
                            props.navigation.goBack()
                        }}>
                            <View style={GlobalStyles.backBtn}>
                                <Image source={require('../../assets/images/backArrow.png')}
                                    style={GlobalStyles.backBtnImage}
                                />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 24, fontFamily: customFonts.meduim }}>Plan a date night</Text>

                    </View>


                    <TouchableOpacity style={GlobalStyles.textInput}
                        onPress={handleOnPressDate}
                    >
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',

                        }}>
                            <Text style={{ color: '#000', fontSize: 14, fontFamily: customFonts.meduim }}>
                                {selectedDate}
                            </Text>

                            <Image source={require('../../assets/images/calender.png')}
                                style={{ height: 24 / 930 * height, width: 24 / 930 * height }}
                            />
                        </View>

                    </TouchableOpacity>


                    <TouchableOpacity style={GlobalStyles.textInput}
                        onPress={handleOnPressTime}
                    >
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',

                        }}>
                            <Text style={{ color: '#000', fontSize: 14, fontFamily: customFonts.meduim }}>
                                {time}
                            </Text>

                            <Image source={require('../../assets/images/clock.png')}
                                style={{ height: 24 / 930 * height, width: 24 / 930 * height }}
                            />
                        </View>

                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 50 / 430 * width,

                    }}>
                        <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>Number of guests:</Text>
                        <View style={{
                            width: 200 / 430 * width, alignItems: 'center', justifyContent: 'center', paddingVertical: 12 / 930 * height, borderRadius: 10,
                            paddingHorizontal: 16 / 430 * width, flexDirection: 'row', justifyContent: 'space-between', borderColor: colors.greyText, borderWidth: 1
                        }}>
                            <TouchableOpacity
                                onPress={increment}
                            >
                                <Image source={require('../../assets/images/addcircle.png')}
                                    style={{ height: 24 / 930 * height, width: 24 / 930 * height }}
                                />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 14, fontFamily: customFonts.meduim }}>
                                {numberofGuest}
                            </Text>
                            <TouchableOpacity
                                onPress={decrement}>
                                <Image source={require('../../assets/images/minuscircle.png')}
                                    style={{ height: 24 / 930 * height, width: 24 / 930 * height }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>


                    <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { backgroundColor: 'transparent', borderWidth: 2 }]}
                        onPress={() => {
                            setOpenModal(true)
                        }}
                    >
                        <Text style={[GlobalStyles.btnText, { color: '#000' }]}>
                            Invite your date
                        </Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={GlobalStyles.reqtengularBtn}

                >
                    <Text style={GlobalStyles.btnText}>
                        Submit
                    </Text>
                </TouchableOpacity>



            </View>

            {/* InviteDate Popup */}
            <Modal
                visible={openModal}
                transparent={true}
                animationType='slide'

            >
                <TouchableWithoutFeedback style={{ height: height }}
                    onPress={() => {
                        Keyboard.dismiss()
                    }}
                >
                    <View style={{ height: height, width: width, backgroundColor: '#00000050', justifyContent: 'flex-end' }}>
                        <View style={{
                            height: modalHeight, backgroundColor: 'white', borderRadius: 20, alignItems: 'center', justifyContent: 'space-between',
                            paddingHorizontal: 30 / 430 * height, paddingVertical: 25 / 930 * height, flexDirection: 'column'
                        }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 60 }}>
                                    <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}> Invite your date</Text>

                                    <TouchableOpacity onPress={() => {
                                        setOpenModal(false)
                                    }}>
                                        <Image source={require('../../assets/images/close.png')}
                                            style={GlobalStyles.backBtnImage}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={[GlobalStyles.divider, { width: width }]}></View>

                                <View style={{ width: width - 60, flexDirection: 'column', marginTop: 22 / 930 * height }}>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>
                                        Email
                                    </Text>
                                    <TextInput
                                        style={[GlobalStyles.textInput, { marginTop: 5 }]}
                                        placeholder='Enter city/state'
                                    />

                                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, marginTop: 20 / 930 * height }}>
                                        Text
                                    </Text>

                                    <TextInput
                                        multiline
                                        placeholder='Text invitation'
                                        style={[GlobalStyles.textInput, { height: 185 / 930 * height, paddingVertical: 15, marginTop: 5 }]}

                                    />
                                </View>
                                <TouchableOpacity //onPress={close} 
                                    style={[GlobalStyles.reqtengularBtn, { marginTop: 20 / 930 * height }]}>
                                    <Text style={[GlobalStyles.btnText,]}>
                                        Submit
                                    </Text>
                                </TouchableOpacity>
                            </View>


                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

            {/* Select date popup */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={openDatePicker}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <DatePicker
                            mode="calendar"
                            // minimumDate={startDate}
                            selected={startedDate}
                            onDateChanged={handleChangeDate}
                            onSelectedChange={(date) => {
                                setSelectedDate(date)

                            }}
                            options={{
                                backgroundColor: "#1c1c1c",
                                textHeaderColor: "#469ab6",
                                textDefaultColor: "#FFFFFF",
                                selectedTextColor: "#FFF",
                                mainColor: "#469ab6",
                                textSecondaryColor: "#FFFFFF",
                                borderColor: "gray",
                            }}
                        />

                        <TouchableOpacity onPress={handleOnPressDate}
                            style={{ backgroundColor: 'grey', paddingVertical: 10, borderRadius: 20, paddingHorizontal: 15 }}>
                            <Text style={{ color: "white" }}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            {/* Select time popup */}

            <Modal
                animationType="slide"
                transparent={true}
                visible={openTimePicker}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>

                        <DatePicker
                            mode="time"
                            minuteInterval={1}
                            onTimeChange={selectedTime => {
                                setTime(selectedTime)
                                setOpenTimePicker(!openTimePicker)
                                console.log('selected time is', selectedTime)
                            }}
                            options={{
                                backgroundColor: "#1c1c1c",
                                textHeaderColor: "#469ab6",
                                textDefaultColor: "#FFFFFF",
                                selectedTextColor: "#FFF",
                                mainColor: "#469ab6",
                                textSecondaryColor: "#FFFFFF",
                                borderColor: "gray",
                            }}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: "#1c1c1c",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 35,
        width: "90%",
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.50,
        shadowRadius: 7,
        elevation: 5,
    },

})