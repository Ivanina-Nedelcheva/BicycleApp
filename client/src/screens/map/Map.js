import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, StatusBar, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { throttle } from 'lodash';

import NearestHubs from '../../components/NearestHubs';
import CustomButton from '../../components/CustomButton'
import stationsData from '../../stations.json'
import { colors } from '../../../styles/styles'

import axios from 'axios'

const Map = ({ navigation }) => {
	// const url = 'http://192.168.1.168:8080/app/stations/getAllStations'

	// useEffect(() => {
	// 	axios.get(url)
	// 		.then(function (response) {
	// 			// handle success
	// 			// console.log(response.data);
	// 			setStations(response.data)

	// 		})
	// 		.catch(function (error) {
	// 			// handle error
	// 			console.log(error);
	// 		})
	// }, [])
	const [region, setRegion] = useState({})
	const [currentUserPosition, setCurrentUserPosition] = useState({});
	const [errorMsg, setErrorMsg] = useState('');

	const hubsRef = useRef();
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

	const { stations } = stationsData

	const handleOpenDrawer = () => {
		navigation.openDrawer();
	};

	const handleRegionChange = (newRegion) => {
		throttleSetCurrentRegion(newRegion)
	};

	const throttleSetCurrentRegion = throttle((newRegion) => {
		setRegion(newRegion);
	}, 100);

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
		return location
	};

	const centerCamera = () => {
		if (currentUserPosition) {
			mapRef.current.animateCamera({
				center: currentUserPosition,
				zoom: 15,
				heading: 0,
			})
		}
	}

	const locateStation = (hub) => {
		mapRef.current.animateToRegion({
			latitude: hub.latitude,
			longitude: hub.longitude,
			latitudeDelta: 0.03,
			longitudeDelta: 0.04,
		}, 1000);
	};

	useEffect(() => {
		async function fetchDataAndProcess() {
			try {
				const position = await updateCurrentPosition();
				setCurrentUserPosition({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					latitudeDelta: 0.03,
					longitudeDelta: 0.04,
				})

				// console.log('Updated user position:', {
				// 	latitude: position.coords.latitude.toFixed(3),
				// 	longitude: position.coords.longitude.toFixed(3),
				// });
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		}

		const interval = setInterval(() => {
			fetchDataAndProcess()
		}, 3000);
		return () => clearInterval(interval)
	}, [])

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
				{stations.map((station, index) => (
					<Marker
						coordinate={{
							latitude: station.latitude,
							longitude: station.longitude,
						}}
						key={index}
						onPress={() => navigation.navigate('BikeSelect', { station })}
					>
						{region.longitudeDelta > 0.2 || region.latitudeDelta > 0.2 ? (
							<View style={styles.stationDot} />
						) : (
							<View>
								<Image
									source={require('../../../assets/images/bike-icon2.png')}
									style={styles.stationIcon}
								/>
							</View>
						)}
					</Marker>
				))}
			</MapView>

			<View style={styles.uppperBtnsWrapper}>
				<CustomButton
					icon="account"
					color="white"
					onPress={() => handleOpenDrawer()}
					magicNumber={0.12}
				/>

				{errorMsg && <Text style={styles.errorMessage}>{errorMsg}</Text>}

				<CustomButton
					icon="navigation-variant"
					color="white"
					onPress={() => centerCamera()}
					magicNumber={0.12}
				/>
			</View>

			<View style={styles.bottomBtnsWrapper}>
				<CustomButton
					icon="hubspot"
					color="white"
					magicNumber={0.12}
					onPress={() => hubsRef.current.presentBottomSheet()}
				/>
			</View>

			<NearestHubs userPosition={currentUserPosition} ref={hubsRef} stations={stations} onSelectStation={locateStation} />
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
		paddingHorizontal: 20,
		bottom: StatusBar.currentHeight,
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