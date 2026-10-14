import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/Header';
import CategoryBar from '@/components/CategoryBar';
import ItemCard from '@/components/ItemCard';
import ItemDetailModal from '@/components/ItemDetailModal';
import CustomBudgetModal from '@/components/CustomBudgetModal';
import { useApp } from '@/context/AppContext';

export default function ExploreScreen() {
  const { budget, filteredItems, isDark, setIsBudgetModalOpen } = useApp();

  const [searchQuery, setSearchQuery] = useState('');

  const [isGridMode, setIsGridMode] = useState(true);

  const itemsToDisplay = filteredItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.shop.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const inReachCount = itemsToDisplay.filter((i) => i.price <= budget).length;
  const avgPrice = Math.round(
    itemsToDisplay.reduce((acc, curr) => acc + curr.price, 0) / (itemsToDisplay.length || 1)
  );
  const verifiedCount = itemsToDisplay.filter((i) => i.verified).length;

  return (
    <SafeAreaView edges={['top']} style={[styles.safeArea, isDark && styles.safeAreaDark]}>

      <Header />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>

        <View style={[styles.buyingPowerCard, isDark && styles.cardDark]}>
          <View style={styles.cardHeaderRow}>
            <View>
              <Text style={[styles.buyingPowerLabel, isDark && styles.textMutedDark]}>
                BUYING POWER IN GHATTEKULO
              </Text>
              <Text style={[styles.buyingPowerTitle, isDark && styles.textLightDark]}>
                Rs {budget.toLocaleString()}
              </Text>
            </View>

            <Pressable
              onPress={() => setIsBudgetModalOpen(true)}
              style={({ pressed }) => [
                styles.editBudgetBtn,
                pressed && { opacity: 0.7 },
              ]}>
              <Ionicons name="pencil" size={13} color="#0284C7" />
              <Text style={styles.editBudgetText}>Change</Text>
            </Pressable>
          </View>

          <View style={styles.statsRow}>
            <View style={[styles.statBox, isDark && styles.statBoxDark]}>
              <Text style={styles.statNumber}>{inReachCount}</Text>
              <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>in reach</Text>
            </View>

            <View style={[styles.statBox, isDark && styles.statBoxDark]}>
              <Text style={styles.statNumber}>Rs {avgPrice}</Text>
              <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>avg price</Text>
            </View>

            <View style={[styles.statBox, isDark && styles.statBoxDark]}>
              <Text style={[styles.statNumber, { color: '#16A34A' }]}>{verifiedCount}</Text>
              <Text style={[styles.statLabel, isDark && styles.textMutedDark]}>verified</Text>
            </View>
          </View>
        </View>

        <View style={styles.searchRow}>
          <View style={[styles.searchBox, isDark && styles.searchBoxDark]}>
            <Ionicons name="search" size={16} color={isDark ? '#64748B' : '#94A3B8'} />
            <TextInput
              style={[styles.searchInput, isDark && styles.textLightDark]}
              placeholder="Search momo, eggs, shops..."
              placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <Pressable onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={16} color="#94A3B8" />
              </Pressable>
            )}
          </View>

          <Pressable
            onPress={() => setIsGridMode((prev) => !prev)}
            style={({ pressed }) => [
              styles.toggleLayoutBtn,
              isDark && styles.toggleLayoutBtnDark,
              pressed && { opacity: 0.7 },
            ]}>
            <Ionicons
              name={isGridMode ? 'grid' : 'list'}
              size={18}
              color={isDark ? '#38BDF8' : '#0284C7'}
            />
          </Pressable>
        </View>

        <CategoryBar />

        {isGridMode ? (
          <View style={styles.gridContainer}>
            {itemsToDisplay.map((item) => (
              <ItemCard key={item.id} item={item} variant="grid" />
            ))}
          </View>
        ) : (
          <View style={styles.listContainer}>
            {itemsToDisplay.map((item) => (
              <ItemCard key={item.id} item={item} variant="list" />
            ))}
          </View>
        )}

        <View style={{ height: 40 }} />
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
  buyingPowerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
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
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  buyingPowerLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  buyingPowerTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0F172A',
    marginTop: 2,
  },
  editBudgetBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0F9FF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  editBudgetText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0284C7',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  statBoxDark: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
  },
  statNumber: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  statLabel: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
    fontWeight: '500',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginVertical: 6,
    gap: 10,
  },
  searchBox: {
    flex: 1,
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  searchBoxDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F172A',
  },
  toggleLayoutBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  toggleLayoutBtnDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
    marginTop: 6,
  },
  listContainer: {
    marginTop: 6,
  },
});
