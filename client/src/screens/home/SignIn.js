import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyleSheet, View, Text, Image, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';
import { colors } from '../../../styles/styles'
import { AuthContext } from '../../context/AuthContext';

const SignIn = ({ navigation }) => {
  const { login } = useContext(AuthContext)
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [err, setErr] = useState(false)
  const password = 'asd'

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values)

    login(values)


    // if (values.password == password) {
    //     setTimeout(() => {
    //         resetForm()
    //     }, 1500);
    // } else {
    //     setErr(true)
    //     setTimeout(() => {
    //         setErr(false)
    //     }, 1000);
    // }
  };

  return (
    <View style={styles.container}>
      {/* <Image
        style={styles.image}
        source={require('../../../assets/images/bike3.jpg')}
      /> */}

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, errors, touched, dirty }) => (
          <View style={styles.form}>
            <View>
              <TextInput
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder="Email"
                keyboardType="email-address"
                style={styles.input}
              />

              {values.email && !errors.email && (
                <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.keppel} style={styles.inputIcon} />
              )}
            </View>
            {errors.email && <Text style={styles.errorMessage}>{errors.email}</Text>}

            <View>
              <TextInput
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="Password"
                secureTextEntry={!passwordVisible}
                style={[styles.input, { paddingRight: 40, overflow: 'hidden', }]}
              />
              <MaterialCommunityIcons
                name={passwordVisible ? 'eye' : 'eye-off'}
                size={20}
                color="#888"
                style={styles.inputIcon}
                onPress={togglePasswordVisibility}
              />
            </View>
            {errors.password && <Text style={styles.errorMessage}>{errors.password}</Text>}

            {err && <Text style={styles.errorMessage}>Wrong password!</Text>}
            <CustomButton
              title="Log in"
              color={colors.bleuDeFrance}
              onPress={handleSubmit}
              magicNumber={0.8}
            // disabled={!dirty || !isValid}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    backgroundColor: colors.seasalt
  },
  form: {
    width: '80%',
    gap: 10
  },
  input: {
    fontFamily: 'Roboto-Regular',
    borderWidth: 1,
    borderColor: colors.slateGray,
    flexDirection: 'row',
    paddingHorizontal: 20,
    borderRadius: 100,
    paddingVertical: 12,
    backgroundColor: colors.antiFlashWhite,
    maxWidth: '100%',
  },
  image: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  inputIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  errorMessage: {
    fontFamily: 'Roboto-Regular',
    color: colors.red
  }
});

export default SignIn