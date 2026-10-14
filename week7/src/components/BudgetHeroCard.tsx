import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/context/AppContext';

export default function BudgetHeroCard() {
  const { budget, setBudget, currentCombo, isDark, setIsBudgetModalOpen } = useApp();

  const budgetOptions = [100, 200, 500, 1000];

  return (
    <View style={[styles.cardContainer, isDark && styles.cardDark]}>

      <Text style={[styles.subtitleLabel, isDark && styles.textMutedDark]}>
        WHAT CAN I BUY WITH
      </Text>

      <View style={styles.amountRow}>
        <Text style={[styles.amountText, isDark && styles.textLightDark]}>
          Rs {budget.toLocaleString()}
        </Text>
      </View>

      <View style={styles.chipsRow}>
        {budgetOptions.map((amount) => {
          const isSelected = budget === amount;
          return (
            <Pressable
              key={amount}
              onPress={() => setBudget(amount)}
              style={({ pressed }) => [
                styles.chipButton,
                isSelected ? styles.chipSelected : isDark ? styles.chipDark : styles.chipInactive,
                pressed && { opacity: 0.8 },
              ]}>
              <Text
                style={[
                  styles.chipText,
                  isSelected
                    ? styles.chipTextSelected
                    : isDark
                    ? styles.textLightDark
                    : styles.chipTextInactive,
                ]}>
                Rs {amount.toLocaleString()}
              </Text>
            </Pressable>
          );
        })}

        <Pressable
          onPress={() => setIsBudgetModalOpen(true)}
          style={({ pressed }) => [
            styles.chipButton,
            styles.customChip,
            isDark && styles.customChipDark,
            pressed && { opacity: 0.8 },
          ]}>
          <Ionicons name="options-outline" size={14} color={isDark ? '#38BDF8' : '#0284C7'} />
          <Text style={[styles.customChipText, isDark && { color: '#38BDF8' }]}>Custom</Text>
        </Pressable>
      </View>

      <View style={styles.barContainer}>
        {currentCombo.segments.map((segment, index) => (
          <View
            key={index}
            style={[
              styles.barSegment,
              {
                backgroundColor: segment.color,
                flex: segment.percentage,
                borderTopLeftRadius: index === 0 ? 8 : 0,
                borderBottomLeftRadius: index === 0 ? 8 : 0,
                borderTopRightRadius: index === currentCombo.segments.length - 1 ? 8 : 0,
                borderBottomRightRadius: index === currentCombo.segments.length - 1 ? 8 : 0,
              },
            ]}
          />
        ))}
      </View>

      <View style={styles.legendRow}>
        {currentCombo.segments.map((seg, idx) => (
          <View key={idx} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: seg.color }]} />
            <Text style={[styles.legendLabel, isDark && styles.textLightDark]}>
              {seg.label}
            </Text>
            <Text style={[styles.legendPrice, isDark && styles.textMutedDark]}>
              Rs {seg.amount}
            </Text>
          </View>
        ))}
      </View>

      <View style={[styles.todayComboBox, isDark && styles.todayComboBoxDark]}>
        <Text style={[styles.comboHeading, isDark && styles.comboHeadingDark]}>
          TODAY'S RS {budget} COMBO
        </Text>

        <Text style={[styles.comboItemsList, isDark && styles.textLightDark]}>
          {currentCombo.items.join(' + ')}
        </Text>

        <View style={styles.verifiedBadge}>
          <Ionicons name="checkmark-sharp" size={12} color="#15803D" />
          <Text style={styles.verifiedText}>Verified in Ghattekulo</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  subtitleLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  textMutedDark: {
    color: '#94A3B8',
  },
  textLightDark: {
    color: '#F8FAFC',
  },
  amountRow: {
    marginVertical: 4,
  },
  amountText: {
    fontSize: 34,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -1,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginVertical: 12,
  },
  chipButton: {
    paddingVertical: 7,
    paddingHorizontal: 13,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipInactive: {
    backgroundColor: '#F1F5F9',
  },
  chipDark: {
    backgroundColor: '#0F172A',
  },
  chipSelected: {
    backgroundColor: '#0284C7',
  },
  chipText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chipTextInactive: {
    color: '#475569',
  },
  chipTextSelected: {
    color: '#FFFFFF',
  },
  customChip: {
    backgroundColor: '#F0F9FF',
    flexDirection: 'row',
    gap: 4,
    borderWidth: 1,
    borderColor: '#BAE6FD',
  },
  customChipDark: {
    backgroundColor: '#0C4A6E',
    borderColor: '#0284C7',
  },
  customChipText: {
    color: '#0284C7',
    fontSize: 12,
    fontWeight: '600',
  },
  barContainer: {
    height: 12,
    flexDirection: 'row',
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 6,
    marginBottom: 10,
    backgroundColor: '#E2E8F0',
  },
  barSegment: {
    height: '100%',
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  legendPrice: {
    fontSize: 10,
    color: '#64748B',
  },
  todayComboBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 6,
  },
  todayComboBoxDark: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
  },
  comboHeading: {
    fontSize: 10,
    fontWeight: '800',
    color: '#475569',
    letterSpacing: 0.6,
  },
  comboHeadingDark: {
    color: '#94A3B8',
  },
  comboItemsList: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
    lineHeight: 20,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#DCFCE7',
    alignSelf: 'flex-start',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginTop: 2,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#15803D',
  },
});
