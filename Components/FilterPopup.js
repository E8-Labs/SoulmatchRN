import {
    View, Text, SafeAreaView, TouchableOpacity, Modal, Dimensions, Image, StyleSheet,
    TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,
    ScrollView

}
    from 'react-native'
import React, { useState } from 'react'
import customFonts from '../assets/fonts/Fonts';
import GlobalStyles from '../assets/styles/GlobalStyles';
import colors from '../assets/colors/Colors';
// import RangeSlider from 'react-native-range-slider'
// import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import RangeSlider from './createprofile/RangeSlider';
const { height, width } = Dimensions.get('window');

const selectedImage = require('../assets/images/selectedCircle.png');
const unselectedImage = require('../assets/images/unselectedCircle.png');

export default function FilterPopup({ visible, close }) {

    const [selected, setselected] = useState('');
    const [startHeight, setStartHeight] = useState(null)
    const [endHeight, setEndHeight] = useState(null)
    const [startAgeRange, setStartAgeRange] = useState(null)
    const [endAgeRange, setEndAgeRange] = useState(null)

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

    
    return (
        <SafeAreaView>
            <View>
                <Modal
                    visible={visible}
                    transparent={true}
                    animationType='slide'

                >
                    <View style={{ height: height, width: width, backgroundColor: '#00000050', justifyContent: 'flex-end' }}>
                        <View style={{ height: height * 0.9, backgroundColor: 'white', borderRadius: 20, alignItems: 'center', paddingHorizontal: 30 / 430 * height, paddingVertical: 25 / 930 * height }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 60 }}>
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
                                marginTop: 22 / 930 * height,marginBottom:20/ 930 * height,
                                 }}>
                                <Text style={{ fontSize: 16, fontFamily: customFonts.semibold }}>
                                    Age range
                                </Text>
                                <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>
                                    {startAgeRange ? startAgeRange.toFixed(0) : 10} - {endAgeRange ? endAgeRange.toFixed(0) : 40}
                                </Text>
                            </View>

                            {/* add range picker here */}
                            <RangeSlider heightSlider={false} start={10} end={40} rangeStartUpdated={(value) => {
                                console.log('start age', value)
                                setStartAgeRange(value)
                            }} rangeEndUpdated={(value) => {
                                setEndAgeRange(value)
                            }} />

                            <View style={GlobalStyles.divider}></View>



                            <View style={{ 
                                width: width - 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
                                 marginTop: 22 / 930 * height ,marginBottom:20/ 930 * height,
                                 }}>
                                <Text style={{ fontSize: 16, fontFamily: customFonts.semibold }}>
                                    Height
                                </Text>
                                <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>
                                    {startHeight ? (startHeight/12).toFixed(0) :3}' {startHeight ? (startHeight % 12).toFixed(0) :3}" 
                                </Text>
                            </View>


                            {/* add range picker here */}


                            <RangeSlider start={36} end={96} heightSlider={true} rangeStartUpdated={(value) => {
                                console.log('star height', value)
                                setStartHeight(value)
                            }} rangeEndUpdated={(value) => {
                                setEndHeight(value)

                            }} />




                            <View style={GlobalStyles.divider}></View>


                            <View style={{ width: width - 60, flexDirection: 'column', marginTop: 22 / 930 * height }}>
                                <Text style={{ fontSize: 16, fontFamily: customFonts.semibold }}>
                                    Gender
                                </Text>

                                {
                                    genders.map((item) => (
                                        <TouchableOpacity key={item.id} style={{ marginTop: 22, alignSelf: 'flex-start', }}
                                            onPress={() => {
                                                setselected(item.id)
                                            }}
                                        >
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, }}>

                                                <Image source={selected === item.id ? selectedImage : unselectedImage}
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
                                        <View style={{ width: width - 60, flexDirection: 'column', marginTop: 22 / 930 * height }}>
                                            <Text style={{ fontSize: 16, fontFamily: customFonts.semibold }}>
                                                City/State
                                            </Text>
                                            <TextInput
                                                style={GlobalStyles.textInput}
                                                placeholder='Enter city/state'
                                            />
                                        </View>
                                        <View style={{ width: width - 60, flexDirection: 'row', marginTop: 45 / 930 * height, justifyContent: 'space-between' }}>
                                            <TouchableOpacity onPress={close} style={{
                                                width: 173 / 430 * width, height: 48 / 930 * height, borderWidth: 2, borderColor: "#000", borderRadius: 10,
                                                alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <Text style={[GlobalStyles.btnText, { color: '#000' }]}>
                                                    Reset
                                                </Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={close} style={{
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
                </Modal>
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({



})