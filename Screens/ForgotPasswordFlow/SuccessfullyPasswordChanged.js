import React, { useState } from 'react'
import { View, Text, Dimensions, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors';


const { height, width } = Dimensions.get("window");

const selectedImage = require('../../assets/images/selected.png')
const unselectedImage = require('../../assets/images/unSelected.png')
const eye = require('../../assets/images/eye.png')
const eyeslash = require('../../assets/images/eye-slash.png')

export default function SuccessfullyPasswordChanged(props) {


    return (
        <SafeAreaView>
            <View style={[GlobalStyles.container, ]}>
                {/* <View style={{ width: width - 40, marginTop: 50, alignItems: 'flex-start' }}>
                   
                    
                </View> */}
                <View style={{ width: width - 40,    alignItems: 'center' }}>
                    <Image source={require('../../assets/images/congratsImage.png')}
                        style={{ width: 205 / 430 * width, height: 198 / 930 * height, resizeMode: 'contain' }}
                    />
                    <Text style={{ fontSize: 28, fontWeight: '700', marginTop: 30 }}>
                        Password changed!
                    </Text>

                    <Text style={[GlobalStyles.splashMeduimText, { marginTop: 10 ,textAlign:'center'}]}>
                        Your password has been changed successfully.
                    </Text>

                    <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 50 / 924 * height }]}
                        onPress={()=>props.navigation.push("LoginUser",{
                            forScreen:"Password"
                        })}
                    >
                        <Text style={GlobalStyles.btnText}>
                            Continue
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </SafeAreaView>
    )
}
