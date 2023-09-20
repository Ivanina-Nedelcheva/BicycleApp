import React from 'react';
import { StyleSheet, SafeAreaView, View, Image } from 'react-native';
import CustomButton from '../../components/CustomButton';
import { colors } from '../../../styles/styles.js'

const Auth = ({ navigation }) => {
  navigation.canGoBack(false)

  return (
    <SafeAreaView style={styles.container}>
      {/* <Image
        style={styles.image}
        source={require('../../../assets/images/bike.jpg')}
      /> */}

      <View style={styles.buttonWrapper}>
        <CustomButton
          title="Sign up"
          color={colors.bleuDeFrance}
          onPress={() => navigation.navigate('Sign Up')}
          magicNumber={0.8}
        />

        <CustomButton
          title="Sign in"
          color={colors.bleuDeFrance}
          onPress={() => navigation.navigate('Sign In')}
          magicNumber={0.8}
        />


        {/* <CustomButton
          title="Report"
          color={colors.lightYellow}
          onPress={() => navigation.navigate('MapNavigator')}
          magicNumber={0.8}
        />

        <CustomButton
          title="Report"
          color={colors.lightGreen}
          onPress={() => navigation.navigate('MapNavigator')}
          magicNumber={0.8}
        />

        <CustomButton
          title="Report"
          color={colors.keppel}
          onPress={() => navigation.navigate('MapNavigator')}
          magicNumber={0.8}
        /> */}
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.lightYellow
  },
  buttonWrapper: {
    position: 'absolute',
    width: '80%',
    gap: 10,
    top: 120,
  },
  image: {
    position: 'absolute',
    resizeMode: 'cover',
  }
});

export default Auth