import { PremiumButton } from '@/components/ui/PremiumButton';
import { Theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const VALUE_PROPS = [
  {
    id: 1,
    title: 'Visualize Your Journey',
    subtitle: 'Track your real-world progress across ancient biblical landscapes.',
    icon: '🗺️',
  },
  {
    id: 2,
    title: 'Walk in Faith',
    subtitle: 'Every step unlocks new scripture readings and devotional content tailored to your path.',
    icon: '📖',
  },
  {
    id: 3,
    title: 'Grow Daily',
    subtitle: 'Build a consistent habit of prayer and movement, connecting body and soul.',
    icon: '🌱', 
  },
];

export default function ValuePropScreen() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/onboarding/journey');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Ready to Walk{'\n'}the Good Walk?</Text>
      </View>

      <View style={styles.grid}>
        {VALUE_PROPS.map((item, index) => (
          <Animated.View 
            key={item.id} 
            entering={FadeInDown.delay(index * 100).duration(400)}
            style={styles.row}
          >
            <View style={styles.iconContainer}>
               <Text style={styles.icon}>{item.icon}</Text>
            </View>
            <View style={styles.rowContent}>
                <Text style={styles.rowTitle}>{item.title}</Text>
                <Text style={styles.rowSubtitle}>{item.subtitle}</Text>
            </View>
          </Animated.View>
        ))}
      </View>

      <View style={styles.footer}>
        <PremiumButton title="Continue" onPress={handleNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingTop: 100, 
    paddingHorizontal: 32,
  },
  header: {
    marginBottom: 50,
    alignItems: 'center',
  },
  heading: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: 36,
    lineHeight: 42,
    color: Theme.colors.textPrimary,
    letterSpacing: -0.5,
    textAlign: 'center',
  },
  grid: {
    gap: 36,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Align icon with top of text
  },
  iconContainer: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    backgroundColor: Theme.colors.zinc900,
    borderRadius: 12,
  },
  icon: {
    fontSize: 28,
  },
  rowContent: {
    flex: 1,
    paddingTop: 2, // Slight visual alignment with icon
  },
  rowTitle: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: 17,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  rowSubtitle: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: 16,
    color: Theme.colors.textSecondary,
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 32,
    right: 32,
  },
});
