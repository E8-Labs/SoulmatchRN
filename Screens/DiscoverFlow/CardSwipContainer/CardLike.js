import {View, Text} from 'react-native';
import React from 'react';

const CardLike = ({type}) => {
  return (
    <View>
      <Text
        style={{
          fontSize: 30,
          textTransform: 'uppercase',
          letterSpacing: 4,
          fontWeight: '700',
          color: type == 'Like' ? '#00eda6' : '#FF0060',
          borderWidth: 3,
          borderColor: type == 'Like' ? '#00eda6' : '#FF0060',
          padding: 5,
          borderRadius: 10,
          transform: [{rotate: type == 'Like' ? '-30deg' : '30deg'}],
        }}>
        {type}
      </Text>
    </View>
  );
};

export default CardLike;