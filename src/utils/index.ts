import {VehicleType} from '../data/types';
import {TODAYS_DATE} from '../screens/VehiclesList';

export const vehicleId = (item: VehicleType) => {
  return item.make + item.model + item.engineSize + item.year;
};

export const formatCurrency = (value: number) => {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
};

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatDateTime = (date: string) => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const textMonth = MONTHS[dateObject.getMonth()];
  const day = String(dateObject.getDate()).padStart(2, '0');

  return `${textMonth} ${day} ${year}`;
};

export const differenceInDaysAndHours = (date1: Date) => {
  const date2 = TODAYS_DATE;
  const diff = date1.getTime() - date2.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  return `${days} days and ${hours} hours`;
};
