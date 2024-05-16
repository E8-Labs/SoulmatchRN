import React ,{useState}from 'react'
import { Dimensions, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, View, Text, Image, Platform, TouchableOpacity, TextInput } from 'react-native'
import customFonts from '../../assets/fonts/Fonts'

const AddSchool = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('window')
    const [error, setError] = useState(null)

    //Getting Selected gender from previous screen
    const GenderSelected = route.params.GenderSelected
    console.log('Selected gender value recieved from previous screen is', GenderSelected)

    return (
        // <KeyboardAvoidingView
        //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // >
        //     <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
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
                    <Image source={require('../../assets/schoolicon.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                    <View style={{ height: 4 / 930 * height, width: 16 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
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
                </View>
                <View style={{ marginTop: 40 / 930 * height }}>
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>
                        What school did you attend
                    </Text>
                </View>
                <View style={{ display: 'flex', height: height * 0.65, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 50 / 930 * height }}>
                        <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333' }}>
                            School name
                        </Text>
                        <TextInput placeholder='Enter your school name'
                            style={{
                                width: 370 / 430 * width,
                                height: 52,
                                borderWidth: 1,
                                borderColor: '#CCCCCC',
                                borderRadius: 10,
                                padding: 17,
                                // marginBottom: 10,
                                marginTop: 10 / 930 * height,
                                // color: '#999999',
                                fontWeight: '500',
                            }}
                        />
                    </View>
                    <View style={{ display: 'flex', justifyContent: 'flex-end', width: width - 50 }}>
                        {
                            error && <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, color: 'red', textAlign: 'center' }}>{error}</Text>
                        }
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('AddJobDetails');
                                // handlePopup();
                            }}
                            style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                Next
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
        // </TouchableWithoutFeedback>
        // </KeyboardAvoidingView> 
    )
}

export default AddSchool
