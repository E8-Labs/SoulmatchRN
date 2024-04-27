import RangeSlider, { Slider } from 'react-native-range-slider-expo';
import { View, Text } from 'react-native';

import { useState } from 'react';
import GlobalStyles from './assets/styles/GlobalStyles';

export default function Testfile (){

const [fromValue, setFromValue] = useState(0);
     const [toValue, setToValue] = useState(0);
     const [value, setValue] = useState(0);
     
     return (
          <View style={GlobalStyles.container}>
               <View>
                    <RangeSlider min={5} max={25}
                         fromValueOnChange={value => setFromValue(value)}
                         toValueOnChange={value => setToValue(value)}
                         initialFromValue={11}
                    />
                    <Text>from value:  {fromValue}</Text>
                    <Text>to value:  {toValue}</Text>
               </View>
               <View>
                    <Slider min={0} max={40} step={4}
                         valueOnChange={value => setValue(value)}
                         initialValue={12}
                         knobColor='red'
                         valueLabelsBackgroundColor='black'
                         inRangeBarColor='purple'
                         outOfRangeBarColor='orange'
                    />
                    <Text>value:  {value}</Text>
               </View>
          </View>
     );
}