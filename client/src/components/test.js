import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, Button } from 'react-native';

const data = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 32 },
  { name: "Charlie", age: 40 },
  { name: "Dave", age: 28 },
  { name: "Eve", age: 35 }
];

const ExampleComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  return (
    <View>
      {data.map((item, index) => (
        <View key={index}>
          <Text>Name: {item.name}</Text>
          <Text>Age: {item.age}</Text>
          <Button title="View Details" onPress={() => handleItemPress(item)} />
        </View>
      ))}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>Name: {selectedItem?.name}</Text>
            <Text>Age: {selectedItem?.age}</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ExampleComponent;
