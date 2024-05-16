import React, { useState } from 'react'
import { View, Image, TouchableOpacity, Text, TouchableWithoutFeedback, Dimensions, Modal } from 'react-native'

const AddLocation = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')

    //code for Modal
    const [openModal, setOpenModal] = useState(false)

    const handleModalclick = () => {
        setOpenModal(true);
    }

    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: 370 / 430 * width }}>
                <View style={{ marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../../assets/Backbutton.png')} style={{ resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '500', fontSize: 24, marginLeft: 20 / 430 * width }}>
                        Complete your profile
                    </Text>
                </View>
                {/* Code for progressbar */}
                <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Image source={require('../../assets/location.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                </View>
                <View style={{ display: 'flex', height: height * 0.78, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 40 / 930 * height }}>
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>
                            Please add your location
                        </Text>
                        <View style={{ marginTop: 150 / 930 * height, display: 'flex', alignItems: 'center' }}>
                            <Image source={require('../../assets/location.png')} />
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333', marginTop: 20 / 930 * height }}>
                                You need to enable location to use
                            </Text>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333' }}>
                                SoulMatch app.
                            </Text>
                        </View>
                    </View>


                    <View>
                        <View>
                            <TouchableOpacity
                                onPress={handleModalclick}
                                style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                    Allow location
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 20 / 930 * height, width: '100%', display: 'flex', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('AllowNotification');
                                }}
                                style={{ height: 54 / 930 * height, width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Text style={{ color: '#666666', fontWeight: '500', fontSize: 18 }}>
                                    Not now, later
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Code for Modal */}
                        <Modal
                            visible={openModal}
                            transparent={true}
                            onRequestClose={() => setOpenModal(false)}>
                            <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000010' }}>
                                    <TouchableWithoutFeedback onPress={() => { }}>
                                        <View style={{ height: '48%', width: 370 / 430 * width, borderRadius: 10, backgroundColor: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%', justifyContent: 'space-between' }}>
                                                <Image source={require('../../assets/locationwarning.png')} style={{ height: 160 / 930 * height, width: 160 / 430 * width, resizeMode: 'contain' }} />
                                                <View>
                                                    <Text style={{ color: '#333333', fontWeight: '500', fontSize: 16 }}>
                                                        Location Not Enabled, Please Enable
                                                    </Text>
                                                    <Text style={{ color: '#333333', fontWeight: '500', fontSize: 16 }}>
                                                        Location Sharing to Use SoulMatch
                                                    </Text>
                                                </View>
                                                <View>
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate('AllowNotification')}
                                                        style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 318 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                                            Allow location
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            </TouchableWithoutFeedback>
                        </Modal>

                    </View>
                </View>
            </View>
        </View>
    )
}

export default AddLocation
