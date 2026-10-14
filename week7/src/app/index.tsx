import React from 'react';
import { View, ScrollView, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import BudgetHeroCard from '@/components/BudgetHeroCard';
import CategoryBar from '@/components/CategoryBar';
import ItemCard from '@/components/ItemCard';
import ItemDetailModal from '@/components/ItemDetailModal';
import CustomBudgetModal from '@/components/CustomBudgetModal';
import { useApp } from '@/context/AppContext';

export default function HomeScreen() {
  const { filteredItems, isDark } = useApp();

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, isDark && styles.safeAreaDark]}>

      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <BudgetHeroCard />

        <CategoryBar />

        <View style={styles.itemsList}>
          {filteredItems.map((item) => (
            <ItemCard key={item.id} item={item} variant="list" />
          ))}
        </View>

        <View style={{ height: Platform.OS === 'android' ? 20 : 40 }} />
      </ScrollView>

      <ItemDetailModal />
      <CustomBudgetModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  safeAreaDark: {
    backgroundColor: '#0F172A',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  itemsList: {
    marginTop: 6,
    gap: 2,
  },
});