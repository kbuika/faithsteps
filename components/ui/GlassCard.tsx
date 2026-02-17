import { Theme } from '@/constants/theme';
import { BlurView } from 'expo-blur';
import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface GlassCardProps {
  children: ReactNode;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default' | 'systemThinMaterial' | 'systemMaterial' | 'systemThickMaterial' | 'systemChromeMaterial' | 'systemUltraThinMaterial' | 'systemMaterialLight' | 'systemMaterialDark';
  style?: StyleProp<ViewStyle>;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  intensity = 20,
  tint = 'dark', // Dark tint fits the theme better
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <BlurView intensity={intensity} tint={tint} style={[StyleSheet.absoluteFill, styles.blur]} />
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: Theme.borderRadius.l,
    overflow: 'hidden',
    backgroundColor: 'rgba(8, 105, 114, 0.1)', // Fallback / Base transparency
    borderColor: 'rgba(255, 255, 255, 0.1)', // Subtle border for glass effect
    borderWidth: 1,
  },
  blur: {
    // Ensuring blur covers the container
  },
  content: {
    padding: Theme.spacing.m,
  },
});
