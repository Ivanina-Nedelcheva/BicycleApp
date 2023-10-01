import React, { useState, useEffect } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';
import { colors } from '../../styles/styles';
import { getPrices } from '../api/payment';

const RideReceipt = ({ rideRecord, onClose }) => {
  const [prices, setPrices] = useState({})

  useEffect(() => {
    (async () => {
      const data = await getPrices()
      console.log(data);
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
          <DetailRow label="Date:" value={rideRecord.date} />
          <DetailRow label="Time Period:" value={rideRecord.timePeriod} />
          <DetailRow label="Distance:" value={rideRecord.distance} />
          <DetailRow label="Time:" value={`${rideRecord.time}min`} />
        </View>

        <View style={styles.paymentDetails}>
          <DetailRow label="Unlock Fee:" value={`${prices.unlockPrice?.toFixed(2)}lv`} />
          <DetailRow label={`Riding - ${prices.minutePrice?.toFixed(2)} lv./min`} value={`${(rideRecord.time * prices.minutePrice)?.toFixed(2)}lv`} />
          <DetailRow label="Total (excl. VAT):" value={`${rideRecord.cost}lv`} />
          <DetailRow label="VAT - 20%:" value={`${(rideRecord.cost * 0.2).toFixed(2)}lv`} />
        </View>

        <View style={styles.total}>
          <DetailRow label="Total:" value={`${(rideRecord.cost * 1.2).toFixed(2)}lv`} />
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
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
  }
});

export default RideReceipt;
