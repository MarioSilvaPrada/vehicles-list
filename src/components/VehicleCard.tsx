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
import {CarIcon} from '../assets/svg/car';

type VehicleCardProps = {vehicle: VehicleType; index: number};

export const VehicleCard = ({vehicle, index}: VehicleCardProps) => {
  const {navigate} = useNavigation<RootStackNavigationProp<'BOTTOM_NAV'>>();
  const {addToFavorites, favorites} = useVehicleContext();

  const isFavorite = favorites.some(favorite => favorite.id === vehicle.id);

  const getColorByPosition = () => {
    const colors = [
      '#F7DCB9',
      '#9AC8CD',
      '#F0B27A',
      '#D7BDE2',
      '#E6E6FA',
      '#F5F5DC',
    ];
    return colors[index % colors.length];
  };

  return (
    <TouchableOpacity
      style={styles.pressContainer}
      onPress={() =>
        navigate('VEHICLE_DETAILS', {
          details: vehicle,
        })
      }>
      <View style={styles.row}>
        <View
          style={[
            styles.placeholder,
            {
              backgroundColor: getColorByPosition(),
            },
          ]}>
          <CarIcon />
        </View>

        <View style={styles.body}>
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
            Time left:{' '}
            {differenceInDaysAndHours(new Date(vehicle.auctionDateTime))}
          </Text>
          <Text>Starting bid: {formatCurrency(vehicle.startingBid)}</Text>
        </View>
      </View>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  body: {
    flexGrow: 1,
  },
  placeholder: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
