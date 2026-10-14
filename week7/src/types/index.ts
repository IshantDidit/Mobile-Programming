export interface ShopPrice {
  shopName: string;
  price: number;
  isCheapest?: boolean;
}

export interface PriceSource {
  title: string;
  time: string;
  verified: boolean;
  type: 'survey' | 'reddit' | 'visit';
}

export type CategoryKey = 'all' | 'food' | 'personal_care' | 'household' | 'toys' | 'snacks';

export interface ProductItem {
  id: string;
  name: string;
  category: CategoryKey;
  price: number;
  priceRange: string;
  unit: string;
  shop: string;
  verified: boolean;
  icon: string;
  bgColor: string;
  color: string;
  shopPrices: ShopPrice[];
  sources: PriceSource[];
  description: string;
}

export interface Shop {
  id: string;
  name: string;
  distance: string;
  distanceMeters: number;
  verified: boolean;
  itemsUnderBudget: number;
  updatedText: string;
  category: string;
  rating: number;
  icon: string;

  mapX: number;
  mapY: number;
  highlightItem?: string;
}

export interface BudgetSegment {
  label: string;
  amount: number;
  color: string;
  percentage: number;
}

export interface BudgetCombo {
  budget: number;
  title: string;
  items: string[];
  verified: boolean;
  segments: BudgetSegment[];
}
