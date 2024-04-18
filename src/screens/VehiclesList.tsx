import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import vehicles from '../data/vehicles.json';
import {Layout} from '../components/Layout';

import {VehicleCard} from '../components/VehicleCard';
import {ChevronIcon} from '../assets/svg/chevron';
import {useFilter} from '../hook/useFilters';
import {useVehicleContext} from '../context/VehicleContext';

// Assumption: Today's date is 20th March 2024
export const TODAYS_DATE = new Date(2024, 2, 20);

export const vehicleData = vehicles
  .map((vehicle, index) => ({
    // add id to each vehicle
    id: index,
    ...vehicle,
  }))
  .map(vehicle => ({
    ...vehicle,
    // needed to replace '/' with '-' in the date string so I can use it in the Date constructor
    auctionDateTime: vehicle.auctionDateTime.replaceAll('/', '-'),
  }))
  .sort((a, b) => (a.make > b.make ? 1 : -1));

export const VehiclesList = () => {
  const flatListRef = React.useRef<FlatList>(null);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const {ModelFilter, MakeFilter, StartingBidFilter, DeleteAllFilters} =
    useFilter();
  const {filter} = useVehicleContext();

  const goToTop = () => {
    flatListRef.current?.scrollToIndex({index: 0});
  };

  return (
    <Layout title="Vehicles list">
      {isScrolled && (
        <TouchableOpacity style={styles.upPressable} onPress={goToTop}>
          <ChevronIcon />
        </TouchableOpacity>
      )}
      <View style={styles.filtersContainer}>
        <View style={styles.filtersWrapper}>
          {MakeFilter}
          {ModelFilter}
        </View>
        {StartingBidFilter}
        {DeleteAllFilters}
      </View>
      <FlatList
        ref={flatListRef}
        data={vehicleData
          .filter(item => {
            if (filter.make === '') {
              return item;
            }
            return item.make === filter.make;
          })
          .filter(item => {
            if (filter.model === '') {
              return item;
            }
            return item.model === filter.model;
          })
          .filter(item => {
            if (filter.startingBid === 0) {
              return item;
            }
            return item.startingBid > (filter.startingBid as number);
          })}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <VehicleCard vehicle={item} index={index} />
        )}
        contentContainerStyle={styles.container}
        onScroll={e => {
          if (e.nativeEvent.contentOffset.y > 100) {
            setIsScrolled(true);
          } else {
            setIsScrolled(false);
          }
        }}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  layer: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    bottom: 0,
    right: 0,
    top: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flex: 1,
  },
  upPressable: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 50,
    transform: [{rotate: '90deg'}],
    zIndex: 2,
  },
  filtersContainer: {
    marginBottom: 10,
    gap: 10,
  },
  filtersWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  },
});
