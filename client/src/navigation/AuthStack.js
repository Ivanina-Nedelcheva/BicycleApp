import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { LandingScreen, SignIn, SignUp, DOB } from '../screens'

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
			<Stack.Screen name="SignIn" component={SignIn} />
			<Stack.Screen name="SignUp" component={SignUp} />
		</Stack.Navigator>
	)
}

export default AuthStack




