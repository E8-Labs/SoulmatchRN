import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

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
        backgroundColor={'#fff'}
        foregroundColor={'#999'}
      // viewBox="0 0 380 70"
      >
        {/* {renderItems()} */}

        <Rect x={30} y={0} ry={5} rx={5} height={30} width={250} />
        <Rect x={30} y={50} ry={5} rx={5} height={100} width={150} />
        <Rect x={30} y={160} ry={5} rx={5} height={10} width={100} />
        <Rect x={30} y={180} ry={5} rx={5} height={10} width={50} />
        <Rect x={150} y={180} ry={5} rx={5} height={10} width={30} />
        <Rect x={30} y={200} ry={5} rx={5} height={10} width={50} />
        <Rect x={150} y={200} ry={5} rx={5} height={10} width={30} />
        <Rect x={30} y={220} ry={5} rx={5} height={10} width={50} />
        <Rect x={150} y={220} ry={5} rx={5} height={10} width={30} />

        <Rect x={250} y={50} ry={5} rx={5} height={100} width={150} />
        <Rect x={250} y={160} ry={5} rx={5} height={10} width={100} />
        <Rect x={250} y={180} ry={5} rx={5} height={10} width={50} />
        <Rect x={370} y={180} ry={5} rx={5} height={10} width={30} />
        <Rect x={250} y={200} ry={5} rx={5} height={10} width={50} />
        <Rect x={370} y={200} ry={5} rx={5} height={10} width={30} />
        <Rect x={250} y={220} ry={5} rx={5} height={10} width={50} />
        <Rect x={370} y={220} ry={5} rx={5} height={10} width={30} />


        <Rect x={30} y={280} ry={5} rx={5} height={30} width={250} />

        <Rect x={30} y={360} ry={5} rx={5} height={100} width={150} />
        <Rect x={30} y={470} ry={5} rx={5} height={10} width={100} />
        <Rect x={30} y={490} ry={5} rx={5} height={10} width={50} />
        <Rect x={150} y={490} ry={5} rx={5} height={10} width={30} />
        <Rect x={30} y={510} ry={5} rx={5} height={10} width={50} />
        <Rect x={150} y={510} ry={5} rx={5} height={10} width={30} />
        <Rect x={30} y={530} ry={5} rx={5} height={10} width={50} />
        <Rect x={150} y={530} ry={5} rx={5} height={10} width={30} />

        <Rect x={250} y={360} ry={5} rx={5} height={100} width={150} />
        <Rect x={250} y={470} ry={5} rx={5} height={10} width={100} />
        <Rect x={250} y={490} ry={5} rx={5} height={10} width={50} />
        <Rect x={370} y={490} ry={5} rx={5} height={10} width={30} />
        <Rect x={250} y={510} ry={5} rx={5} height={10} width={50} />
        <Rect x={370} y={510} ry={5} rx={5} height={10} width={30} />
        <Rect x={250} y={530} ry={5} rx={5} height={10} width={50} />
        <Rect x={370} y={530} ry={5} rx={5} height={10} width={30} />


        <Rect x={30} y={580} ry={5} rx={5} height={30} width={250} />



      </ContentLoader>

    </View>
  );
};

export default Testfile;
