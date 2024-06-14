import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import { PixelRatio, StyleSheet, View, Button } from 'react-native';
import { ResizeMode } from 'expo-av'
// import VideoPlayer from 'expo-video-player'
export default function Testfile() {
  
  return (
    <View style={styles.contentContainer}>
{/*      
<VideoPlayer
  videoProps={{
    shouldPlay: true,
    resizeMode: ResizeMode.CONTAIN,
    // ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
    source: {
      uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  }}
/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});