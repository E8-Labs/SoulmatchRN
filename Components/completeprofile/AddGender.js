import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native'
import customFonts from '../../assets/fonts/Fonts'
const AddGender = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')
    const [error,setError] = useState(null)

    //code for selecting gender

    const [Gendermale, setGendermale] = useState('')
    const handleMaleClick = () => {
        setError(null)
        setGendermale(true)
        setGenderFemale(false)
        setThirdGender(false)
    }

    const [GenderFemale, setGenderFemale] = useState('')
    const handleFemaleClick = () => {
        setError(null)
        setGenderFemale(true)
        setGendermale(false)
        setThirdGender(false)
    }

    const [ThirdGender, setThirdGender] = useState('')
    const handleThirdGenderClick = () => {
        setError(null)
        setThirdGender(true)
        setGenderFemale(false)
        setGendermale(false)
    }

    //code for navigation

    const handleNextClick = () => {
        let selectedGender = null;

        if (Gendermale) {
            selectedGender = 'Male';
        } else if (GenderFemale) {
            selectedGender = 'Female';
        } else if (ThirdGender) {
            selectedGender = 'Third Gender';
        }

        if (selectedGender) {
            console.log('Selected Gender:', selectedGender);
            navigation.navigate('AddSchool', { 
                GenderSelected: {
                    Gender: selectedGender
                }
             });
        } else {
            setError('Select a gender');
        }

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
                    <Image source={require('../../assets/gendericon.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
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
                </View>
                <View style={{ marginTop: 40 / 930 * height }}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>
                        Select your gender
                    </Text>
                </View>
                {/* Select gender */}
                <View style={{ display: 'flex', height: height * 0.65, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', display: 'flex', marginTop: 50 / 930 * height }}>
                        <View style={{ height: 105 / 930 * height, width: 103 / 430 * width }}>
                            <TouchableOpacity onPress={handleMaleClick}>
                                {Gendermale ? <Image source={require('../../assets/male.png')} style={{ height: 105 / 930 * height, width: 103 / 430 * width, resizeMode: 'contain' }} /> : <Image source={require('../../assets/MaleUS.png')} style={{ height: 105 / 930 * height, width: 103 / 430 * width, resizeMode: 'contain' }} />}
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 105 / 930 * height, width: 103 / 430 * width }}>
                            <TouchableOpacity onPress={handleFemaleClick}>
                                {GenderFemale ? <Image source={require('../../assets/SelectedF.png')} style={{ height: 105 / 930 * height, width: 103 / 430 * width, resizeMode: 'contain' }} /> : <Image source={require('../../assets/female.png')} style={{ height: 105 / 930 * height, width: 103 / 430 * width, resizeMode: 'contain' }} />}
                            </TouchableOpacity>
                        </View>
                        <View style={{ height: 105 / 930 * height, width: 103 / 430 * width }}>
                            <TouchableOpacity onPress={handleThirdGenderClick}>
                                {ThirdGender ? <Image source={require('../../assets/SelectedB.png')} style={{ height: 105 / 930 * height, width: 103 / 430 * width, resizeMode: 'contain' }} /> : <Image source={require('../../assets/nonbinary.png')} style={{ height: 105 / 930 * height, width: 103 / 430 * width, resizeMode: 'contain' }} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'flex-end',width:width-50 }}>
                    {
                        error&&<Text style = {{fontSize:16,fontFamily:customFonts.meduim,color:'red',textAlign:'center'}}>{error}</Text>
                    }
                        <TouchableOpacity
                            onPress={handleNextClick}
                            style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AddGender
