import React,{useState} from 'react';
import { View, Button } from 'react-native';
import Toast from 'react-native-root-toast';
import colors from './assets/colors/Colors';
import { ShowMessage } from './Services/Snakbar/ShowMessage';

const Testfile = () => {

  const [show,setShow] = useState(false)
  const showErrorToast = () => {
    Toast.show('error :helllo', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
      
      backgroundColor: 'red',
      textColor: 'white',
      shadow: true,
      shadowColor:'grey',
      opacity:0.8,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Show Error" onPress={()=>{
       ShowMessage("hello")
      }} />
     
    </View>
  );
};

export default Testfile;
