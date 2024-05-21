import React, { useState } from 'react'
import { Dimensions, View, TouchableOpacity, Image, Text, TextInput, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native'

const AddEnhancementAnswer = ({ openModal, closeModal }) => {
    const { height, width } = Dimensions.get('window')
    const[answerText,setAnswerText] = useState(null)
    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: 370 / 430 * width }}>
                <Modal
                    transparent={true}
                    visible={openModal}
                    animationType='fade'>
                    <TouchableWithoutFeedback  style={{ height: height, }} onPress={()=>Keyboard.dismiss()}>
                        <View style={{ height: height, gap: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000080' }}>

                            {/* Code for uper section of modal */}
                            <View style={{ height: 320 / 930 * height, width: 380 / 430 * width, backgroundColor: '#ffffff', borderRadius: 10, display: 'flex', alignItems: 'center', padding: 20 }}>
                                <View style={{ width: 350 / 430 * width, height: '100%' }}>
                                    <View style={{ width: '100%', height: 73 / 930 * height, justifyContent: 'space-between' }}>
                                        <Text style={{ fontWeight: '500', fontSize: 16 }}>
                                            Travel Dreaming
                                        </Text>
                                        <Text style={{ fontWeight: '500', fontSize: 12, color: '#4D4D4D' }}>
                                            If you could visit any country in the world, where would you go and why?
                                        </Text>
                                    </View>
                                    <View>
                                        <TextInput
                                            onChangeText={(text)=>setAnswerText(text)}
                                            multiline
                                            numberOfLines={5}
                                            textAlignVertical='top'
                                            style={{ height: 177 / 930 * height, width: 350 / 430 * width, borderWidth: 1, borderColor: '#6050DC', padding: 15, alignItems: 'flex-start', marginTop: 30, justifyContent: 'flex-start', borderRadius: 10 }} />
                                    </View>
                                </View>
                            </View>
                            {/* Code for send msg */}
                            <View style={{ height: 115 / 930 * height, width: 350 / 430 * width }}>
                                <View>
                                    <TouchableOpacity
                                        onPress={()=>closeModal(answerText)}
                                        style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 350 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 16 }}>
                                            Save
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View>
                                    <TouchableOpacity
                                        onPress={()=>closeModal()}
                                        style={{ height: 54 / 930 * height, width: 350 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                        <Text style={{ fontWeight: '500', fontSize: 16 }}>
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            </View>
        </View>
    )
}

export default AddEnhancementAnswer
