import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';

const IconList = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleIconClick = (icon) => {
    setSelectedIcon(icon);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const icons = [
    { name: 'Icon 1', description: 'Description of Icon 1' },
    { name: 'Icon 2', description: 'Description of Icon 2' },
    { name: 'Icon 3', description: 'Description of Icon 3' },
  ];

  return (
    <View>
      {icons.map((icon, index) => (
        <TouchableOpacity key={index} onPress={() => handleIconClick(icon)}>
          <Text>{icon.name}</Text>
        </TouchableOpacity>
      ))}

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>{selectedIcon?.description}</Text>
            <TouchableOpacity onPress={closeModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default IconList;
