import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Image } from 'expo-image';

const buttonData = [
    { id: 'trial', label: 'Trial' },
    { id: 'weekly', label: 'Weekly' },
    { id: 'monthly', label: 'Monthly' },
    { id: 'yearly', label: 'Yearly' }
];

const MapButtons = () => {
    const [selectedButton, setSelectedButton] = useState(null);

    const handlePress = (id) => {
        setSelectedButton(id);
        console.log(`Selected Button: ${id}`);
    };

    const UnSelRadio = require('../../../assets/Images/RadioButton.png');
    const SelRadio = require('../../../assets/Images/RadioButtonsel.png');

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', }}>
                {buttonData.map((button) => (
                    <TouchableOpacity
                        key={button.id}
                        onPress={() => handlePress(button.id)}
                        style={styles.button}
                    >
                        <View>
                            <Image
                                source={selectedButton === button.id ? SelRadio : UnSelRadio}
                                style={styles.image}
                            />
                            <Text style={styles.label}>{button.label}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center'
    // },
    // buttonsContainer: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-around',
    //     width: '100%'
    // },
    // button: {
    //     alignItems: 'center'
    // },
    // image: {
    //     width: 50,
    //     height: 50
    // },
    // label: {
    //     marginTop: 5,
    //     fontSize: 16
    // }
});

export default MapButtons;
