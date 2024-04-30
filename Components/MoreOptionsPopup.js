import { View, Text, Dimensions, Image, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, TextInput, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import customFonts from '../assets/fonts/Fonts'
import colors from '../assets/colors/Colors'
import BlockPopup from './BlockPopup'

const {height,width} = Dimensions.get('window')

export default function MoreOptionsPopup({visible,close, handleMenu}) {

console.log("Modal 2 visible ", visible)

    function onpresshandle  () {
        // modal3 = true
        handleMenu("Block")
    }

    return (
        <View>
            <Modal
                visible={visible}
                transparent={true}
                animationType='fade'
            >
                <TouchableWithoutFeedback onPress={close}>
                    <View style={{ height: height, width: width }}>

                        <View style={{
                            shadowColor: colors.blueColor, shadowOffset: {
                                width: 3,
                                height: 3
                            }, shadowRadius: 10, shadowOpacity: 0.3,
                            backgroundColor: 'white', position: 'absolute', top: 105/930*height, right: 30,gap:10/930*height,
                            alignItems: 'flex-start', borderRadius: 10, justifyContent: 'space-between',padding:12/930*height
                        }}>

                            <TouchableOpacity onPress={close}>
                                <Text style={{ fontSize: 14, fontFamily: customFonts.regular }}>Invite to date</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={()=>onpresshandle()}>
                                <Text style={{ fontSize: 14, fontFamily: customFonts.regular }}>Block</Text>
                            </TouchableOpacity>


                            <TouchableOpacity onPress={close}>
                                <Text style={{ fontSize: 14, fontFamily: customFonts.regular }}>Report</Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}




