import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Layout} from '../components/Layout';
import {useRoute} from '@react-navigation/native';
import {RootStackNavigationRouteProp} from '../navigation/MainNavigator';
import {useVehicleContext} from '../context/VehicleContext';
import {HeartIcon} from '../assets/svg/heart';

export const VehicleDetails = () => {
  const {params} = useRoute<RootStackNavigationRouteProp<'VEHICLE_DETAILS'>>();
  const {addToFavorites, favorites} = useVehicleContext();

  const vehicleDetails = Object.entries(params.details) as [
    string,
    string | number,
  ][];

  const isFavorite = favorites.some(
    favorite => favorite.id === params.details.id,
  );
  const hiddenKeys = ['id', 'favourite'];

  return (
    <Layout title="Vehicle details" goBack>
      <TouchableOpacity
        onPress={() => addToFavorites(params.details)}
        style={styles.favoriteIcon}>
        <HeartIcon isFilled={isFavorite} />
      </TouchableOpacity>
      <View style={styles.container}>
        {vehicleDetails
          .filter(item => !hiddenKeys.includes(item[0]))
          .map(([key, value]) => (
            <Text key={key}>
              {camelToFlat(key)}: {value}
            </Text>
          ))}
      </View>
    </Layout>
  );
};

const camelToFlat = (camel: string) => {
  const camelCase = camel.replace(/([a-z])([A-Z])/g, '$1 $2').split(' ');

  let flat = '';

  camelCase.forEach(word => {
    flat = flat + word.charAt(0).toUpperCase() + word.slice(1) + ' ';
  });
  return flat;
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  favoriteIcon: {
    alignSelf: 'flex-end',
  },
});
