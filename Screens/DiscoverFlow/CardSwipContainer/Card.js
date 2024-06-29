import { View, Text, Dimensions, Animated, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import CardLike from './CardLike';
import { Image } from 'expo-image';
// import LinearGradient from 'react-native-linear-gradient';
const { height, width } = Dimensions.get('window');
const Card = ({ item, isFirst, swipe, ...rest }) => {
    const rotate = swipe.x.interpolate({
        inputRange: [-100, 0, 100],
        outputRange: ['8deg', '0deg', '-8deg'],
    });
    const likeOpacity = swipe.x.interpolate({
        inputRange: [10, 100],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });
    const rejectOpacity = swipe.x.interpolate({
        inputRange: [-100, -10],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });
    const renderChoice = useCallback(() => {
        return (
            <>
                <Animated.View
                    style={[
                        { position: 'absolute', top: 100, left: 20 },
                        { opacity: likeOpacity },
                    ]}>

                    <CardLike type={'Like'} />
                </Animated.View>
                <Animated.View
                    style={[
                        { position: 'absolute', top: 100, right: 20 },
                        { opacity: rejectOpacity },
                    ]}>
                    <CardLike type={'Nope'} />
                </Animated.View>
            </>
        );
    }, []);

    const removeCard = useCallback(() => {
        setData(prepState => prepState.slice(1));
        swipe.setValue({ x: 0, y: 0 });
    }, [swipe]);

    const handelSelection = useCallback(
        direction => {
            Animated.timing(swipe, {
                toValue: { x: direction * 500, y: 0 },
                useNativeDriver: true,
                duration: 500,
            }).start(removeCard);
        },
        [removeCard],
    )
    return (
        <Animated.View
            style={[
                {
                    width: width - 30,
                    height: height * 0.68,
                    position: 'absolute',
                    top: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',

                },
                isFirst && {
                    transform: [...swipe.getTranslateTransform(), { rotate: rotate }],
                },
            ]}
            {...rest}>
            
                <Image
                    source={item.image}
                    style={{ width: '100%', height: '100%', borderRadius: 20 }}
                />
                
            {isFirst && renderChoice()}
            <View
                // colors={['transparent', 'transparent', 'rgba(0,0,0,0.5)']}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    borderRadius: 20,
                }}>
                {/* <Text
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        left: 30,
                        fontSize: 40,
                        color: '#FFF',
                    }}>
                    {item.title}
                </Text> */}
                {/* <View
                    style={{
                        width: '90%',
                        position: 'absolute',
                        height: 100,
                        //   backgroundColor: 'red',
                        bottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        
                    }}>

                    <TouchableOpacity
                        style={{
                            width: 60,
                            height: 60,
                            backgroundColor: '#fff',
                            elevation: 5,
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            handelSelection(1);
                        }}>
                        <Image
                            source={require('../../../assets/images/like.png')}
                            style={{ width: 40, height: 40, tintColor: '#00FFC8' }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            width: 60,
                            height: 60,
                            backgroundColor: '#fff',
                            elevation: 5,
                            borderRadius: 30,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            handelSelection(-1);
                        }}>
                        <Image
                            source={require('../../../assets/images/close.png')}
                            style={{ width: 34, height: 34 }}
                        />
                    </TouchableOpacity>

                </View> */}
            </View>
        </Animated.View>
    );
};

export default Card;