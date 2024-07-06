import React from 'react';
import { View, TouchableOpacity, StatusBar, Text, Dimensions, ScrollView, SafeAreaView, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import customFonts from '../../../../assets/fonts/Fonts';
import { useState } from 'react';
import { useEffect } from 'react';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as MailComposer from "expo-mail-composer"
import colors from '../../../../assets/colors/Colors';
import Apis from '../../apis/Apis';
import { ShowMessage } from '../../../../Services/Snakbar/ShowMessage'

const FlaggedUSerDetails = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('window')
    const [OpenModal, setOpenModal] = useState(false);
    const [ignoreIndicator, setIgnoreIndicator] = useState(false);
    const [ignoreReport, setIgnoreReport] = useState(null);
    const [isAvailable, setIsAvailable] = useState(false);
    const [imageLoading, setImgLoading] = useState(false);
    const [delLoading, setDelLoading] = useState(false);
    const [susLoading, setSusLoading] = useState(false);

    useEffect(() => {
        const checkMailAvailability = async () => {
            const available = await MailComposer.isAvailableAsync();
            setIsAvailable(available);
        };

        checkMailAvailability();
    }, []);

    const sendEmail = async () => {
        const options = {
            recipients: ['hamza1958712@gmail.com'],
            subject: 'Hello from Soulmatch',
            body: 'This is a test email sent from Soulmatch!',
        };

        try {
            const result = await MailComposer.composeAsync(options);
            if (result.status === MailComposer.MailComposerStatus.SENT) {
                console.log('Email sent successfully');
            }
        } catch (error) {
            console.error('An error occurred while sending the email:', error);
        }
    }

    const routeData = route.params.DATA;
    // console.log('Data recieved form previous screen is :', routeData.userDetails);

    let data = routeData.userDetails

    const handleBack = () => {
        navigation.pop();
    }

    const handleClose = () => {
        setOpenModal(false)
    }

    //code for calling suspend user api
    const handleSuspendUser = async () => {
        const data = await AsyncStorage.getItem("USER")
        if (data) {
            setSusLoading(true);
            let d = JSON.parse(data);
            const AuthToken = d.token;
            const reportID = data.reportId;
            try {
                // setIgnoreIndicator(true);
                console.log('Delete id is :', routeData.userDetails.reportedUserId);
                const RepId = routeData.userDetails.reportedUserId;
                const response = await fetch(Apis.SuspendUser, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthToken
                    },
                    body: JSON.stringify({ userId: RepId })
                });
                if (response.ok) {
                    const Result = await response.json();
                    console.log('Response of api is :', Result);
                    ShowMessage("Reported user suspended successfully", colors.blueColor);
                    route.params.suspendedUserId(RepId);
                    setSusLoading(false);
                    navigation.pop();
                } else {
                    console.log('Response is not ok');
                }
            } catch (error) {
                console.log('Error occured is :', error);
            } finally {
                setSusLoading(false)
            }
        } else {
            console.log('No data found in local storage');
        }
    }

    //code for calling delete reported user
    const handleDeleteUser = async () => {
        const data = await AsyncStorage.getItem("USER")
        if (data) {
            setDelLoading(true);
            console.log('Delete id is :', routeData.userDetails.reportedUserId);
            const RepId = routeData.userDetails.reportedUserId;
            let d = JSON.parse(data);
            const AuthToken = d.token;
            const reportID = data.reportId;
            try {
                // setIgnoreIndicator(true);
                const response = await fetch(Apis.DeleteUser, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthToken
                    },
                    body: JSON.stringify({ userId: RepId })
                });
                if (response.ok) {
                    setDelLoading(false);
                    const Result = await response.json();
                    console.log('Response is :', Result);
                    ShowMessage("Reported user deleted successfully", colors.blueColor);
                    route.params.deletedUserId(RepId);
                    setOpenModal(false);
                    navigation.pop();
                } else {
                    console.log('Response is not ok');
                }
            } catch (error) {
                console.log('Error occured is :', error);
            } finally {
                setDelLoading(false);
            }
        } else {
            console.log('No data found in local storage');
        }
    }

    //code for calling delete reporting user
    const handleDeleteReportingUser = async () => {
        const data = await AsyncStorage.getItem("USER")
        if (data) {
            setDelLoading(true);
            console.log('Reporting user id is :', routeData.userDetails.reportingUserId);
            console.log('Reported user id is :', routeData.userDetails.reportedUserId);
            const RepId = routeData.userDetails.reportedUserId;
            const ReportingUser = routeData.userDetails.reportingUserId;
            let d = JSON.parse(data);
            const AuthToken = d.token;
            const reportID = data.reportId;
            try {
                // setIgnoreIndicator(true);
                const response = await fetch(Apis.DeleteUser, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthToken
                    },
                    body: JSON.stringify({ userId: ReportingUser })
                });
                console.log('Respnse of api is:', response);
                if (response.ok) {
                    setDelLoading(false);
                    const Result = await response.json();
                    console.log('Response is :', Result);
                    ShowMessage('User deleted successfully', colors.blueColor)
                    route.params.deletedUserId(RepId);
                    setOpenModal(false);
                    navigation.pop();
                } else {
                    console.log('Response is not ok');
                }
            } catch (error) {
                console.log('Error occured is :', error);
            } finally {
                setDelLoading(false);
            }
        } else {
            console.log('No data found in local storage');
        }
    }

    //code for calling ignore report api
    const reportID = data.reportId;
    console.log('Report id of user is:', data);
    const handleIgnoreReport = async () => {
        const data = await AsyncStorage.getItem("USER")
        if (data) {
            let d = JSON.parse(data);
            const AuthToken = d.token;
            console.log('Ignore report id is :', reportID)
            try {
                setIgnoreIndicator(true);
                console.log('Token is :', AuthToken);
                const response = await fetch(Apis.IgnoreReport, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + AuthToken
                    },
                    body: JSON.stringify({ reportid: reportID })
                });
                console.log('REsponse is :', response)
                if (response.ok) {
                    const Result = await response.json();
                    console.log('Response of api is :', Result);
                    const ignoredReport = { reportID }
                    console.log('Ignored report id is', ignoredReport)
                    ShowMessage("Report ignored", colors.blueColor);
                    route.params.ignoredUserId(ignoredReport);
                    navigation.pop();
                } else {
                    console.log('Response is not ok');
                }
            } catch (error) {
                console.log('Error occured is :', error);
            }
        } else {
            console.log('No data found in local storage');
        }
    }

    return (
        <SafeAreaView>
            <View style={{ display: 'flex', alignItems: 'center' }}>
                {/*change if the screen is irResponsive height: height s*/}
                <View style={{ width: width - 50 }}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="#FFFFFF"
                        translucent={false}
                    />
                    {/* Header code */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginTop: 10 }}>
                        <TouchableOpacity onPress={handleBack}>
                            <View style={{ height: 42 / 930 * height, width: 42 / 430 * width, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 6 }}>
                                <Image source={require('../../../../assets/Images3/CrossIcon.png')} style={{ height: 16, width: 16, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: '500', fontSize: 22, color: '#333333', fontFamily: customFonts.meduim }}>
                            {data.reportedUser.first_name} {data.reportedUser.last_name}
                        </Text>
                    </View>

                    {/* Scroll view */}
                    <ScrollView style={{ height: height * 0.85 }}
                        showsVerticalScrollIndicator={false}
                    >
                        {/* require('../../../../assets/Images3/imagePlaceholder.webp') */}
                        <View>
                            <Image
                                onLoadStart={() => setImgLoading(true)}
                                onLoadEnd={() => setImgLoading(false)}
                                source={data.reportedUser.profile_image ?
                                    { uri: data.reportedUser.profile_image } :
                                    require('../../../../assets/Images3/imagePlaceholder.webp')}
                                style={{
                                    height: 530 / 930 * height,
                                    width: 370 / 430 * width,
                                    resizeMode: 'cover',
                                    borderRadius: 10,
                                    marginTop: 10
                                }} />
                            {imageLoading ?
                                <View
                                    style={{
                                        height: 530 / 930 * height,
                                        width: 370 / 430 * width,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'absolute',
                                    }}>
                                    <ActivityIndicator size={'small'} color={colors.blueColor} />
                                </View> : ''}
                            {/* Suspend delete button */}
                            <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
                                <TouchableOpacity style={{
                                    height: 40 / 930 * height,
                                    width: 175 / 430 * width,
                                    borderWidth: 1,
                                    borderColor: '#E01F1F',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                }} onPress={() => setOpenModal(true)}>
                                    <Text style={[styles.ReactionText, { color: '#E01F1F' }]}>
                                        Suspend/Remove
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleIgnoreReport}
                                    style={{
                                        height: 40 / 930 * height,
                                        width: 175 / 430 * width,
                                        borderWidth: 1,
                                        borderColor: '#000000',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                    }}>
                                    <Text style={styles.ReactionText}>
                                        Ignore the report
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.meduim, marginTop: 20 }}>
                                Flagger
                            </Text>
                            {/* Code for flagger details */}
                            <View style={{ borderWidth: 1, borderColor: '#E6E6E6', padding: 20, borderRadius: 10, marginTop: 20 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Image source={data.reportedUser.profile_image ? { uri: data.reportingUser.profile_image } : require('../../../../assets/Images3/imagePlaceholder.webp')} style={{ height: 46, width: 46, borderRadius: 23 }} />
                                    <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.meduim, color: '#333333' }}>
                                        {data.reportingUser.first_name} {data.reportingUser.last_name}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-between', width: '100%' }}>
                                    {delLoading ?
                                        <ActivityIndicator style={{ width: 150 / 430 * width, }} size={'small'} color={colors.blueColor} /> :
                                        <View>
                                            <TouchableOpacity onPress={handleDeleteReportingUser}
                                                style={{
                                                    height: 40 / 930 * height,
                                                    width: 150 / 430 * width,
                                                    borderWidth: 1,
                                                    borderColor: '#E01F1F',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 10,
                                                }}>
                                                <Text style={[styles.ReactionText, { color: '#E01F1F', }]}>
                                                    Delete
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    <TouchableOpacity
                                        onPress={sendEmail}
                                        style={{
                                            height: 40 / 930 * height,
                                            width: 150 / 430 * width,
                                            borderWidth: 2,
                                            borderColor: '#000000',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 10,
                                        }}>
                                        <Text style={styles.ReactionText}>
                                            Contact via email
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={{ fontSize: 18, fontWeight: '600', fontFamily: customFonts.meduim, color: '#333333', marginTop: 10 }}>
                                Comment
                            </Text>

                            <Text style={{ fontWeight: '400', fontSize: 14, fontFamily: customFonts.regular, color: '#333333', marginTop: 10 }}>
                                {data.reportReason}
                            </Text>

                        </View>
                    </ScrollView>
                    <Modal
                        visible={OpenModal}
                        transparent={true}
                        animationType='fade'
                    >
                        <View
                            style={{
                                height: 70 / 930 * height,
                                borderWidth: 1,
                                // borderColor: 'red',
                                backgroundColor: '#00000097',
                                height: height,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <View style={{ width: 370 / 430 * width, backgroundColor: 'white', padding: 15, borderRadius: 10, flexDirection: 'column', gap: 10 }}>
                                <TouchableOpacity onPress={handleClose}>
                                    <View
                                        style={{
                                            height: 42 / 930 * height,
                                            width: 42 / 430 * width,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderWidth: 1,
                                            borderColor: '#E6E6E6',
                                            borderRadius: 6
                                        }}>
                                        <Image
                                            source={require('../../../../assets/Images3/CrossIcon.png')}
                                            style={{ height: 16, width: 16, resizeMode: 'contain' }}
                                        />
                                    </View>
                                </TouchableOpacity>
                                <Text style={{ textAlign: 'center', fontWeight: '600', fontFamily: customFonts.semibold, fontSize: 20 }}>
                                    What you want to do ?
                                </Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                                    {delLoading ?
                                        <ActivityIndicator style={{ width: 155 / 430 * width, }} color={colors.blueColor} size={'small'} /> :
                                        <View>
                                            <TouchableOpacity
                                                onPress={handleDeleteUser}
                                                style={{
                                                    height: 40 / 930 * height,
                                                    width: 155 / 430 * width,
                                                    borderWidth: 1,
                                                    borderColor: '#E01F1F',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 10,
                                                }}>
                                                <Text style={{ color: '#E01F1F', fontWeight: '500', fontSize: 16, fontFamily: customFonts.meduim }}>
                                                    Delete User
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                    {susLoading ?
                                        <View>
                                            <ActivityIndicator style={{ width: 155 / 430 * width, }} size={'small'} color={colors.blueColor} />
                                        </View> :
                                        <View>
                                            <TouchableOpacity onPress={handleSuspendUser}
                                                style={{
                                                    height: 40 / 930 * height,
                                                    width: 155 / 430 * width,
                                                    borderWidth: 1,
                                                    borderColor: '#000000',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    borderRadius: 10,
                                                }}>
                                                <Text style={{ color: '#000000', fontWeight: '500', fontSize: 16, fontFamily: customFonts.meduim }}>
                                                    Suspend User
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    }
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default FlaggedUSerDetails;

const styles = StyleSheet.create({
    ReactionText: {
        fontWeight: customFonts.meduim,
        fontWeight: '500',
        fontSize: 14
    }
})
