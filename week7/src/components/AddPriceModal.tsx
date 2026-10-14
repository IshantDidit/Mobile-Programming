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
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/context/AppContext';

export default function AddPriceModal() {
  const { isAddPriceModalOpen, setIsAddPriceModalOpen, addCustomPrice, isDark } = useApp();

  const [itemName, setItemName] = useState('');
  const [shopName, setShopName] = useState('Ghattekulo Chowk Pasal');
  const [price, setPrice] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    if (!itemName.trim() || !price.trim()) {
      Alert.alert('Missing fields', 'Please enter both item name and price.');
      return;
    }
    const numPrice = parseInt(price, 10);
    if (isNaN(numPrice) || numPrice <= 0) {
      Alert.alert('Invalid price', 'Please enter a valid rupee amount.');
      return;
    }

    addCustomPrice(itemName.trim(), shopName, numPrice);
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setItemName('');
      setPrice('');
      setIsAddPriceModalOpen(false);
    }, 1500);
  };

  return (
    <Modal
      visible={isAddPriceModalOpen}
      transparent
      animationType="slide"
      onRequestClose={() => setIsAddPriceModalOpen(false)}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOverlay}>
        <View style={[styles.modalCard, isDark && styles.modalDark]}>

          <View style={styles.modalHeader}>
            <View style={styles.titleRow}>
              <Text style={styles.megaphoneIcon}>📣</Text>
              <Text style={[styles.modalTitle, isDark && styles.textLightDark]}>
                Add Ghattekulo Price
              </Text>
            </View>
            <Pressable
              onPress={() => setIsAddPriceModalOpen(false)}
              style={({ pressed }) => [styles.closeBtn, pressed && { opacity: 0.6 }]}>
              <Ionicons name="close" size={20} color={isDark ? '#94A3B8' : '#64748B'} />
            </Pressable>
          </View>

          <Text style={[styles.modalSubtitle, isDark && styles.textMutedDark]}>
            Help your neighbors in Ghattekulo know exact shop prices!
          </Text>

          {isSuccess ? (
            <View style={styles.successBox}>
              <Ionicons name="checkmark-circle" size={48} color="#16A34A" />
              <Text style={styles.successTitle}>Thank you!</Text>
              <Text style={styles.successSubtitle}>Price recorded for Ghattekulo community review.</Text>
            </View>
          ) : (
            <View style={styles.form}>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, isDark && styles.textMutedDark]}>Item Name</Text>
                <TextInput
                  style={[styles.input, isDark && styles.inputDark, isDark && styles.textLightDark]}
                  placeholder="e.g. Buffalo Milk 500ml"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  value={itemName}
                  onChangeText={setItemName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, isDark && styles.textMutedDark]}>Store / Pasal</Text>
                <TextInput
                  style={[styles.input, isDark && styles.inputDark, isDark && styles.textLightDark]}
                  placeholder="e.g. Shivalaya Store"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  value={shopName}
                  onChangeText={setShopName}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={[styles.label, isDark && styles.textMutedDark]}>Price in Rupees (Rs)</Text>
                <TextInput
                  style={[styles.input, isDark && styles.inputDark, isDark && styles.textLightDark]}
                  placeholder="e.g. 60"
                  placeholderTextColor={isDark ? '#64748B' : '#94A3B8'}
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                />
              </View>

              <Pressable
                onPress={handleSubmit}
                style={({ pressed }) => [
                  styles.submitBtn,
                  pressed && { opacity: 0.85, transform: [{ scale: 0.98 }] },
                ]}>
                <Text style={styles.submitBtnText}>Submit Price</Text>
              </Pressable>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
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
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  megaphoneIcon: {
    fontSize: 20,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0F172A',
  },
  closeBtn: {
    padding: 4,
  },
  modalSubtitle: {
    fontSize: 12,
    color: '#64748B',
    lineHeight: 17,
    marginBottom: 16,
  },
  form: {
    gap: 12,
  },
  inputGroup: {
    gap: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#475569',
  },
  input: {
    height: 46,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#0F172A',
    backgroundColor: '#F8FAFC',
  },
  inputDark: {
    backgroundColor: '#0F172A',
    borderColor: '#334155',
  },
  submitBtn: {
    backgroundColor: '#0284C7',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  successBox: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#16A34A',
  },
  successSubtitle: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
  },
});
