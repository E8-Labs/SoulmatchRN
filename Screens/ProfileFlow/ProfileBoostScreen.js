import React, { useState, useEffect } from 'react'
import { Dimensions, View, TouchableOpacity, Text, Image, Modal, Platform } from 'react-native'
import GlobalStyles from '../../assets/styles/GlobalStyles';
import customFonts from '../../assets/fonts/Fonts';
import { ApiKeys } from '../../keys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Purchases from 'react-native-purchases';
import { UpdateProfile } from '../../Services/ProfileServices/UpdateProfile'

import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import colors from '../../assets/colors/Colors';


const { height, width } = Dimensions.get('window');
const RevenueCatApiKey = ApiKeys.RevenueCatApiKey;

export default function ProfileBoostScreen({ navigation }) {

    // const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState([]);


    const products = [
        {
            id: 1,
            title: 'Boost profile 1x',
            identifier: 'BoostSoulmatch1',
            tag: '',
            description: 'Boost profile for 30 minutes',
            priceString: '10.99$'
        },
        {
            id: 2,
            identifier: 'BoostSoulmatch5',
            title: 'Boost profile 5x',
            tag: '',
            description: 'Boost profile for 2 hours and 30 minutes',
            priceString: '29.95$'
        },
        {
            id: 3,
            identifier: 'BoostSoulmatch10',
            title: 'Boost profile 10x',
            tag: 'Best value',
            description: 'Boost profile for 5 hours',
            priceString: '19.9$'
        },
    ]

    useEffect(() => {
        // initializePurchases();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true)
            console.log("Loading products...");
            const offerings = await Purchases.getOfferings();
            // console.log("Offerings:", offerings);
            setLoading(false)

            if (offerings.current && offerings.current.availablePackages.length > 0) {
                const availableProducts = offerings.current.availablePackages.map(pkg => pkg.product);
                console.log("Available products:", availableProducts);
                setProducts(availableProducts);
            } else {
                console.log("No available products found");
            }
        } catch (e) {
            console.log("Error getting offerings:", e);
        }
    };

    const initializePurchases = async () => {
        Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG);

        try {
            if (Platform.OS === 'ios') {
                const data = await AsyncStorage.getItem("USER");
                let user = null;
                if (data) {
                    let d = JSON.parse(data);
                    user = d.user;
                    await Purchases.configure({ apiKey: RevenueCatApiKey, appUserID: `${user.id}` });
                    console.log("Initialized user with id:", user.id);

                    try {
                        const customerInfo = await Purchases.getCustomerInfo();
                        // console.log("Customer ", customerInfo.entitlements.active["premium"])
                        if (typeof customerInfo.entitlements.active["premium"] != "undefined") {
                            console.log("User subscribed to plan ", customerInfo.entitlements.active["premium"]);
                        }
                        // access latest customerInfo
                    } catch (e) {
                        // Error fetching customer info
                    }
                    fetchProducts();
                }
            } else if (Platform.OS === 'android') {
                await Purchases.configure({ apiKey: RevenueCatApiKey });
                fetchProducts();
            }
        } catch (error) {
            console.error('Failed to initialize purchases:', error);
        }
    };

    const buyProduct = async (product) => {

        try {
            console.log("Subscribing to", product.identifier);
            const { customerInfo } = await Purchases.purchaseProduct(product.identifier);
            if (customerInfo.entitlements.active["premium"]) {
                console.log("User subscribed to premium");
                let p = customerInfo.entitlements.active["premium"]
                let date = p.originalPurchaseDateMillis;
                console.log("Original date ", date);
                await UpdateProfile(JSON.stringify({ originalPurchaseDate: date }))
                console.log("Profile updated")
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'TabBarContainer' }],
                });

            }
        } catch (e) {
            console.log("Exception during purchase:", e);
            if (!e.userCancelled) {
                // Handle other errors
            }
        }

    }


    return (
        <View style={{ display: 'flex', alignItems: 'center' }}>
            <View style={{ width: 370 / 430 * width }}>
                <View style={{ marginTop: 60 / 930 * height, flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
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
                        Boost profile
                    </Text>

                </View>

                {/* {products.map((product) => ( */}

                {/* {
                    loading ? (
                        <ContentLoader
                            height={height}
                            width={width}
                            speed={1}
                            backgroundColor={'#D5D0F6'}
                            foregroundColor={'#ececec'}
                        // viewBox="0 0 380 70"
                        >
                            <Rect x={30} y={50} ry={5} rx={5} height={10} width={250} />
                            <Rect x={30} y={70} ry={5} rx={5} height={10} width={300} />
                            <Rect x={30} y={90} ry={5} rx={5} height={10} width={50} />

                            <Rect x={30} y={140} ry={5} rx={5} height={10} width={250} />
                            <Rect x={30} y={160} ry={5} rx={5} height={10} width={300} />
                            <Rect x={30} y={180} ry={5} rx={5} height={10} width={50} />

                            <Rect x={30} y={230} ry={5} rx={5} height={10} width={250} />
                            <Rect x={30} y={250} ry={5} rx={5} height={10} width={300} />
                            <Rect x={30} y={270} ry={5} rx={5} height={10} width={50} />




                        </ContentLoader>
                    ) : ( */}
                {products.map((product) => (

                    <TouchableOpacity key={product.identifier}
                        onPress={() => buyProduct(product)}
                    >
                        <View style={{ borderWidth: 1, borderColor: '#E6E6E6', height: 95 / 930 * height, width: 370 / 430 * width, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 30 / 930 * height }}>
                            <View style={{ height: 55 / 930 * height, width: 338 / 430 * width, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ backgroundColor: 'transparent', gap: 5 }}>
                                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                        <Text style={{ fontFamily: customFonts.semibold, fontSize: 14, color: '#000' }}>
                                            {product.title}
                                        </Text>

                                    </View>

                                    <Text numberOfLines={3}
                                        style={{ width: 280 / 430 * width, fontFamily: customFonts.regular, fontSize: 12, color: '#000' }}>
                                        {product.description}
                                    </Text>
                                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                        <Text style={{ fontFamily: customFonts.semibold, fontSize: 18 }}>
                                            {product.priceString}
                                        </Text>
                                        {
                                            product.tag && (
                                                <View style={{ paddingHorizontal: 8, paddingVertical: 5, backgroundColor: '#6050DC15', borderRadius: 5 }}>
                                                    <Text style={{ fontFamily: customFonts.meduim, fontSize: 12, color: colors.blueColor }}>
                                                        {product.tag}
                                                    </Text>
                                                </View>
                                            )
                                        }


                                    </View>

                                </View>
                                {/* <View style={{ width: '50%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}> */}
                                {/* <TouchableOpacity > */}
                                <View style={{ height: 32 / 930 * height, width: 32 / 930 * height, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000020', borderRadius: 50 }}>
                                    <Image source={require('../../assets/forward.png')} style={{ height: 20 / 930 * height, width: 20 / 430 * width, }} />
                                </View>
                                {/* </TouchableOpacity> */}
                                {/* </View> */}
                            </View>
                        </View>
                    </TouchableOpacity>

                ))
                }
                {/* )
                } */}



                {/* ))} */}
            </View>
        </View>
    )
}