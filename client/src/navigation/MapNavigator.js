import React from "react"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Map, Profile, History } from '../screens'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const MapNavigator = () => {
  const drawerLabelStyle = {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    textAlign: 'center',
  }

  return (
    <Drawer.Navigator backBehavior={'order'}>
      <Drawer.Screen
        name="Map"
        component={Map}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name={focused ? 'map-marker' : 'map-marker-outline'} color={color} size={size} />
          ),
          drawerLabelStyle,
          // drawerActiveTintColor: 'blue',
          // drawerInactiveTintColor: 'red',

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
    </Drawer.Navigator >
  );
};

export default MapNavigator