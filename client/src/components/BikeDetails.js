import React, { useRef, useState, useCallback, useMemo } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { BottomSheetModal, BottomSheetModalProvider, } from '@gorhom/bottom-sheet';
import { colors } from '../../styles/styles'

const BikeDetails = ({ bike, bottomSheetRef }) => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.heading}>Bike Details</Text>

          <View style={styles.details}>
            <View style={styles.bikeAttr}>
              <Text style={styles.attrKey}>ID:</Text>
              <Text style={styles.attrValue}>{bike.id}</Text>
            </View>

            <View style={styles.bikeAttr}>
              <Text style={styles.attrKey}>Status:</Text>
              <Text style={styles.attrValue}>{bike.status}</Text>
            </View>

            <View style={styles.bikeAttr}>
              <Text style={styles.attrKey}>State:</Text>
              <Text style={styles.attrValue}>{bike.state}</Text>
            </View>
          </View>

          {/* <CustomButton
            icon="close"
            color="lightgrey"
            onPress={() => bottomSheetRef.current?.close()}
            magicNumber={0.12}
            style={styles.closeBtn}
          /> */}
        </View>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 20,
    // borderWidth: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    marginTop: 10,
  },
  bikeAttr: {
    flexDirection: 'row',
    gap: 5
  },
  attrKey: {
    color: colors.lightgrey
  },
  attrValue: {
    color: colors.darkgrey
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 20
  }
});

export default BikeDetails;
