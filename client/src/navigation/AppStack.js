import React from "react"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Map, Profile, History, Payment, BikeReports, Station, ReportIssue, AddStation, Inquiry, Checkout } from '../screens'
import CustomButton from "../components/CustomButton";
import { useAuth } from "../context/AuthContext";
import CustomDrawer from "../components/CustomDrawer";
import { colors } from "../../styles/styles";

const Drawer = createDrawerNavigator();
const AppStack = () => {
  const drawerLabelStyle = {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    textAlign: 'center',
    color: colors.bleuDeFrance,
  }
  const { userRole } = useAuth()

  const screens = [
    {
      name: 'Map',
      component: Map,
      icon: ['map-marker', 'map-marker-outline'],
      visible: true,
      options: {
        headerShown: false,
        drawerLabelStyle,
      },
    },
    {
      name: 'Profile',
      component: Profile,
      icon: ['account', 'account-outline'],
      visible: true,
      options: {
        drawerLabelStyle,
      },
    },
    {
      name: 'Inquiry',
      component: Inquiry,
      icon: ['animation', 'animation-outline'],
      visible: userRole !== "ROLE_ORDINARY_USER",
      options: {
        drawerLabelStyle,
      },
    },
    {
      name: 'History',
      component: History,
      icon: ['history', 'history'],
      visible: userRole !== "ROLE_SYSTEM_ADMIN" && userRole !== "ROLE_OBSERVER",
      options: {
        drawerLabelStyle,
      },
    },
    {
      name: 'Payment',
      component: Payment,
      icon: ['wallet', 'wallet-outline'],
      visible: userRole !== "ROLE_SYSTEM_ADMIN" && userRole !== "ROLE_OBSERVER",
      options: {
        drawerLabelStyle,
      },
    },
    {
      name: 'Bicycle Reports',
      component: BikeReports,
      icon: ['alert', 'alert-outline'],
      visible: userRole !== "ROLE_ORDINARY_USER" && userRole !== "ROLE_OBSERVER",
      options: {
        drawerLabelStyle,
      },
    },
    {
      name: 'Add Station',
      component: AddStation,
      icon: ['hubspot', 'hubspot'],
      visible: userRole !== "ROLE_ORDINARY_USER" && userRole !== "ROLE_OBSERVER",
      options: {
        drawerLabelStyle,
      },
    },
    {
      name: 'Station',
      component: Station,
      icon: ['bicycle', 'bicycle'],
      visible: true,
    },
    {
      name: 'Report Issue',
      component: ReportIssue,
      icon: ['alert-circle', 'alert-circle-outline'],
      visible: true,
    },
    // {
    //   name: 'Checkout',
    //   component: Checkout,
    //   icon: ['alert-circle', 'alert-circle-outline'],
    //   visible: true,
    // },
  ];


  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props} backBehavior={'history'} screens={screens} />}>
      {
        screens.filter(screen => screen.visible).map((screen) => (
          <Drawer.Screen
            key={screen.name}
            name={screen.name}
            component={screen.component}
            options={({ navigation }) => {
              if (screen.name === 'Station' || screen.name === 'Report Issue') {
                return {
                  drawerLabel: () => null,
                  drawerIcon: () => null,
                  headerLeft: () => (
                    <CustomButton
                      icon="arrow-left"
                      color="white"
                      magicNumber={0.12}
                      onPress={() => {
                        navigation.goBack()
                      }}
                    />
                  ),
                };
              }
              return screen.options;
            }}
          />
        ))
      }
    </Drawer.Navigator >
  );
};

export default AppStack