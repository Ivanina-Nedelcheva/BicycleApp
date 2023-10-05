import React from 'react';
import { StyleSheet, View, TextInput, Text, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from '../../components/CustomButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { colors } from '../../../styles/styles';
import { addStation } from '../../api/stations';


const AddStation = ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    longitude: Yup.string().required('Longitude is required'),
    latitude: Yup.string().required('Latitude is required'),
    stationName: Yup.string().required('Station name is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    addStation(values)
    Alert.alert('Тhe station has been added', null, [{ onPress: () => navigation.navigate('Map', { update: true }) }])
  };

  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ longitude: null, latitude: null, stationName: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleSubmit, values, isValid, errors, touched, dirty }) => (
          <View style={styles.form}>
            <View>
              <TextInput
                value={values.stationName}
                onChangeText={handleChange('stationName')}
                placeholder="Station name"
                style={styles.input}
              />

              {values.stationName && !errors.stationName && (
                <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.keppel} style={styles.inputIcon} />
              )}
            </View>
            {errors.stationName && <Text style={styles.errorMessage}>{errors.stationName}</Text>}

            <View>
              <TextInput
                value={values.longitude}
                onChangeText={handleChange('longitude')}
                keyboardType='numeric'
                placeholder="Longitude"
                style={styles.input}
              />

              {values.longitude && !errors.longitude && (
                <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.keppel} style={styles.inputIcon} />
              )}
            </View>
            {errors.longitude && <Text style={styles.errorMessage}>{errors.longitude}</Text>}

            <View>
              <TextInput
                value={values.latitude}
                onChangeText={handleChange('latitude')}
                placeholder="Latitude"
                keyboardType='numeric'
                style={styles.input}
              />

              {values.latitude && !errors.latitude && (
                <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.keppel} style={styles.inputIcon} />
              )}
            </View>
            {errors.latitude && <Text style={styles.errorMessage}>{errors.latitude}</Text>}

            <CustomButton
              title="Add"
              color={colors.bleuDeFrance}
              onPress={() => handleSubmit(values)}
              magicNumber={0.8}
              disabled={!dirty || !isValid}
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

export default AddStation
