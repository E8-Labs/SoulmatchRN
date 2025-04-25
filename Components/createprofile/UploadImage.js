import React, { useState } from 'react'
import { ActivityIndicator, Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import { Image } from 'expo-image';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApisPath from '../../lib/ApisPath/ApisPath';
import colors from '../../assets/colors/Colors';


const UploadImage = ({ navigation, route }) => {
    const { height, width } = Dimensions.get('window');

    const data = route.params.data

    //code for uploading image

    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);
    const [showIndicator, setShowIndicator] = useState(false);
    const pickImage = async () => {
        setError(null)
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.5,
        });

        if (!result.canceled) {
            const ImageUrl = result.assets[0].uri;
            console.log('Image url recieved is', ImageUrl)
            setImage(ImageUrl)
            console.log(result.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    }

    //code to pass data

    const sendImage = async (imageUrl) => {
        setShowIndicator(true)
        const formdata = new FormData();

        formdata.append("image", {
            name: "image.png",
            type: 'image/png',
            uri: imageUrl
        });

        // Log form data entr
        console.log('formdata is', formdata);

        // return


        try {
            const data = await AsyncStorage.getItem("USER")

            if (data) {
                let d = JSON.parse(data)
                // console.log('user data is', d)
                const result = await fetch(ApisPath.ApiUpdateProfile, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + d.token
                    },
                    body: formdata
                })

                if (result) {
                    console.log('api result is', result)

                    setShowIndicator(false)
                    let json = await result.json();
                    if (json.status === true) {

                        console.log('user profile', json.data)
                        d.user = json.data
                        AsyncStorage.setItem("USER", JSON.stringify(d))

                        navigation.navigate("UploadIntroVideo")


                        // navigation.goBack()
                    }
                    else {
                        console.log('json message', json.message)
                    }
                }
            }
        } catch (error) {
            setShowIndicator(false)
            console.log('error finding in updating profile', error)
        }
    }

    const handleNextClick = () => {
        if (data.from === "SocialLogin") {
        sendImage(image)
        return
        }
        if (image !== null) {
            navigation.navigate('AddName', {
                Image1: {
                    FirstImage: image
                }
            });
        } else {
            setError("Image not selected")
            console.log('Image not selected')
        }
    }

    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: 370 / 430 * width }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 70 / 930 * height, gap: 20 }}>
                    <TouchableOpacity onPress={() => {
                        navigation.goBack()
                    }}>
                        <View style={GlobalStyles.backBtn}>
                            <Image source={require('../../assets/images/backArrow.png')}
                                style={GlobalStyles.backBtnImage}
                            />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '500', fontSize: 24 }}>
                        Create Profile
                    </Text>
                </View>

                {/* Code for progressbar */}
                <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Image source={require('../../assets/usersvg.svg')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                </View>
                <Text style={{ marginTop: 30 / 930 * height, fontWeight: 500, fontSize: 20 }}>
                    Please upload your profile picture.
                </Text>
                {/* Add Image */}
                <View style={{ display: 'flex', height: height * 0.66, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                        {image ?
                            <Image source={{ uri: image }} style={{ width: 200 / 930 * height, height: 200 / 930 * height, resizeMode: 'cover', marginTop: 50 / 930 * height, borderRadius: 200 }} /> :
                            <TouchableOpacity style={{ backgroundColor: 'transparent' }} onPress={pickImage}  >
                                <Image source={require('../../assets/uploadimagesvg.svg')} style={{ height: 146, width: 146, resizeMode: 'contain', marginTop: 50 / 930 * height }} />
                            </TouchableOpacity>
                        }

                        {
                            error &&
                            <Text style={[GlobalStyles.errorText, { textAlign: 'center', marginTop: 20 }]}>{error}</Text>
                        }
                    </View>
                    <View style={{ display: 'flex', }}>
                        {
                            showIndicator ? (
                                <ActivityIndicator size={'large'} color={colors.blueColor} />
                            ) : (
                                <TouchableOpacity onPress={handleNextClick}>
                                    <View style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                            Next
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }

                    </View>
                </View>
            </View>
        </View>
    )
}

export default UploadImage
