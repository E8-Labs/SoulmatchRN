import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import { Dropdown } from 'react-native-element-dropdown';

const local_data = [
  {
    value: '1',
    lable: 'Weekly',
  },
  {
    value: '2',
    lable: 'Monthly',
  },
  {
    value: '3',
    lable: 'Yearly',
  },
  //   {
  //     value: '4',
  //     lable: '',
  //   },
  //   {
  //     value: '5',
  //     lable: '',
  //   },
];

const Dropdown2 = _props => {
  const [country, setCountry] = useState('1');
  //   console.warn('Package selected is', country)

  return (
    <Dropdown
      style={styles.dropdown}
      selectedTextStyle={styles.selectedTextStyle}
      placeholderStyle={styles.placeholderStyle}
      //   imageStyle={styles.imageStyle}
      iconStyle={styles.iconStyle}
      maxHeight={200}
      value={country}
      data={local_data}
      valueField="value"
      labelField="lable"
      //   imageField="image"
      placeholder="Select country"
      //   searchPlaceholder="Search..."
      onChange={e => {
        setCountry(e.value);
      }}
    />
  );
};

export default Dropdown2;

const styles = StyleSheet.create({
  dropdown: {
    // marginTop: 10,
    height: 30,
    width: 106,
    // backgroundColor: 'red',
    borderRadius: 5,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#E6E6E6'
  },
  placeholderStyle: {
    fontSize: 16,
    color: 'red'
  },
  selectedTextStyle: {
    fontSize: 16,
    // marginLeft: 8,
    // backgroundColor: 'red'
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});