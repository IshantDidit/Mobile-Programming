import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '@/context/AppContext';

export default function Header() {
  const { isDark, toggleDarkMode } = useApp();

  return (
    <View style={[styles.headerContainer, isDark && styles.headerDark]}>

      <View style={styles.leftSection}>

        <View style={styles.logoBadge}>
          <Text style={styles.logoText}>K</Text>
        </View>

        <View style={styles.titleColumn}>
          <Text style={[styles.appTitle, isDark && styles.textDark]}>Kati?</Text>
          <View style={styles.locationRow}>
            <Ionicons name="location-sharp" size={12} color="#0284C7" />
            <Text style={[styles.locationText, isDark && styles.textSecondaryDark]}>
              Ghattekulo, Kathmandu
            </Text>
          </View>
        </View>
      </View>

      <Pressable
        onPress={toggleDarkMode}
        style={({ pressed }) => [
          styles.themeButton,
          isDark && styles.themeButtonDark,
          pressed && { opacity: 0.7 },
        ]}
        accessibilityLabel="Toggle dark mode">
        <Ionicons
          name={isDark ? 'sunny' : 'moon-outline'}
          size={20}
          color={isDark ? '#FACC15' : '#1E293B'}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  headerDark: {
    backgroundColor: '#0F172A',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#E63946',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E63946',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    fontFamily: 'System',
  },
  titleColumn: {
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 1,
  },
  locationText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '500',
  },
  themeButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  themeButtonDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  textDark: {
    color: '#F8FAFC',
  },
  textSecondaryDark: {
    color: '#94A3B8',
  },
});
