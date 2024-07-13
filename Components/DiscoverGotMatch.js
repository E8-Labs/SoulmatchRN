import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react';
import GlobalStyles from '../assets/styles/GlobalStyles';
import customFonts from '../assets/fonts/Fonts';
import { Image } from 'expo-image';

const { height, width } = Dimensions.get('window')

export default function DiscoverGotMatch({viewMatches}) {
    return (
        <View style={[GlobalStyles.container,{height:height*0.78,}]}>
            <Image source={require('../assets/images/matchLogo.png')}
                style={{ height: 160 / 930 * height, width: 160 / 430 * width }}
            />
            <View style={{ width: width * 0.55, alignItems: 'center', marginTop: 50 }}>
                <Text style={{ fontSize: 28, fontFamily: customFonts.semibold, textAlign: 'center' }}>
                    It looks like you have a match
                </Text>
            </View>
            <Text style={{
                fontSize: 16, fontFamily: customFonts.regular, width: width - 60, textAlign: 'center', marginTop: 10
            }}>
                You’re not able to discover other users if you already have a match.
            </Text>
            <TouchableOpacity style = {[GlobalStyles.reqtengularBtn,{marginTop:40}]}
                onPress={()=>{
                    viewMatches("ViewMyMatchesScreen")
                }}
            >
                <Text style = {GlobalStyles.btnText}>
                    View my match
                </Text>
            </TouchableOpacity>
        </View>
    )
}