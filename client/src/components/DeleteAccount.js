import React, { useState } from 'react';
import { StyleSheet, View, Text, Modal, FlatList } from 'react-native';
import CustomButton from '../components/CustomButton';
import { colors } from '../../styles/styles'

const DeleteAccount = ({ modalVisible, setModalVisible, navigation }) => {
  const data = [
    { id: 1, text: 'You do not have any legal holds on your account due to pending litigation or other legal action related to your account' },
    { id: 2, text: 'You do not have negative cash balance' },
    // Add more items as needed
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.dot}>&#8226;</Text>
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(!modalVisible)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <CustomButton
            icon="arrow-left"
            color="white"
            onPress={() => setModalVisible(!modalVisible)}
            magicNumber={0.12}
            style={styles.backBtn}
          />

          <View>
            <Text style={styles.heading}>Are you sure you want to delete your account?</Text>
            <Text style={styles.warning}>In order to delete your account, you must meet the following criteria:</Text>

            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              style={styles.list}
            />
          </View>

          <CustomButton
            title='Delete'
            color={colors.lightred}
            onPress={() => navigation.navigate('Auth')}
            magicNumber={0.45}
            style={styles.deleteBtn}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 48
  },
  warning: {
    fontSize: 18,
    marginTop: 24,
  },
  list: {
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    paddingHorizontal: 18,
  },
  dot: {
    marginRight: 5,
    fontSize: 12,
    lineHeight: 16,
  },
  itemText: {
    fontSize: 14,
    lineHeight: 18,
  },
  deleteBtn: {
    width: '100%',
    marginTop: 48,
    alignSelf: 'center'
  },
  backBtn: {
    borderWidth: 1,
    paddingVertical: 11,
  },
})



export default DeleteAccount
