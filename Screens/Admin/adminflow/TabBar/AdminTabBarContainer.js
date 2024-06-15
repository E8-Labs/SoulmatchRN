import React, { useEffect ,useState,useRef } from "react";
import { Image, View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, Platform,  } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "../Dashboard";
import User from "../User";
import Dates from "../Dates";
import Profile from "../Profile";

//code of screens used

// import DiscoverMain from "./DiscoverMain";
// import MessageMain from "./MessageMain";
// import DatesMain from "./DatesMain";
// import ProfileMain from "./ProfileMain";

const Tab = createBottomTabNavigator()

const { height, width } = Dimensions.get('window')

const tab1 = require('../../../../assets/Images3/tab1.png');
const tab2 = require('../../../../assets/Images3/tab2.png');
const tab3 = require('../../../../assets/Images3/tab3.png');
const tab4 = require('../../../../assets/Images3/tab4.png');

const astDashboard = require('../../../../assets/Images3/actDashboard.png');
const dashboard = require('../../../../assets/Images3/dashboard.png');
const actUsers = require('../../../../assets/Images3/actUsers.png');
const users = require('../../../../assets/Images3/users.png');
const actDates = require('../../../../assets/Images3/actDates.png');
const dates = require('../../../../assets/Images3/dates.png');
const actProfile = require('../../../../assets/Images3/actProfile.png');
const profile = require('../../../../assets/Images3/profile.png');





const getBgImage = (index) => {
    if (index === 0) {
        return tab1
    } else if (index === 1) {
        return tab2
    } else if (index === 2) {
        return tab3
    } else if (index === 3) {
        return tab4
    }
}

const getMarginLeft = (index) => {
    if (index === 0) {
        return 25 / 430 * width
    } else if (index === 1) {
        return 11 / 430 * width
    }
}

const getMarginRight = (index) => {
    if (index === 2) {
        return 13 / 430 * width
    } else if (index === 3) {
        return 25 / 430 * width
    }
}
const getImage = (index, isFocused) => {
    if (index === 0) {
        if (isFocused) {
            return astDashboard
        }
        return dashboard
    } else if (index === 1) {
        if (isFocused) {
            return actUsers
        }
        return users
    } else if (index === 2) {
        if (isFocused) {
            return actDates
        }
        return dates
    } else if (index === 3) {
        if (isFocused) {
            return actProfile
        }
        return profile
    }
}



function MyTabBar({ state, descriptors, navigation }) {
    // console.log("State of tabbar is ", state)
    return (
        <View style={{ flexDirection: 'row', backgroundColor: 'transparent', height: 90 / 930 * height }}>
            <ImageBackground
                source={getBgImage(state.index)}
                style={{ flex: 1, backgroundColor: "transparent", marginTop: -10, resizeMode: 'contain', justifyContent: 'center', flexDirection: 'row', alignItems: 'flex-end', height: 116 / 930 * height }}
            >
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title : route.name;

                    const isFocused = state.index === index;

                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name, route.params);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };
                    return (
                        <TouchableOpacity key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', }}
                        >
                            <View style={{ alignItems: 'center', }}>
                                <Image source={getImage(index, isFocused)}
                                    style={{
                                        width: isFocused ? 60 : 30, marginRight: getMarginRight(index),
                                        height: isFocused ? 60 : 30, marginLeft: getMarginLeft(index)
                                        // marginBottom: isFocused ? 50 / 930 * height : 15 / 930 * height
                                    }}>
                                </Image>
                                <Text style={{
                                    color: isFocused ? '#673ab7' : '#222', marginBottom: 40 / 930 * height, marginRight: getMarginRight(index),
                                    marginTop: isFocused ? 35 / 930 * height : 0, fontSize: 12, marginLeft: getMarginLeft(index), fontWeight: '400'
                                }}>
                                    {isFocused ? label : ''}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ImageBackground>

        </View>
    );
}





export default function AdminTabBarContainer() {

    return (

        <Tab.Navigator initialRouteName="Dashboard"
            screenOptions={{
                headerShown: false
            }}
            
            tabBar={props =>
                <MyTabBar {...props} />} >
            <Tab.Screen name="Dashboard" component={Dashboard}
                options={{
                   
                    tabBarShowLabel: true,
                    tabBarIcon: ({ focused }) =>
                        <Image source={require('../../../../assets/Images3/actDashboard.png')}
                            style={styles.image}
                        />

                }}
            />
            <Tab.Screen name="Users" component={User}
                options={{
                    tabBarShowLabel: true,
                    tabBarIcon: ({ focused }) =>
                        <Image source={require('../../../../assets/Images3/actDashboard.png')}
                            style={styles.image}
                        />

                }}
            />

            <Tab.Screen name="Dates" component={Dates}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        <Image source={require('../../../../assets/Images3/actDashboard.png')}
                            style={styles.image}
                        />

                }}
            />
            <Tab.Screen name="Profile" component={Profile}
                options={{
                    tabBarShowLabel: false,
                    tabBarIcon: ({ focused }) =>
                        <Image source={require('../../../../assets/Images3/actDashboard.png')}
                            style={styles.image}
                        />

                }}
            />
        </Tab.Navigator>
        // </View>
    )
}

const styles = StyleSheet.create({
    image: {
        height: 50,
        width: 50,

    }
})