export type DrinkTypeId =
  | 'beer'
  | 'lightBeer'
  | 'wineGlass'
  | 'wineBottle'
  | 'shot'
  | 'mixed'
  | 'seltzer'
  | 'champagne';

export type DayId = 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';

export interface DrinkEntry {
  id: string;
  type: DrinkTypeId;
}

export type WeekState = Record<DayId, DrinkEntry[]>;

export interface DrinkDef {
  id: DrinkTypeId;
  label: string;
  shortLabel: string;
  /** Approx. NIAAA standard drinks per unit. */
  standardDrinks: number;
}
