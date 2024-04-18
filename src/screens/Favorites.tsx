import React from 'react';
import {Layout} from '../components/Layout';
import {VehicleCard} from '../components/VehicleCard';
import {FlatList} from 'react-native-gesture-handler';
import {useVehicleContext} from '../context/VehicleContext';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackNavigationProp} from '../navigation/MainNavigator';

export const Favorites = () => {
  const {favorites} = useVehicleContext();

  return (
    <Layout title="Favorites">
      <FlatList
        data={favorites}
        keyExtractor={item => item.id.toString()}
        renderItem={({item, index}) => (
          <VehicleCard vehicle={item} index={index} />
        )}
        ListEmptyComponent={<FavoritesEmptyState />}
        contentContainerStyle={styles.container}
      />
    </Layout>
  );
};

const FavoritesEmptyState = () => {
  const {navigate} = useNavigation<RootStackNavigationProp<'BOTTOM_NAV'>>();

  return (
    <View style={styles.emptyContainer}>
      <Text>You don't have favorites</Text>
      <TouchableOpacity
        style={styles.emptyBtn}
        onPress={() => navigate('BOTTOM_NAV', {screen: 'VEHICLES'})}>
        <Text>Start looking!</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  emptyBtn: {
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
});
