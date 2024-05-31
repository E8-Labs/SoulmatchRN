import React, { useState } from 'react'
import {
    View, Text, Dimensions, TextInput, TouchableOpacity, Image, SafeAreaView, Keyboard, KeyboardAvoidingView,
    TouchableWithoutFeedback, Platform, Settings, ActivityIndicator
} from 'react-native'
import GlobalStyles from '../../assets/styles/GlobalStyles'
import colors from '../../assets/colors/Colors';
import customFonts from '../../assets/fonts/Fonts';
import ApisPath from '../../lib/ApisPath/ApisPath';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';

const { height, width } = Dimensions.get("window");

const selectedImage = require('../../assets/images/selected.png')
const unselectedImage = require('../../assets/images/unSelected.png')
const eye = require('../../assets/images/eye.png')
const eyeslash = require('../../assets/images/eye-slash.png')

export default function LoginUser(props) {

    const [selected, setSelected] = useState(false)
    const [email, setEmail] = useState("")
    const [emailFocused, setEmailFocused] = useState(false)
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [passwordFocused, setPasswordFocused] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [indicator, setIndicator] = useState(false)
    const [indicator1, setIndicator1] = useState(false)


    GoogleSignin.configure({
        iosClientId: '532960006063-0lrmd4ktecke70t7ncjr2v7vapt230h6.apps.googleusercontent.com',
        // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    });

    const getBtnColor = () => {
        if (email && password) {
            return colors.blueColor
        } else {
            return colors.lightColor
        }
    }


    const socialLogin = async (data) => {
        console.log('data is', data)
        // return

        try {
            const result = await fetch(ApisPath.ApiSocialLogin, {
                method: 'post',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })
            if (data.provider_name === 'apple') {
                // setShowIndicater2(true)
            } else if (data.provider_name === 'google') {
                setIndicator1(true)
            } else if (data.provider_name === 'facebook') {
                // setShowIndicater4(true)
            }
            if (result) {
                let json = await result.json();
                console.log(json)
                if (json.status == true) {
                    Settings.set(
                        {
                            USER:
                                JSON.stringify(json.data)
                        }
                    )
                    console.log("Stored user data in local is ", json.data)

                    if (json.message === 'Logged in') {
                        let data = json.data.user


                        if (data.profile_completion === 1) {
                            console.log('profile_completion_comment', data.profile_completion_comment)
                            props.navigation.navigate('UploadIntroVideo')
                        }
                        else if (data.profile_completion === 2) {
                            console.log('profile_completion_comment', data.profile_completion_comment)
                            props.navigation.navigate('UploadMedia', {
                                data: {
                                    from: 'Login'
                                }
                            })
                        }
                        else if (data.profile_completion === 3) {

                            //here user will add zodiac,age,height,school,job and interest

                            console.log('profile_completion_comment', data.profile_completion_comment)
                            props.navigation.navigate('AddZodiac', {
                                data: {
                                    from: 'Login',
                                    user: ''
                                }
                            })

                        } else if (data.profile_completion === 4) {

                            //here user will add zodiac,age,height,school,job and interest

                            console.log('profile_completion_comment', data.profile_completion_comment)
                            props.navigation.navigate('AddAge', {
                                data: {
                                    from: 'Login',
                                    user: ''
                                }
                            })

                        } else if (data.profile_completion === 5) {

                            //here user will add zodiac,age,height,school,job and interest

                            console.log('profile_completion_comment', data.profile_completion_comment)
                            props.navigation.navigate('AddHeight', {
                                data: {
                                    from: 'Login',
                                    user: ''
                                }
                            })

                        } else if (data.profile_completion === 6) {

                            //here user will add zodiac,age,height,school,job and interest

                            console.log('profile_completion_comment', data.profile_completion_comment)
                            props.navigation.navigate('AddGender', {
                                data: {
                                    from: 'Login',
                                    user: ''
                                }
                            })

                        } else if (data.profile_completion === 7) {

                            //here user will add zodiac,age,height,school,job and interest

                            console.log('profile_completion_comment', data.profile_completion_comment)
                            props.navigation.navigate('AddSchool', {
                                data: {
                                    from: 'Splash',
                                    user: ''
                                }
                            })

                        } else if (data.profile_completion === 8) {

                            //here user will add zodiac,age,height,school,job and interest

                            console.log('profile_completion_comment', data.profile_completion_comment)
                            props.navigation.navigate('AddJobDetails', {
                                data: {
                                    from: 'Splash',
                                    user: ''
                                }
                            })

                        } else if (data.profile_completion === 9) {

                            //here user will add zodiac,age,height,school,job and interest

                            console.log('profile_completion_comment', data.profile_completion_comment)
                            props.navigation.navigate('GetInterest', {
                                data: {
                                    from: 'Login',
                                    user: ''
                                }
                            })

                        } else if (data.profile_completion === 10) {

                            // if last condition runs then profile complition comment will 11

                            console.log('profile_completion_comment', data.profile_completion_comment)
                            props.navigation.navigate("AddLocation")
                        }

                        else if (data.profile_completion === 11) {

                            // if last condition runs then profile complition comment will 11

                            console.log('profile_completion_comment', data.profile_completion_comment)
                            props.navigation.navigate("TabBarContainer")
                        }
                    } else if (json.message === 'User registered') {
                        props.navigation.navigate("UploadIntroVideo")
                    }
                    setIndicator1(false)
                }
                else {

                    setError(json.message)
                }

            }
        } catch (error) {
            setError(error.message)
            console.log('error finding', error)
        }
    }

    const appleLogin = async () => {
        try {

            let credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                    AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                    AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
            });
            // signed in
            // let cr = {"authorizationCode": "c352b03fb0d6e4defa3f626d9d9d45fa5.0.styx.lBXUeXBx15Ohk42_CU_rKQ", "email": "spidyzno3@gmail.com", "fullName": {"familyName": "Bin khalid", "givenName": "Waleed", "middleName": null, "namePrefix": null, "nameSuffix": null, "nickname": null}, "identityToken": "eyJraWQiOiJsVkhkT3g4bHRSIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJodHRwczovL2FwcGxlaWQuYXBwbGUuY29tIiwiYXVkIjoiY29tLmU4bGFicy5wbHVyYXdsIiwiZXhwIjoxNzEwNjI5MDE0LCJpYXQiOjE3MTA1NDI2MTQsInN1YiI6IjAwMDM4Ny5lMDYyYzMxZTBlMjg0YmQwOTcxYzE1NzI5ZmNmOGU2ZS4yMjQzIiwiY19oYXNoIjoiZjBpdy1mdGpjOXBfblVPNlBqRVdxZyIsImVtYWlsIjoic3BpZHl6bm8zQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdXRoX3RpbWUiOjE3MTA1NDI2MTQsIm5vbmNlX3N1cHBvcnRlZCI6dHJ1ZSwicmVhbF91c2VyX3N0YXR1cyI6Mn0.Z41O2oWCfpIxQtnTdwgNuHdwHx1W0iS-P7qf-L4HusgEswzhGZ8G1Ss1FMNnh0FXXwkX174uj_kykhGROqMelNnbQ_HkvCU1yYhlAQ29rQNu7GyAzLUs070wU1RdrHO7napvUtHh4JncAnUyXm6zxLGaciDKVOQ8RX4GOVPogcczjKSQse6Y9CggMLHpvjrZ-pSFyyw4oLssm1GXteEhGCckhl3V_h4QIhLstr03ZUVErVoyy2gtq0pV55Xf6jc28p666Ph2K2Cgh_AeSh_cq8I4iv3CgaD_A25dOmtJrweRYDgKYJYGYAmNVhC9xVFIxedQG8L34GC-4C29p1n_qQ", "realUserStatus": 2, "state": null, "user": "000387.e062c31e0e284bd0971c15729fcf8e6e.2243"}

            if (credential.email !== null) {
                //save credentials here
                Settings.set({ applelogin: JSON.stringify(credential) })
            }
            else {
                //get credentials here
                let cr = Settings.get("applelogin")
                if (cr) {
                    credential = JSON.parse(cr)
                }
            }
            //Call the api here
            signInSocial({ name: `${credential.fullName.givenName} ${credential.fullName.familyName}`, email: credential.email, provider_name: "apple", provider_id: credential.user })

            console.log("Apple credentials ", credential)
        } catch (e) {
            console.log("Exception ", e)
            if (e.code === 'ERR_REQUEST_CANCELED') {
                // handle that the user canceled the sign-in flow
            } else {
                // handle other errors
            }
        }
    }


    // const facebookLogin = () => {
    //     try {
    //         LoginManager.logInWithPermissions(["public_profile", "email"]).then(
    //             function (result) {
    //                 if (result.isCancelled) {
    //                     console.log("Login cancelled");
    //                 } else {
    //                     console.log(
    //                         "Login success with permissions: ", result
    //                     );
    //                     const currentProfile = Profile.getCurrentProfile().then(
    //                         function (currentProfile) {
    //                             console.log("Current Profile ", currentProfile)
    //                             if (currentProfile) {
    //                                 console.log("The current logged user is: ",
    //                                     currentProfile
    //                                 );
    //                                 signInSocial({ name: currentProfile.name, email: currentProfile.email, provider_name: "facebook", provider_id: currentProfile.userID, profile_image: currentProfile.imageURL, device_id: did })

    //                             }
    //                         }
    //                     );
    //                 }
    //             },
    //             function (error) {
    //                 console.log("Login fail with error: " + error);
    //             }
    //         );
    //     }
    //     catch (error) {
    //         console.log("Error", error)
    //     }
    // }

    const GoogleLogin = async () => {
        console.log("trying to login google")
        try {
            // await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            console.log("user info from google", userInfo)

            socialLogin({ first_name: userInfo.user.name, email: userInfo.user.email, provider_name: "google", provider_id: userInfo.user.id, profile_image: userInfo.user.photo, })

            console.log("Trying to signin with google ")



            // setState({ userInfo });
        } catch (error) {
            console.log("Error ", error)

        }
    };



    const loginUser = async () => {


        if (email && password) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const validEmail = emailRegex.test(email);

            if (!validEmail) {
                setError("Enter valid email")
            } else {
                setIndicator(true)
                // call login api
                try {
                    console.log('tryig login user')

                    let body = JSON.stringify({
                        email: email, password: password
                    })

                    const result = await fetch(ApisPath.ApiLoginUser, {
                        method: 'post',
                        headers: { "Content-Type": "application/json" },
                        body: body
                    })
                    if (result) {
                        setIndicator(false)
                        let json = await result.json();
                        if (json.status === true) {
                            //check if the user role admin then navigate to admin flow
                            console.log('User logged in ', json.data)
                            Settings.set({ USER: JSON.stringify(json.data) })

                            // check profile complition
                            let data = json.data.user

                            if (data.profile_completion === 1) {
                                console.log('profile_completion_comment', data.profile_completion_comment)
                                props.navigation.navigate('UploadIntroVideo')
                            }
                            else if (data.profile_completion === 2) {
                                console.log('profile_completion_comment', data.profile_completion_comment)
                                props.navigation.navigate('UploadMedia')
                            }
                            else if (data.profile_completion === 3) {

                                //here user will add zodiac,age,height,school,job and interest

                                console.log('profile_completion_comment', data.profile_completion_comment)
                                props.navigation.navigate('AddZodiac')

                            } else if (data.profile_completion === 10) {

                                // if last condition runs then profile complition comment will 11

                                console.log('profile_completion_comment', data.profile_completion_comment)
                                props.navigation.navigate("AddLocation")
                            }

                            else if (data.profile_completion === 11) {

                                // if last condition runs then profile complition comment will 11

                                console.log('profile_completion_comment', data.profile_completion_comment)
                                props.navigation.navigate("TabBarContainer")
                            }



                            console.log('profile_completion_comment 2', data.profile_completion_comment)
                            // props.navigation.navigate('TabBarContainer')
                        } else {
                            console.log('json mesasage', json.message)
                            setError(json.message)
                        }
                    }
                } catch (error) {
                    console.log('error finding', error)
                }
            }

        } else {
            setError("Enter all cridentials")
        }
    }
    return (
        <SafeAreaView>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, flexDirection: 'column', }}>
                <TouchableWithoutFeedback style={GlobalStyles.container} onPress={Keyboard.dismiss}>
                    <View style={[{ flexDirection: 'column', height: height, marginTop: 20 / 930 * height }]}>
                        <View style={{ justifyContent: 'space-between', height: height * 0.8, }}>
                            <View style={{ alignItems: 'center', justifyContent: 'center', }}>
                                <View style={{ width: width - 40, marginTop: 0, alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 28, fontFamily: customFonts.semibold }}>
                                        Welcome back!
                                    </Text>

                                    <Text style={[GlobalStyles.LoginMeduimText, { marginTop: 5 }]}>
                                        Please enter your details to sign in.
                                    </Text>

                                    <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20, fontFamily: customFonts.meduim }}>Email</Text>

                                    <TextInput
                                        autoCapitalize='none'
                                        autoCorrect={false} spellCheck={false}
                                        placeholder='Enter Email'
                                        onFocus={() => {
                                            setEmailFocused(true)
                                            setPasswordFocused(false)
                                        }}
                                        onChangeText={(text) => {
                                            setEmail(text)
                                            setError("")
                                        }}
                                        style={[GlobalStyles.textInput, { borderColor: emailFocused ? colors.blueColor : colors.greyText }]}

                                    />

                                    <Text style={{ fontSize: 16, fontWeight: '500', marginTop: 20, fontFamily: customFonts.meduim }}>Password</Text>

                                    <View style={[GlobalStyles.textInput,
                                    { borderColor: passwordFocused ? colors.blueColor : colors.greyText, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}>
                                        <TextInput
                                            autoCapitalize='none'
                                            autoCorrect={false} spellCheck={false}
                                            placeholder='Enter Password'
                                            onFocus={() => {
                                                setPasswordFocused(true)
                                                setEmailFocused(false)
                                            }}
                                            style={{ width: 300 / 430 * width, }}
                                            secureTextEntry={!showPassword}
                                            onChangeText={(text) => {
                                                setPassword(text)
                                                setError("")
                                            }}
                                        />

                                        <TouchableOpacity onPress={() => {
                                            setShowPassword(!showPassword)
                                        }}>
                                            <Image source={showPassword ? eye : eyeslash}
                                                style={{ height: 24 / 930 * height, width: 24 / 930 * height }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={GlobalStyles.errorText}>{error}</Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>

                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setSelected(!selected)
                                                }}
                                            >
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <Image source={selected ? selectedImage : unselectedImage}
                                                        style={{ height: 20, width: 20, resizeMode: 'contain' }}
                                                    />
                                                    <Text style={[GlobalStyles.LoginMeduimText, { paddingLeft: 10 }]}>Remember me</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => props.navigation.navigate("GetEmail")}
                                        >
                                            <Text style={{ fontSize: 14, fontWeight: '500', color: colors.blueColor, fontFamily: customFonts.meduim }}>
                                                Forgot password?
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    {
                                        indicator ? (
                                            <ActivityIndicator size={"large"} style={{ marginTop: 30 / 930 * height }} color={colors.blueColor} />
                                        ) : (
                                            <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { marginTop: 30 / 924 * height, backgroundColor: getBtnColor() }]}
                                                onPress={loginUser}
                                            >
                                                <Text style={GlobalStyles.btnText}>
                                                    Sign in
                                                </Text>
                                            </TouchableOpacity>
                                        )
                                    }



                                </View>
                                <View style={{ alignItems: 'center', flexDirection: 'row', gap: 5, marginTop: 35 / 924 * height }}>
                                    <Text style={GlobalStyles.LoginMeduimText}>Don't have an account?</Text>
                                    <TouchableOpacity style={{}}
                                        onPress={() => props.navigation.navigate("UploadImage")}
                                    >
                                        <Text style={{ color: colors.blueColor, fontSize: 14, fontWeight: '500', fontFamily: customFonts.meduim }}>
                                            Sign up
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 45, marginTop: 30 / 930 * height, }}>
                                    <Image source={require('../../assets/images/Line.png')}
                                        style={{ height: 1, width: 170 / 430 * width, }}
                                    />
                                    <Text style={{ color: colors.greyLightText, fontSize: 14, fontWeight: '400', fontFamily: customFonts.meduim }}>or</Text>
                                    <Image source={require('../../assets/images/Line.png')}
                                        style={{ height: 1, width: 170 / 430 * width, }}
                                    />
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 18 / 430 * width, marginTop: 50 / 924 * height }}>
                                    {
                                        indicator1 ? (
                                            <ActivityIndicator size={'large'} />
                                        ) : (
                                            <TouchableOpacity onPress={GoogleLogin}>

                                                <View style={{ borderWidth: 1, borderRadius: 10, borderColor: colors.greyText, padding: 18 }}>
                                                    <Image source={require('../../assets/images/google.png')}
                                                        style={{ height: 25 / 930 * height, width: 25 / 924 * height, resizeMode: 'contain' }}
                                                    />

                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }

                                    <TouchableOpacity>

                                        <View style={{ borderWidth: 1, borderRadius: 10, borderColor: colors.greyText, padding: 18 }}>
                                            <Image source={require('../../assets/images/facebook.png')}
                                                style={{ height: 26 / 930 * height, width: 26 / 924 * height, }}
                                            />
                                        </View>

                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={appleLogin}>

                                        <View style={{ borderWidth: 1, borderRadius: 10, borderColor: colors.greyText, padding: 18 }}>
                                            <Image source={require('../../assets/images/apple.png')}
                                                style={{ height: 28 / 930 * height, width: 25 / 924 * height, resizeMode: 'contain' }}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ alignItems: 'center', width: width }}>
                            <View style={{ flexDirection: 'row', width: width - 45, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={[{ fontSize: 12, }]}>By signing up you agree to our </Text>
                                <TouchableOpacity>
                                    <Text style={[GlobalStyles.LoginMeduimText, { fontSize: 12, color: '#000', fontWeight: '500', fontFamily: customFonts.meduim }]}>
                                        Terms
                                    </Text>
                                </TouchableOpacity>
                                <Text style={[GlobalStyles.LoginMeduimText, { fontSize: 12 }]}> and </Text>
                                <TouchableOpacity>
                                    <Text style={[GlobalStyles.LoginMeduimText, { fontSize: 12, color: '#000', fontWeight: '500', fontFamily: customFonts.meduim }]}>
                                        Conditions
                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <TouchableOpacity>
                                <Text style={[GlobalStyles.LoginMeduimText, { fontSize: 12, color: '#000', fontWeight: '500', fontFamily: customFonts.meduim }]}>
                                    and Privacy Policy
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
