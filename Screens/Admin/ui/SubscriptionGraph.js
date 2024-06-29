// App.js
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import Apis from '../apis/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubscriptionGraph = () => {
    const { width, height } = Dimensions.get('window');


    const [Loading, setLoading] = useState(false);
    const [ApiResponse, setApiResponse] = useState('');
    const [RecentUsers, setRecentUsers] = useState([]);
    const [SubscriptionUsersDate, setSubscriptionUsersDate] = useState([]);

    //code for calling dashboarddetails api
    useEffect(() => {
        const dashBoardDetails = async () => {
            const data = await AsyncStorage.getItem('USER');
            if (data) {
                let d = JSON.parse(data);
                const AuthToken = d.token;
                // const AuthToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMTYsIm5hbWUiOiJBZG1pbiBQbHVyYXdsIiwiZW1haWwiOiJhZG1pbkBwbHVyYXdsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJE4uRHcyZTloZ2FvSy9BbzAxVmk2dGVla0xUMXVBdi9ycEhBTXdCblpaVDd3WUhTWmNLMnFlIiwicHJvZmlsZV9pbWFnZSI6bnVsbCwiY29tcGFueSI6bnVsbCwidGl0bGUiOm51bGwsImluZHVzdHJ5IjpudWxsLCJjaXR5IjpudWxsLCJzdGF0ZSI6bnVsbCwiZ2VuZGVyIjpudWxsLCJyYWNlIjpudWxsLCJsZ2J0cSI6bnVsbCwidmV0ZXJhbiI6bnVsbCwiZmNtX3Rva2VuIjpudWxsLCJkZXZpY2VfaWQiOiIiLCJwcm92aWRlcl9pZCI6bnVsbCwicHJvdmlkZXJfbmFtZSI6bnVsbCwicm9sZSI6ImFkbWluIiwicG9pbnRzIjowLCJlbmNfa2V5IjpudWxsLCJlbmNfaXYiOm51bGwsImNvdW50cmllcyI6bnVsbCwicHJvbm91bnMiOm51bGwsImRvYiI6bnVsbCwiY3JlYXRlZEF0IjoiMjAyNC0wNS0wMlQxMTo1NzozMy4wMDBaIiwidXBkYXRlZEF0IjoiMjAyNC0wNS0wMlQxMTo1NzozMy4wMDBaIn0sImlhdCI6MTcxNDY0Mzk1NSwiZXhwIjoxNzQ2MTc5OTU1fQ._iU0mPQUIjHIj8GvT_YvooVfditUOX3Grs9V8PmSGy0"
                try {
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
                        console.log('Response of api is :', Result);
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
                } catch (error) {
                    console.error("Error occured is :", error);
                } finally {
                    setLoading(false);
                }
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

    console.log('Labels are :', SubscriptionUsersDate);

    return (
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
    );
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: 'black'
        // paddingBottom: 10
    },
    chart: {
        borderRadius: 16,
    },
});

export default SubscriptionGraph;
