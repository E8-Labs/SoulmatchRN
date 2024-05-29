import { View, Text, TouchableOpacity, Dimensions, StyleSheet ,ScrollView} from 'react-native'
import React from 'react'
import { Image } from 'expo-image';
import GlobalStyles from '../../assets/styles/GlobalStyles';
import colors from '../../assets/colors/Colors';

const { height, width } = Dimensions.get('window')

export default function MyAccount({navigation}) {
    return (

        <View style={{ height: height, width: width, alignItems: 'center' }}>
            <View style={{ width: width - 60, marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <View style={GlobalStyles.backBtn}>
                        <Image source={require('../../assets/images/backArrow.png')}
                            style={GlobalStyles.backBtnImage}
                        />
                    </View>
                </TouchableOpacity>
                <Text style={{ fontWeight: '500', fontSize: 24, marginLeft: 20 / 430 * width }}>
                    My account
                </Text>
            </View>

            <View style={{ alignItems: 'center', height: height * 0.82, marginTop: 20 / 930 * height, }}>

                <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                    <View style={{ flexDirection: 'column', gap: 15, alignItems: 'center',marginTop:30 }}>
                        <TouchableOpacity
                            onPress={() => {
                                // props.navigation.navigate('MyAccount')
                            }}
                        >
                            <View style={styles.mainView}>
                                
                                    <Text style={styles.text}>
                                        Account details
                                    </Text>
                                
                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                // props.navigation.navigate('MyAccount')
                            }}
                        >
                            <View style={styles.mainView}>
                                
                                    <Text style={styles.text}>
                                       Change password
                                    </Text>
                                
                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                // props.navigation.navigate('MyAccount')
                            }}
                        >
                            <View style={styles.mainView}>
                                
                                    <Text style={styles.text}>
                                        Intro Video
                                    </Text>
                                
                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                // props.navigation.navigate('MyAccount')
                            }}
                        >
                            <View style={styles.mainView}>
                                
                                    <Text style={styles.text}>
                                        Media
                                    </Text>
                                
                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                // props.navigation.navigate('MyAccount')
                            }}
                        >
                            <View style={styles.mainView}>
                                
                                    <Text style={styles.text}>
                                        Zodiac
                                    </Text>
                                
                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                // props.navigation.navigate('MyAccount')
                            }}
                        >
                            <View style={styles.mainView}>
                                
                                    <Text style={styles.text}>
                                       Age
                                    </Text>
                                
                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                // props.navigation.navigate('MyAccount')
                            }}
                        >
                            <View style={styles.mainView}>
                                
                                    <Text style={styles.text}>
                                        Height
                                    </Text>
                                
                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                // props.navigation.navigate('MyAccount')
                            }}
                        >
                            <View style={styles.mainView}>
                                
                                    <Text style={styles.text}>
                                        Gender
                                    </Text>
                                
                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                // props.navigation.navigate('MyAccount')
                            }}
                        >
                            <View style={styles.mainView}>
                                
                                    <Text style={styles.text}>
                                        School
                                    </Text>
                                
                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => {
                                // props.navigation.navigate('MyAccount')
                            }}
                        >
                            <View style={styles.mainView}>
                                
                                    <Text style={styles.text}>
                                       Work
                                    </Text>
                                
                                <Image source={require('../../assets/images/farwordArrowIcon.png')}
                                    style={styles.arrowIcon}
                                />

                            </View>
                        </TouchableOpacity>



                    </View>
                </ScrollView>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    mainView: {
        width: width - 60,
        paddingVertical: 15 / 930 * height,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: colors.greyText,
        borderRadius: 10,
        paddingHorizontal: 17 / 430 * width,
        flexDirection: 'row'
    },
    imageStyle: {
        height: 24 / 930 * height,
        width: 24 / 430 * width
    },
    arrowIcon: {
        height: 28 / 930 * height,
        width: 28 / 430 * width
    },
    text: {
        fontSize: 16
    }
})