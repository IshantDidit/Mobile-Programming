import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProductItem } from '@/types';
import { useApp } from '@/context/AppContext';

interface ItemCardProps {
  item: ProductItem;
  variant?: 'list' | 'grid';
}

export default function ItemCard({ item, variant = 'list' }: ItemCardProps) {
  const { setSelectedItem, isDark } = useApp();

  const handlePress = () => {
    setSelectedItem(item);
  };

  if (variant === 'grid') {
    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => [
          styles.gridCard,
          isDark && styles.cardDark,
          pressed && { opacity: 0.8, transform: [{ scale: 0.98 }] },
        ]}>

        <View style={[styles.gridIconBox, { backgroundColor: item.bgColor }]}>
          <Text style={styles.gridEmoji}>{item.icon}</Text>
          {item.verified && (
            <View style={styles.gridVerifiedBadge}>
              <Ionicons name="checkmark-sharp" size={10} color="#FFFFFF" />
            </View>
          )}
        </View>

        <View style={styles.gridInfo}>
          <Text style={[styles.itemName, isDark && styles.textLightDark]} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={[styles.itemShop, isDark && styles.textMutedDark]} numberOfLines={1}>
            {item.shop}
          </Text>
          <View style={styles.gridPriceRow}>
            <Text style={styles.priceHighlight}>Rs {item.price}</Text>
            <Text style={[styles.gridUnitText, isDark && styles.textMutedDark]}>
              {item.unit.split(' ')[0]}
            </Text>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.listCard,
        isDark && styles.cardDark,
        pressed && { opacity: 0.8, transform: [{ scale: 0.99 }] },
      ]}>

      <View style={[styles.iconBox, { backgroundColor: item.bgColor }]}>
        <Text style={styles.itemEmoji}>{item.icon}</Text>
      </View>

      <View style={styles.itemDetails}>
        <Text style={[styles.itemName, isDark && styles.textLightDark]}>
          {item.name}
        </Text>
        <Text style={[styles.itemSubtitle, isDark && styles.textMutedDark]}>
          {item.unit} • {item.shop}
        </Text>
      </View>

      <View style={styles.rightSection}>
        <Text style={[styles.itemPrice, isDark && styles.textLightDark]}>
          Rs {item.price}
        </Text>

        {item.verified && (
          <View style={styles.verifiedCircle}>
            <Ionicons name="checkmark" size={11} color="#15803D" />
          </View>
        )}

        <Ionicons
          name="chevron-forward"
          size={16}
          color={isDark ? '#64748B' : '#94A3B8'}
          style={styles.chevron}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({

  listCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginVertical: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
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
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemEmoji: {
    fontSize: 22,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F172A',
  },
  verifiedCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#DCFCE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chevron: {
    marginLeft: 2,
  },

  gridCard: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    margin: 6,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  gridIconBox: {
    width: '100%',
    aspectRatio: 1.3,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: 8,
  },
  gridEmoji: {
    fontSize: 36,
  },
  gridVerifiedBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: '#16A34A',
    borderRadius: 8,
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridInfo: {
    gap: 2,
  },
  itemShop: {
    fontSize: 11,
    color: '#64748B',
  },
  gridPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  priceHighlight: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0284C7',
  },
  gridUnitText: {
    fontSize: 10,
    color: '#94A3B8',
  },
});
