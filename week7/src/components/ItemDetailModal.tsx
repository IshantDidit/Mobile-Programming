import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useApp } from '@/context/AppContext';

export default function ItemDetailModal() {
  const {
    selectedItem,
    setSelectedItem,
    budget,
    isDark,
    setHighlightedShopId,
  } = useApp();

  if (!selectedItem) return null;

  const quantity = Math.max(1, Math.floor(budget / selectedItem.price));
  const totalCost = quantity * selectedItem.price;
  const leftover = Math.max(0, budget - totalCost);

  const maxPrice = Math.max(...selectedItem.shopPrices.map((sp) => sp.price));

  const handleSeeOnMap = () => {

    setHighlightedShopId('chowk-pasal');

    setSelectedItem(null);

    router.push('/shops');
  };

  return (
    <Modal
      visible={!!selectedItem}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={() => setSelectedItem(null)}>
      <SafeAreaView edges={['top', 'bottom']} style={[styles.safeArea, isDark && styles.safeAreaDark]}>

        <View style={[styles.headerBar, isDark && styles.headerBarDark]}>
          <Pressable
            onPress={() => setSelectedItem(null)}
            style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.6 }]}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={isDark ? '#F8FAFC' : '#0F172A'}
            />
          </Pressable>
          <Text style={[styles.headerTitle, isDark && styles.textLightDark]}>
            {selectedItem.name}
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          style={styles.scrollContent}
          contentContainerStyle={styles.scrollInner}
          showsVerticalScrollIndicator={false}>

          <View style={[styles.card, isDark && styles.cardDark]}>

            <View style={[styles.largeIconBox, { backgroundColor: selectedItem.bgColor }]}>
              <Text style={styles.largeEmoji}>{selectedItem.icon}</Text>
            </View>

            <Text style={[styles.productName, isDark && styles.textLightDark]}>
              {selectedItem.name} • {selectedItem.unit}
            </Text>
            <Text style={[styles.priceRangeText, isDark && styles.textMutedDark]}>
              {selectedItem.priceRange}
            </Text>

            {selectedItem.verified && (
              <View style={styles.verifiedPill}>
                <Ionicons name="checkmark-sharp" size={13} color="#15803D" />
                <Text style={styles.verifiedPillText}>Verified</Text>
              </View>
            )}
          </View>

          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={[styles.sectionSubtitle, isDark && styles.textMutedDark]}>
              RS {budget.toLocaleString()} BUYS
            </Text>
            <Text style={[styles.buysQuantityText, isDark && styles.textLightDark]}>
              {quantity} {selectedItem.name.toLowerCase() === 'toothpaste' ? 'tubes' : 'units'}
            </Text>
            <Text style={[styles.buysLeftoverText, isDark && styles.textMutedDark]}>
              Rs {leftover.toLocaleString()} left
            </Text>
          </View>

          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={[styles.sectionSubtitle, isDark && styles.textMutedDark]}>
              PRICE BY SHOP
            </Text>

            <View style={styles.shopsComparisonList}>
              {selectedItem.shopPrices.map((sp, idx) => {

                const fillPercent = Math.round((sp.price / maxPrice) * 100);

                return (
                  <View key={idx} style={styles.shopComparisonRow}>

                    <Text
                      style={[styles.compShopName, isDark && styles.textLightDark]}
                      numberOfLines={1}>
                      {sp.shopName}
                    </Text>

                    <View style={styles.barTrack}>
                      <View
                        style={[
                          styles.barFill,
                          {
                            width: `${fillPercent}%`,
                            backgroundColor: sp.isCheapest ? '#0284C7' : '#38BDF8',
                          },
                        ]}
                      />
                    </View>

                    <Text style={[styles.compPrice, isDark && styles.textLightDark]}>
                      Rs {sp.price}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={[styles.sectionSubtitle, isDark && styles.textMutedDark]}>
              SOURCES
            </Text>

            <View style={styles.sourcesList}>
              {selectedItem.sources.map((src, idx) => (
                <View key={idx} style={styles.sourceRow}>

                  <View style={styles.sourceIconBox}>
                    <Ionicons
                      name={
                        src.type === 'survey'
                          ? 'storefront-outline'
                          : src.type === 'reddit'
                          ? 'logo-reddit'
                          : 'document-text-outline'
                      }
                      size={18}
                      color={src.type === 'reddit' ? '#EA580C' : '#0284C7'}
                    />
                  </View>

                  <View style={styles.sourceInfo}>
                    <Text style={[styles.sourceTitle, isDark && styles.textLightDark]}>
                      {src.title}
                    </Text>
                    <Text style={[styles.sourceTime, isDark && styles.textMutedDark]}>
                      {src.time}
                    </Text>
                  </View>

                  {src.verified && (
                    <View style={styles.sourceCheckCircle}>
                      <Ionicons name="checkmark" size={12} color="#15803D" />
                    </View>
                  )}

                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={isDark ? '#475569' : '#94A3B8'}
                  />
                </View>
              ))}
            </View>
          </View>

          <View style={{ height: 90 }} />
        </ScrollView>

        <View style={[styles.bottomBar, isDark && styles.bottomBarDark]}>
          <Pressable
            onPress={handleSeeOnMap}
            style={({ pressed }) => [
              styles.seeMapButton,
              pressed && { opacity: 0.85, transform: [{ scale: 0.99 }] },
            ]}>
            <Ionicons name="location" size={18} color="#FFFFFF" />
            <Text style={styles.seeMapButtonText}>See shops on map</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </Modal>
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
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  headerBarDark: {
    backgroundColor: '#0F172A',
    borderBottomColor: '#1E293B',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  scrollContent: {
    flex: 1,
  },
  scrollInner: {
    padding: 16,
    gap: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  textLightDark: {
    color: '#F8FAFC',
  },
  textMutedDark: {
    color: '#94A3B8',
  },
  largeIconBox: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  largeEmoji: {
    fontSize: 56,
  },
  productName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F172A',
    marginBottom: 4,
  },
  priceRangeText: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 10,
    fontWeight: '500',
  },
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  verifiedPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#15803D',
  },
  sectionSubtitle: {
    fontSize: 11,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.7,
    marginBottom: 8,
  },
  buysQuantityText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.5,
  },
  buysLeftoverText: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  shopsComparisonList: {
    gap: 14,
    marginTop: 8,
  },
  shopComparisonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  compShopName: {
    width: 140,
    fontSize: 13,
    fontWeight: '600',
    color: '#0F172A',
  },
  barTrack: {
    flex: 1,
    height: 14,
    backgroundColor: '#F1F5F9',
    borderRadius: 7,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 7,
  },
  compPrice: {
    width: 55,
    textAlign: 'right',
    fontSize: 13,
    fontWeight: '800',
    color: '#0F172A',
  },
  sourcesList: {
    gap: 12,
    marginTop: 6,
  },
  sourceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 10,
  },
  sourceIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sourceInfo: {
    flex: 1,
  },
  sourceTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  sourceTime: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
  sourceCheckCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingBottom: Platform.OS === 'ios' ? 28 : 14,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  bottomBarDark: {
    backgroundColor: '#0F172A',
    borderTopColor: '#1E293B',
  },
  seeMapButton: {
    backgroundColor: '#0284C7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    borderRadius: 16,
    shadowColor: '#0284C7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  seeMapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
