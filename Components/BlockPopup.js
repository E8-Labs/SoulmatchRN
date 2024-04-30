import { View, Text, Dimensions, Image, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, TextInput, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useRef, useState } from 'react'
import customFonts from '../assets/fonts/Fonts'
import colors from '../assets/colors/Colors'

const { height, width } = Dimensions.get('window')


export default function BlockPopup({ visible, close }) {
    console.log("Visible Modal 3 is ", visible)
    return (
        <View>
            <Modal
                visible={visible}
                transparent={true}
                animationType='slide'
            >
                <TouchableWithoutFeedback onPress={close}>
                    <View style={{ height: height, width: width, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000050' }}>

                        <View style={{
                            height: 180 / 930 * height, width: width - 60, backgroundColor: 'white', justifyContent: 'space-between',
                            alignItems: 'flex-start', borderRadius: 10, paddingHorizontal: 25, paddingVertical: 25,
                        }}>
                            <Text style={{ fontSize: 20, fontFamily: customFonts.meduim }}>Block Sarah Doe?</Text>
                            <Text style={{ fontSize: 14, fontFamily: customFonts.regular }}>Are you sure you want to block Sarah Doe?</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: width - 110, justifyContent: 'space-between', }}>
                                <TouchableOpacity onPress={close}
                                    style={{ 
                                        height: 40 / 930 * height, width: 150 / 430 * width,alignItems:'center',justifyContent:'center',
                                        borderWidth:1,borderRadius:10,borderColor:'#000'
                                    }}
                                >
                                    <Text style={{ fontSize: 14, fontFamily: customFonts.meduim }}>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={close}
                                    style={{ 
                                        height: 40 / 930 * height, width: 150 / 430 * width,alignItems:'center',justifyContent:'center',
                                        borderRadius:10,backgroundColor:'#E01F1F'
                                    }}
                                >
                                    <Text style={{ fontSize: 14, fontFamily: customFonts.meduim,color:'white' }}>Yes, block</Text>
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}