import {
    View, Text, SafeAreaView, TouchableOpacity, Modal, Dimensions, StyleSheet,
    TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard,
    ScrollView

}
    from 'react-native';
import React, { useState } from 'react'
import customFonts from '../assets/fonts/Fonts';
import GlobalStyles from '../assets/styles/GlobalStyles';
import colors from '../assets/colors/Colors';
import RangeSlider from './createprofile/RangeSlider';
import { Image } from 'expo-image';

const { height, width } = Dimensions.get('window');

const selectedImage = require('../assets/images/selected.png');
const unselectedImage = require('../assets/images/unSelected.png');

export default function DatesFilterPopup({ visible, close }) {

    const [selected, setselected] = useState(null);
    const [selectedCat, setselectedCat] = useState(1);
    const [startRat, setStartRat] = useState(0);
    const [endRat, setEndRat] = useState(5);

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
    return (
        <SafeAreaView>

            <View>
                <Modal
                    visible={visible}
                    transparent={true}
                    animationType='slide'

                >
                    <TouchableWithoutFeedback style={{ height: height }}
                        onPress={() => {
                            Keyboard.dismiss()
                        }}
                    >
                        <View style={{ height: height, width: width, backgroundColor: '#00000050', justifyContent: 'flex-end' }}>
                            <View style={{ height: height * 0.8, backgroundColor: 'white', borderRadius: 20, alignItems: 'center', paddingHorizontal: 30 / 430 * height, paddingVertical: 25 / 930 * height }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 60 }}>
                                    <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}> Filters</Text>

                                    <TouchableOpacity onPress={close}>
                                        <Image source={require('../assets/images/close.png')}
                                            style={GlobalStyles.backBtnImage}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={[GlobalStyles.divider, { width: width }]}></View>

                                <View style={{ width: width - 60, flexDirection: 'column', marginTop: 22 / 930 * height }}>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.semibold }}>
                                        City/State
                                    </Text>
                                    <TextInput
                                        style={GlobalStyles.textInput}
                                        placeholder='Enter city/state'
                                    />
                                </View>


                                <View style={{ width: width - 60, flexDirection: 'column', marginTop: 22 / 930 * height }}>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.semibold }}>
                                        Budget
                                    </Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        {
                                            genders.map((item) => (
                                                <TouchableOpacity key={item.id} style={{ marginTop: 22, alignSelf: 'flex-start', }}
                                                    onPress={() => {
                                                        setselected(item.id)
                                                    }}
                                                >
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, }}>

                                                        <Image source={selected === item.id ? selectedImage : unselectedImage}
                                                            style={{ height: 20 / 930 * height, width: 20 / 930 * height }}
                                                        />

                                                        <Text style={{ fontSize: 14, fontFamily: customFonts.regular }}>{item.name}</Text>

                                                    </View>
                                                </TouchableOpacity>
                                            ))
                                        }

                                    </View>

                                </View>

                                <View style={GlobalStyles.divider}></View>

                                <View style={{ width: width - 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 22 / 930 * height ,marginBottom:20}}>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.semibold }}>
                                        Ratings
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>
                                        {parseInt(startRat/20)} - {parseInt(endRat/20)}
                                    </Text>
                                </View>
                                <RangeSlider heightSlider={false} start={0} end={5}minValue = {0} maxValue = {100} rangeStartUpdated={(value) => {
                                    // console.log('start age', value)
                                    setStartRat(value)
                                }} rangeEndUpdated={(value) => {
                                    setEndRat(value)
                                }} />

                                <Text style={{ fontSize: 16, fontFamily: customFonts.semibold, textAlign: 'left', width: width - 60, marginTop: 20 / 930 * height }}>
                                    Catergory
                                </Text>

                                <View style={{
                                    width: width, height: 70/930*height,paddingLeft:20
                                }}>
                                    <ScrollView horizontal showsHorizontalScrollIndicator={false}

                                    >
                                        <View style={{ flexDirection: 'row', gap: 10 }}>

                                            {
                                                category.map((item) => (
                                                    <TouchableOpacity key={item.id} style={{ marginTop: 22, alignSelf: 'flex-start', }}
                                                        onPress={() => {
                                                            setselectedCat(item.id)
                                                        }}
                                                    >
                                                        <View style={{
                                                            paddingVertical: 6 / 930 * height, paddingHorizontal: 20 / 430 * width, borderRadius: 4,
                                                            backgroundColor: selectedCat === item.id ? colors.blueColor : colors.greyText
                                                        }}>

                                                            <Text style={{ fontSize: 14, fontFamily: customFonts.regular, color: selectedCat === item.id ? "white" : "black" }}>{item.name}</Text>

                                                        </View>
                                                    </TouchableOpacity>
                                                ))
                                            }
                                        </View>
                                    </ScrollView>
                                </View>




                                <View style={{ width: width - 60, flexDirection: 'column', }}  >

                                    <View style={{ width: width - 60, flexDirection: 'row', marginTop: 45 / 930 * height, justifyContent: 'space-between' }}>
                                        <TouchableOpacity style={{
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