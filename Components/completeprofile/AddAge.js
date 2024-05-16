import React from 'react';
import { TouchableOpacity, View, Image, Text, Dimensions } from 'react-native';
import { useState } from 'react';
import WheelPickerExpo from 'react-native-wheel-picker-expo';

const AddAge = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('window');

    //getting data from previous screen
    const selectedZodiac = route.params.zodiac;
    console.log('Id recieved from previous screen is', selectedZodiac);

    //code for picker
    const [city, setCity] = useState('');
    console.log('Focused age is', city)
    const CITIES = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,61,62,63,64,65,66,67,68,69,70,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100'.split(',');

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
                    <Image source={require('../../assets/ageicon.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('AddGender')}>
                    <Text style={{ marginTop: 40 / 930 * height, fontWeight: '500', fontSize: 20 }}>
                        Select your age
                    </Text>
                </TouchableOpacity>
                <View style={{ height: 416 / 930 * height, width: 370 / 430 * width, borderWidth: 1, marginTop: 60 / 930 * height }}>
                    <View style={{ marginTop: 29, marginLeft: 29, }}>
                        <WheelPickerExpo
                            backgroundColor={'#000000'}
                            height={300 / height * 930}
                            width={130 / width * 430}
                            // backgroundColor='#000000'
                            selectedStyle={{ borderWidth: 1, borderColor: 'red', width: '20' }}
                            initialSelectedIndex={4}
                            items={CITIES.map(name => ({ label: name, value: '' }))}
                            onChange={({ item }) => setCity(item.label)} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AddAge
