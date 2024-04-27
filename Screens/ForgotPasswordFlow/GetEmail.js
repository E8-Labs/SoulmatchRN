import React, { useState } from 'react'
import { View, Text, Dimensions, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors';


const { height, width } = Dimensions.get("window");

export default function GetEmail(props) {

  
    const [emailFocused, setEmailFocused] = useState(false);
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const getBtnColor = () => {
        if (email) {
            return colors.blueColor
        } else {
            return colors.lightColor
        }
    }
    const sendCond = () =>{
        if (email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const validEmail = emailRegex.test(email);

            if (!validEmail) {
                setError("Enter valid email")
            } else {

                props.navigation.navigate("EmailVerification",{
                    email:email
                })
                // call login api
            }
        }else{
            setError("Enter Email")
        }
    }
   
    return (
        <SafeAreaView>
            <View style={[GlobalStyles.container, { justifyContent: 'flex-start' }]}>
                <View style={{ width: width - 40, marginTop: 50, alignSelf: 'center' }}>
                    <TouchableOpacity onPress={()=>props.navigation.goBack()}>
                        <View style = {GlobalStyles.backBtn}>
                            <Image source={require('../../assets/images/backArrow.png')}
                                style = {GlobalStyles.backBtnImage}
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontSize: 28, fontWeight: '700',marginTop:30 }}>
                        Forgot Password
                    </Text>

                    <Text style={[GlobalStyles.splashMeduimText, { marginTop: 10 }]}>
                    Enter email address you used to register with.
                    </Text>

                    <Text style={{ fontSize: 12, fontWeight: '500', marginTop: 20 }}>Email</Text>

                    <TextInput
                        placeholder='Enter Email'
                        onFocus={() => {
                            setEmailFocused(true)
                            
                        }}
                        onChangeText={(text) =>{
                            setEmail(text)
                            setError("")
                        }}
                        style={[GlobalStyles.textInput, { borderColor: emailFocused ? colors.blueColor : colors.greyText }]}

                    />
                     <Text style={GlobalStyles.errorText}>{error}</Text>


                    <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 60 / 924 * height,backgroundColor:getBtnColor() }]}
                        onPress={sendCond}
                    >
                        <Text style={GlobalStyles.btnText}>
                            Send Code
                        </Text>
                    </TouchableOpacity>

                </View>
                

            </View>
        </SafeAreaView>
    )
}
