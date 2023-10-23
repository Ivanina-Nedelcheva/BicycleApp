import React, { useState, useEffect, useRef, useCallback } from 'react';
import { StyleSheet, Text, View, StatusBar, Image, Alert, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { throttle } from 'lodash';
import NearestHubs from '../../components/NearestHubs';
import CustomButton from '../../components/CustomButton'
import Scanner from '../../components/Scanner'
import RideProgress from '../../components/RideProgress';
import { getStations } from '../../api/stations';
import { useAuth } from '../../context/AuthContext';
import { useRent } from '../../context/RentContext';
import { useCard } from '../../context/CardContext';
import { colors } from '../../../styles/styles'

const Map = ({ route, navigation }) => {
	const [region, setRegion] = useState({})
	const [currentUserPosition, setCurrentUserPosition] = useState(null);
	const [errorMsg, setErrorMsg] = useState('');
	const [isScannerOpen, setScannerOpen] = useState(false);
	const [stations, setStations] = useState([])

	const { userRole } = useAuth()
	const { isRented } = useRent()
	const { isCard } = useCard()

	const hubsRef = useRef();
	const rideRef = useRef();
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

	useEffect(() => {
		if (route.params?.center) centerCamera()
		if (isRented && isCard) Alert.alert('Ride started!', null, [{
			onPress: () => {
				rideRef.current.presentBottomSheet()
				centerCamera()
			}
		}])
		if (route.params?.openScanner) setScannerOpen(true)
	}, [route.params, isRented, isCard])

	const updateCurrentPosition = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			setErrorMsg('Permission to access location was denied')
			return;
		}

		let location = await Location.getCurrentPositionAsync({});
		return location
	};

	async function handleGetStations() {
		const data = await getStations();
		setStations(data)
	}

	async function getCurrentPosition() {
		try {
			const position = await updateCurrentPosition();
			setCurrentUserPosition({
				latitude: position.coords.latitude,
				longitude: position.coords.longitude,
				latitudeDelta: 0.03,
				longitudeDelta: 0.04,
			})
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	}

	useFocusEffect(
		useCallback(() => {
			handleGetStations()
			getCurrentPosition()
		}, [])
	);

	const handleOpenDrawer = () => {
		navigation.openDrawer();
	};

	const handleRegionChange = (newRegion) => {
		throttleSetCurrentRegion(newRegion)
	};

	const throttleSetCurrentRegion = throttle((newRegion) => {
		setRegion(newRegion);
	}, 100);

	const centerCamera = () => {
		if (currentUserPosition) {
			mapRef.current.animateCamera({
				center: currentUserPosition,
				zoom: 15,
				heading: 0,
			}, 1000)
		}
	}

	const locateStation = (hub) => {
		mapRef.current.animateToRegion({
			latitude: hub.latitude,
			longitude: hub.longitude,
			latitudeDelta: 0.006,
			longitudeDelta: 0.008,
		}, 1000);
	};

	const toggleScanner = () => {
		setScannerOpen(!isScannerOpen);
	};

	return (
		<View iew style={styles.container}>
			{stations.length ? (
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
							onPress={() => navigation.navigate('Station', { stationId: station.id })}
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
			) : (
				<ActivityIndicator style={styles.spinner} size={60} color={colors.bleuDeFrance} />
			)}

			<Scanner isOpen={isScannerOpen} onToggle={setScannerOpen} navigation={navigation} />

			<View style={styles.uppperBtnsWrapper}>
				<CustomButton
					icon="cog"
					color="white"
					onPress={() => handleOpenDrawer()}
					magicNumber={0.125}
				/>
				{errorMsg && <Text style={styles.errorMessage}>{errorMsg}</Text>}

				<CustomButton
					icon="navigation-variant"
					color="white"
					onPress={() => centerCamera()}
					magicNumber={0.125}
				/>
			</View>

			<View style={styles.bottomBtnsWrapper}>
				{isRented &&
					<CustomButton
						icon="bike-fast"
						color="white"
						magicNumber={0.125}
						onPress={() => rideRef.current.presentBottomSheet()}
					/>
				}

				{!isRented && currentUserPosition &&
					<CustomButton
						icon="hubspot"
						color="white"
						magicNumber={0.125}
						onPress={() => hubsRef.current.presentBottomSheet()}
					/>
				}

				{!isRented && userRole === "ROLE_ORDINARY_USER" &&
					<CustomButton
						icon="qrcode-scan"
						color="white"
						magicNumber={0.125}
						onPress={toggleScanner}
					/>
				}
			</View>

			{isRented ? (
				<RideProgress ref={rideRef}></RideProgress>
			) : (
				<NearestHubs userPosition={currentUserPosition} ref={hubsRef} stations={stations} onSelectStation={locateStation} />
			)}
		</View >
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		...StyleSheet.absoluteFillObject,
		justifyContent: 'center'
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
		backgroundColor: colors.ultraViolet,
		borderWidth: 2,
		borderColor: 'white',
	},
	stationIcon: {
		width: 38,
		height: 38,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: 'white',
		backgroundColor: colors.columbiaBlue,
	},
	errorMessage: {
		maxWidth: 26 * 8,
		fontSize: 22,
		color: colors.red,
		textAlign: 'center'
	},
});

export default Map