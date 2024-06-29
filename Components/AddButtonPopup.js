import { View, Text, Dimensions, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, TextInput, Modal, TouchableWithoutFeedback } from 'react-native'
import React, { useRef, useState } from 'react';
import GlobalStyles from '../assets/styles/GlobalStyles';
import customFonts from '../assets/fonts/Fonts';
import colors from '../assets/colors/Colors';
import { Image } from 'expo-image';
const {height,width} = Dimensions.get('window')

export default function AddButtonPopup({visible,close}) {
    return (
        <View>
            <Modal
                visible={visible}
                transparent={true}
                animationType='fade'
            >
                <TouchableWithoutFeedback onPress={close}>
                    <View style={{ height: height, width: width, }}>

                        <View style={{
                            shadowColor: colors.blueColor, shadowOffset: {
                                width: 3,
                                height: 3
                            }, shadowRadius: 10, shadowOpacity: 0.3,
                            height: 100 / 930 * height, width: 180 / 430 * width, backgroundColor: 'white', position: 'absolute', bottom: 75, left: 30,
                            alignItems: 'center', borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15/430*width,
                        }}>
                            <View style={{ flexDirection: 'column', alignItems: 'center', gap: 10/930*height }}>
                                <TouchableOpacity onPress={close}>
                                    <Image source={require('../assets/images/camera.png')}
                                        style={{ height: 52/930*height, width: 52/930*height, }}
                                    />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 14/930*height, fontFamily: customFonts.regular }}>Camera</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'center', gap: 10/930*height }}>
                                <TouchableOpacity  onPress={close}>
                                    <Image source={require('../assets/images/gallery.png')}
                                        style={{ height: 52/930*height, width: 52/930*height, }}
                                    />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 14/930*height, fontFamily: customFonts.regular }}>Gallery</Text>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal>
        </View>
    )
}