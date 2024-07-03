import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View, StatusBar, Dimensions, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import customFonts from '../../assets/fonts/Fonts';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApisPath from '../../lib/ApisPath/ApisPath';
import colors from '../../assets/colors/Colors';

const SendFeedBack = ({ navigation }) => {
    const { height, width } = Dimensions.get('window');

    const [marginBottom, setmarginBottom] = useState(0);
    const [marginTop, setmarginTop] = useState(0);
    const [Subject, setSubject] = useState('');
    const [messageBody, setMessageBody] = useState('');
    const [subjectError, setSubjectError] = useState(false);
    const [messageBodyError, setMessageBodyError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSendClick = () => {
        if (!Subject) {
            setSubjectError(true)
        } else if (!messageBody) {
            setMessageBodyError(true)
        } else {
            reportUser()
        }

    }

    const reportUser = async () => {
        const data = await AsyncStorage.getItem("USER")
        setLoading(true)
        try {
            if (data) {
                let d = JSON.parse(data)

                let body = {
                    feedback: messageBody,
                    subject: Subject
                }
                console.log('body is', body)
                const result = await fetch(ApisPath.ApiSendFeedback, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + d.token
                    },
                    body: body
                })

                if (result) {
                    setLoading(false)
                    let json = await result.json()
                    if (json.status === true) {
                        console.log('report sent',)
                        navigation.goBack()

                    } else {
                        console.log('feedback message is', json.message)
                    }
                }
            }
        } catch (e) {
            console.log('error finding in feedback', e)
        }

    }


    useEffect(() => {
        console.log("Use Effect")
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            console.log("Keyboard show")
            setmarginBottom(480);
            setmarginTop(-10);
        });

        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            console.log("Keyboard hide")
            setmarginBottom(0);
            setmarginTop(0);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, [])
    return (
       
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ alignItems: 'center', }}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="#FFFFFF"
                        translucent={false}
                    />
                    <View style={{ width: 370 / 430 * width, height: height * 0.95, justifyContent: 'space-between', display: 'flex' }}>
                        <View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginTop: 60 }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        navigation.goBack()
                                    }}
                                >
                                    <View style={{ height: 46 / 930 * height, width: 46 / 430 * width, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 6 }}>
                                        <Image source={require('../../assets/images/backArrow.png')} style={{ height: 30, width: 30,resizeMode:'contain' }} />
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ fontWeight: '500', fontSize: 24, color: '#333333', fontFamily: customFonts.medium }}>
                                    Feedback
                                </Text>
                            </View>
                            <Text style={[styles.labelText, { marginTop: marginTop ? marginTop : 45 / 930 * height }]}>
                                Subject
                            </Text>
                            <TextInput
                                value={Subject}
                                onChangeText={(e) => {
                                    setSubject(e)
                                    setSubjectError(false)
                                }}
                                style={styles.feedBackInput}
                                placeholder='Enter feedback subject'
                            />
                            <Text style={[styles.labelText, { marginTop: 30 / 930 * height }]}>
                                Body
                            </Text>
                            <TextInput
                                value={messageBody}
                                onChangeText={(e) => {
                                    setMessageBody(e)
                                    setMessageBodyError(false)
                                }}
                                multiline={true}
                                style={[styles.feedBackInput, { textAlignVertical: 'top', height: 254 / 930 * height, paddingBottom: 10 }]}
                                numberOfLines={10}
                                placeholder='Message Body'
                            />
                            <View>
                                {
                                    subjectError ?
                                        <Text style={styles.errorText}>
                                            Enter message subject
                                        </Text> : ''
                                }
                                {messageBodyError ?
                                    <Text style={styles.errorText}>
                                        Body is required
                                    </Text> : ''}
                            </View>
                        </View>
                        <View style={{ marginBottom: marginBottom, marginTop: 10, display: 'flex' }}>
                            {
                                loading ? (
                                    <ActivityIndicator size={'large'} color={colors.blueColor} />
                                ) : (
                                    <TouchableOpacity onPress={handleSendClick} style={{ height: 55 / 930 * height, backgroundColor: '#6050DC', borderRadius: 10, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 18, fontFamily: customFonts.medium }}>
                                            Send
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }

                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
    )
}

export default SendFeedBack

const styles = StyleSheet.create({
    labelText: {
        fontWeight: '500',
        fontFamily: customFonts.medium,
        fontSize: 16,
        color: '#000'
    },
    feedBackInput: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 10,
        width: '100%',
        color: '#000',
        fontWeight: '500',
        marginTop: 5
    },
    errorText: {
        marginTop: 5,
        fontWeight: '500',
        fontSize: 12,
        fontFamily: customFonts.semibold,
        color: 'red'
    }
})