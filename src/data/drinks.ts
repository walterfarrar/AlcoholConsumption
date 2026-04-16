import type {
  CategoryDef,
  DayId,
  DrinkCategory,
  DrinkDef,
  DrinkTypeId,
  WeekState,
} from '../types';

/**
 * NIAAA standard drink approximations:
 *   1 standard drink ≈ 14g pure alcohol
 *   = 12oz beer @ 5%, 5oz wine @ 12%, 1.5oz spirits @ 40%
 */
export const DRINKS: Record<DrinkTypeId, DrinkDef> = {
  // BEER & CIDER
  lightBeer: {
    id: 'lightBeer',
    label: 'Light beer bottle (12oz, ~4%)',
    shortLabel: 'Light btl',
    category: 'beer',
    standardDrinks: 0.8,
  },
  lightBeerCan: {
    id: 'lightBeerCan',
    label: 'Light beer can (12oz, ~4%)',
    shortLabel: 'Light can',
    category: 'beer',
    standardDrinks: 0.8,
  },
  beer: {
    id: 'beer',
    label: 'Bottled beer (12oz, ~5%)',
    shortLabel: 'Bottle',
    category: 'beer',
    standardDrinks: 1,
  },
  beerCan: {
    id: 'beerCan',
    label: 'Canned beer (12oz, ~5%)',
    shortLabel: 'Can',
    category: 'beer',
    standardDrinks: 1,
  },
  tallboy: {
    id: 'tallboy',
    label: 'Tallboy (16oz can, ~5%)',
    shortLabel: 'Tallboy',
    category: 'beer',
    standardDrinks: 1.3,
  },
  ipa: {
    id: 'ipa',
    label: 'IPA / craft beer (12oz, ~7%)',
    shortLabel: 'IPA',
    category: 'beer',
    standardDrinks: 1.4,
  },
  seltzer: {
    id: 'seltzer',
    label: 'Hard seltzer (12oz, ~5%)',
    shortLabel: 'Seltzer',
    category: 'beer',
    standardDrinks: 1,
  },
  cider: {
    id: 'cider',
    label: 'Hard cider (12oz, ~5%)',
    shortLabel: 'Cider',
    category: 'beer',
    standardDrinks: 1,
  },

  // WINE
  wineRed: {
    id: 'wineRed',
    label: 'Glass of red wine (5oz)',
    shortLabel: 'Red',
    category: 'wine',
    standardDrinks: 1,
  },
  wineWhite: {
    id: 'wineWhite',
    label: 'Glass of white wine (5oz)',
    shortLabel: 'White',
    category: 'wine',
    standardDrinks: 1,
  },
  champagne: {
    id: 'champagne',
    label: 'Champagne / sparkling glass (5oz)',
    shortLabel: 'Bubbly',
    category: 'wine',
    standardDrinks: 1,
  },
  wineBottleRed: {
    id: 'wineBottleRed',
    label: 'Bottle of red wine (750ml)',
    shortLabel: 'Red btl',
    category: 'wine',
    standardDrinks: 5,
  },
  wineBottleWhite: {
    id: 'wineBottleWhite',
    label: 'Bottle of white wine (750ml)',
    shortLabel: 'White btl',
    category: 'wine',
    standardDrinks: 5,
  },
  champagneBottle: {
    id: 'champagneBottle',
    label: 'Bottle of champagne / sparkling (750ml)',
    shortLabel: 'Bubbly btl',
    category: 'wine',
    standardDrinks: 5,
  },

  // LIQUOR
  shot: {
    id: 'shot',
    label: 'Shot of liquor taken straight (1.5oz spirit)',
    shortLabel: 'Shot',
    category: 'liquor',
    standardDrinks: 1,
  },
  whiskeyNeat: {
    id: 'whiskeyNeat',
    label: 'Double / on the rocks (3oz spirit)',
    shortLabel: 'Double',
    category: 'liquor',
    standardDrinks: 2,
  },
  cordial: {
    id: 'cordial',
    label: 'Cream liqueur (1.5oz, ~17%)',
    shortLabel: 'Cream',
    category: 'liquor',
    standardDrinks: 0.5,
  },

  // COCKTAILS - bucketed by typical strength
  lightCocktail: {
    id: 'lightCocktail',
    label: 'Light cocktail (mimosa, Aperol spritz, bellini)',
    shortLabel: 'Spritz',
    category: 'cocktail',
    standardDrinks: 0.7,
  },
  mixed: {
    id: 'mixed',
    label: 'Mixed drink (Jack & coke, gin & tonic, rum & coke, vodka soda, mojito, bloody mary)',
    shortLabel: 'Mixed',
    category: 'cocktail',
    standardDrinks: 1,
  },
  martini: {
    id: 'martini',
    label: 'Strong cocktail (martini, margarita, manhattan, old fashioned)',
    shortLabel: 'Strong',
    category: 'cocktail',
    standardDrinks: 1.8,
  },
  tropical: {
    id: 'tropical',
    label: 'Tiki / tropical (mai tai, piña colada, hurricane)',
    shortLabel: 'Tiki',
    category: 'cocktail',
    standardDrinks: 2.5,
  },
};

export const CATEGORIES: CategoryDef[] = [
  { id: 'beer', label: 'Beer & Cider' },
  { id: 'wine', label: 'Wine' },
  { id: 'liquor', label: 'Liquor' },
  { id: 'cocktail', label: 'Cocktails' },
];

export const DRINKS_BY_CATEGORY: Record<DrinkCategory, DrinkTypeId[]> = {
  beer: ['lightBeer', 'lightBeerCan', 'beer', 'beerCan', 'tallboy', 'ipa', 'seltzer', 'cider'],
  wine: ['wineRed', 'wineWhite', 'champagne', 'wineBottleRed', 'wineBottleWhite', 'champagneBottle'],
  liquor: ['shot', 'whiskeyNeat', 'cordial'],
  cocktail: ['lightCocktail', 'mixed', 'martini', 'tropical'],
};

/** Flat order used by the weekly summary breakdown. */
export const DRINK_ORDER: DrinkTypeId[] = CATEGORIES.flatMap((c) => DRINKS_BY_CATEGORY[c.id]);

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
