import React, { useState } from 'react'
import { Dimensions, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const UploadImage = ({ navigation }) => {
    const { height, width } = Dimensions.get('window');

    //code for uploading image

    const [image, setImage] = useState(null);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
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

    const handleNextClick = () => {
        if (image !== null) {
            navigation.navigate('AddName', {
                Image1: {
                    FirstImage: image
                }
            });
        } else {
            console.log('Image not selected')
        }
    }

    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: 370 / 430 * width }}>
                <Text style={{ marginTop: 60 / 930 * height, fontWeight: '500', fontSize: 24 }}>
                    Create Profile
                </Text>
                {/* Code for progressbar */}
                <View style={{ flexDirection: 'row', marginTop: 40 / 930 * height, justifyContent: 'space-between', display: 'flex', alignItems: 'center' }}>
                    <Image source={require('../../assets/User.png')} style={{ height: 56, width: 56, resizeMode: 'contain' }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#6050DC', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                    <View style={{ height: 4 / 930 * height, width: 68 / 430 * width, backgroundColor: '#cccccc', borderRadius: 10 }} />
                </View>
                <Text style={{ marginTop: 30 / 930 * height, fontWeight: 500, fontSize: 20 }}>
                    Please upload your profile picture.
                </Text>
                {/* Add Image */}
                <View style={{ display: 'flex', height: height * 0.68, flexDirection: 'column', justifyContent: 'space-between' }}>
                    <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {image ? <Image source={{ uri: image }} style={{ width: 200 / 430 * width, height: 200 / 930 * height, resizeMode: 'cover', marginTop: 50 / 930 * height, borderRadius: 100 }} /> :
                            <TouchableOpacity onPress={pickImage}>
                                <Image source={require('../../assets/uploadimage.png')} style={{ resizeMode: 'contain', marginTop: 50 / 930 * height }} />
                            </TouchableOpacity>}

                    </View>
                    <View style={{ display: 'flex', }}>
                        <TouchableOpacity onPress={handleNextClick}>
                            <View style={{ backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }}>
                                <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>
                                    Next
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default UploadImage
