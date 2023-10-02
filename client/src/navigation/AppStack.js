import React from "react"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Map, Profile, History, Payment, BikeReports, BikeSelect, ReportIssue } from '../screens'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from "../components/CustomButton";

const Drawer = createDrawerNavigator();
const AppStack = () => {
  const drawerLabelStyle = {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    textAlign: 'center',
  }

  const isAdmin = false


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

      <Drawer.Screen
        name="Bike Select"
        component={BikeSelect}
        options={({ navigation }) => (
          {
            drawerLabel: () => null,
            drawerIcon: () => null,
            headerLeft: () => (
              <CustomButton
                icon="arrow-left"
                color="white"
                magicNumber={0.12}
                onPress={() => navigation.goBack()}
              />
            ),
          }
        )} />

      <Drawer.Screen
        name="Report Issue"
        component={ReportIssue}
        options={({ navigation }) => (
          {
            drawerLabel: () => null,
            drawerIcon: () => null,
            headerLeft: () => (
              <CustomButton
                icon="arrow-left"
                color="white"
                magicNumber={0.12}
                onPress={() => navigation.goBack()}
              />
            ),
          }
        )} />
    </Drawer.Navigator >
  );
};

export default AppStack