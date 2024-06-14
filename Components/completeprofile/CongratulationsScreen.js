import React from 'react'
import { TouchableOpacity, View, Image, Text, Dimensions } from 'react-native';
import GlobalStyles from '../../assets/styles/GlobalStyles';

const CongratulationsScreen = ({ navigation }) => {
    const { height, width } = Dimensions.get('window');
    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: 370 / 430 * width }}>
                <View style={{ marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                <TouchableOpacity
                        style={GlobalStyles.backBtn}
                        onPress={() => navigation.pop()}
                    >
                        <View>
                            <Image source={require('../../assets/images/backArrow.png')} style={GlobalStyles.backBtnImage} />
                        </View>
                    </TouchableOpacity>
                    <Text style={{ fontWeight: '500', fontSize: 24, marginLeft: 20 / 430 * width }}>
                        Complete your profile
                    </Text>
                </View>
                <View style={{ height: height, alignItems: 'center', justifyContent: 'center', gap: 40, paddingBottom: 40 }}>
                    <Image source={require('../../assets/congrats2.png')} style={{ height: 138 / 930 * height, width: 138 / 430 * width }} />
                    <View style={{ gap: 10 }}>
                        <Text style={{ fontWeight: '600', fontSize: 28, textAlign: 'center' }}>
                            Congrats!
                        </Text>
                        <Text style={{ fontWeight: '400', fontSize: 14, color: '#666666' }}>
                            Your profile has been successfully created.
                        </Text>
                    </View>
                    <TouchableOpacity onPress={()=>{
                        navigation.navigate('TabBarContainer')
                    }}
                        style={{
                            backgroundColor: '#6050DC', height: 54 / 930 * height, width: 370 / 430 * width,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 10,
                        }}
                        
                        >
                        <Text style={{ color: 'white', fontWeight: '500', fontSize: 18 }}>Continue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default CongratulationsScreen