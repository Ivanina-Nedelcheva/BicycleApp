import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { LandingScreen, SignIn, SignUp, BikeSelect, ReportIssue } from '../screens'

const Stack = createStackNavigator();
const screenOptionStyle = {
	// headerStyle: {
	// 	backgroundColor: "#9AC4F8",
	// },
	// headerTintColor: "black",
	// headerBackTitle: "Back",
};
const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false }} />
			<Stack.Screen name="Sign In" component={SignIn} />
			<Stack.Screen name="Sign Up" component={SignUp} />
			{/* <Stack.Screen name="MapNavigator" component={MapNavigator} options={{ headerShown: false }} /> */}
			{/* <Stack.Screen name="BikeSelect" component={BikeSelect} options={{ headerTitle: 'Select a bike' }} /> */}
			{/* <Stack.Screen name="ReportIssue" component={ReportIssue} options={{ headerTitle: 'Report issue' }} /> */}
		</Stack.Navigator>
	)
}

export default AuthStack




