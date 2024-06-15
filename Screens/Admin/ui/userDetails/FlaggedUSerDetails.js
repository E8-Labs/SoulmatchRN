import React from 'react';
import { View, Image, TouchableOpacity, StatusBar, Text, Dimensions, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import customFonts from '../../../../assets/fonts/Fonts';

const FlaggedUSerDetails = ({ navigation }) => {
    const { height, width } = Dimensions.get('window')
    const handleBack = () => {
        navigation.pop();
    }
    return (
        <SafeAreaView>
            <View style={{ display: 'flex', alignItems: 'center' }}>
                {/*change if the screen is irResponsive height: height s*/}
                <View style={{ width: width - 50 }}>
                    <StatusBar
                        barStyle="dark-content"
                        backgroundColor="#FFFFFF"
                        translucent={false}
                    />
                    {/* Header code */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, marginTop: 10 }}>
                        <TouchableOpacity onPress={handleBack}>
                            <View style={{ height: 42 / 930 * height, width: 42 / 430 * width, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 6 }}>
                                <Image source={require('../../../../assets/Images3/CrossIcon.png')} style={{ height: 16, width: 16, resizeMode: 'contain' }} />
                            </View>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: '500', fontSize: 22, color: '#333333', fontFamily: customFonts.medium }}>
                            Charles
                        </Text>
                    </View>

                    {/* Scroll view */}
                    <ScrollView style={{ height: height * 0.88 }}
                        showsVerticalScrollIndicator={false}
                    >

                        <View>
                            <Image source={require('../../../../assets/Images3/imagePlaceholder.webp')} style={{ height: 530 / 930 * height, width: 370 / 430 * width, resizeMode: 'cover', borderRadius: 10, marginTop: 10 }} />
                            {/* Suspend delete button */}
                            <View style={{ flexDirection: 'row', marginTop: 15, justifyContent: 'space-between' }}>
                                <TouchableOpacity style={{
                                    height: 40 / 930 * height,
                                    width: 175 / 430 * width,
                                    borderWidth: 1,
                                    borderColor: '#E01F1F',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 10,
                                }}>
                                    <Text style={[styles.ReactionText, { color: '#E01F1F' }]}>
                                        Suspend/Remove
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    // onPress={handleModalclick}
                                    style={{
                                        height: 40 / 930 * height,
                                        width: 175 / 430 * width,
                                        borderWidth: 1,
                                        borderColor: '#000000',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                    }}>
                                    <Text style={styles.ReactionText}>
                                        Ignore the report
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.medium, marginTop: 20 }}>
                                Flagger
                            </Text>
                            {/* Code for flagger details */}
                            <View style={{ borderWidth: 1, borderColor: '#E6E6E6', padding: 20, borderRadius: 10, marginTop: 20 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                                    <Image source={require('../../../../assets/Images3/olivia.png')} style={{ height: 46, width: 46, borderRadius: 23 }} />
                                    <Text style={{ fontWeight: '500', fontSize: 16, fontFamily: customFonts.medium, color: '#333333' }}>
                                        Amelia Davis
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginTop: 25, justifyContent: 'space-between', width: '100%' }}>
                                    <TouchableOpacity style={{
                                        height: 40 / 930 * height,
                                        width: 150 / 430 * width,
                                        borderWidth: 1,
                                        borderColor: '#E01F1F',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 10,
                                    }}>
                                        <Text style={[styles.ReactionText, { color: '#E01F1F', }]}>
                                            Delete
                                        </Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        // onPress={handleModalclick}
                                        style={{
                                            height: 40 / 930 * height,
                                            width: 150 / 430 * width,
                                            borderWidth: 2,
                                            borderColor: '#000000',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 10,
                                        }}>
                                        <Text style={styles.ReactionText}>
                                            Contact via email
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Text style={{ fontSize: 16, fontWeight: '500', fontFamily: customFonts.medium, color: '#333333', marginTop: 10 }}>
                                Comment
                            </Text>

                            <Text style={{ fontWeight: '400', fontSize: 14, fontFamily: customFonts.regular, color: '#333333' }}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </Text>

                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default FlaggedUSerDetails;

const styles = StyleSheet.create({
    ReactionText: {
        fontWeight: customFonts.medium,
        fontWeight: '500',
        fontSize: 14
    }
})
