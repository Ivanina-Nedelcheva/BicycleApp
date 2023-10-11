import React, { useContext } from "react"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, useDrawerStatus } from '@react-navigation/drawer';
import { Map, Profile, History, Payment, BikeReports, BikeSelect, ReportIssue, AddStation } from '../screens'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomButton from "../components/CustomButton";
import { AuthContext } from "../context/AuthContext";
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

  const { userInfo } = useContext(AuthContext)

  console.log(userInfo?.userRole);
  const role = userInfo?.userRole

  const SYSTEM_ADMIN = "ROLE_SYSTEM_ADMIN"
  const ORDINARY_USER = "ROLE_ORDINARY_USER"
  const OBSERVER = "ROLE_OBSERVER"
  const TECH_SUPPORT_MEMBER = "ROLE_TECH_SUPPORT_MEMBER"

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
      name: 'History',
      component: History,
      icon: ['history', 'history'],
      visible: role !== SYSTEM_ADMIN,
      options: {
        drawerLabelStyle,
      },
    },
    {
      name: 'Payment',
      component: Payment,
      icon: ['wallet', 'wallet-outline'],
      visible: role !== SYSTEM_ADMIN,
      options: {
        drawerLabelStyle,
      },
    },
    {
      name: 'Bicycle Reports',
      component: BikeReports,
      icon: ['alert', 'alert-outline'],
      visible: role !== ORDINARY_USER,
    },
    {
      name: 'Add Station',
      component: AddStation,
      icon: ['hubspot', 'hubspot'],
      visible: role !== ORDINARY_USER,
    },
    {
      name: 'Bicycle Select',
      component: BikeSelect,
      icon: ['bicycle', 'bicycle'],
      visible: true,
    },
    {
      name: 'Report Issue',
      component: ReportIssue,
      icon: ['alert-circle', 'alert-circle-outline'],
      visible: true,
    },
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
              if (screen.name === 'Bicycle Select' || screen.name === 'Report Issue') {
                return {
                  drawerLabel: () => null,
                  drawerIcon: () => null,
                  headerLeft: () => (
                    <CustomButton
                      icon="arrow-left"
                      color="white"
                      magicNumber={0.12}
                      onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Map' }],
                      })}
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