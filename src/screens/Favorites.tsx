import React from 'react';
import {Layout} from '../components/Layout';
import {VehicleCard} from '../components/VehicleCard';
import {FlatList} from 'react-native-gesture-handler';
import {useVehicleContext} from '../context/VehicleContext';
import {StyleSheet} from 'react-native';

export const Favorites = () => {
  const {favorites} = useVehicleContext();

  return (
    <Layout title="Favorites">
      <FlatList
        data={favorites}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <VehicleCard vehicle={item} />}
        contentContainerStyle={styles.container}
      />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});
