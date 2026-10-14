import React from 'react';
import { ScrollView, Text, StyleSheet, Pressable } from 'react-native';
import { CategoryKey } from '@/types';
import { useApp } from '@/context/AppContext';

interface CategoryOption {
  key: CategoryKey;
  label: string;
}

const CATEGORIES: CategoryOption[] = [
  { key: 'all', label: '✨ All' },
  { key: 'food', label: '🍲 Food' },
  { key: 'personal_care', label: '🧴 Personal care' },
  { key: 'household', label: '🏠 Household' },
  { key: 'toys', label: '🧸 Toys' },
  { key: 'snacks', label: '☕ Snacks & Tea' },
];

export default function CategoryBar() {
  const { activeCategory, setActiveCategory, isDark } = useApp();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}>
      {CATEGORIES.map((cat) => {
        const isSelected = activeCategory === cat.key;
        return (
          <Pressable
            key={cat.key}
            onPress={() => setActiveCategory(cat.key)}
            style={({ pressed }) => [
              styles.pillButton,
              isSelected ? styles.pillSelected : isDark ? styles.pillDark : styles.pillInactive,
              pressed && { opacity: 0.7 },
            ]}>
            <Text
              style={[
                styles.pillText,
                isSelected
                  ? styles.pillTextSelected
                  : isDark
                  ? styles.pillTextDark
                  : styles.pillTextInactive,
              ]}>
              {cat.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  pillButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillInactive: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  pillDark: {
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  pillSelected: {
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#0F172A',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  pillTextInactive: {
    color: '#475569',
  },
  pillTextDark: {
    color: '#94A3B8',
  },
  pillTextSelected: {
    color: '#FFFFFF',
  },
});
