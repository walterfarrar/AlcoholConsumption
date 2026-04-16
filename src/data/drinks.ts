import type { DayId, DrinkDef, DrinkTypeId, WeekState } from '../types';

export const DRINKS: Record<DrinkTypeId, DrinkDef> = {
  beer: {
    id: 'beer',
    label: 'Beer (12oz)',
    shortLabel: 'Beer',
    standardDrinks: 1,
  },
  lightBeer: {
    id: 'lightBeer',
    label: 'Light beer (12oz)',
    shortLabel: 'Light',
    standardDrinks: 1,
  },
  wineGlass: {
    id: 'wineGlass',
    label: 'Glass of wine (5oz)',
    shortLabel: 'Wine',
    standardDrinks: 1,
  },
  wineBottle: {
    id: 'wineBottle',
    label: 'Bottle of wine (750ml)',
    shortLabel: 'Bottle',
    standardDrinks: 5,
  },
  shot: {
    id: 'shot',
    label: 'Shot of liquor (1.5oz)',
    shortLabel: 'Shot',
    standardDrinks: 1,
  },
  mixed: {
    id: 'mixed',
    label: 'Mixed drink / cocktail',
    shortLabel: 'Mixed',
    standardDrinks: 1.5,
  },
  seltzer: {
    id: 'seltzer',
    label: 'Hard seltzer (12oz)',
    shortLabel: 'Seltzer',
    standardDrinks: 1,
  },
  champagne: {
    id: 'champagne',
    label: 'Champagne / sparkling (5oz)',
    shortLabel: 'Bubbly',
    standardDrinks: 1,
  },
};

export const DRINK_ORDER: DrinkTypeId[] = [
  'beer',
  'lightBeer',
  'wineGlass',
  'wineBottle',
  'shot',
  'mixed',
  'seltzer',
  'champagne',
];

export const DAYS: { id: DayId; label: string; short: string }[] = [
  { id: 'mon', label: 'Monday', short: 'Mon' },
  { id: 'tue', label: 'Tuesday', short: 'Tue' },
  { id: 'wed', label: 'Wednesday', short: 'Wed' },
  { id: 'thu', label: 'Thursday', short: 'Thu' },
  { id: 'fri', label: 'Friday', short: 'Fri' },
  { id: 'sat', label: 'Saturday', short: 'Sat' },
  { id: 'sun', label: 'Sunday', short: 'Sun' },
];

export const EMPTY_WEEK: WeekState = {
  mon: [],
  tue: [],
  wed: [],
  thu: [],
  fri: [],
  sat: [],
  sun: [],
};
