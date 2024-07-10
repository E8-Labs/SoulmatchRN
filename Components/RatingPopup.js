import React, { useState } from 'react';
import { View, Button, Dimensions, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import SwipeableRating from 'react-native-swipeable-rating'
import customFonts from '../assets/fonts/Fonts';
import GlobalStyles from '../assets/styles/GlobalStyles';

const { height, width } = Dimensions.get('window')

const RatingPopup = ({close}) => {

    const [rating, setRating] = useState(0);

    const handleRating = (newRating) => {
        setRating(newRating);
    };



    return (
        <View style={{ height: height, justifyContent: 'center', alignItems: 'center', backgroundColor: '#00000050' }}>
            <View style={{ height: height * 0.47, width: width - 60, alignItems: 'center',
                backgroundColor: 'white',borderRadius:20,gap:10 }} >
                <TouchableOpacity style = {{alignSelf:'flex-end',marginRight:20,paddingTop:20}}
                    onPress={()=>{
                        close()
                    }}
                >
                    <Image source={require('../assets/images/close.png')} 
                        style = {{height:30,width:30,}}
                    />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20, fontFamily: customFonts.meduim
                }}>Review this business
                </Text>
                <TextInput
                    placeholder='Enter review'
                    style = {[GlobalStyles.textInput,{width:width-100,height:150/930*height}]}
                    multiline
                    // maxLength={200}
                />
                <View style={{ height: 80/930*height }} >
                    <SwipeableRating
                        rating={rating}
                        size={35}
                        color='#E9C600'
                        emptyColor='#E9C600'
                        minRating={1}
                        maxRating={5}
                        gap={4}
                        onPress={handleRating}
                        xOffset={0}
                        // style={{ backgroundColor: 'red', height: 20 }}
                    />
                </View>

                <TouchableOpacity style = {[GlobalStyles.reqtengularBtn,{width:width-100}]}
                    onPress={close}
                >
                    <Text style = {GlobalStyles.btnText}>Rate</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
};

export default RatingPopup;