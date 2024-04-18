import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {VehicleType} from '../data/types';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../navigation/MainNavigator';
import {HeartIcon} from '../assets/svg/heart';
import {useVehicleContext} from '../context/VehicleContext';
import {
  differenceInDaysAndHours,
  formatCurrency,
  formatDateTime,
} from '../utils';

type VehicleCardProps = {vehicle: VehicleType};

export const VehicleCard = ({vehicle}: VehicleCardProps) => {
  const {navigate} = useNavigation<RootStackNavigationProp<'BOTTOM_NAV'>>();
  const {addToFavorites, favorites} = useVehicleContext();

  const isFavorite = favorites.some(favorite => favorite.id === vehicle.id);

  return (
    <TouchableOpacity
      style={styles.pressContainer}
      onPress={() =>
        navigate('VEHICLE_DETAILS', {
          details: vehicle,
        })
      }>
      <View style={styles.header}>
        <Text style={styles.title}>
          {vehicle.make} {vehicle.model} {vehicle.engineSize} {vehicle.year}
        </Text>
        <TouchableOpacity onPress={() => addToFavorites(vehicle)}>
          <HeartIcon isFilled={isFavorite} />
        </TouchableOpacity>
      </View>
      <Text>Auction date: {formatDateTime(vehicle.auctionDateTime)}</Text>
      <Text>
        Time until auction:{' '}
        {differenceInDaysAndHours(new Date(vehicle.auctionDateTime))}
      </Text>
      <Text>Starting bid: {formatCurrency(vehicle.startingBid)}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pressContainer: {
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    gap: 8,
  },
});
