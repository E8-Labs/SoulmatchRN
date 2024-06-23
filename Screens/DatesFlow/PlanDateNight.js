import {
    View, Text, SafeAreaView, Dimensions, TouchableOpacity, Image, StyleSheet, Modal, TouchableWithoutFeedback, TextInput,
    ScrollView, Keyboard,
    ActivityIndicator
} from 'react-native'
import React, { useState, useEffect } from 'react'
import GlobalStyles from '../../assets/styles/GlobalStyles';
import customFonts from '../../assets/fonts/Fonts';
import colors from '../../assets/colors/Colors';
import { getFormatedDate } from "react-native-modern-datepicker";
import DateTimePicker from '@react-native-community/datetimepicker'
import InviteDatePopup from '../../Components/InviteDatePopup';
import moment from 'moment';
import fonts from 'fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApisPath from '../../lib/ApisPath/ApisPath';

const { height, width } = Dimensions.get('window');
const selectedImage = require('../../assets/images/selected.png');
const unselectedImage = require('../../assets/images/unSelected.png');

export default function PlanDateNigth(props) {
    const sourceMoment = moment.unix(1636765200);
    const sourceDate = sourceMoment.local().toDate();


    const [numberofGuest, setNumberofGuest] = useState(2)
    const [openDatePicker, setOpenDatePicker] = useState('')
    const [openTimePicker, setOpenTimePicker] = useState('')
    const [email, setEmail] = useState(null)
    const [description, setDescription] = useState(null)
    const [error, setError] = useState(null)
    const [error2, setError2] = useState(null)
    const [time, setTime] = useState(sourceDate);
    const [date, setDate] = useState(sourceDate);
    const [openModal, setOpenModal] = useState(false)
    const [loading,setLoading] = useState(false)
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
    const formatDate = (dateString) => {
        return moment(dateString).format("MM-DD-YYYY")
    };
    function handleChangeStartDate(event, selectedDate) {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setOpenTimePicker(false)
        let formatted = moment(currentDate).format('YYYY/MM/DD');
        console.log("Formatted date is ", formatDate(currentDate))
    }

    const handleSubmit = async () => {

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const validEmail = emailRegex.test(email);
        if (!email || !description) {
            setError("Enter all cridentials")
            return
        }

        if (!validEmail) {
            setError("Enter valid email")
            return
        }
        setOpenModal(false)
    };

    const inviteDate = async () => {
        if(!email || !description ){
            setError2("Enter all cridentials")
            return
        }
        try {
            setLoading(true)
            const data = await AsyncStorage.getItem("USER")
            if(data){
                let d = JSON.parse(data)
                let body = JSON.stringify({
                    email:email,
                    description:description,
                    time:time,
                    date:date,
                    guests:numberofGuest
                })
                console.log('body is', body)
                const result = await fetch(ApisPath.ApiInviteDateViaEmail,{
                    method:'post',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    },
                    body:body
                })
                if(result){
                    setLoading(false)
                    let json = await result.json()
                    if(json.status === true){
                        console.log('invite sent via email ')
                        props.navigation.goBack()
                    }else{
                        console.log('invite daye via email message is', json.message)
                    }
                }
            }

        } catch (e) {
            console.log('error finding in invite date via email', e)
        }
    }


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


                    <View style={styles.dateTimePickerContainer}>

                        <Text style={{ color: '#000', fontSize: 18, fontFamily: customFonts.meduim }}>
                            Select date
                        </Text>

                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={'date'}
                            is24Hour={false}
                            display="default"
                            onChange={handleChangeStartDate}
                            style={styles.dateTimePicker}
                        // width = {400}
                        />

                    </View>



                    <View style={styles.dateTimePickerContainer}>
                        <Text style={styles.text}>
                            Select time
                        </Text>
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={time}
                            mode={"time"}
                            is24Hour={false}
                            display="default"
                            onChange={handleChangeStartDate}
                            style={styles.dateTimePicker}
                        // width = {400}
                        />

                    </View>
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
                    {
                        error2 ? <Text style = {GlobalStyles.errorText}> {error}</Text>:''
                    }

                    {
                        email ? (
                            <View style={{ width: width - 40, flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                                <Text style={{ fontSize: 16 }}> Invite date :</Text>
                                <Text style={{ fontSize: 16 }}>{email}</Text>
                            </View>
                        ) : (
                            <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { backgroundColor: 'transparent', borderWidth: 2 }]}
                                onPress={() => {
                                    setOpenModal(true)
                                }}
                            >
                                <Text style={[GlobalStyles.btnText, { color: '#000' }]}>
                                    Invite your date
                                </Text>
                            </TouchableOpacity>
                        )}

                </View>
                {
                    loading ?(
                        <ActivityIndicator size = {'large'} color={colors.blueColor} />
                    ):(
                         <TouchableOpacity style={GlobalStyles.reqtengularBtn}
                    onPress={inviteDate}
                >
                    <Text style={GlobalStyles.btnText}>
                        Submit
                    </Text>
                </TouchableOpacity>
                    )
                }

               



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
                                        setEmail(null)
                                        setDescription(null)
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
                                        autoCapitalize='none'
                                        autoCorrect={false} spellCheck={false}
                                        style={[GlobalStyles.textInput, { marginTop: 5 }]}
                                        placeholder='Enter email'
                                        value={email}
                                        onChangeText={(text) => {
                                            setError(null)
                                            setEmail(text)
                                        }}
                                    />

                                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, marginTop: 20 / 930 * height }}>
                                        Text
                                    </Text>

                                    <TextInput
                                        multiline
                                        placeholder='Text invitation'
                                        value={description}
                                        onChangeText={(text) => {
                                            setDescription(text)
                                            setError(null)
                                        }}
                                        style={[GlobalStyles.textInput, { height: 185 / 930 * height, paddingVertical: 15, marginTop: 5 }]}

                                    />
                                </View>
                                {
                                    error && <Text style={GlobalStyles.errorText}> {error}</Text>

                                }
                                <TouchableOpacity onPress={handleSubmit}
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
    }, dateTimePickerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: width - 50,
        borderWidth: 2,
        borderColor: colors.greyText,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    text: {
        color: '#000',
        fontSize: 18,
    },
    clockIcon: {
        height: 24 / 930 * height,
        width: 24 / 930 * height,
    },
    dateTimePicker: {
        // position: 'absolute',
        // top: 0,
        // width: width - 50,
        backgroundColor: 'transparent',
        borderRadius: 10,
    },

})