import React, { useEffect, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View, StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import customFonts from '../../../assets/fonts/Fonts';
import Dropdown2 from '../ui/Dropdown2';
import Apis from '../apis/Apis';
import { BarChart } from 'react-native-chart-kit';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import colors from '../../../assets/colors/Colors';
import moment from 'moment/moment';

const Dashboard = ({ navigation }) => {
    const { height, width } = Dimensions.get('window');
    const [Loading, setLoading] = useState(false);
    const [ApiResponse, setApiResponse] = useState('');
    const [RecentUsers, setRecentUsers] = useState([]);
    const [userPaymentStatus, setUserPaymentStatus] = useState('1');
    const [Revenue, setRevenue] = useState('1');

    const [weeklyRevnue, setWeeklyRevenue] = useState([])
    const [monthlyRevnue, setMonthlyRevenue] = useState([])
    const [yearlyRevnue, setYearlyRevenue] = useState([])
    const [weeklyRevnueDate, setWeeklyRevenueDate] = useState([])
    const [monthlyRevnueDate, setMonthlyRevenueDate] = useState([])
    const [yearlyRevnueDate, setYearlyRevenueDate] = useState([])

    const [weeklySubscription, setWeeklySubscription] = useState([])
    const [weeklySubscriptionDate, setWeeklySubscriptionDate] = useState([])
    const [monthlySubscription, setMonthlySubscription] = useState([])
    const [monthlySubscriptionDate, setMonthlySubscriptionDate] = useState([])
    const [yearlySubscription, setYearlySubscription] = useState([])
    const [yearlySubscriptionDate, setYearlySubscriptiondDate] = useState([])

    const [weeklyUser, setWeeklyUser] = useState([])
    const [monthlyUser, setMonthlyUser] = useState([])
    const [yearlyUser, setYearlyUser] = useState([])

    const [userDate,setUserDate] = useState([])

    const [subDuration, setSubDuration] = useState('1')
    const [revDuration, setRevDuration] = useState('1')
    const [userDuration, setUserDuration] = useState('1')

    const [country, setCountry] = useState('1')

    const handleNotifications = () => {
        navigation.navigate('NotificationsScreen')
    }

    const haandleAllUsersClick = () => {
        // console.warn('Working');
        navigation.navigate('Users')
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
    ];

    const Paying_Users = [
        {
            value: '1',
            lable: 'Paid',
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
            lable: 'Profile boost',
        },
        {
            value: '2',
            lable: 'Free',
        },
    ]


    //code for calling dashboarddetails api
    useEffect(() => {

        dashBoardDetails();
    }, [])
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


                    console.log('subscriptions data is', Result.data.subscriptionsData)
                    let sub = Result.data.subscriptionsData

                    formateRevData(Result.data.revenueData)
                    formateSubData(sub)
                    formateUserData(Result.data.payingAndFree)

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

    const formateUserData = (user) =>{
        let userDate = [];
        let monthly = [];
        let weekly = [];
        let yearly = [];

        user.forEach((item, index) => {
            // if (index % 4 === 0) {
            userDate.push(item.month);
            monthly.push(item.monthlyUsers)
            weekly.push(item.weeklyUsers)
            yearly.push(item.yearlyUsers)
            // }
        });
        console.log('monthly user is :', monthly);
        console.log('yearly user is :', yearly);
        console.log('weekly user is :', weekly);
        setMonthlyUser(monthly)
        setWeeklyUser(weekly)
        setYearlyUser(yearly)
        setUserDate(userDate)
    }

    const formateSubData = (sub) => {
        let monthlyDate = [];
        let monthlySub = [];
        sub.monthly.forEach((item, index) => {
            // if (index % 4 === 0) {
            monthlyDate.push(item.date);
            monthlySub.push(item.numberOfSubscriptions)
            // }
        });
        console.log('Value of subscription is :', monthlyDate);
        setMonthlySubscriptionDate(monthlyDate);
        setMonthlySubscription(monthlySub)

        // weekly subscription data

        let weeklyDate = [];
        let weeklySub = [];
        sub.weekly.forEach((item, index) => {
            // if (index % 4 === 0) {
            weeklyDate.push(item.date);
            weeklySub.push(item.numberOfSubscriptions)
            // }
        });
        console.log('Value of subscription is :', weeklyDate);
        setWeeklySubscriptionDate(weeklyDate);
        setWeeklySubscription(weeklySub)

        // yearly subscription data

        let yearlyDate = [];
        let yearlySub = [];
        sub.yearly.forEach((item, index) => {
            // if (index % 4 === 0) {
            yearlyDate.push(item.date);
            yearlySub.push(item.numberOfSubscriptions)
            // }
        });
        console.log('Value of yearly subscription is :', yearlyDate);
        setYearlySubscriptiondDate(yearlyDate);
        setYearlySubscription(yearlySub)

    }

    const formateRevData = (rev) => {
        //  monthly subscriptions data
        let monthlyDate = [];
        let monthlyRev = [];
        rev.monthly.forEach((item, index) => {
            // if (index % 4 === 0) {
            monthlyDate.push(item.date);
            monthlyRev.push(item.totalRevenue)
            // }
        });
        console.log('Value of subscription is :', monthlyDate);
        setMonthlyRevenueDate(monthlyDate);
        setMonthlyRevenue(monthlyRev)

        // weekly subscription data

        let weeklyDate = [];
        let weeklyRev = [];
        rev.weekly.forEach((item, index) => {
            // if (index % 4 === 0) {
            weeklyDate.push(item.date);
            weeklyRev.push(item.totalRevenue)
            // }
        });
        console.log('Value of subscription is :', weeklyDate);
        setWeeklyRevenueDate(weeklyDate);
        setWeeklyRevenue(weeklyRev)

        // yearly subscription data

        let yearlyDate = [];
        let yearlyRev = [];
        rev.yearly.forEach((item, index) => {
            // if (index % 4 === 0) {
            yearlyDate.push(item.date);
            yearlyRev.push(item.totalRevenue)
            // }
        });
        console.log('Value of yearly subscription is :', yearlyDate);
        setYearlyRevenueDate(yearlyDate);
        setYearlyRevenue(yearlyRev)


    }


    //code for getting graph data from api

    const getSubData = () => {
        let labels = [];
        let datasets = [{ data: [] }];

        if (subDuration === "1") {
            labels = weeklySubscriptionDate.map(date => moment(date, 'MM-YYYY').format('MMM'));
            datasets = [{ data: weeklySubscription }];
        } else if (subDuration === "2") {
            labels = monthlySubscriptionDate.map(date => moment(date, 'MM-YYYY').format('MMM'));
            datasets = [{ data: monthlySubscription }];
        } else if (subDuration === "3") {
            labels = yearlySubscriptionDate.map(date => moment(date, 'MM-YYYY').format('MMM'));
            datasets = [{ data: yearlySubscription }];
        } else {
            labels = [];
            datasets = [{ data: [] }];
        }

        let data = { labels, datasets };
        console.log("Data of chart is ", JSON.stringify(data));
        return data;
    };
    const getRevData = () => {
        let labels = [];
        let datasets = [{ data: [] }];

        if (revDuration === "1") {
            labels = weeklyRevnueDate.map(date => moment(date, 'MM-YYYY').format('MMM'));
            datasets = [{ data: weeklyRevnue }];
        } else if (revDuration === "2") {
            labels = monthlyRevnueDate.map(date => moment(date, 'MM-YYYY').format('MMM'));
            datasets = [{ data: monthlyRevnue }];
        } else if (revDuration === "3") {
            labels = yearlyRevnueDate.map(date => moment(date, 'MM-YYYY').format('MMM'));
            datasets = [{ data: yearlyRevnue }];
        } else {
            labels = [];
            datasets = [{ data: [] }];
        }

        let data = { labels, datasets };
        console.log("Data of chart is ", JSON.stringify(data));
        return data;
    };

    const getUserData = () => {
        let labels = [];
        let datasets = [{ data: [] }];

        if (userDuration === "1") {
            labels = userDate.map(date => moment(date, 'MM-YYYY').format('MMM'));
            datasets = [{ data: weeklyUser }];
        } else if (userDuration === "2") {
            labels = userDate.map(date => moment(date, 'MM-YYYY').format('MMM'));
            datasets = [{ data: monthlyUser }];
        } else if (userDuration === "3") {
            labels = userDate.map(date => moment(date, 'MM-YYYY').format('MMM'));
            datasets = [{ data: yearlyUser }];
        } else {
            labels = [];
            datasets = [{ data: [] }];
        }

        let data = { labels, datasets };
        console.log("Data of users chart is ", JSON.stringify(data));
        return data;
    };

    const data = {
        labels: [monthlySubscriptionDate],
        datasets: [
            {
                data: [10, 20, 30], // Custom values for each month
            },
        ],
    };

    return (
        <View style={{ width: width, alignItems: 'center', height: height }}>
            <View style={{ width: width - 50, height: height * 0.87 }}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor="#FFFFFF"
                    translucent={false}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 / 930 * height, marginTop: 60 }}>
                    <Text style={{ fontWeight: '500', fontSize: 24, fontFamily: customFonts.meduim }}>
                        Dashboard
                    </Text>
                    <TouchableOpacity onPress={handleNotifications} style={{ width: 28, justifyContent: 'center' }}>
                        <Image source={require('../../../assets/Images3/notification.png')} style={{ height: 28 / 930 * height, width: 28 / 430 * width }} />
                    </TouchableOpacity>
                </View>
                {
                    Loading ?
                        <View style={{ height: height * 0.80, alignItems: 'center', justifyContent: 'center' }}>
                            <ActivityIndicator size={'large'} color={'#6050Dc'} />
                        </View>
                        :
                        <View style={{ width: width - 50, height: height * 0.80 }}>
                            <ScrollView showsVerticalScrollIndicator={false}>
                                <Text style={{ fontWeight: '500', fontSize: 18, fontFamily: customFonts.meduim, marginTop: 20 }}>
                                    Revenue
                                </Text>

                                {/* Subscription */}

                                <View>
                                    <View style={{ width: 370 / 430 * width, borderWidth: 1, borderColor: '#00000020', borderRadius: 10, marginTop: 35, flexDirection: 'column', justifyContent: 'center', padding: 10 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 40 }}>
                                            <Text style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.meduim }}>
                                                Subscription
                                            </Text>
                                            <Dropdown
                                                style={styles.dropdown}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                placeholderStyle={styles.placeholderStyle}
                                                //   imageStyle={styles.imageStyle}
                                                iconStyle={styles.iconStyle}
                                                maxHeight={200}
                                                value={subDuration}
                                                data={local_data}
                                                valueField="value"
                                                labelField="lable"
                                                //   imageField="image"
                                                placeholder="Select country"
                                                //   searchPlaceholder="Search..."
                                                onChange={e => {
                                                    setSubDuration(e.value);
                                                }}
                                            />
                                        </View>

                                        <View style={{ alignItems: 'center', marginTop: 15 }}>
                                            <View>
                                                <BarChart
                                                    style={{ borderRadius: 10 }}
                                                    data={getSubData()}
                                                    width={330 / 430 * width}
                                                    height={250 / 930 * height}
                                                    chartConfig={{
                                                        backgroundGradientFrom: "white",
                                                        backgroundGradientTo: "white",
                                                        decimalPlaces: 0,

                                                        color: (opacity = 1) => `rgba(96, 80, 220, ${opacity})`,
                                                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                                        style: {
                                                            borderRadius: 16,
                                                            paddingLeft: 20
                                                        },
                                                        propsForBackgroundLines: {
                                                            strokeDasharray: '',
                                                            strokeWidth: 1, // Remove inner lines by setting strokeWidth to 0
                                                            stroke:colors.greyText
                                                        
                                                        },
                                                        propsForLabels: {
                                                            fontSize: 12,
                                                            fontWeight: 'bold',
                                                        },
                                                    }}
                                                    yAxisLabel=""
                                                    yLabelsOffset={35} // Offset to adjust the position of Y-axis labels
                                                    verticalLabelRotation={0}
                                                    xLabelsOffset={0}
                                                    fromZero={true}

                                                    withHorizontalLabels={true}
                                                    withInnerLines={true} // Set to false to remove inner lines
                                                    showBarTops={false} // Show rounded bar tops
                                                    // showValuesOnTopOfBars={true}
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
                                            <Text style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.meduim }}>
                                                Total revenue
                                            </Text>
                                            <View style={{ gap: 5, flexDirection: 'row' }}>
                                                {/*add dropdown*/}
                                                <Dropdown
                                                    style={[styles.dropdown,{width:120/430*width}]}
                                                    selectedTextStyle={styles.selectedTextStyle}
                                                    placeholderStyle={styles.placeholderStyle}
                                                    //   imageStyle={styles.imageStyle}
                                                    iconStyle={styles.iconStyle}
                                                    maxHeight={200}
                                                    value={country}
                                                    data={Revenue_Status}
                                                    valueField="value"
                                                    labelField="lable"
                                                    //   imageField="image"
                                                    placeholder="Select country"
                                                    //   searchPlaceholder="Search..."
                                                    onChange={e => {
                                                        setCountry(e.value);
                                                    }}
                                                />
                                                <Dropdown
                                                    style={styles.dropdown}
                                                    selectedTextStyle={styles.selectedTextStyle}
                                                    placeholderStyle={styles.placeholderStyle}
                                                    //   imageStyle={styles.imageStyle}
                                                    iconStyle={styles.iconStyle}
                                                    maxHeight={200}
                                                    value={revDuration}
                                                    data={local_data}
                                                    valueField="value"
                                                    labelField="lable"
                                                    //   imageField="image"
                                                    placeholder="Select country"
                                                    //   searchPlaceholder="Search..."
                                                    onChange={e => {
                                                        setRevDuration(e.value);
                                                    }}
                                                />
                                            </View>
                                        </View>

                                        <View style={{ alignItems: 'center', marginTop: 15, }}>
                                            {/* <View> */}
                                            <BarChart
                                                style={{ borderRadius: 10 }}
                                                data={getRevData()}
                                                width={330 / 430 * width}
                                                height={250 / 930 * height}
                                                chartConfig={{
                                                    backgroundGradientFrom: "white",
                                                    backgroundGradientTo: "white",
                                                    decimalPlaces: 0,

                                                    color: (opacity = 1) => `rgba(96, 80, 220, ${opacity})`,
                                                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                                    style: {
                                                        borderRadius: 16,
                                                        paddingLeft: 20
                                                    },
                                                    propsForBackgroundLines: {
                                                        strokeDasharray: '',
                                                        strokeWidth: 1, // Remove inner lines by setting strokeWidth to 0
                                                        stroke: colors.greyText
                                                    },
                                                    propsForLabels: {
                                                        fontSize: 12,
                                                        fontWeight: 'bold',
                                                    },
                                                }}
                                                yAxisLabel=""
                                                yLabelsOffset={35} // Offset to adjust the position of Y-axis labels
                                                verticalLabelRotation={0}
                                                xLabelsOffset={0}
                                                fromZero={true}

                                                withHorizontalLabels={true}
                                                withInnerLines={true} // Set to false to remove inner lines
                                                showBarTops={false} // Show rounded bar tops
                                                // showValuesOnTopOfBars={true}
                                                segments={5} // Number of horizontal grid lines
                                                yAxisSuffix="" // Suffix for Y-axis values
                                                formatYLabel={(value) => `${value * 100}`} // Custom format for Y-axis labels
                                            />
                                            {/* </View> */}
                                        </View>

                                    </View>
                                </View>

                                <Text style={{ fontSize: 18, fontWeight: '500', fontFamily: customFonts.meduim }}>
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
                                                    fontFamily: customFonts.meduim,
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
                                                    fontFamily: customFonts.meduim,
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
                                            <Text style={{ fontWeight: '500', fontSize: 14, fontFamily: customFonts.meduim }}>
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
                                                    value={userDuration}
                                                    data={local_data}
                                                    valueField="value"
                                                    labelField="lable"
                                                    //   imageField="image"
                                                    placeholder="Select country"
                                                    //   searchPlaceholder="Search..."
                                                    onChange={e => {
                                                        setUserDuration(e.value);
                                                    }}
                                                />
                                            </View>
                                        </View>

                                        <View style={{ alignItems: 'center', marginTop: 15 }}>
                                            <View>
                                                <BarChart
                                                    style={{ borderRadius: 10 }}
                                                    data={getUserData()}
                                                    width={330 / 430 * width}
                                                    height={250 / 930 * height}
                                                    chartConfig={{
                                                        backgroundGradientFrom: "white",
                                                        backgroundGradientTo: "white",
                                                        decimalPlaces: 0,

                                                        color: (opacity = 1) => `rgba(96, 80, 220, ${opacity})`,
                                                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                                        style: {
                                                            borderRadius: 16,
                                                            paddingLeft: 20
                                                        },
                                                        propsForBackgroundLines: {
                                                            strokeDasharray: '',
                                                            strokeWidth: 1, // Remove inner lines by setting strokeWidth to 0
                                                            stroke: colors.greyText
                                                        },
                                                        propsForLabels: {
                                                            fontSize: 12,
                                                            fontWeight: 'bold',
                                                        },
                                                    }}
                                                    yAxisLabel=""
                                                    yLabelsOffset={35} // Offset to adjust the position of Y-axis labels
                                                    verticalLabelRotation={0}
                                                    xLabelsOffset={0}
                                                    fromZero={true}

                                                    withHorizontalLabels={true}
                                                    withInnerLines={true} // Set to false to remove inner lines
                                                    showBarTops={false} // Show rounded bar tops
                                                    // showValuesOnTopOfBars={true}
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
                                                <Image source={item.profile_image ? { uri: item.profile_image } : require('../../../assets/Images3/imagePlaceholder.webp')}
                                                    style={{ height: 96 / 930 * height, width: 126 / 430 * width, borderRadius: 5, resizeMode: 'cover' }} />
                                                <View style={{ flexDirection: 'column', width: '100%', gap: 7 }}>
                                                    <Text style={{ fontWeight: '500', fontSize: 12, marginTop: 5, fontFamily: customFonts.meduim, width: '100%' }}>
                                                        {item.first_name} {item.last_name}
                                                    </Text>
                                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                        <Image source={require('../../../assets/Images3/location.png')} style={{ height: 12 / 930 * height, width: 12 / 430 * width }} />
                                                        <Text style={{ fontWeight: '400', fontSize: 10, fontFamily: customFonts.meduim, color: '#333333' }}>
                                                            {item.city} {item.city ? ',' : ''} {item.state}
                                                        </Text>
                                                    </View>
                                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                        <Image source={require('../../../assets/Images3/crown2.png')} style={{ height: 12 / 930 * height, width: 12 / 430 * width }} />
                                                        <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.meduim, color: '#FFC401' }}>
                                                            {item.pkgName}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        )}
                                    />
                                </View>

                                <View style={{ alignItems: 'center', marginTop: 10 }}>
                                    <TouchableOpacity onPress={haandleAllUsersClick} style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
                                        <Text style={{ fontWeight: '500', fontFamily: customFonts.meduim, fontSize: 13, color: '#6050DC' }}>
                                            View All Users
                                        </Text>
                                        <Image source={require('../../../assets/Images3/nextIcon.png')} style={{ height: 10, width: 6, resizeMode: 'contain' }} />
                                    </TouchableOpacity>
                                </View>

                                {/* Code for Dates */}
                                <Text style={{ fontWeight: '500', fontSize: 18, fontFamily: customFonts.meduim, marginTop: 10 }}>
                                    Dates
                                </Text>

                                <View style={{ borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 16, padding: 16, flexDirection: 'row', gap: 8, width: '100%', alignItems: 'center', width: '100%', justifyContent: '', marginTop: 10 }}>
                                    <View style={{ backgroundColor: '#F3F2FC', height: 46 / 930 * height, width: 46 / 930 * height, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                        <Image source={require('../../../assets/Images3/medal-star.png')} style={{ height: 24 / 930 * height, width: 24 / 430 * width }} />
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.meduim, color: '#666666', width: '' }}>
                                            Number of dates planned on the platform
                                        </Text>
                                        <Text style={{ fontWeight: '600', fontSize: 18, fontFamily: customFonts.bold }}>
                                            {ApiResponse.planned_dates}
                                        </Text>
                                    </View>
                                </View>

                                {/* <View style={{
                                    borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 16, flexDirection: 'row', gap: 8, width: '100%', justifyContent: '', marginTop: 10, alignItems: 'center', padding: 16
                                }}>
                                    <View style={{ backgroundColor: '#F3F2FC', height: 46 / 930 * height, width: 46 / 930 * height, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                        <Image source={require('../../../assets/Images3/like.png')} style={{ height: 24 / 930 * height, width: 24 / 430 * width }} />
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.meduim, color: '#666666', width: '' }}>
                                            Number of dates attended
                                        </Text>
                                        <Text style={{ fontWeight: '600', fontSize: 18, fontFamily: customFonts.bold }}>
                                            21,215
                                        </Text>
                                    </View>
                                </View> */}

                                <View
                                    style={{
                                        borderWidth: 1, borderColor: '#E6E6E6', borderRadius: 16, padding: 16,
                                        flexDirection: 'row', gap: 8, width: '100%', alignItems: 'center', width: '100%', marginTop: 20, marginBottom: 40
                                    }}>
                                    <View style={{ backgroundColor: '#F3F2FC', height: 46 / 930 * height, width: 46 / 930 * height, borderWidth: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}>
                                        <Image source={require('../../../assets/Images3/heart-circle.png')} style={{ height: 24 / 930 * height, width: 24 / 430 * width }} />
                                    </View>
                                    <View>
                                        <Text style={{ fontWeight: '500', fontSize: 12, fontFamily: customFonts.meduim, color: '#666666', width: '' }}>
                                            Number of users that planned date nights
                                        </Text>
                                        <Text style={{ fontWeight: '600', fontSize: 18, fontFamily: customFonts.bold }}>
                                            {ApiResponse.unique_users_planned_dates}
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
        fontFamily: customFonts.meduim
        // marginLeft: 8,
        // backgroundColor: 'red'
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
})
