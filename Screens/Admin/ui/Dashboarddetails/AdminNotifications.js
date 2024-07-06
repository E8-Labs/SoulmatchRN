import React from "react";
import { SafeAreaView, Text, TouchableOpacity, View, Dimensions } from "react-native";
import customFonts from "../../../../assets/fonts/Fonts";
import { Image } from "expo-image";

const AdminNotifications = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')
    const handleBack = () => {
        navigation.pop();
    }
    return (
        <SafeAreaView>
            <View style={{ display: 'flex', alignItems: 'center', height: height }}>
                {/*change if the screen is irResponsive height: height s*/}
                <View style={{ width: width - 50 }}>
                    <View style={{ flexDirection: 'row', gap: 20, marginTop: 20, alignItems: 'center' }}>
                        <TouchableOpacity onPress={handleBack} style={{ height: 47 / 930 * height, width: 47 / 430 * width }}>
                            <View style={{ height: 47 / 930 * height, width: 47 / 430 * width, borderWidth: 1, borderRadius: 6, alignItems: 'center', justifyContent: 'center' }}>
                                <Image source={require('../../../../assets/Images3/backIcon.png')} style={{ height: 18, width: 9, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: '500', fontSize: 24, fontFamily: customFonts.meduim }}>
                            Notifications
                        </Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default AdminNotifications;