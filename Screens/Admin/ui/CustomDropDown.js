import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';

const CustomDropDown = ({ data, selectedValue, onValueChange }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelect = (value) => {
    onValueChange(value);
    setIsVisible(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.dropdownButtonText}>
          {selectedValue ? data.find(item => item.value === selectedValue).label : 'Select a value'}
        </Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setIsVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={data}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    width: '80%',
  },
  dropdownButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    maxHeight: '60%',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
  },
  modalItem: {
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: 'gray',
  },
  modalItemText: {
    fontSize: 16,
  },
});

export default CustomDropDown;
