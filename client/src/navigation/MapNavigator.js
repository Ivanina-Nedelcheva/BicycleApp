import React from "react"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Map, Profile, History, Payment, BikeReports } from '../screens'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from "../../styles/styles";

const Drawer = createDrawerNavigator();
const MapNavigator = () => {
  const drawerLabelStyle = {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    textAlign: 'center',
  }

  return (
    <Drawer.Navigator
      backBehavior={'history'}
    >
      <Drawer.Screen
        name="Map"
        component={Map}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'map-marker' : 'map-marker-outline'} color={color} size={size} />
          ),
          drawerLabelStyle,
        }} />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'account' : 'account-outline'} color={color} size={size} />
          ),
          drawerLabelStyle
        }} />

      <Drawer.Screen
        name="History"
        component={History}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'history' : 'history'} size={size} color={color} />),
          drawerLabelStyle
        }} />

      <Drawer.Screen
        name="Payment"
        component={Payment}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'wallet' : 'wallet-outline'} size={size} color={color} />),
          drawerLabelStyle
        }} />

      <Drawer.Screen
        name="Bike Reports"
        component={BikeReports}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'alert' : 'alert-outline'} size={size} color={color} />),
          drawerLabelStyle
        }} />
    </Drawer.Navigator >
  );
};

export default MapNavigator