import {
    View,
    Text,
    Animated,
    PanResponder,
    TouchableOpacity,
    Image, Dimensions
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Card from './Card';

const CardContainerMain = () => {

    const { height, width } = Dimensions.get("window")
    const [data, setData] = useState([
        { image: require('../../../assets/images/card1.png'), id: 1, title: 'Hulk' },
        { image: require('../../../assets/images/card1.png'), id: 2, title: 'Ironman' },
        { image: require('../../../assets/images/card1.png'), id: 3, title: 'Thor' },
        { image: require('../../../assets/images/card1.png'), id: 4, title: 'Superman' },
        { image: require('../../../assets/images/card1.png'), id: 5, title: 'Groot' },
        {
            image: require('../../../assets/images/card1.png'),
            id: 6,
            title: 'Black Panther',
        },
        { image: require('../../../assets/images/card1.png'), id: 7, title: 'Dr Strange' },
        { image: require('../../../assets/images/card1.png'), id: 8, title: 'Black Widow' },
    ]);
    useEffect(() => {
        if (!data.length) {
            setData([
                { image: require('../../../assets/images/card1.png'), id: 1, title: 'Hulk' },
                { image: require('../../../assets/images/card1.png'), id: 2, title: 'Ironman' },
                { image: require('../../../assets/images/card1.png'), id: 3, title: 'Thor' },
                { image: require('../../../assets/images/card1.png'), id: 4, title: 'Superman' },
                { image: require('../../../assets/images/card1.png'), id: 5, title: 'Groot' },
                {
                    image: require('../../../assets/images/card1.png'),
                    id: 6,
                    title: 'Black Panther',
                },
                { image: require('../../../assets/images/card1.png'), id: 7, title: 'Dr Strange' },
                { image: require('../../../assets/images/card1.png'), id: 8, title: 'Black Widow' },
            ]);
        }
    }, [data]);
    const swipe = useRef(new Animated.ValueXY()).current;
    const rotate = useRef(new Animated.Value(0)).current;

    const panResponser = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, { dx, dy }) => {
            // console.log('dx:' + dx + ' dy:' + dy);
            swipe.setValue({ x: dx, y: dy });
        },

        onPanResponderRelease: (_, { dx, dy }) => {
            // console.log('released:' + 'dx:' + dx + ' dy:' + dy);
            let direction = Math.sign(dx);
            let isActionActive = Math.abs(dx) > 200;
            if (isActionActive) {
                Animated.timing(swipe, {
                    toValue: { x: 500 * dx, y: dy },
                    useNativeDriver: true,
                    duration: 500,
                }).start(removeCard);
            } else {
                Animated.spring(swipe, {
                    toValue: { x: 0, y: 0 },
                    useNativeDriver: true,
                    friction: 5,
                }).start();
            }
        },
    });
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
    );
    return (
        <View style={{}}>
            {data
                .map((item, index) => {
                    let isFirst = index === 0;
                    let dragHanlders = isFirst ? panResponser.panHandlers : {};
                    return (
                            <Card
                                item={item}
                                rotate={rotate}
                                isFirst={isFirst}
                                swipe={swipe}
                                {...dragHanlders}
                                key={index}
                                
                            />
                    );
                })
                .reverse()}

            <View
                style={{
                    alignSelf: 'center',
                    width: '80%',
                    position: 'absolute',
                    height: 100,
                    // backgroundColor: 'red',
                    top: height * 0.55,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
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
                        source={require('../../../assets/images/unLike.png')}
                        style={{ width: 40, height: 40, }}
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
            </View>
        </View>
    );
};

export default CardContainerMain;