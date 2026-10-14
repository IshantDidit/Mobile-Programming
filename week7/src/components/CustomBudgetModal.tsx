import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/context/AppContext';

export default function CustomBudgetModal() {
  const { budget, setBudget, isBudgetModalOpen, setIsBudgetModalOpen, isDark } = useApp();

  const [inputVal, setInputVal] = useState('');

  const presets = [100, 200, 500, 1000];

  const handleApply = (amount?: number) => {
    const finalAmount = amount || parseInt(inputVal, 10);
    if (!isNaN(finalAmount) && finalAmount > 0) {
      setBudget(finalAmount);
    }
    setInputVal('');
    setIsBudgetModalOpen(false);
  };

  return (
    <Modal
      visible={isBudgetModalOpen}
      transparent
      animationType="fade"
      onRequestClose={() => setIsBudgetModalOpen(false)}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOverlay}>
        <View style={[styles.modalCard, isDark && styles.modalDark]}>

          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, isDark && styles.textLightDark]}>
              Choose your daily budget
            </Text>
            <Pressable
              onPress={() => setIsBudgetModalOpen(false)}
              style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.6 }]}>
              <Ionicons name="close" size={20} color={isDark ? '#94A3B8' : '#64748B'} />
            </Pressable>
          </View>

          <Text style={[styles.modalSubtitle, isDark && styles.textMutedDark]}>
            See what items, meals, and grocery packs your money can buy in Ghattekulo today.
          </Text>

          <View style={styles.presetsGrid}>
            {presets.map((preset) => {
              const isActive = budget === preset;
              return (
                <Pressable
                  key={preset}
                  onPress={() => handleApply(preset)}
                  style={({ pressed }) => [
                    styles.presetBtn,
                    isActive ? styles.presetActive : isDark ? styles.presetDark : styles.presetInactive,
                    pressed && { opacity: 0.8 },
                  ]}>
                  <Text
                    style={[
                      styles.presetText,
                      isActive ? styles.presetTextActive : isDark ? styles.textLightDark : styles.presetTextInactive,
                    ]}>
                    Rs. {preset}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.customInputSection}>
            <Text style={[styles.inputLabel, isDark && styles.textMutedDark]}>
              Or enter custom budget:
            </Text>
            <View style={[styles.inputBox, isDark && styles.inputBoxDark]}>
              <Text style={[styles.rupeePrefix, isDark && styles.textMutedDark]}>Rs.</Text>
              <TextInput
                style={[styles.textInput, isDark && styles.textLightDark]}
                placeholder="e.g. 750"
                placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                keyboardType="numeric"
                value={inputVal}
                onChangeText={setInputVal}
              />
            </View>
          </View>

          <Pressable
            onPress={() => handleApply()}
            style={({ pressed }) => [
              styles.applyButton,
              pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
            ]}>
            <Text style={styles.applyButtonText}>Apply Budget</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  modalDark: {
    backgroundColor: '#1E293B',
  },
  textLightDark: {
    color: '#F8FAFC',
  },
  textMutedDark: {
    color: '#94A3B8',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    padding: 4,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#64748B',
    lineHeight: 18,
    marginBottom: 16,
  },
  presetsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  presetBtn: {
    flex: 1,
    minWidth: '45%',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetInactive: {
    backgroundColor: '#F1F5F9',
  },
  presetDark: {
    backgroundColor: '#0F172A',
  },
  presetActive: {
    backgroundColor: '#0284C7',
  },
  presetText: {
    fontSize: 14,
    fontWeight: '700',
  },
  presetTextInactive: {
    color: '#334155',
  },
  presetTextActive: {
    color: '#FFFFFF',
  },
  customInputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 6,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  inputBoxDark: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
  },
  rupeePrefix: {
    fontSize: 16,
    fontWeight: '700',
    color: '#64748B',
    marginRight: 6,
  },
  textInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  applyButton: {
    backgroundColor: '#6366F1',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
