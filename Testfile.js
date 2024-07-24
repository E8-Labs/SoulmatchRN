import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';
import colors from './assets/colors/Colors';

const { height, width } = Dimensions.get('window')
const Testfile = () => {
  const height = 900; // Adjust height as needed to fit all items
  const width = 430; // Adjust width as needed
  const itemCount = 9; // Number of times to repeat the circle and rectangle

  const circleRadius = 30;
  const circleX = 50; // X position of the circle
  const circleYStart = 30; // Y position of the first circle
  const rectX = 90; // X position of the rectangle
  const rectYStart = 20; // Y position of the first rectangle
  const gapBetweenItems = 80; // Vertical gap between each circle-rectangle pair

  const renderItems = () => {
    return Array.from({ length: itemCount }).map((_, index) => (
      <React.Fragment key={index}>
        {/* <React /> */}
        <Rect
          x={rectX}
          y={circleYStart + index * gapBetweenItems - circleRadius + 10}
          rx={5}
          ry={5}
          width={200}
          height={10}
        />
        <Rect
          x={rectX}
          y={circleYStart + index * gapBetweenItems - circleRadius + 35}
          rx={5}
          ry={5}
          width={100}
          height={10}
        />
      </React.Fragment>
    ));
  };
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', height: height, marginTop: 100 }}>
      <ContentLoader
        height={height}
        width={width}
        speed={1}
        backgroundColor={"#D5D0F6"}
        foregroundColor={'#ececec'}
      >
        <Rect x={20} y={20} ry={5} rx={5} height={30} width={200} />

        <Rect x={20} y={70} ry={10} rx={10} height={530/930*height} width={390/430*width} />
        <Rect x={20} y={620} ry={5} rx={5} height={20} width={150} />
        <Rect x={20} y={660} ry={5} rx={5} height={20} width={200} />
        <Rect x={20} y={700} ry={5} rx={5} height={20} width={150} />
        <Rect x={20} y={740} ry={5} rx={5} height={20} width={200} />
        <Rect x={20} y={780} ry={5} rx={5} height={20} width={150} />

      </ContentLoader>

    </View>
  );
};

export default Testfile;
