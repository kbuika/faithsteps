import { FadeInView } from '@/components/ui/FadeInView';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Theme } from '@/constants/theme';
import { useOnboardingStore } from '@/store/onboardingStore';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
// import AppleHealthKit from 'react-native-health'; // Placeholder for actual implementation check

export default function SetupScreen() {
  const router = useRouter();
  const completeOnboarding = useOnboardingStore((state) => state.completeOnboarding);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Creating your account...');

  useEffect(() => {
    // Simulate setup steps
    const timer1 = setTimeout(() => {
      setProgress(0.3);
      setStatus('Connecting to Apple Health...');
    }, 1000);

    const timer2 = setTimeout(() => {
      setProgress(0.6);
      setStatus('Personalizing your journey...');
    }, 2500);

    const timer3 = setTimeout(() => {
      setProgress(1.0);
      setStatus('Ready to walk!');
      finishSetup();
    }, 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const finishSetup = async () => {
    // Finalize storage
    completeOnboarding();
    // Navigate to main app
    // We replace the current route history so user can't go back to onboarding
    router.replace('/(tabs)'); 
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={Theme.gradients.background}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={styles.content}>
        <FadeInView>
            <ActivityIndicator size="large" color={Theme.colors.primary} />
        </FadeInView>
        
        <FadeInView delay={200} style={styles.textContainer}>
            <Text style={styles.status}>{status}</Text>
        </FadeInView>

        <View style={styles.progressContainer}>
            <ProgressBar progress={progress} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Theme.colors.background,
    paddingHorizontal: Theme.spacing.l,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    gap: Theme.spacing.xl,
  },
  textContainer: {
    alignItems: 'center',
  },
  status: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.sizes.title,
    color: Theme.colors.textPrimary,
    textAlign: 'center',
    marginTop: Theme.spacing.m,
  },
  progressContainer: {
    width: '100%',
    maxWidth: 300,
  },
});
