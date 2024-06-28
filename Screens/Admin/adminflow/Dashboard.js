import React, { useEffect, useState } from 'react';
import { Dimensions, Image, Text, TouchableOpacity, View, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import customFonts from '../../../assets/fonts/Fonts';
import Dropdown2 from '../ui/Dropdown2';
import Apis from '../apis/Apis';
import { BarChart } from 'react-native-chart-kit';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({ navigation }) => {
    const { height, width } = Dimensions.get('window');
    const [Loading, setLoading] = useState(false);
    const [ApiResponse, setApiResponse] = useState('');
    const [RecentUsers, setRecentUsers] = useState([]);

    const handleNotifications = () => {
        navigation.navigate('AdminNotifications')
    }

    const haandleAllUsersClick = () => {
        // console.warn('Working');
        navigation.navigate('AdminTabBarContainer')
    }

    //code for subscription graph

    const local_data = [
        {
            value: '1',
            lable: 'Weekly',
        },
        {
            value: '2',
            lable: 'Monthly',
        },
        {
            value: '3',
            lable: 'Yearly',
        },
        //   {
        //     value: '4',
        //     lable: '',
        //   },
        //   {
        //     value: '5',
        //     lable: '',
        //   },
    ];

    const Paying_Users = [
        {
            value: '1',
            lable: 'Paying',
        },
        {
            value: '2',
            lable: 'Free',
        },
        // {
        //     value: '3',
        //     lable: 'Yearly',
        // },
    ]

    const Revenue_Status = [
        {
            value: '1',
            lable: 'Profile',
        },
        {
            value: '2',
            lable: 'Free',
        },
        // {
        //     value: '3',
        //     lable: 'Yearly',
        // },
    ]

    const [userPaymentStatus, setUserPaymentStatus] = useState('1');
    const [Revenue, setRevenue] = useState('1');

    //code for Graph details
    // const subscriptionGraph = {
    //     labels: ["ABC", "Feb", "Mar", "Apr", "May", "Jun"],
    //     datasets: [
    //         {
    //             data: [30, 20, 40, 35, 50, 25], // Custom values for each month
    //         },
    //     ],
    // };

    const [SubscriptionUsersDate, setSubscriptionUsersDate] = useState([]);

    //code for calling dashboarddetails api
    useEffect(() => {
        const dashBoardDetails = async () => {
            try {
                const data = await AsyncStorage.getItem("USER")
                if (data) {
                    let d = JSON.parse(data)
                    console.log('admin token is', d.token)

                    const AuthToken = d.token
                    setLoading(true);
                    const response = await fetch(Apis.DashboardDetails, {
                        'method': 'get',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + AuthToken
                        }
                    });
                    if (response.ok) {
                        const Result = await response.json();
                        console.log('Response of api :', Result);
                        setApiResponse(Result.data);
                        setRecentUsers(Result.data.recent_users);
                        // const SubscriptionDetails = 
                        let Subscription = [];
                        Result.data.downloads.graph_data.forEach((item, index) => {
                            if (index % 4 === 0) {
                                Subscription.push(item.date);
                            }
                        });
                        // console.log('Value of subscription is :', Subscription);
                        setSubscriptionUsersDate(Subscription);
                    } else {
                        console.log('Api response is not ok');
                    }
                }

            } catch (error) {
                console.error("Error occured is :", error);
            } finally {
                setLoading(false);
            }

        }
        dashBoardDetails();
    }, [])

    //code for getting graph data from api

    const data = {
        labels: [SubscriptionUsersDate],
        datasets: [
            {
                data: [30, 20, 40, 35, 50, 25], // Custom values for each month
            },
        ],
    };

    // console.log('Labels are :', SubscriptionUsersDate);

    //code for dropdown
    const [country, setCountry] = useState('2');

    return (
        <View style={{ width: width, alignItems: 'center', height: height }}>
            <View style={{ width: width - 50, height: height * 0.87 }}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#FFFFFF"
                    translucent={false}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 / 930 * height, marginTop: 60 }}>
                    <Text style={{ fontWeight: '500', fontSize: 24, fontFamily: customFonts.medium }}>
                        Dashboard
                    </Text>
                    <TouchableOpacity onPress={handleNotifications} style={{ width: 28, justifyContent: 'center' }}>
                        <Image source={require('../../../assets/Images3/notification.png')} style={{ height: 28 / 930 * height, width: 28 / 430 * width }} />
                    </TouchableOpacity>
                </View>
                {
                    Loading ?
                        <View style={{ height: height*0.80, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size={'large'} color={'#6050Dc'} />
                        </View>
                        :
                        <View style={{ width: width - 50, height: height * 0.80 }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={{ fontWeight: '500', fontSize: 18, fontFamily: customFonts.medium, marginTop: 20 }}>
                                    Revenue
                                </Text>

                                {/* Subscription */}

                                <View>
                                    <View style={{ width: 370 / 430 * width, borderWidth: 1, borderColor: '#00000020', borderRadius: 10, marginTop: 35, flexDirection: 'column', justifyContent: 'center', padding: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40 }}>
                                            <Text style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.medium }}>
                                                Subscription
                                            </Text>
                                            <Dropdown2 />
                                        </View>

                                        <View style={{ alignItems: 'center', marginTop: 15 }}>
                                            <View>
                                                <BarChart
                                                    style={{ borderRadius: 10 }}
                                                    data={data}
                                                    width={350 / 430 * width}
                                                    height={220 / 930 * height}
                                                    chartConfig={{
                                                        backgroundColor: "black",
                                                        backgroundGradientFrom: "red",
                                                        backgroundGradientTo: "blue",
                                                        decimalPlaces: 0,
                                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                        style: {
                                                            borderRadius: 16,
                                                        },
                                                        propsForBackgroundLines: {
                                                            strokeDasharray: '',
                                                            strokeWidth: 1,
                                                            stroke: 'rgba(255, 255, 255, 0.1)',
                                                        },
                                                        propsForLabels: {
                                                            fontSize: 12,
                                                            fontWeight: 'bold',
                                                        },
                                                    }}
                                                    yAxisLabel=""
                                                    yLabelsOffset={35} // Offset to adjust the position of Y-axis labels
                                                    verticalLabelRotation={0}
                                                    fromZero={true}
                                                    // showValuesOnTopOfBars={true}
                                                    withInnerLines={true}
                                                    segments={5} // Number of horizontal grid lines
                                                    yAxisSuffix="" // Suffix for Y-axis values
                                                    formatYLabel={(value) => `${value * 100}`} // Custom format for Y-axis labels
                                                />
                                            </View>
                                        </View>

                                    </View>
                                </View>

                                {/* Total revenue */}
                                <View>
                                    <View style={{ width: 370 / 430 * width, borderWidth: 1, borderColor: '#00000020', borderRadius: 10, marginTop: 35, flexDirection: 'column', justifyContent: 'center', padding: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40 }}>
                                            <Text style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.medium }}>
                                                Total revenue
                                            </Text>
                                            <View style={{ gap: 5, flexDirection: 'row' }}>
                                                {/*add dropdown*/}
                                                <Dropdown
                                                    style={styles.dropdown}
                                                    selectedTextStyle={styles.selectedTextStyle}
                                                    placeholderStyle={styles.placeholderStyle}
                                                    //   imageStyle={styles.imageStyle}
                                                    iconStyle={styles.iconStyle}
                                                    maxHeight={200}
                                                    value={Revenue}
                                                    data={Revenue_Status}
                                                    valueField="value"
                                                    labelField="lable"
                                                    //   imageField="image"
                                                    placeholder="Select country"
                                                    //   searchPlaceholder="Search..."
                                                    onChange={e => {
                                                        setRevenue(e.value);
                                                    }}
                                                />
                                                <Dropdown
                                                    style={styles.dropdown}
                                                    selectedTextStyle={styles.selectedTextStyle}
                                                    placeholderStyle={styles.placeholderStyle}
                                                    //   imageStyle={styles.imageStyle}
                                                    iconStyle={styles.iconStyle}
                                                    maxHeight={200}
                                                    value={country}
                                                    data={local_data}
                                                    valueField="value"
                                                    labelField="lable"
                                                    //   imageField="image"
                                                    placeholder="Select country"
                                                    //   searchPlaceholder="Search..."
                                                    onChange={e => {
                                                        setCountry(e.value);
                                                    }}
                                                />
                                            </View>
                                        </View>

                                        <View style={{ alignItems: 'center', marginTop: 15 }}>
                                            <View>
                                                <BarChart
                                                    style={{ borderRadius: 10 }}
                                                    data={data}
                                                    width={350 / 430 * width}
                                                    height={220 / 930 * height}
                                                    chartConfig={{
                                                        backgroundColor: "black",
                                                        backgroundGradientFrom: "red",
                                                        backgroundGradientTo: "blue",
                                                        decimalPlaces: 0,
                                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                        style: {
                                                            borderRadius: 16,
                                                        },
                                                        propsForBackgroundLines: {
                                                            strokeDasharray: '',
                                                            strokeWidth: 1,
                                                            stroke: 'rgba(255, 255, 255, 0.1)',
                                                        },
                                                        propsForLabels: {
                                                            fontSize: 12,
                                                            fontWeight: 'bold',
                                                        },
                                                    }}
                                                    yAxisLabel=""
                                                    yLabelsOffset={35} // Offset to adjust the position of Y-axis labels
                                                    verticalLabelRotation={0}
                                                    fromZero={true}
                                                    // showValuesOnTopOfBars={true}
                                                    withInnerLines={true}
                                                    segments={5} // Number of horizontal grid lines
                                                    yAxisSuffix="" // Suffix for Y-axis values
                                                    formatYLabel={(value) => `${value * 100}`} // Custom format for Y-axis labels
                                                />
                                            </View>
                                        </View>

                                    </View>
                                </View>

                                <Text style={{ fontSize: 18, fontWeight: '500', fontFamily: customFonts.medium }}>
                                    Users
                                </Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ height: 79 / 930 * height, width: 175 / 430 * width, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderColor: '#E6E6E6', borderRadius: 16 }}>
                                        <View style={{ flexDirection: 'row', gap: 10, width: 165 / 430 * width }}>
                                            <View style={{ height: 45, width: 45, borderRadius: 50, backgroundColor: '#F1BB081A', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../../assets/Images3/crown2.png')} style={{ height: 24 / 930 * height, width: 24 / 430 * width }} />
                                            </View>
                                            <View>
                                                <Text style={{
                                                    fontWeight: '500',
                                                    fontSize: 12,
                                                    fontFamily: customFonts.medium,
                                                    color: '#666666'
                                                }}>
                                                    Paying users
                                                </Text>
                                                <Text style={{
                                                    fontWeight: '600',
                                                    fontSize: 18,
                                                    fontFamily: customFonts.bold
                                                }}>
                                                    {ApiResponse.paying}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>

                                    {/* Code for users ratio */}
                                    <View style={{ height: 79 / 930 * height, width: 175 / 430 * width, borderWidth: 1, justifyContent: 'center', alignItems: 'center', borderColor: '#E6E6E6', borderRadius: 16 }}>
                                        <View style={{ flexDirection: 'row', gap: 10, width: 165 / 430 * width }}>
                                            <View style={{ height: 45, width: 45, borderRadius: 50, backgroundColor: '#E6E6E6', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                <Image source={require('../../../assets/Images3/happyemoji.png')} style={{ height: 24 / 930 * height, width: 24 / 430 * width }} />
                                            </View>
                                            <View>
                                                <Text style={{
                                                    fontWeight: '500',
                                                    fontSize: 12,
                                                    fontFamily: customFonts.medium,
                                                    color: '#666666'
                                                }}>
                                                    Free users
                                                </Text>
                                                <Text style={{
                                                    fontWeight: '600',
                                                    fontSize: 18,
                                                    fontFamily: customFonts.bold
                                                }}>
                                                    {ApiResponse.free}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>

                                {/* User ration graph */}
                                <View>
                                    <View style={{ width: 370 / 430 * width, borderWidth: 1, borderColor: '#00000020', borderRadius: 10, marginTop: 35, flexDirection: 'column', justifyContent: 'center', padding: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40 }}>
                                            <Text style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.medium }}>
                                                Users
                                            </Text>

                                            <View style={{ gap: 5, flexDirection: 'row' }}>
                                                {/*add dropdown*/}
                                                <Dropdown
                                                    style={styles.dropdown}
                                                    selectedTextStyle={styles.selectedTextStyle}
                                                    placeholderStyle={styles.placeholderStyle}
                                                    //   imageStyle={styles.imageStyle}
                                                    iconStyle={styles.iconStyle}
                                                    maxHeight={200}
                                                    value={userPaymentStatus}
                                                    data={Paying_Users}
                                                    valueField="value"
                                                    labelField="lable"
                                                    //   imageField="image"
                                                    placeholder="Select country"
                                                    //   searchPlaceholder="Search..."
                                                    onChange={e => {
                                                        setUserPaymentStatus(e.value);
                                                    }}
                                                />
                                                <Dropdown
                                                    style={styles.dropdown}
                                                    selectedTextStyle={styles.selectedTextStyle}
                                                    placeholderStyle={styles.placeholderStyle}
                                                    //   imageStyle={styles.imageStyle}
                                                    iconStyle={styles.iconStyle}
                                                    maxHeight={200}
                                                    value={country}
                                                    data={local_data}
                                                    valueField="value"
                                                    labelField="lable"
                                                    //   imageField="image"
                                                    placeholder="Select country"
                                                    //   searchPlaceholder="Search..."
                                                    onChange={e => {
                                                        setCountry(e.value);
                                                    }}
                                                />
                                            </View>
                                        </View>

                                        <View style={{ alignItems: 'center', marginTop: 15 }}>
                                            <View>
                                                <BarChart
                                                    style={{ borderRadius: 10 }}
                                                    data={data}
                                                    width={350 / 430 * width}
                                                    height={220 / 930 * height}
                                                    chartConfig={{
                                                        backgroundColor: "black",
                                                        backgroundGradientFrom: "red",
                                                        backgroundGradientTo: "blue",
                                                        decimalPlaces: 0,
                                                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                                                        style: {
                                                            borderRadius: 16,
                                                        },
                                                        propsForBackgroundLines: {
                                                            strokeDasharray: '',
                                                            strokeWidth: 1,
                                                            stroke: 'rgba(255, 255, 255, 0.1)',
                                                        },
                                                        propsForLabels: {
                                                            fontSize: 12,
                                                            fontWeight: 'bold',
                                                        },
                                                    }}
                                                    yAxisLabel=""
                                                    yLabelsOffset={35} // Offset to adjust the position of Y-axis labels
                                                    verticalLabelRotation={0}
                                                    fromZero={true}
                                                    // showValuesOnTopOfBars={true}
                                                    withInnerLines={true}
                                                    segments={5} // Number of horizontal grid lines
                                                    yAxisSuffix="" // Suffix for Y-axis values
                                                    formatYLabel={(value) => `${value * 100}`} // Custom format for Y-axis labels
                                                />
                                            </View>
                                        </View>

                                    </View>
                                </View>

                                {/* All Users */}

                                <View style={{ flexDirection: 'row', gap: 6, marginTop: 30 }}>
                                    <FlatList
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        data={RecentUsers}
                                        renderItem={({ item, index }) => (
                                            <View key={item.id} style={{ borderWidth: 1, marginLeft: 10, borderColor: '#E6E6E6', borderRadius: 10, padding: 8, width: 140 / 430 * width, alignItems: 'center', justifyContent: 'center' }}>
                                                <Image source={item.profile_image ? { uri: item.profile_image } : require('../../../assets/Images3/imagePlaceholder.webp')} style={{ height: 96 / 930 * height, width: 126 / 430 * width, borderRadius: 5 }} />
                                                <Text style={{ fontWeight: '500', fontSize: 12, marginTop: 5, fontFamily: customFonts.medium, width: '100%' }}>
                                                    {item.first_name} {item.last_name}
                                                </Text>
                                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                    <Image source={require('../../../assets/Images3/location.png')} style={{ height: 12 / 930 * height, width: 12 / 430 * width }} />
                                                    <Text style={{ fontWeight: '400', fontSize: 10, fontFamily: customFonts.medium, color: '#333333' }}>
                                                        {item.city} {item.city ? ',' : ''} {item.state}
                                                    </Text>
                                                </View>
                                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                    <Image source={require('../../../assets/Images3/crown2.png')} style={{ height: 12 / 930 * height, width: 12 / 430 * width }} />
                                                    <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.medium, color: '#FFC401' }}>
                                                        {item.pkgName}
                                                    </Text>
                                                </View>
                                            </View>
                                        )}
                                    />
                                </View>

                                <View style={{ alignItems: 'center', marginTop: 10 }}>
                                    <TouchableOpacity onPress={haandleAllUsersClick} style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                        <Text style={{ fontWeight: '500', fontFamily: customFonts.medium, fontSize: 13, color: '#6050DC' }}>
                                            View All Users
                                        </Text>
                                        <Image source={require('../../../assets/Images3/nextIcon.png')} style={{ height: 10, width: 6, resizeMode: 'contain' }} />
                                    </TouchableOpacity>
                                </View>

                                {/* Code for Dates */}
                                <Text style={{ fontWeight: '500', fontSize: 18, fontFamily: customFonts.medium, marginTop: 10 }}>
                                    Dates
                                </Text>

                                <View style={{ borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 16, padding: 16, flexDirection: 'row', gap: 8, width: '100%', alignItems: 'center', width: '100%', justifyContent: '', marginTop: 10 }}>
                                    <View style={{ backgroundColor: '#F3F2FC', height: 46 / 930 * height, width: 46 / 930 * height, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                        <Image source={require('../../../assets/Images3/medal-star.png')} style={{ height: 24 / 930 * height, width: 24 / 430 * width }} />
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.medium, color: '#666666', width: '' }}>
                                            Number of dates planned on the platform
                                        </Text>
                                        <Text style={{ fontWeight: '600', fontSize: 18, fontFamily: customFonts.bold }}>
                                            {ApiResponse.planned_dates}
                                        </Text>
                                    </View>
                                </View>

                                <View style={{
                                    borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 16, flexDirection: 'row', gap: 8, width: '100%', justifyContent: '', marginTop: 10, alignItems: 'center', padding: 16
                                }}>
                                    <View style={{ backgroundColor: '#F3F2FC', height: 46 / 930 * height, width: 46 / 930 * height, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                        <Image source={require('../../../assets/Images3/like.png')} style={{ height: 24 / 930 * height, width: 24 / 430 * width }} />
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.medium, color: '#666666', width: '' }}>
                                            Number of dates attended
                                        </Text>
                                        <Text style={{ fontWeight: '600', fontSize: 18, fontFamily: customFonts.bold }}>
                                            21,215
                                        </Text>
                                    </View>
                                </View>

                                <View
                                    style={{
                                        borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 16, padding: 16,
                                        flexDirection: 'row', gap: 8, width: '100%', alignItems: 'center', width: '100%', marginTop: 20, marginBottom: 40
                                    }}>
                                    <View style={{ backgroundColor: '#F3F2FC', height: 46 / 930 * height, width: 46 / 930 * height, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                        <Image source={require('../../../assets/Images3/heart-circle.png')} style={{ height: 24 / 930 * height, width: 24 / 430 * width }} />
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.medium, color: '#666666', width: '' }}>
                                            Number of users that planned date nights
                                        </Text>
                                        <Text style={{ fontWeight: '600', fontSize: 18, fontFamily: customFonts.bold }}>
                                            21,215
                                        </Text>
                                    </View>
                                </View>
                            </ScrollView>
                        </View>
                }

            </View>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    Input: {
        color: 'red',
    },
    dropdown: {
        // marginTop: 10,
        height: 30,
        width: 93,
        // backgroundColor: 'red',
        borderRadius: 5,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: '#E6E6E6'
    },
    //currently not using placeholder
    // placeholderStyle: {
    //     fontSize: 10,
    //     color: 'red'
    // },
    selectedTextStyle: {
        fontSize: 13,
        fontWeight: '500',
        fontFamily: customFonts.medium
        // marginLeft: 8,
        // backgroundColor: 'red'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
})
