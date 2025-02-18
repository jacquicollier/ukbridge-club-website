import { england } from '@/app/model/england';
import { scotland } from '@/app/model/scotland';
import { wales } from '@/app/model/wales';
import { northernIreland } from '@/app/model/northern-ireland';

export const defaultBounds = {
  east: 1.68153079591,
  west: -7.57216793459,
  north: 58.6350001085,
  south: 49.959999905,
};

export const pois = [...england, ...scotland, ...wales, ...northernIreland];
