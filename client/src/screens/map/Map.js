import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import CustomButton from '../../components/CustomButton'
import * as Location from 'expo-location';
import { throttle } from 'lodash';
import { colors } from '../../../styles/styles'
import stationsData from '../../stations.json'

import axios from 'axios'


const Map = ({ navigation }) => {
	const url = 'http://localhost:8080/app/stations/getStations'

	useEffect(() => {
		axios.get('http://localhost:8080/app/stations/getStations')
			.then(function (response) {
				// handle success
				console.log(response);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
	}, [])



	const mapRef = useRef()
	const sofiaCity = {
		latitude: 42.69833,
		longitude: 23.319941,
		latitudeDelta: 0.08,
		longitudeDelta: 0.07,
	}
	const mapPadding = {
		top: 0,
		right: 0,
		bottom: 70,
		left: 0,
	}
	const [region, setRegion] = useState({})
	const [currentUserPosition, setCurrentUserPosition] = useState({});
	const [errorMsg, setErrorMsg] = useState('');
	const [selectedStation, setSelectedStation] = useState({});
	const bottomSheetRef = useRef(null);


	const handleMarkerClick = (station) => {
		setSelectedStation(station);
		bottomSheetRef.current?.present();
	};

	const handleOpenDrawer = () => {
		navigation.openDrawer();
	};

	const handleRegionChange = (newRegion) => {
		throttleSetCurrentRegion(newRegion)
	};

	const throttleSetCurrentRegion = throttle((newRegion) => {
		setRegion(newRegion);
	}, 100);

	function generateRandomLocation() {
		const longitude = 23.1850 + Math.random() * 0.3;  // Sofia longitude boundaries
		const latitude = 42.6500 + Math.random() * 0.1;   // Sofia latitude boundaries
		return { longitude, latitude };
	}

	const updateCurrentPosition = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied');
			setTimeout(() => {
				setErrorMsg('')
			}, 1200);
			return;
		}

		let location = await Location.getCurrentPositionAsync({});

		setCurrentUserPosition({
			latitude: location.coords.latitude,
			longitude: location.coords.longitude,
			latitudeDelta: 0.03,
			longitudeDelta: 0.04,
		})
	};

	const centerCamera = () => {
		console.log(currentUserPosition);
		if (currentUserPosition) {
			mapRef.current.animateCamera({
				center: currentUserPosition,
				zoom: 15,
				heading: 0,
				// pitch: 45
			})
		}
	}

	useEffect(() => {
		const interval = setInterval(() => {
			updateCurrentPosition()
		}, 5000);
		return () => clearInterval(interval)
	})

	return (
		<View style={styles.container}>
			<MapView
				ref={mapRef}
				style={styles.map}
				scrollEnabled={true}
				zoomEnabled={true}
				showsUserLocation={true}
				followsUserLocation={true}
				showsMyLocationButton={false}
				showsCompass={false}
				onRegionChange={handleRegionChange}
				mapPadding={mapPadding}
				initialRegion={sofiaCity}
			>
				{stationsData.stations.map((station, index) => (
					<Marker
						coordinate={{ latitude: station.latitude, longitude: station.longitude }}
						key={index}
						// onPress={() => handleMarkerClick(station)}
						onPress={() => navigation.navigate('BikeSelect', { station })}

					>
						{(region.longitudeDelta < 0.2 || region.latitudeDelta < 0.2) ?
							<View>
								<Image
									source={require('../../../assets/images/bike-icon2.png')}
									style={styles.stationIcon}
								/>
							</View> : <View style={styles.stationDot} />
						}
					</Marker>
				))}
			</MapView>

			{/* <Station
				id={selectedStation.id}
				lat={selectedStation.latitude}
				long={selectedStation.longitude}
				activeFlag={selectedStation.active_flag}
				district={selectedStation.district}
				bottomSheetRef={bottomSheetRef}
			/> */}

			<View style={styles.uppperBtnsWrapper}>
				<CustomButton
					icon="user"
					color="white"
					onPress={() => handleOpenDrawer()}
					magicNumber={0.12}
				/>

				{errorMsg && <Text style={styles.errorMessage}>{errorMsg}</Text>}

				<CustomButton
					icon="navigation"
					color="white"
					onPress={centerCamera}
					magicNumber={0.12}
				/>
			</View>

			<View style={styles.bottomBtnsWrapper}>
				{/* <CustomButton
					icon="addusergroup"
					title="Add Group"
					color="white"
					onPress={handleButtonPress}
					magicNumber={0.45}
				/> */}

				<CustomButton
					icon="scan1"
					title=" Add code"
					color="hsl(160, 80%, 45%)"
					magicNumber={0.45}
				/>
			</View>
		</View >
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		...StyleSheet.absoluteFillObject,
	},
	map: {
		flex: 1,
		pointerEvents: 'auto'
	},
	uppperBtnsWrapper: {
		width: '100%',
		flexDirection: 'row',
		position: 'absolute',
		paddingHorizontal: 20,
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		top: StatusBar.currentHeight * 2,
		pointerEvents: 'box-none'
	},
	bottomBtnsWrapper: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'absolute',
		paddingHorizontal: 10,
		bottom: 10
	},
	stationDot: {
		width: 16,
		height: 16,
		borderRadius: 50,
		backgroundColor: colors.primary,
		borderWidth: 2,
		borderColor: 'white',
	},
	stationIcon: {
		width: 38,
		height: 38,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: 'white',
		backgroundColor: colors.primary,
	},
	errorMessage: {
		maxWidth: 26 * 8,
		fontSize: 22,
		color: colors.red,
		textAlign: 'center'
	}
});

export default Map