import { Theme } from '@/constants/theme';
import { BlurView } from 'expo-blur';
import { StyleSheet, Text } from 'react-native';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  return (
    <BlurView intensity={30} tint="dark" style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.l,
    paddingTop: 65, // Safe area approximation if not using SafeAreaView
    paddingBottom: Theme.spacing.m,
  },
  title: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: 34,
    color: Theme.colors.textPrimary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: 17,
    color: Theme.colors.textSecondary,
    marginTop: 4,
  },
});
