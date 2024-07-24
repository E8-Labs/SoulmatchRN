import React from 'react';
import { View, Text, Dimensions, SafeAreaView } from 'react-native';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

const { height, width } = Dimensions.get('window')
const DiscoverLoading = () => {

    return (
        <SafeAreaView>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: height, marginTop: 100 }}>
                <ContentLoader
                    height={height}
                    width={width}
                    speed={1}
                    backgroundColor={"#D5D0F6"}
                    foregroundColor={'#ececec'}
                >
                    <Rect x={20} y={20} ry={5} rx={5} height={30} width={200} />

                    <Rect x={20} y={70} ry={10} rx={10} height={530 / 930 * height} width={390 / 430 * width} />
                    <Rect x={20} y={620} ry={5} rx={5} height={20} width={150} />
                    <Rect x={20} y={660} ry={5} rx={5} height={20} width={200} />
                    <Rect x={20} y={700} ry={5} rx={5} height={20} width={150} />
                    <Rect x={20} y={740} ry={5} rx={5} height={20} width={200} />
                    <Rect x={20} y={780} ry={5} rx={5} height={20} width={150} />

                </ContentLoader>

            </View>
        </SafeAreaView>
    );
};

export default DiscoverLoading;
