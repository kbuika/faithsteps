import { GlassCard } from '@/components/ui/GlassCard';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { Theme } from '@/constants/theme';
import { useOnboardingStore } from '@/store/onboardingStore';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const router = useRouter();
  const goal = useOnboardingStore((state) => state.dailyStepGoal);
  const journeyId = useOnboardingStore((state) => state.selectedJourneyId);
  const reset = useOnboardingStore((state) => state.reset);
  const completeOnboarding = useOnboardingStore((state) => state.completeOnboarding);

  const handleRestart = async () => {
    // 1. Reset store state
    reset(); 
    // 2. Force completion state to false just in case
    useOnboardingStore.setState({ isOnboardingComplete: false });
    // 3. Navigate back to onboarding root
    router.replace('/onboarding');
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Theme.gradients.background}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.content}>
        <GlassCard>
            <Text style={styles.welcome}>Welcome Pilgrim!</Text>
            <Text style={styles.meta}>Goal: {goal.toLocaleString()} steps</Text>
            <Text style={styles.meta}>Journey: {journeyId || 'The Exodus'}</Text>

            <View style={{ marginTop: 24 }}>
                <PremiumButton 
                    title="Restart Onboarding" 
                    onPress={handleRestart}
                    variant="outline"
                />
            </View>
        </GlassCard>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Theme.spacing.section,
    backgroundColor: Theme.colors.background,
    paddingHorizontal: Theme.spacing.l,
  },
  content: {
    paddingTop: Theme.spacing.xxl,
  },
  welcome: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: Theme.typography.sizes.title,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.m,
  },
  meta: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.sizes.body,
    color: Theme.colors.textSecondary,
    marginBottom: Theme.spacing.s,
  },
});
