import React from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, Dimensions, Image } from 'react-native'
import GlobalStyles from '../../../assets/styles/GlobalStyles'
import colors from '../../../assets/colors/Colors'


const { height, width } = Dimensions.get('window')

export default function SlideScreen3() {
    return (
        <SafeAreaView>
            <View style={GlobalStyles.container}>
                <View style={{ alignItems: 'center', width: width - 40 }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 40 }}>
                        <TouchableOpacity>
                            <View style={{
                                height: 46 / 924 * height, width: 46 / 924 * height, borderWidth: 1, borderColor: colors.greyText,
                                borderRadius: 6, alignItems: 'center', justifyContent: 'center'
                            }}>
                                <Image source={require("../../../assets/images/backArrow.png")}
                                    style={{ height: 28 / 924 * height, width: 28 / 924 * height, resizeMode: 'contain' }}
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                            <Text style={GlobalStyles.skipText}>
                                Skip
                            </Text>
                        </TouchableOpacity>
                    </View>


                    <Image source={require("../../../assets/images/splashImage3.png")}
                        style={{ height: 413 / 930 * height, width: width, resizeMode: 'contain', marginTop: 40 }}
                    />
                    <Text style={[GlobalStyles.splashBoldText, { marginTop: 20 }]}>Strengthen your bond</Text>
                    <Text style={[GlobalStyles.splashMeduimText, { textAlign: 'center' }]}>Experience activities and workshops curated to help you grow closer</Text>

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
