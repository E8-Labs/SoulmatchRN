import React, { useState, useRef } from 'react';
import { View, PanResponder, Text, StyleSheet } from 'react-native';
// import colors from '../../assets/colors/Colors';
import colors from './Colors';

const thumbWidth = 25
const RangeSlider = ({ width = 300, start = 20, end = 80, minValue = 0, maxValue = 100, minDistanceBetweenSlider = 5, heightSlider = false, rangeStartUpdated, rangeEndUpdated }) => {
    const [range, setRange] = useState({ start: start, end: end });
    const [activeThumb, setActiveThumb] = useState(null);
    const sliderWidth = useRef(width).current;



    const createPanResponder = (isStart) => {
        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                let newPosition = isStart ? range.start + (gestureState.dx / sliderWidth) * 100 : range.end + (gestureState.dx / sliderWidth) * 100;
                newPosition = Math.max(0, Math.min(100, newPosition));
                // console.log("New Position ", newPosition)
                if (isStart) {
                    if (newPosition > range.end - minDistanceBetweenSlider) newPosition = range.end - minDistanceBetweenSlider;
                    setRange((prev) => ({ ...prev, start: newPosition }));
                    rangeStartUpdated(newPosition)

                } else {
                    if (newPosition < range.start + minDistanceBetweenSlider) newPosition = range.start + minDistanceBetweenSlider;
                    setRange((prev) => ({ ...prev, end: newPosition }));
                    rangeEndUpdated(newPosition)
                }
            },
        });
    };

    const startPanResponder = createPanResponder(true);
    const endPanResponder = createPanResponder(false);


    function getHeightStringFromValue(value, start = true) {

        //for height min height should be 3 fee = 36 inches & max height should be 8 fee = 96 inches
        // 96 - 36 = 60 / 100 = 0.6 
        let addon = 36
        let inches = parseInt(0.6 * value + addon);

        let heightFeet = parseInt(inches / 12);
        let heightInches = parseInt(inches % 12);
        // console.log("Value is ", value)
        // console.log("Calculaed Height Feet ", heightFeet)
        return `${Math.round(heightFeet)}'${Math.round(heightInches)}"`
        // return ""
    }
    return (
        <View style={[styles.container, { width: sliderWidth }]}>
            <View style={[styles.track, { backgroundColor: colors.greyText }]} />
            <View
                style={[
                    styles.selectedTrack,
                    {
                        left: `${range.start}%`,
                        width: `${range.end - range.start}%`,
                        backgroundColor: colors.blueColor
                    }
                ]}
            />
            <View
                style={[styles.thumb, { left: `${range.start - (thumbWidth / 4)}%` }]}
                {...startPanResponder.panHandlers}
            />
            <Text style={[styles.label, { left: `${range.start}%` }]}>{heightSlider ? getHeightStringFromValue(range.start) : Math.round(range.start)}</Text>
            <View
                style={[styles.thumb, { left: `${range.end - (thumbWidth / 4)}%` }]}
                {...endPanResponder.panHandlers}
            />
            <Text style={[styles.label, { left: `${range.end}%` }]}>{heightSlider ? getHeightStringFromValue(range.end, false) : Math.round(range.end)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'center',
        position: 'relative',

        // overflow: 'hidden'
    },
    track: {

        position: 'absolute',
        width: '100%',
        height: 10,
        borderRadius: 5,
        top: 10, // Positioning the track a bit lower
    },
    selectedTrack: {
        position: 'absolute',
        height: 10,
        borderRadius: 0,
        top: 10, // Aligning with the main track
    },
    thumb: {

        position: 'absolute',
        width: thumbWidth,
        height: thumbWidth,
        borderRadius: thumbWidth / 2,
        backgroundColor: colors.greyText,
        borderWidth: 5,
        borderColor: colors.blueColor,
        top: 3, // Correctly overlapping over the track
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {

        position: 'absolute',
        top: 30, // Positioning labels below the thumbs
        color: 'black'
    }
});



export default RangeSlider;