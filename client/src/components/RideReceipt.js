import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
import { colors } from '../../styles/styles';
import { getPrices } from '../api/payment';

const RideReceipt = ({ rideRecord, onClose, formatDate }) => {
  const [prices, setPrices] = useState({})

  useEffect(() => {
    (async () => {
      const data = await getPrices()
      setPrices(data)
    })()
  }, [])

  return (
    <Modal visible={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.closeButtonContainer}>
          <CustomButton
            icon="close"
            color="white"
            magicNumber={0.125}
            onPress={onClose}
          />
        </View>

        <Text style={styles.heading}>Ride receipt</Text>

        <View style={styles.rideDetails}>
          <DetailRow label="Date:" value={formatDate(rideRecord?.date)} />
          <DetailRow label="Distance:" value={`${rideRecord?.distance} km`} />
          <DetailRow label="Time:" value={`${rideRecord?.minutes} min`} />
        </View>

        <View style={styles.paymentDetails}>
          <DetailRow label="Unlock Fee:" value={`${prices.unlockPrice?.toFixed(2)} lv`} />
          <DetailRow label={`Riding - ${prices.minutePrice?.toFixed(2)} lv./min`} value={`${(rideRecord?.minutes * prices.minutePrice)?.toFixed(2)} lv`} />
          {/* <DetailRow label={`Riding - ${prices.minutePrice?.toFixed(2)} lv./min`} value={`${rideRecord?.price.toFixed(2)} lv`} /> */}
        </View>

        <View style={styles.total}>
          <DetailRow label="Total:" value={`${(rideRecord?.minutes * prices.minutePrice + prices.unlockPrice).toFixed(2)} lv`} />
        </View>
      </View>
    </Modal>
  )
}

const DetailRow = ({ label, value }) => (
  <View style={styles.detailRow}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: colors.platinum,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  closeButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  heading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 32,
    marginTop: 20
  },
  rideDetails: {
    borderTopWidth: 1,
    borderTopColor: colors.lapisLazuli,
    paddingVertical: 20,
    marginTop: 20,
  },
  paymentDetails: {
    borderTopWidth: 1,
    borderTopColor: colors.lapisLazuli,
    paddingVertical: 20,
  },
  total: {
    fontFamily: 'Roboto-Bold',
    borderTopWidth: 1,
    borderTopColor: colors.lapisLazuli,
    paddingTop: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    // borderWidth: 1,

  },
  label: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    color: colors.ultraViolet
  },
  value: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  }
});

export default RideReceipt;
