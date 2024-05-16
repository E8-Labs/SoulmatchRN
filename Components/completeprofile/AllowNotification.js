import React from 'react'
import { View, Image, TouchableOpacity, Text, Dimensions } from 'react-native'

const AllowNotification = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')
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
                    <Image source={require('../../assets/notification.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
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
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                </View>
                <View style={{ display: 'flex', height: height * 0.78, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 40 / 930 * height }}>
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>
                            Allow notifications
                        </Text>
                        <View style={{ marginTop: 150 / 930 * height, display: 'flex', alignItems: 'center' }}>
                            <Image source={require('../../assets/notification.png')} style={{ height: 160 / 930 * height, width: 160 / 430 * width }} />
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333', marginTop: 20 / 930 * height }}>
                                Please allow us to send you
                            </Text>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333' }}>
                                notifications
                            </Text>
                        </View>
                    </View>


                    <View>
                        <View>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('PackagePlan');
                                    // handlePopup();
                                }}
                                style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                    Allow
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 20 / 930 * height, width: '100%', display: 'flex', alignItems: 'center' }}>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('PackagePlan');
                                }}
                                style={{ height: 54 / 930 * height, width: '40%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Text style={{ color: '#666666', fontWeight: '500', fontSize: 18 }}>
                                    Not now
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AllowNotification
