/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {VehicleProvider} from './src/context/VehicleContext';
import {MainNavigator} from './src/navigation/MainNavigator';

function App(): React.JSX.Element {
  return (
    <VehicleProvider>
      <MainNavigator />
    </VehicleProvider>
  );
}

export default App;
