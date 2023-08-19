import React from "react"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Map, Profile, History } from '../screens'
import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();
const MapNavigator = () => {

  const screenOptions = {
    drawerActiveTintColor: 'blue',
    drawerInactiveTintColor: 'gray',
    drawerLabelStyle: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    drawerStyle: {
      backgroundColor: '#f1f1f1',
    },
  };

  const drawerLabelStyle = {
    fontSize: 16,
    fontWeight: 'bold',
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
            <Ionicons name={focused ? 'map' : 'map-outline'} color={color} size={size} />
          ),
          drawerLabelStyle
        }} />
      <Drawer.Screen
        name="Profile"
        component={Profile}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={size} />
          ),
          drawerLabelStyle
        }} />

      <Drawer.Screen
        name="History"
        component={History}
        options={{
          drawerIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? 'time' : 'time-outline'} size={size} color={color} />),
          drawerLabelStyle
        }} />
    </Drawer.Navigator >
  );
};

export default MapNavigator