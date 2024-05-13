import { View, Text, SafeAreaView, Modal, Dimensions, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import customFonts from '../assets/fonts/Fonts';
import GlobalStyles from '../assets/styles/GlobalStyles';

const { height, width } = Dimensions.get('window');
const profile = require('../assets/images/card1.png');

export default function InviteDatePopup({visible,close}) {
    
    return (

        <Modal
            visible={visible}
            transparent={true}
            animationType='slide'
        >
            <View style={{ backgroundColor: '#00000050', height: height, width: width, alignItems: 'center', justifyContent: 'flex-end' }}>
                <View style={{ alignItems: 'center', height: height * 0.7, backgroundColor: 'white', width: width, borderRadius: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: width - 50, paddingTop: 20 }}>
                        <Text style={{ fontFamily: customFonts.meduim, fontSize: 20 }}>Invite your date</Text>
                        <TouchableOpacity 
                            onPress={close}
                        >
                            <Image source={require('../assets/images/close.png')}
                                style={{ height: 40 / 930 * height, width: 40 / 930 * height }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style = {[GlobalStyles.divider,{width:width}]}></View>

                    <Image source={profile} 
                        style = {{
                            height:370/930*height,width:370/430*width,resizeMode:'contain',borderRadius:10,
                            backgroundColor:'red',marginTop:35/930*height
                        }}
                    />
                    <Text style = {{
                        fontSize:24,fontFamily:customFonts.meduim,position:'relative',bottom:45,left:20,color:'white',
                        width:width-50
                    }}>Sarah Doe</Text>

                    <TouchableOpacity style = {GlobalStyles.reqtengularBtn} 
                        onPress={()=>{
                           
                            close(profile)
                        }}
                    >
                        <Text style = {GlobalStyles.btnText}>
                            Invite
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>
        </Modal>

    )
}