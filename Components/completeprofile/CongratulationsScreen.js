import React, { useRef } from 'react';
import { TouchableOpacity, View, Text, Dimensions, Animated, StyleSheet } from 'react-native';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import customFonts from '../../assets/fonts/Fonts';
import { Image } from 'expo-image';
import colors from '../../assets/colors/Colors';

const { height, width } = Dimensions.get('window');

const CongratulationsScreen = ({ navigation }) => {

    const scaleValue1 = useRef(new Animated.Value(0.7)).current
    const scaleValue2 = useRef(new Animated.Value(1)).current
    const scaleValue3 = useRef(new Animated.Value(1)).current
    const scaleValue4 = useRef(new Animated.Value(1)).current

    Animated.loop(
        Animated.sequence([
            // Animated.parallel([
            Animated.timing(scaleValue1, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            }),
            Animated.parallel([
                Animated.timing(scaleValue2, {
                    toValue: 0.7,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(scaleValue1, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(scaleValue3, {
                    toValue: 0.7,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(scaleValue2, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(scaleValue3, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(scaleValue4, {
                    toValue: 0.7,
                    duration: 300,
                    useNativeDriver: true
                }),
            ]),
            Animated.parallel([
                Animated.timing(scaleValue1, {
                    toValue: 0.7,
                    duration: 300,
                    useNativeDriver: true
                }),
                Animated.timing(scaleValue4, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true
                }),
            ])
            // ])
        ])
    ).start()

    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: width }}>

                <View style={{ height: height, alignItems: 'center', justifyContent: 'center', gap: 40, paddingBottom: 40 }}>
                    <Animated.View style={[
                        { transform: [{ scale: scaleValue1 }] }, styles.image1,
                    ]} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 50/430*width }}>
                        <Animated.View style={[
                            { transform: [{ scale: scaleValue4 }] }, styles.image2
                        ]} />
                        <Animated.View style={[
                            { transform: [{ scale: scaleValue2 }] }, styles.image2
                        ]} />
                    </View>

                    <Animated.View style={[
                        { transform: [{ scale: scaleValue3 }] }, styles.image4
                    ]} />


                    <View style={{ gap: 15 }}>
                        <Text style={{ fontWeight: '600', fontSize: 28, textAlign: 'center', fontFamily: customFonts.meduim }}>
                            Congrats!
                        </Text>
                        <Text style={{ fontWeight: '400', fontSize: 16, color: '#666666', fontFamily: customFonts.regular }}>
                            Your profile has been successfully created.
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        // navigation.replace('TabBarContainer')
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'TabBarContainer' }],
                        });
                    }}
                        style={{
                            backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10,
                        }}

                    >
                        <Text style={{ color: 'white', fontSize: 18, fontFamily: customFonts.meduim }}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    image1: {
        height: 40,
        width: 40,
        backgroundColor: colors.blueColor,
        borderRadius: 50,
        marginBottom:-30/930*height
    },image2: {
        height: 40,
        width: 40,
        backgroundColor: colors.blueColor,
        opacity:0.5,
        borderRadius: 50
    },
    image4: {
        height: 40,
        width: 40,
        backgroundColor: colors.blueColor,
        borderRadius: 50,
        marginTop:-30/930*height
    },
})

export default CongratulationsScreen