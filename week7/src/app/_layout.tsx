import React, { useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { AppProvider, useApp } from '@/context/AppContext';

SplashScreen.preventAutoHideAsync().catch(() => {});

function TabsNavigator() {
  const { isDark } = useApp();
  const insets = useSafeAreaInsets();

  useEffect(() => {

    SplashScreen.hideAsync().catch(() => {});
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#0284C7',
        tabBarInactiveTintColor: isDark ? '#64748B' : '#94A3B8',
        tabBarStyle: {
          backgroundColor: isDark ? '#0F172A' : '#FFFFFF',
          borderTopColor: isDark ? '#1E293B' : '#E2E8F0',

          height: (Platform.OS === 'ios' ? 72 : 68) + insets.bottom,
          paddingBottom: Math.max(insets.bottom, Platform.OS === 'ios' ? 22 : 8),
          paddingTop: 8,
          borderTopWidth: 1,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
          marginTop: 2,
        },
      }}>

      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconWrapper,
                focused && (isDark ? styles.iconPillDark : styles.iconPillLight),
              ]}>
              <Ionicons
                name={focused ? 'home' : 'home-outline'}
                size={21}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconWrapper,
                focused && (isDark ? styles.iconPillDark : styles.iconPillLight),
              ]}>
              <Ionicons
                name={focused ? 'search' : 'search-outline'}
                size={21}
                color={color}
              />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="shops"
        options={{
          title: 'Shops',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[
                styles.iconWrapper,
                focused && (isDark ? styles.iconPillDark : styles.iconPillLight),
              ]}>
              <Ionicons
                name={focused ? 'storefront' : 'storefront-outline'}
                size={21}
                color={color}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <TabsNavigator />
      </AppProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPillLight: {
    backgroundColor: '#E0F2FE',
  },
  iconPillDark: {
    backgroundColor: '#0C4A6E',
  },
});
