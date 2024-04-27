import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native'
import GlobalStyles from '../../../assets/styles/GlobalStyles'
import colors from '../../../assets/colors/Colors'


const { height, width } = Dimensions.get('window')

export default function SlideScreen2() {
    return (
        <SafeAreaView>
            <View style={GlobalStyles.container}>
                <View style={{ alignItems: 'center', width: width - 40 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 40 }}>
                        <TouchableOpacity>
                            <View style={GlobalStyles.backBtn}>
                                <Image source={require("../../../assets/images/backArrow.png")}
                                    style={GlobalStyles.backBtnImage}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                            <Text style={GlobalStyles.skipText}>
                                Skip
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <Image source={require("../../../assets/images/splashImage2.png")}
                        style={{ height: 413 / 930 * height, width: width, resizeMode: 'contain', marginTop: 40 }}
                    />
                    <Text style={[GlobalStyles.splashBoldText, { marginTop: 20 }]}>Local date ideas</Text>
                    <Text style={[GlobalStyles.splashMeduimText, { textAlign: 'center' }]}>Unique local businesses for your dates, supporting your community while nurturing your relationship</Text>

                    <TouchableOpacity style={[GlobalStyles.reqtengularBtn, { borderRadius: 10, marginTop: 40 }]}>
                        <Text style={GlobalStyles.btnText}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}
