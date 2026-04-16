export type DrinkCategory = 'beer' | 'wine' | 'liquor' | 'cocktail';

export type DrinkTypeId =
  // Beer & cider
  | 'lightBeer'
  | 'lightBeerCan'
  | 'beer'
  | 'beerCan'
  | 'tallboy'
  | 'ipa'
  | 'seltzer'
  | 'cider'
  // Wine
  | 'wineRed'
  | 'wineWhite'
  | 'champagne'
  | 'wineBottleRed'
  | 'wineBottleWhite'
  | 'champagneBottle'
  // Liquor (straight)
  | 'shot'
  | 'whiskeyNeat'
  | 'cordial'
  // Cocktails (bucketed by alcohol content)
  | 'lightCocktail'
  | 'mixed'
  | 'martini'
  | 'tropical';

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
  category: DrinkCategory;
  /** Approx. NIAAA standard drinks per unit. */
  standardDrinks: number;
}

export interface CategoryDef {
  id: DrinkCategory;
  label: string;
}
