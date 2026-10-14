import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/context/AppContext';
import { GHATTEKULO_SHOPS } from '@/data/mock-data';

export default function InteractiveMap() {
  const { highlightedShopId, setHighlightedShopId, isDark } = useApp();

  const selectedShop = GHATTEKULO_SHOPS.find((s) => s.id === highlightedShopId);

  return (
    <View style={[styles.mapContainer, isDark && styles.mapDark]}>

      <View style={styles.riverPath}>
        <Text style={styles.riverLabel}>Bagmati River</Text>
      </View>

      <View style={[styles.roadHorizontal, { top: '38%' }]} />
      <View style={[styles.roadHorizontal, { top: '65%' }]} />
      <View style={[styles.roadVertical, { left: '48%' }]} />
      <View style={[styles.roadVertical, { left: '72%' }]} />

      <View style={styles.landmarkBadge}>
        <Text style={[styles.landmarkText, isDark && styles.textLightDark]}>
          Ghattekulo Chowk
        </Text>
      </View>

      {GHATTEKULO_SHOPS.map((shop) => {
        const isSelected = highlightedShopId === shop.id;

        return (
          <Pressable
            key={shop.id}
            onPress={() => setHighlightedShopId(shop.id)}
            style={({ pressed }) => [
              styles.pinContainer,
              { left: `${shop.mapX}%`, top: `${shop.mapY}%` },
              pressed && { transform: [{ scale: 1.1 }] },
            ]}>

            {isSelected && <View style={styles.pinPulseHalo} />}

            <View style={[styles.pinBadge, isSelected && styles.pinBadgeSelected]}>
              <Ionicons
                name="location-sharp"
                size={isSelected ? 20 : 16}
                color={isSelected ? '#FFFFFF' : '#0284C7'}
              />
            </View>
          </Pressable>
        );
      })}

      {selectedShop && (
        <View style={[styles.mapTooltip, isDark && styles.tooltipDark]}>
          <Text style={styles.tooltipIcon}>{selectedShop.icon}</Text>
          <View style={styles.tooltipTextCol}>
            <View style={styles.tooltipNameRow}>
              <Text style={[styles.tooltipShopName, isDark && styles.textLightDark]}>
                {selectedShop.name}
              </Text>
              {selectedShop.verified && (
                <Ionicons name="checkmark-circle" size={14} color="#16A34A" />
              )}
            </View>
            <Text style={[styles.tooltipSub, isDark && styles.textMutedDark]}>
              📍 {selectedShop.distance} away • {selectedShop.highlightItem}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    height: 220,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    marginHorizontal: 16,
    marginVertical: 10,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  mapDark: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
  },
  textLightDark: {
    color: '#F8FAFC',
  },
  textMutedDark: {
    color: '#94A3B8',
  },
  riverPath: {
    position: 'absolute',
    left: 8,
    top: 0,
    bottom: 0,
    width: 48,
    backgroundColor: '#BAE6FD',
    opacity: 0.5,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 18,
    transform: [{ skewX: '-8deg' }],
    justifyContent: 'center',
    alignItems: 'center',
  },
  riverLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#0369A1',
    transform: [{ rotate: '-90deg' }],
  },
  roadHorizontal: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 12,
    backgroundColor: '#E2E8F0',
    opacity: 0.7,
  },
  roadVertical: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 12,
    backgroundColor: '#E2E8F0',
    opacity: 0.7,
  },
  landmarkBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  landmarkText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  pinContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -14 }, { translateY: -14 }],
  },
  pinBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1.5,
    borderColor: '#0284C7',
  },
  pinBadgeSelected: {
    backgroundColor: '#0284C7',
    width: 32,
    height: 32,
    borderRadius: 16,
    borderColor: '#FFFFFF',
  },
  pinPulseHalo: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(2, 132, 199, 0.25)',
  },
  mapTooltip: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tooltipDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  tooltipIcon: {
    fontSize: 22,
  },
  tooltipTextCol: {
    flex: 1,
  },
  tooltipNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tooltipShopName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F172A',
  },
  tooltipSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 1,
  },
});
