import React from 'react'
import { Text, View, TouchableOpacity, Image, Dimensions, Settings } from 'react-native'
import ApisPath from '../../lib/ApisPath/ApisPath';

const CongratsScreen = ({ navigation }) => {
    const { height, width } = Dimensions.get('window');

   

    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: 370 / 430 * width }}>
                <View style={{ marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.pop()}>
                        <Image source={require('../../assets/Backbutton.png')} style={{ resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '500', fontSize: 24, marginLeft: 20 / 430 * width }}>
                        Create Profile
                    </Text>
                </View>
                <View style={{ marginTop: 200 / 930 * height, display: 'flex', alignItems: 'center' }}>
                    <Image source={require('../../assets/congrats.png')} style={{ resizeMode: 'contain' }} />
                </View>
                <View>
                    <Text>
                        congrats!
                    </Text>
                    <Text>
                        Your account has been successfully created
                    </Text>
                </View>
                <View style={{ height: 200 / 930 * height, display: 'flex', justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('UploadeIntroVideo')} style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default CongratsScreen
