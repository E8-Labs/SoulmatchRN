import {
    View, Text, SafeAreaView, TouchableOpacity, Modal, Dimensions, Image, StyleSheet,
    TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,
    ScrollView

}
    from 'react-native'
import React, { useState, useEffect } from 'react'
import customFonts from '../assets/fonts/Fonts';
import GlobalStyles from '../assets/styles/GlobalStyles';
import colors from '../assets/colors/Colors';
// import RangeSlider from 'react-native-range-slider'
// import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import RangeSlider from './createprofile/RangeSlider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
const { height, width } = Dimensions.get('window');

const selectedImage = require('../assets/images/selectedCircle.png');
const unselectedImage = require('../assets/images/unselectedCircle.png');

export default function FilterPopup({ visible, close, addressPicker }) {

    const [selected, setselected] = useState('');
    const [error, setError] = useState(null);
    const [startHeight, setStartHeight] = useState(36)
    const [endHeight, setEndHeight] = useState(96)
    const [startAgeRange, setStartAgeRange] = useState(10)
    const [endAgeRange, setEndAgeRange] = useState(40)
    const [state, setState] = useState(null)
    const [city, setCity] = useState(null)
    const [marginTop, setMarginTop] = useState(0)
    const [modalHeight, setModalHeight] = useState(height * 0.8)
    const [address, setAddress] = useState('');

    const UserAddress = {
        cityN: city,
        stateN: state
    }

    const genders = [
        {
            id: 1,
            name: 'Male'
        },
        {
            id: 2,
            name: 'Female'
        },
        {
            id: 3,
            name: 'Non-Binary'
        },
    ]

    useFocusEffect(
        React.useCallback(() => {
            getLocalTempFilters()
        }, [])
    )


    const getLocalTempFilters = async () => {
        const tmpFltr = await AsyncStorage.getItem("TempFilters")
        if (tmpFltr) {
            let tempFilter = JSON.parse(tmpFltr)
            console.log('temp filters from local are', tempFilter)
            setCity(tempFilter.city)
            setState(tempFilter.state)
            // setAddress(tempFilter.city,tempFilter.state)
            setAddress({
                city:tempFilter.city,
                state:tempFilter.state
            })
            setStartAgeRange(tempFilter.min_age)
            setEndAgeRange(tempFilter.max_age)
            setStartHeight(tempFilter.min_height)
            setEndHeight(tempFilter.max_height)
            setselected({ name: tempFilter.gender })

        }
    }

    function getHeightStringFromValue(value, start = true) {

        //for height min height should be 3 fee = 36 inches & max height should be 8 fee = 96 inches
        // 96 - 36 = 60 / 100 = 0.6 
        let addon = 36

        let inches = parseInt(0.6 * value + addon);

        let heightFeet = parseInt(inches / 12);
        let heightInches = parseInt(inches % 12);
        // console.log("Value is ", value)
        // console.log("Calculaed Height Feet ", heightFeet)
        return `${Math.round(heightFeet)}'${Math.round(heightInches)}"`
        // return ""
    }

    const applyFilters = async () => {

        if (!selected) {
            setError("Enter all cridentials")
            return
        }

        const filters = {
            min_age: startAgeRange,
            max_age: endAgeRange,
            min_height: startHeight,
            max_height: endHeight,
            gender: selected.name,
            state: state,
            city:city
        }
        close(filters)
        // AsyncStorage.setItem("FilterDiscovers",JSON.stringify(filters))

    }


    useEffect(() => {
        console.log("Use Effect")
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            console.log("Keyboard show")
            setMarginTop(-150);
            setModalHeight(height)
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            console.log("Keyboard hide")
            setMarginTop(0);
            setModalHeight(height * 0.8)

        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);
    return (
        <SafeAreaView>

            <View>
                <Modal
                    visible={visible}
                    transparent={true}
                    animationType='slide'

                >
                    <TouchableWithoutFeedback
                        style={{ height: height, width: width }}
                        onPress={() => {
                            Keyboard.dismiss()
                            // console.log('pressed')
                        }}
                    >
                        <View style={{ marginTop: 0, height: height, width: width, backgroundColor: '#00000050', justifyContent: 'flex-end' }}>
                            <View style={{ height: modalHeight, backgroundColor: 'white', borderRadius: 20, alignItems: 'center', paddingHorizontal: 30 / 430 * height, paddingVertical: 25 / 930 * height, }}>
                                <View style={{ marginTop: marginTop, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 60 }}>
                                    <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}> Filter</Text>

                                    <TouchableOpacity onPress={close}>
                                        <Image source={require('../assets/images/close.png')}
                                            style={GlobalStyles.backBtnImage}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={[GlobalStyles.divider, { width: width }]}></View>


                                <View style={{
                                    width: width - 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                    marginTop: 22 / 930 * height, marginBottom: 20 / 930 * height,
                                }}>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.semibold }}>
                                        Age range
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>
                                        {startAgeRange.toFixed(0)} - {endAgeRange.toFixed(0)}
                                    </Text>
                                </View>

                                {/* add range picker here */}
                                <RangeSlider heightSlider={false} start={startAgeRange?startAgeRange:10} end={endAgeRange?endAgeRange:40} rangeStartUpdated={(value) => {
                                    // console.log('start age', value)
                                    setStartAgeRange(value)
                                }} rangeEndUpdated={(value) => {
                                    setEndAgeRange(value)
                                }} />

                                <View style={GlobalStyles.divider}></View>



                                <View style={{
                                    width: width - 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                    marginTop: 22 / 930 * height, marginBottom: 20 / 930 * height,
                                }}>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.semibold }}>
                                        Height
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>
                                        {getHeightStringFromValue(startHeight)} - {getHeightStringFromValue(endHeight, false)}
                                    </Text>
                                </View>


                                {/* add range picker here */}


                                <RangeSlider start={startHeight?startHeight:36} end={endHeight?endHeight:96} heightSlider={true} rangeStartUpdated={(value) => {
                                    // console.log('star height', value)
                                    setStartHeight(value)
                                }} rangeEndUpdated={(value) => {
                                    setEndHeight(value)

                                }} />




                                <View style={GlobalStyles.divider}></View>


                                <View style={{ width: width - 60, flexDirection: 'column', marginTop: 15 / 930 * height }}>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.semibold }}>
                                        Gender
                                    </Text>

                                    {
                                        genders.map((item) => (
                                            <TouchableOpacity key={item.id} style={{ marginTop: 22, alignSelf: 'flex-start', }}
                                                onPress={() => {
                                                    setselected(item)
                                                    setError(null)
                                                }}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, }}>

                                                    <Image source={selected.name === item.name ? selectedImage : unselectedImage}
                                                        style={{ height: 24 / 930 * height, width: 24 / 930 * height }}
                                                    />

                                                    <Text style={{ fontSize: 14, fontFamily: customFonts.regular }}>{item.name}</Text>

                                                </View>
                                            </TouchableOpacity>
                                        ))
                                    }


                                </View>

                                <View style={GlobalStyles.divider}></View>
                                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                                    style={{}}>
                                    <TouchableWithoutFeedback style={GlobalStyles.container} onPress={Keyboard.dismiss}>
                                        <View style={{ width: width - 60, flexDirection: 'column', }}  >
                                            <View style={{ width: width - 60, flexDirection: 'column', marginTop: 15 / 930 * height }}>
                                                <Text style={{ fontSize: 16, fontFamily: customFonts.semibold }}>
                                                    City/State
                                                </Text>
                                                <TouchableOpacity style={GlobalStyles.textInput}
                                                    onPress={() => {
                                                        AsyncStorage.setItem("TempFilters", JSON.stringify({
                                                            min_age: startAgeRange,
                                                            max_age: endAgeRange,
                                                            min_height: startHeight,
                                                            max_height: endHeight,
                                                            gender: selected.name
                                                        }))
                                                        addressPicker()
                                                    }}
                                                >
                                                    <Text style={{ color: 'grey', fontSize: 14 }}>
                                                        {/* {city ? (city) : 'Enter city/state'} {state ? (state) : ''} */}
                                                        {/* {address ? (address.city,address.state):''} */}
                                                        {UserAddress ?
                                                            <Text style={{ color: 'grey', fontSize: 14 }}>
                                                                {address.city}/{address.state}
                                                            </Text>
                                                            : ''}
                                                    </Text>
                                                </TouchableOpacity>

                                            </View>
                                            {
                                                error && <Text style={GlobalStyles.errorText}>{error}</Text>
                                            }
                                            <View style={{ width: width - 60, flexDirection: 'row', marginTop: 30 / 930 * height, justifyContent: 'space-between' }}>
                                                <TouchableOpacity onPress={close} style={{
                                                    width: 173 / 430 * width, height: 48 / 930 * height, borderWidth: 2, borderColor: "#000", borderRadius: 10,
                                                    alignItems: 'center', justifyContent: 'center'
                                                }}>
                                                    <Text style={[GlobalStyles.btnText, { color: '#000' }]}>
                                                        Reset
                                                    </Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={applyFilters} style={{
                                                    width: 173 / 430 * width, height: 48 / 930 * height, backgroundColor: colors.blueColor, borderRadius: 10,
                                                    alignItems: 'center', justifyContent: 'center'
                                                }}>
                                                    <Text style={[GlobalStyles.btnText,]}>
                                                        Apply
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>

                                        </View>
                                    </TouchableWithoutFeedback>
                                </KeyboardAvoidingView>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </SafeAreaView >

    )
}

const styles = StyleSheet.create({
})