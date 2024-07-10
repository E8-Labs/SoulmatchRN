import React, { useState } from 'react';
import { View, Button, Dimensions, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import customFonts from '../assets/fonts/Fonts';
import GlobalStyles from '../assets/styles/GlobalStyles';
import ApisPath from '../lib/ApisPath/ApisPath';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window')

const RatingPopup = ({ close, place }) => {

    const [rating,setRating] = useState(0)
    const [review,setReview] = useState(null)
    const [loading, setLoading] = useState(false)

    const ratingCompleted = (rating) => {
        console.log("Rating is: " + rating)
        setRating(rating)
    }


    const RateBusiness = async ()=>{
        let url = ApisPath.ApiReviewDatePlace
        let data = {placeId: place.id, rating: rating, review: review}
        setLoading(true)
        const userData = await AsyncStorage.getItem("USER")
        let user = JSON.parse(userData)

        const result = await fetch(url, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + user.token
            },
            body: JSON.stringify(data)
        })
        if (result) {
            let json = await result.json()
            setLoading(false)
            console.log(json)
            if (json.status === true) {
                console.log('Business rated', json.data)
                close(true)
            } else {
                console.log('Error rating business ', json.message)
            }
        }
    }



    return (
        <View style={{ height: height, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000050' }}>
            <View style={{
                height: height * 0.47, width: width - 60, alignItems: 'center',
                backgroundColor: 'white', borderRadius: 20, gap: 10
            }} >
                <TouchableOpacity style={{ alignSelf: 'flex-end', marginRight: 20, paddingTop: 20 }}
                    onPress={() => {
                        close()
                    }}
                >
                    <Image source={require('../assets/images/close.png')}
                        style={{ height: 30, width: 30, }}
                    />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20, fontFamily: customFonts.meduim
                }}>Review this business
                </Text>
                <TextInput
                    placeholder='Enter review'
                    style={[GlobalStyles.textInput, { width: width - 100, height: 150 / 930 * height }]}
                    multiline
                    onChangeText={(text)=>{
                        setReview(text)
                    }}
                // maxLength={200}
                />
                {/* <View style={{ height: 80 / 930 * height }} > */}

                    <Rating
                        type='star'
                        style = {{marginTop:15/930*height,marginBottom:15/930*height}}
                        ratingCount={5}
                        imageSize={30}
                        startingValue={1}
                        fractions={1}
                        showRating = {false}
                        onFinishRating={ratingCompleted}

                    />
                {/* </View> */}

                <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { width: width - 100 }]}
                    onPress={RateBusiness}
                >
                    <Text style={GlobalStyles.btnText}>Rate</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default RatingPopup;