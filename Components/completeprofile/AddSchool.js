import React, { useEffect, useState } from 'react'
import { Dimensions, Keyboard, TouchableWithoutFeedback, View, Text, Image, ActivityIndicator, TouchableOpacity, TextInput } from 'react-native'
import customFonts from '../../assets/fonts/Fonts'
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';
import { UpdateProfile } from '../../Services/ProfileServices/UpdateProfile';
const AddSchool = ({ navigation, route }) => {

    const { height, width } = Dimensions.get('window')

    const data = route.params.data

    const [error, setError] = useState(null)
    const [school, setSchool] = useState(null)
    const [loading, setLoading] = useState(false)
    const [btnPosition,setBtnPosition] = useState(data.from === "Profile" ? height*0.78:height*0.67)

    useEffect(() => {
        if (data.from === 'Profile') {
            setSchool(data.user.school)
        }
    }, [])

    const handleNext = async () => {
        setLoading(true)
        let body = JSON.stringify({
            school: school
        })

        try {
            await UpdateProfile(body);
            if (data.from === 'Profile') {
                navigation.goBack()
            } else {
                navigation.navigate('AddJobDetails', {
                    data: {
                        user: '',
                        from: 'School'
                    }
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            setError('Failed to update profile.');
        } finally {
            setLoading(false);
        }
        // navigation.navigate("AddJobDetails", {
        //     user: user
        // })
    }

    useEffect(() => {
        // console.log("Use Effect")
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            if(data.from === 'Profile'){
                setBtnPosition(height *0.47);
            }else{
                setBtnPosition(height *0.37);

            }
        });
    
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
        //   console.log("Keyboard hide")
        if(data.from === 'Profile'){
            setBtnPosition(height *0.78);
        }else{
            setBtnPosition(height *0.67);

        }
        });
    
        return () => {
          keyboardDidShowListener.remove();
          keyboardDidHideListener.remove();
        };
      }, []);

      const getBtnPosition = () =>{

      }

    return (
        // <KeyboardAvoidingView
        //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ height: height }}>
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
                            Complete your profile
                        </Text>
                    </View>
                    {/* Code for progressbar */}
                    {
                        data.from !== "Profile" ? (


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
                        ) : null
                    }
                    <View style={{ marginTop: 40 / 930 * height }}>
                        <Text style={{ fontSize: 20, fontWeight: '500' }}>
                            What school did you attend
                        </Text>
                    </View>
                    <View style={{ display: 'flex', height:btnPosition, flexDirection: 'column', justifyContent: 'space-between' }}>
                        <View style={{ marginTop: 50 / 930 * height }}>
                            <Text style={{ fontWeight: '500', fontSize: 16, color: '#333333' }}>
                                School name
                            </Text>
                            <TextInput
                                autoCorrect={false}
                                spellCheck={false}
                                autoComplete='off'
                                placeholder='Enter your school name'
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
                                value={school}
                                onChangeText={(item) => {
                                    setError(null)
                                    setSchool(item)
                                }}
                            />
                        </View>
                        <View style={{ display: 'flex', justifyContent: 'flex-end', width: width - 50 }}>
                            {
                                error && <Text style={{ fontSize: 16, fontFamily: customFonts.meduim, color: 'red', textAlign: 'center' }}>{error}</Text>
                            }
                            {
                                loading ? (
                                    <ActivityIndicator size={'large'} color={colors.blueColor} style={{ marginTop: 70 / 930 * height }} />
                                ) : (
                                    <TouchableOpacity onPress={handleNext}
                                        style={{
                                            backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10, marginTop: 70 / 930 * height
                                        }}>
                                        {
                                            data.from === 'Profile' ? (
                                                <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>Save</Text>
                                            ) : (
                                                <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>Next</Text>
                                            )
                                        }

                                    </TouchableOpacity>
                                )
                            }
                        </View>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
        // </KeyboardAvoidingView> 
    )
}

export default AddSchool
