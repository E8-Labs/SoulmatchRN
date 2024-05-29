import React, { useState } from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View, TextInput } from 'react-native'
import GlobalStyles from '../../assets/styles/GlobalStyles';
const AddName = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('window');

    const ImageR = route.params.Image1;
    const ProfileImage = ImageR.FirstImage;
    console.log('Image recieved from previous screen is', ProfileImage)

    //code for focused input

    const [focusInput1, setFocusInput1] = useState(false);

    const handleInputfocus1 = () => {
        setFocusInput1(true)
        setFocusInput2(false)
        setNameerror(false)
    }

    const [focusInput2, setFocusInput2] = useState(false);

    const handleInputfocus2 = () => {
        setFocusInput2(true)
        setFocusInput1(false)
        setNameerror(false)
    }

    //code for saving text of input

    const [saveText1, setSavetext1] = useState('');

    const handleSave1 = (saveText1) => {
        setSavetext1(saveText1)
        // console.log('Text saved is', saveText1)
    }

    const [saveText2, setSavetext2] = useState('');

    const handleSave2 = (saveText3) => {
        setSavetext2(saveText3);
        // console.log('Text saved is', saveText2);
    }

    //code for validation

    //code for Error
    const [Nameerror, setNameerror] = useState(false);

    const handleNextClick = () => {
        if (saveText1.length === 0 || saveText2.length === 0) {
            console.log('Enter Password');
            setNameerror(true);
        } else {
            navigation.navigate('AddEmail', {
                user: {
                    FirstName: saveText1,
                    LastName: saveText2,
                    UserProfileImage: ProfileImage
                }
            });
        }
        // else if (saveText1 !== saveText2) {
        //     // console.log('Passwords entered are not same')
        //     // navigation.navigate('Uploadprofileemail')
        // } else if (saveText1 === saveText2) {
        //     //navigation.navigate('Uploadprofileemail')
        //     console.log('Passwords entered are same')
        // }
    }

    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: 370 / 430 * width }}>
                <View style={{ marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <View style={GlobalStyles.backBtn}>
                            <Image source={require('../../assets/images/backArrow.png')}
                                style={GlobalStyles.backBtnImage}
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '500', fontSize: 24, marginLeft: 20 / 430 * width }}>
                        Create Profile
                    </Text>
                </View>
                {/* Code for progressbar */}
                <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Image source={require('../../assets/user2.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                </View>
                {/* Code for Adding user details */}
                <View style={{ marginTop: 40 / 930 * height }}>
                    <Text style={{ fontWeight: '500', fontSize: 20 }}>
                        What's your name?
                    </Text>
                    <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333', marginTop: 40 / 930 * height }}>
                        First name
                    </Text>
                    <TextInput placeholder='Enter first name'
                        onFocus={handleInputfocus1}
                        autoCorrect={false} spellCheck={false}
                        onChangeText={handleSave1}
                        value={saveText1}
                        style={{
                            width: 370 / 430 * width,
                            height: 52,
                            borderWidth: 1,
                            borderColor: focusInput1 ? '#6050DC' : '#CCCCCC',
                            borderRadius: 10,
                            padding: 17,
                            marginTop: 10 / 930 * height,
                            color: '#333333',
                            fontWeight: '500',
                        }} />
                    <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333', marginTop: 30 / 930 * height }}>
                        Last name
                    </Text>
                {/* Adjusting code for next button */}
                    <View style={{ display: 'flex', height: height * 0.45, flexDirection: 'column', justifyContent: 'space-between' }}>
                        <View>
                            <TextInput placeholder='Enter last name'
                            autoCorrect={false} spellCheck={false}
                                onFocus={handleInputfocus2}
                                onChangeText={handleSave2}
                                value={saveText2}
                                style={{
                                    width: 370 / 430 * width,
                                    height: 52,
                                    borderWidth: 1,
                                    borderColor: focusInput2 ? '#6050DC' : '#CCCCCC',
                                    borderRadius: 10,
                                    padding: 17,
                                    marginTop: 10 / 930 * height,
                                    color: '#333333',
                                    fontWeight: '500',
                                }} />
                            <View>
                                {Nameerror ? <View>
                                    <Text style={{ color: '#E01F1F', fontSize: 14, fontWeight: '500', marginTop: 5 / 930 * height }}>
                                        Enter name
                                    </Text>
                                </View> : ''}
                            </View>
                        </View>
                        {/* <View> */}
                        <TouchableOpacity onPress={handleNextClick} style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                            <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                Next
                            </Text>
                        </TouchableOpacity>
                        {/* </View> */}
                    </View>
                </View>
            </View>
        </View>
    )
}

export default AddName
