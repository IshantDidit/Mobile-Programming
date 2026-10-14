import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/Header';
import InteractiveMap from '@/components/InteractiveMap';
import AddPriceModal from '@/components/AddPriceModal';
import { useApp } from '@/context/AppContext';

export default function ShopsScreen() {
  const {
    filteredShops,
    shopFilter,
    setShopFilter,
    highlightedShopId,
    setHighlightedShopId,
    setIsAddPriceModalOpen,
    budget,
    isDark,
  } = useApp();

  const filterOptions: Array<{ key: 'best_value' | 'nearest' | 'updated'; label: string; icon: any }> = [
    { key: 'best_value', label: 'Best value', icon: 'trophy-outline' },
    { key: 'nearest', label: 'Nearest', icon: 'location-outline' },
    { key: 'updated', label: 'Recently updated', icon: 'time-outline' },
  ];

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, isDark && styles.safeAreaDark]}>

      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <InteractiveMap />

        <View style={styles.filterPillsRow}>
          {filterOptions.map((opt) => {
            const isSelected = shopFilter === opt.key;
            return (
              <Pressable
                key={opt.key}
                onPress={() => setShopFilter(opt.key)}
                style={({ pressed }) => [
                  styles.filterPill,
                  isSelected
                    ? styles.filterPillActive
                    : isDark
                    ? styles.filterPillDark
                    : styles.filterPillInactive,
                  pressed && { opacity: 0.8 },
                ]}>
                <Ionicons
                  name={opt.icon}
                  size={14}
                  color={isSelected ? '#0284C7' : isDark ? '#94A3B8' : '#64748B'}
                />
                <Text
                  style={[
                    styles.filterPillText,
                    isSelected
                      ? styles.filterPillTextActive
                      : isDark
                      ? styles.textMutedDark
                      : styles.filterPillTextInactive,
                  ]}>
                  {opt.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.shopsList}>
          {filteredShops.map((shop) => {
            const isHighlighted = highlightedShopId === shop.id;

            return (
              <Pressable
                key={shop.id}
                onPress={() => setHighlightedShopId(shop.id)}
                style={({ pressed }) => [
                  styles.shopCard,
                  isDark && styles.cardDark,
                  isHighlighted && styles.shopCardHighlighted,
                  pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] },
                ]}>

                <View style={[styles.shopIconBox, isDark && styles.shopIconBoxDark]}>
                  <Text style={styles.shopEmoji}>{shop.icon}</Text>
                </View>

                <View style={styles.shopInfo}>
                  <View style={styles.shopTitleRow}>
                    <Text
                      style={[styles.shopTitle, isDark && styles.textLightDark]}
                      numberOfLines={1}>
                      {shop.name}
                    </Text>
                    {shop.verified && (
                      <View style={styles.verifiedCircle}>
                        <Ionicons name="checkmark-sharp" size={11} color="#FFFFFF" />
                      </View>
                    )}
                  </View>

                  <Text style={[styles.shopSubtext, isDark && styles.textMutedDark]}>
                    📍 {shop.distance}
                  </Text>
                  <Text style={[styles.shopSubtext, isDark && styles.textMutedDark]}>
                    🛍️ {shop.itemsUnderBudget} items under Rs {budget}
                  </Text>
                  <Text style={[styles.shopSubtext, isDark && styles.textMutedDark]}>
                    🕒 {shop.updatedText}
                  </Text>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={isDark ? '#64748B' : '#94A3B8'}
                />
              </Pressable>
            );
          })}
        </View>

        <Pressable
          onPress={() => setIsAddPriceModalOpen(true)}
          style={({ pressed }) => [
            styles.bannerCard,
            isDark && styles.bannerCardDark,
            pressed && { opacity: 0.9, transform: [{ scale: 0.99 }] },
          ]}>
          <Text style={styles.bannerEmoji}>📣</Text>
          <View style={styles.bannerTextCol}>
            <Text style={[styles.bannerTitle, isDark && styles.textLightDark]}>
              Add your own prices — help Ghattekulo
            </Text>
            <Text style={[styles.bannerSubtitle, isDark && styles.textMutedDark]}>
              Help make Kati? more useful with local prices you bought at today.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#D97706" />
        </Pressable>

        <View style={{ height: 40 }} />
      </ScrollView>

      <AddPriceModal />
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
  filterPillsRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
    marginVertical: 4,
  },
  filterPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 18,
    borderWidth: 1,
  },
  filterPillInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E2E8F0',
  },
  filterPillDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  filterPillActive: {
    backgroundColor: '#F0F9FF',
    borderColor: '#0284C7',
  },
  filterPillText: {
    fontSize: 12,
    fontWeight: '600',
  },
  filterPillTextInactive: {
    color: '#64748B',
  },
  filterPillTextActive: {
    color: '#0284C7',
    fontWeight: '700',
  },
  textLightDark: {
    color: '#F8FAFC',
  },
  textMutedDark: {
    color: '#94A3B8',
  },
  shopsList: {
    paddingHorizontal: 16,
    marginTop: 10,
    gap: 8,
  },
  shopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    gap: 12,
  },
  shopCardHighlighted: {
    borderColor: '#0284C7',
    borderWidth: 1.5,
    backgroundColor: '#F8FAFC',
  },
  cardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  shopIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopIconBoxDark: {
    backgroundColor: '#0F172A',
  },
  shopEmoji: {
    fontSize: 24,
  },
  shopInfo: {
    flex: 1,
    gap: 2,
  },
  shopTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  shopTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  verifiedCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopSubtext: {
    fontSize: 12,
    color: '#64748B',
  },
  bannerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 18,
    padding: 14,
    marginHorizontal: 16,
    marginTop: 14,
    gap: 12,
  },
  bannerCardDark: {
    backgroundColor: '#451A03',
    borderColor: '#78350F',
  },
  bannerEmoji: {
    fontSize: 26,
  },
  bannerTextCol: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#92400E',
  },
  bannerSubtitle: {
    fontSize: 11,
    color: '#B45309',
    marginTop: 2,
  },
});
