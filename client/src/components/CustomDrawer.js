import React from 'react';
import {
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../../styles/styles';


function CustomDrawer(props) {
  const { state, screens, ...rest } = props;

  const newState = { ...state };
  newState.routes = newState.routes.map(route => {
    const isAccessible = shouldRouteBeAccessible(route.name);
    return { ...route, isAccessible };
  });

  function shouldRouteBeAccessible(routeName) {
    const inaccessibleRoutes = ['Bicycle Select', 'Report Issue'];
    return !inaccessibleRoutes.includes(routeName);
  }

  return (
    <DrawerContentScrollView {...rest}>
      {newState.routes.map(route => {
        const screenInfo = screens.find(screen => screen.name === route.name);
        const focused = state.index === route.key;
        const icon = screenInfo && screenInfo.icon && focused
          ? screenInfo.icon[0]
          : (screenInfo ? screenInfo.icon[1] : null);

        return (
          <DrawerItem
            key={route.key}
            label={route.name}
            focused={focused}
            icon={() => icon && (
              <MaterialCommunityIcons name={icon} size={24} color={colors.ultraViolet} />
            )}
            onPress={() => route.isAccessible && props.navigation.navigate(route.name)}
            style={{
              opacity: route.isAccessible ? 1 : 0,
              pointerEvents: route.isAccessible ? 'auto' : 'none',
            }}
            labelStyle={screenInfo?.options?.drawerLabelStyle}
          />
        );
      })}
    </DrawerContentScrollView>
  );
}


export default CustomDrawer;
