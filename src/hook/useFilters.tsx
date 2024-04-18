import React, {useEffect, useState} from 'react';
import {Dropdown} from 'react-native-element-dropdown';
import {vehicleData} from '../screens/VehiclesList';
import {useVehicleContext} from '../context/VehicleContext';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {formatCurrency} from '../utils';

export const useFilter = () => {
  const [makeOptions, setMakeOptions] = useState<string[]>([]);
  const [modelOptions, setModelOptions] = useState<string[]>([]);
  const {setCurrentFilter, filter, resetFilters} = useVehicleContext();
  console.log({filter: filter.startingBid});
  const DeleteAllFilters = Object.values(filter).some(item => item) ? (
    <TouchableOpacity onPress={resetFilters} style={styles.deleteFilterBtn}>
      <Text style={styles.deleteText}>Delete all filters</Text>
    </TouchableOpacity>
  ) : null;
  const MakeFilter = (
    <Dropdown
      data={makeOptions.map(model => ({
        make: model,
        value: model,
      }))}
      labelField="make"
      onChange={item => setCurrentFilter(item.value, 'make')}
      valueField="make"
      value={String(filter.make)}
      placeholder="Select make"
      style={styles.filerContainer}
    />
  );

  const ModelFilter = (
    <Dropdown
      data={modelOptions.map(model => ({
        model: model,
        value: model,
      }))}
      labelField="model"
      onChange={item => setCurrentFilter(item.value, 'model')}
      valueField="model"
      value={String(filter.model)}
      placeholder="Select model"
      style={styles.filerContainer}
    />
  );

  const StartingBidFilter = (
    <Dropdown
      data={[10000, 12000, 15000, 18000].map(price => ({
        price: formatCurrency(price),
        value: price,
      }))}
      labelField="price"
      onChange={item => setCurrentFilter(item.value, 'startingBid')}
      valueField="value"
      value={filter.startingBid}
      placeholder="Select starting bid"
      style={styles.filerContainer}
    />
  );

  useEffect(() => {
    const makeOptionsArr: string[] = [];
    const modelOptionsArr: string[] = [];

    for (const vehicle of vehicleData) {
      if (!makeOptionsArr.includes(vehicle.make)) {
        makeOptionsArr.push(vehicle.make);
      }

      if (!modelOptionsArr.includes(vehicle.model)) {
        if (vehicle.make === filter.make || filter.make === '') {
          modelOptionsArr.push(vehicle.model);
        }
      }
    }

    setModelOptions(modelOptionsArr);
    setMakeOptions(makeOptionsArr);
  }, [filter]);
  return {ModelFilter, MakeFilter, StartingBidFilter, DeleteAllFilters};
};

const styles = StyleSheet.create({
  filerContainer: {
    borderWidth: 1,
    borderRadius: 5,
    flexGrow: 1,
    paddingHorizontal: 5,
  },
  deleteFilterBtn: {
    backgroundColor: 'salmon',
    borderRadius: 5,
    padding: 5,
  },
  deleteText: {
    textAlign: 'center',
    color: 'white',
  },
});
