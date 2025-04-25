import React from 'react';
import { Text, View, TouchableOpacity, Dimensions, Settings } from 'react-native';
import ApisPath from '../../lib/ApisPath/ApisPath';
import customFonts from '../../assets/fonts/Fonts';
import { Image } from 'expo-image';

const CongratsScreen = ({ navigation }) => {
    const { height, width } = Dimensions.get('window');



    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: width - 40, height: height }}>
                <View style={{ marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>

                    <Text style={{ fontWeight: '500', fontSize: 24, marginLeft: 20 / 430 * width }}>
                        Create Profile
                    </Text>
                </View>
                <View style={{ width: width - 40, height: height * 0.85, borderWidth: 0, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View>
                        <View style={{ marginTop: 200 / 930 * height, display: 'flex', alignItems: 'center' }}>
                            <Image source={require('../../assets/images/congrates.svg')} style={{ resizeMode: 'contain', height: 198, width: 206 }} />
                        </View>
                        <View style={{ alignItems: 'center', gap: 15, marginTop: 50 }}>
                            <Text style={{ fontSize: 28, fontFamily: customFonts.semibold }}>
                                Congrats!
                            </Text>
                            <Text style={{ fontSize: 16, fontFamily: customFonts.regular,textAlign:'center' }}>
                                Your account has been successfully created
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('UploadIntroVideo')} style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                            Continue
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default CongratsScreen
