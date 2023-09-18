import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getReports } from '../../api/reports';
import { colors } from '../../../styles/styles';

const BikeReport = ({ navigation }) => {
  const [userReports, setUserReports] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getReports();
        setUserReports(data);
      } catch (error) {
        console.error('Error in useEffect:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const dayName = dateObj.toLocaleString('en-US', { weekday: 'long' });
    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    const formattedDate = `${dayName}, ${day} ${month}, ${year}`;
    return formattedDate;
  };

  const openImageModal = (image) => {
    setSelectedImage(image);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  console.log(userReports);

  return (
    <View style={styles.container}>
      {!userReports.length ? (
        <View style={styles.indicator}>
          <ActivityIndicator size={100} color={colors.primary} />
        </View>
      ) : (
        <ScrollView>
          <Text style={styles.heading}>Ivanina Nedelcheva</Text>
          {userReports.map((report, idx) => {
            return (
              <View style={styles.report} key={idx}>
                <Text style={styles.date}>{formatDate(report.date)}</Text>
                <Text style={styles.attribute}>Bike ID: {report.bicycle.id}</Text>
                <Text style={styles.attribute}>Damage: {report.faultText}</Text>
                <TouchableOpacity onPress={() => openImageModal(report.imageData)}>
                  <View style={styles.imageWrapper}>
                    <Image
                      source={require('../../../assets/images/b1.jpg')}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeImageModal}
          >
            <MaterialCommunityIcons name="close" size={30} color="white" />
          </TouchableOpacity>
          {selectedImage && (
            <Image
              // source={{ uri: `data:image/jpeg;base64,${selectedImage}` }}
              source={require('../../../assets/images/b1.jpg')}

              style={styles.modalImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.aliceblue,
  },
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  report: {
    gap: 5,
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    borderColor: colors.primary,
  },
  date: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
  },
  heading: {
    fontFamily: 'Roboto-Regular',
    fontSize: 28,
  },
  attribute: {
    fontFamily: 'Roboto-Bold',
  },
  imageWrapper: {
    // alignSelf: 'center',
    width: 200,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: 100,
    width: '100%',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '90%',
    height: '90%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  text: {
    fontFamily: 'Roboto-Regular',
    fontSize: 18,
    marginTop: 16,
  },
});

export default BikeReport;
