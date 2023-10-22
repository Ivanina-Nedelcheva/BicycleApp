import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { StripeProvider, CardForm, useConfirmPayment, confirmPayment } from '@stripe/stripe-react-native'
import { colors } from '../../styles/styles'
import CustomButton from './CustomButton'
import Scanner from './Scanner';
import { useCard } from '../context/CardContext'
import { useRent } from '../context/RentContext';
import { rentBicycle } from '../api/users';
import { useAuth } from '../context/AuthContext';

const CardInformation = ({ navigation, route }) => {
  const { isCard, setIsCard } = useCard()
  const { isRented, setIsRented, rentedBikeId } = useRent()
  const { userInfo } = useAuth()
  const [isScannerOpen, setScannerOpen] = useState(false);
  const [cardDetails, setCardDetails] = useState();
  const [loading, setLoading] = useState(false);

  const toggleScanner = () => {
    setScannerOpen(!isScannerOpen);
  };

  function addCardInfo() {
    if (isCard && cardDetails?.complete) {
      Alert.alert("Card Successfully Updated!")
      return
    }

    if (!cardDetails?.complete) {
      Alert.alert('Please enter complete information!')
      return
    }

    if (!route.params && !isRented && cardDetails?.complete) {
      setIsCard(true)
      Alert.alert("Card Successfully Added!", "You can now use this card for future transactions.", [{ onPress: () => navigation.navigate('Map') }])
    }

    if (isRented && cardDetails?.complete) {
      setIsCard(true)
      rentBicycle(userInfo.id, rentedBikeId)
      setIsRented(true)
      navigation.navigate('Map')
    }

    if (route.params?.isScanned && cardDetails?.complete) {
      setIsCard(true)
      rentBicycle(userInfo.id, rentedBikeId)
      setIsRented(true)
      navigation.navigate('Map')
    }
  }

  // async function fetchPaymentIntentClientSecret() {
  //   const response = await fetch(`${API_URL}/create-payment-intent`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     }
  //   })

  //   const { clientSecret } = await response.json()
  //   return clientSecret
  // }

  // async function addCardInfo() {
  //   console.log(cardDetails);
  //   if (!cardDetails?.complete) {
  //     Alert.alert('Please enter complete information')
  //     return
  //   }

  //   try {
  //     const { clientSecret, error } = await fetchPaymentIntentClientSecret()
  //     if (error) {
  //       console.log("Unable to process payment");
  //     } else {
  //       const { paymentIntent, error } = await confirmPayment(clientSecret, {
  //         type: "Card",
  //         // billingDetails,
  //       })

  //       setLoading(true)

  //       if (error) {
  //         Alert.alert(`Payment Confirmation Error ${error.message}`)
  //       } else if (paymentIntent) {
  //         Alert.alert("Payment Successful")
  //         console.log("Payment Successful", paymentIntent);
  //       }
  //     }

  //   } catch (err) {
  //     console.log(err);
  //   }

  //   setLoading(false)
  // }

  return (
    <StripeProvider
      publishableKey='pk_test_51NnnXsAuLrQ7LW7PtEYUeu7x05TD1SVKR6UFBw5CN6hVhiaVQgdIuvK64dh5gGCJZYqzP2xVS2VrpSxc3OUD0B4P00JW4PHKD1'
    >
      <View style={styles.container}>
        <CardForm
          style={styles.cardForm}
          cardStyle={{ borderRadius: 5, fontFamily: 'Roboto-Regular' }}
          // postalCodeEnabled={false}
          onFormComplete={(details) => setCardDetails(details)}
        />

        <CustomButton
          title="Confirm"
          color={colors.bleuDeFrance}
          onPress={addCardInfo}
          magicNumber={0.4}
          style={styles.btn}
          disabled={loading}
        />

        <Scanner isOpen={isScannerOpen} onToggle={setScannerOpen} navigation={navigation} />
      </View>
    </StripeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  heading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 22,
  },
  input: {
    fontFamily: 'Roboto-Regular',
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: 100,
    paddingVertical: 12,
    backgroundColor: 'white',
    maxWidth: '100%',
  },
  cardForm: {
    height: 260,
    marginTop: 40,
  },
  btnContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: 20
  },
  btn: {
    marginTop: 20,
    alignSelf: 'center'
  },
});

export default CardInformation;
