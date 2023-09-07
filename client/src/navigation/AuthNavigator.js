import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { Auth, SignIn, SignUp, BikeSelect } from '../screens'
import MapNavigator from "./MapNavigator"

const Stack = createStackNavigator();
const screenOptionStyle = {
	// headerStyle: {
	// 	backgroundColor: "#9AC4F8",
	// },
	// headerTintColor: "black",
	// headerBackTitle: "Back",
};
const AuthNavigator = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			{/* options={{ headerTransparent: true }} */}
			<Stack.Screen name="Auth" component={Auth} />
			<Stack.Screen name="Sign In" component={SignIn} />
			<Stack.Screen name="Sign Up" component={SignUp} />
			<Stack.Screen name="MapNavigator" component={MapNavigator} options={{ headerShown: false }} />
			<Stack.Screen name="BikeSelect" component={BikeSelect} options={{ headerTitle: 'Select a bike' }} />
		</Stack.Navigator>
	)
}

export default AuthNavigator




