import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProductItem, CategoryKey, Shop } from '@/types';
import { GHATTEKULO_ITEMS, GHATTEKULO_SHOPS, BUDGET_COMBOS } from '@/data/mock-data';

interface AppContextType {

  budget: number;
  setBudget: (amount: number) => void;

  isDark: boolean;
  toggleDarkMode: () => void;

  activeCategory: CategoryKey;
  setActiveCategory: (cat: CategoryKey) => void;

  shopFilter: 'best_value' | 'nearest' | 'updated';
  setShopFilter: (filter: 'best_value' | 'nearest' | 'updated') => void;

  selectedItem: ProductItem | null;
  setSelectedItem: (item: ProductItem | null) => void;

  isBudgetModalOpen: boolean;
  setIsBudgetModalOpen: (open: boolean) => void;

  isAddPriceModalOpen: boolean;
  setIsAddPriceModalOpen: (open: boolean) => void;

  highlightedShopId: string | null;
  setHighlightedShopId: (id: string | null) => void;

  customPrices: Array<{ itemName: string; shopName: string; price: number }>;
  addCustomPrice: (itemName: string, shopName: string, price: number) => void;

  currentCombo: typeof BUDGET_COMBOS[500];

  filteredShops: Shop[];

  filteredItems: ProductItem[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {

  const [budget, setBudget] = useState<number>(500);

  const [isDark, setIsDark] = useState<boolean>(false);
  const toggleDarkMode = () => setIsDark((prev) => !prev);

  const [activeCategory, setActiveCategory] = useState<CategoryKey>('all');

  const [shopFilter, setShopFilter] = useState<'best_value' | 'nearest' | 'updated'>('best_value');

  const [selectedItem, setSelectedItem] = useState<ProductItem | null>(null);

  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState<boolean>(false);
  const [isAddPriceModalOpen, setIsAddPriceModalOpen] = useState<boolean>(false);

  const [highlightedShopId, setHighlightedShopId] = useState<string | null>('chowk-pasal');

  const [customPrices, setCustomPrices] = useState<Array<{ itemName: string; shopName: string; price: number }>>([]);

  const addCustomPrice = (itemName: string, shopName: string, price: number) => {
    setCustomPrices((prev) => [{ itemName, shopName, price }, ...prev]);
  };

  const currentCombo = BUDGET_COMBOS[budget] || {
    budget: budget,
    title: `Custom Ghattekulo Rs ${budget} Mix`,
    items: ['🌶️ Masala', '🥟 Momo', '🪥 Hygiene'],
    verified: true,
    segments: [
      { label: 'Food', amount: Math.round(budget * 0.4), color: '#EF4444', percentage: 40 },
      { label: 'Hygiene', amount: Math.round(budget * 0.3), color: '#F59E0B', percentage: 30 },
      { label: 'Daily', amount: Math.round(budget * 0.2), color: '#10B981', percentage: 20 },
      { label: 'Balance', amount: Math.round(budget * 0.1), color: '#8B5CF6', percentage: 10 },
    ],
  };

  const filteredItems = GHATTEKULO_ITEMS.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  const filteredShops = [...GHATTEKULO_SHOPS].sort((a, b) => {
    if (shopFilter === 'nearest') {
      return a.distanceMeters - b.distanceMeters;
    }
    if (shopFilter === 'best_value') {
      return b.itemsUnderBudget - a.itemsUnderBudget;
    }

    return a.id === 'chowk-pasal' ? -1 : 1;
  });

  return (
    <AppContext.Provider
      value={{
        budget,
        setBudget,
        isDark,
        toggleDarkMode,
        activeCategory,
        setActiveCategory,
        shopFilter,
        setShopFilter,
        selectedItem,
        setSelectedItem,
        isBudgetModalOpen,
        setIsBudgetModalOpen,
        isAddPriceModalOpen,
        setIsAddPriceModalOpen,
        highlightedShopId,
        setHighlightedShopId,
        customPrices,
        addCustomPrice,
        currentCombo,
        filteredShops,
        filteredItems,
      }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside an AppProvider');
  }
  return context;
}
