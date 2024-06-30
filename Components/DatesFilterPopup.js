import {
    View, Text, SafeAreaView, TouchableOpacity, Modal, Dimensions, StyleSheet,
    TextInput, FlatList, TouchableWithoutFeedback, Keyboard,
    ScrollView

}
    from 'react-native';
import React, { useState, useEffect } from 'react'
import customFonts from '../assets/fonts/Fonts';
import GlobalStyles from '../assets/styles/GlobalStyles';
import colors from '../assets/colors/Colors';
import RangeSlider from './createprofile/RangeSlider';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApisPath from '../lib/ApisPath/ApisPath';

const { height, width } = Dimensions.get('window');

const selectedImage = require('../assets/images/selected.png');
const unselectedImage = require('../assets/images/unSelected.png');

export default function DatesFilterPopup({ visible, close }) {

    const [selected, setselected] = useState('');
    const [selectedCat, setselectedCat] = useState(-1);
    const [startRat, setStartRat] = useState(0);
    const [endRat, setEndRat] = useState(100);
    const [categories, setCategories] = useState([])

    const budget = [
        {
            id: 1,
            name: '$',
            minBudget:0,
            maxBudget:20,
        },
        {
            id: 2,
            name: '$$',
            minBudget:20,
            maxBudget:50,
        },
        {
            id: 3,
            name: "$$$",
            minBudget:50,
            maxBudget:80,
        },
        {
            id: 4,
            name: "$$$$",
            minBudget:80,
            maxBudget:100000
        },
    ]

    useEffect(() => {
        getDateCategories()
    }, [])


    const getDateCategories = async () => {
        try {
            console.log("trying to get date category")
            const data = await AsyncStorage.getItem('USER')
            if (data) {
                let d = JSON.parse(data)
                let AuthToken = d.token

                const result = await fetch(ApisPath.ApiGetDateCategories, {
                    'method': 'get',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthToken
                    }
                });
                if (result) {
                    const json = await result.json();
                    if (json.status === true) {
                        console.log('date categories are ', json.data)
                        let allCats = [{
                            id: -1,
                            name: "All"
                        }]
                        let merged = [...allCats, ...json.data]
                        setCategories(merged)

                    } else {
                        console.log('date catogries message', json.message)
                    }
                }
            }
        } catch (e) {
            console.log('error finding in date catogories ', e)
        }

    }


    const applyFilters = () => {
        let filters = {
            minBudget: selected.minBudget,
            maxBudget: selected.maxBudget,
            min_reting: startRat,
            max_rating: endRat,
            category: selectedCat
        }

        AsyncStorage.setItem("DatesFilters", JSON.stringify({
            minBudget: selected.minBudget,
            maxBudget: selected.maxBudget,
            min_reting: startRat,
            max_rating: endRat,
            category: selectedCat
        }))

        close({
            minBudget: selected.minBudget,
            maxBudget: selected.maxBudget,
            min_reting: startRat,
            max_rating: endRat,
            category: selectedCat,
            getDate : true
        })

        console.log('apply filters are ', filters)
    }

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
                            <View style={{ height: height * 0.75, backgroundColor: 'white', borderRadius: 20, alignItems: 'center', paddingHorizontal: 30 / 430 * height, paddingVertical: 25 / 930 * height }}>
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
                                            budget.map((item) => (
                                                <TouchableOpacity key={item.id} style={{ marginTop: 22, alignSelf: 'flex-start', }}
                                                    onPress={() => {
                                                        setselected(item)
                                                    }}
                                                >
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, }}>

                                                        <Image source={selected.id === item.id ? selectedImage : unselectedImage}
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

                                <View style={{ width: width - 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 22 / 930 * height, marginBottom: 20 }}>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.semibold }}>
                                        Ratings
                                    </Text>
                                    <Text style={{ fontSize: 16, fontFamily: customFonts.meduim }}>
                                        {parseInt(startRat / 20)} - {parseInt(endRat / 20)}
                                    </Text>
                                </View>
                                <RangeSlider heightSlider={false} start={0} end={100} minValue={0} maxValue={100} rangeStartUpdated={(value) => {
                                    // console.log('start age', value)
                                    setStartRat(value)
                                }} rangeEndUpdated={(value) => {
                                    setEndRat(value)
                                }} />

                                <Text style={{ fontSize: 16, fontFamily: customFonts.semibold, textAlign: 'left', width: width - 60, marginTop: 20 / 930 * height }}>
                                    Catergory
                                </Text>

                                <View style={{
                                    width: width, height: 70 / 930 * height, paddingLeft: 20, marginTop: 20
                                }}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        horizontal
                                        data={categories}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={({ item }) => (
                                            <View style={{ alignItems: 'center', marginLeft: 8 }}>
                                                <TouchableOpacity onPress={() => {
                                                    setselectedCat(item)
                                                }}
                                                    style={{
                                                        paddingVertical: 6, paddingHorizontal: 20,
                                                        backgroundColor: selectedCat.id === item.id ? colors.blueColor : '#f5f5f5', borderRadius: 4
                                                    }}
                                                >
                                                    <Text style={{
                                                        fontSize: 16, fontFamily: customFonts.meduim, color: selectedCat.id === item.id ? "#fff" : '#000'
                                                    }}>
                                                        {item.name}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        )}
                                    />
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
