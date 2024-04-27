import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity ,Dimensions,Image} from 'react-native'
import GlobalStyles from '../../../assets/styles/GlobalStyles'
import colors from '../../../assets/colors/Colors'


const {height,width} = Dimensions.get('window')

export default function SlideScreen1() {
    return (
        <SafeAreaView>
            <View style={GlobalStyles.container}>
                <View style = {{alignItems:'center',width:width-40}}>
                    <TouchableOpacity style = {{alignSelf:'flex-end'}}>
                        <Text style = {GlobalStyles.skipText}>
                            Skip
                        </Text>
                    </TouchableOpacity>

                    <Image source={require("../../../assets/images/splashImage1.png")} 
                        style = {{height:413/930*height,width:width,resizeMode:'contain',marginTop:40}}
                    />
                    <Text style = {[GlobalStyles.splashBoldText,{marginTop:20}]}>Welcome to SoulMatch!</Text>
                    <Text style = {[GlobalStyles.splashMeduimText,{textAlign:'center'}]}>Where meaningful connections begin and thrive.</Text>

                    <TouchableOpacity style = {[GlobalStyles.reqtengularBtn,{borderRadius:10,marginTop:40}]}>
                        <Text style = {GlobalStyles.btnText}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
