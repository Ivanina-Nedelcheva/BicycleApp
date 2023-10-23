import React, { useState, useContext, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';
import { colors } from '../../../styles/styles'
import { useAuth } from '../../context/AuthContext';

const SignIn = ({ navigation }) => {
  const { login } = useAuth()
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    login(values)
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ username: 'ivanina@test.com', password: '123456' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, isValid, errors, dirty }) => (
          <View style={styles.form}>
            <View>
              <TextInput
                value={values.username}
                onChangeText={handleChange('username')}
                placeholder="Email"
                keyboardType="email-address"
                style={styles.input}
              />

              {values.username && !errors.username && (
                <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.keppel} style={styles.inputIcon} />
              )}
            </View>
            {errors.username && <Text style={styles.errorMessage}>{errors.username}</Text>}

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

            <CustomButton
              title="Log in"
              color={colors.bleuDeFrance}
              onPress={handleSubmit}
              magicNumber={0.8}
              // disabled={!dirty || !isValid}
              disabled={!isValid}
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