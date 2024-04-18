import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import BottomNavigation, {BottomStackParamList} from './BottomNavigation';
import {
  NavigationContainer,
  NavigatorScreenParams,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {VehicleType} from '../data/types';
import {VehicleDetails} from '../screens/VehicleDetails';

const RootStack = createStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <RootStack.Screen name={'BOTTOM_NAV'} component={BottomNavigation} />
        <RootStack.Screen name={'VEHICLE_DETAILS'} component={VehicleDetails} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export type RootStackParamList = {
  BOTTOM_NAV: NavigatorScreenParams<BottomStackParamList>;
  VEHICLE_DETAILS: {details: VehicleType};
};

export type BaseNavigationProp<
  SCREEN extends keyof ParamListBase,
  PARAMS extends ParamListBase,
> = StackNavigationProp<PARAMS, SCREEN>;

export type RootStackNavigationRouteProp<
  SCREEN extends keyof RootStackParamList,
> = RouteProp<RootStackParamList, SCREEN>;

export type RootStackNavigationProp<SCREEN extends keyof RootStackParamList> =
  BaseNavigationProp<SCREEN, RootStackParamList>;
