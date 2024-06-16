import React, { useState, useEffect, useRef } from 'react'
import {
    View, Text, Dimensions, TouchableOpacity, FlatList, ScrollView, StyleSheet,
    SafeAreaView, Animated,
    Settings,
    ActivityIndicator

} from 'react-native'
import { Video, ResizeMode, AVPlaybackStatu0s } from 'expo-av';
import { Image } from 'expo-image';
import colors from '../assets/colors/Colors';

const { height, width } = Dimensions.get('window')

export default function VideoPlayer({ navigation, route }) {
    const data = route.params.data

    console.log('data from prev screen is', data)
    const [isPlaying, setIsPlaying] = useState(true);
    const [duration, setDuration] = useState(0);
    const videoRef = React.useRef(null);
    const [video, setVideo] = useState(null);
    const [loadVideo, setLoadVideo] = useState(false);
    const [status, setStatus] = React.useState({});
    const ref = useRef(null);

    const formatDuration = (durationMillis) => {
        const totalSeconds = Math.floor(durationMillis / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', height: height, backgroundColor: 'black' }}>
            <TouchableOpacity
                style={{
                    backgroundColor: 'grey', position: 'absolute', top: 80, borderRadius: 50, height: 40, width: 40, right: 10,
                    alignItems: 'center', justifyContent: 'center'
                }}
                onPress={() => {
                   navigation.goBack()
                }} >
                <Image source={require('../assets/images/close.png')}
                    style={{ height: 30, width: 30 }}
                />
            </TouchableOpacity>
            <Video
                ref={videoRef}
                source={{
                    uri: data.url
                }}
                style={{ height: height * 0.4, width: width - 30, borderRadius: 10, marginTop: 8 }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping={true}
                // shouldPlay={isPlaying}
                onPlaybackStatusUpdate={status => {
                    setStatus(() => status)
                    setIsPlaying(status.isPlaying);
                }}
                onLoad={(status) => {
                    setDuration(status.durationMillis)
                    setLoadVideo(false)
                }} // Set duration when video loads
                onLoadStart={() => {
                    setLoadVideo(true)
                }}

            />
            {!isPlaying && duration > 0 && (
                <View style={styles.durationContainer}>
                    <Text style={styles.durationText}>{formatDuration(duration)}</Text>
                </View>
            )}
            {
                loadVideo ? (
                    <ActivityIndicator size={'large'} color={colors.blueColor} style={{ position: 'absolute', top: height*0.5, left:  width/2 }} />
                ) : <></>
            }
        </View>
    )
}

const styles = StyleSheet.create({


    durationContainer: {
        position: 'absolute',
        top: height * 0.65,
        left: 30 / 430 * width,
        backgroundColor: 'grey',
        borderRadius: 5,
        padding: 5,
    },
    durationText: {
        color: 'white',
        fontSize: 14,
    },
    activityIndicator: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 1,
    },
});