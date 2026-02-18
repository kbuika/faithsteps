import { FadeInView } from '@/components/ui/FadeInView';
import { Theme } from '@/constants/theme';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown, Layout, ZoomIn } from 'react-native-reanimated';

const SETUP_STEPS = [
  { id: 'account', label: 'Creating your account' },
  { id: 'health', label: 'Connecting to Apple Health' },
  { id: 'personalize', label: 'Personalizing your journey' }, 
  { id: 'ready', label: 'Preparing your first step' }, 
];

export default function SetupScreen() {
  const router = useRouter();
  const completeOnboarding = useOnboardingStore((state) => state.completeOnboarding);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    // Simulate setup progress
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    
    // Step 1: Account (Start immediately) -> Finish in 1.5s
    timeouts.push(setTimeout(() => setCurrentStepIndex(1), 1500));
    
    // Step 2: Health -> Finish in 3s (Total)
    timeouts.push(setTimeout(() => setCurrentStepIndex(2), 3000));
    
    // Step 3: Personalize -> Finish in 4.5s (Total)
    timeouts.push(setTimeout(() => setCurrentStepIndex(3), 4500));
    
    // Step 4: Ready -> Finish in 5.5s
    timeouts.push(setTimeout(() => setCurrentStepIndex(4), 5500));

    // Navigate away after seeing full completion
    timeouts.push(setTimeout(() => {
        completeOnboarding();
        router.replace('/(tabs)');
    }, 6000));

    return () => timeouts.forEach(clearTimeout);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <FadeInView style={styles.header}>
            <Text style={styles.title}>Setting Up</Text>
            <Text style={styles.subtitle}>Just a moment while we prepare your spiritual journey.</Text>
        </FadeInView>

        <View style={styles.stepsContainer}>
            {SETUP_STEPS.map((step, index) => {
                const isActive = index === currentStepIndex;
                const isCompleted = index < currentStepIndex;
                const isPending = index > currentStepIndex;

                return (
                    <Animated.View 
                        key={step.id} 
                        entering={FadeInDown.delay(index * 100).duration(400)}
                        layout={Layout.springify()}
                        style={styles.stepRow}
                    >
                        <View style={styles.iconContainer}>
                            {isCompleted ? (
                                <Animated.View entering={ZoomIn.duration(300)} style={styles.checkCircle}>
                                    <Ionicons name="checkmark" size={14} color="#000" />
                                </Animated.View>
                            ) : isActive ? (
                                <ActivityIndicator size="small" color={Theme.colors.primary} />
                            ) : (
                                <View style={styles.pendingCircle} />
                            )}
                        </View>
                        
                        <Text style={[
                            styles.stepLabel, 
                            isActive && styles.stepLabelActive,
                            isCompleted && styles.stepLabelCompleted,
                            isPending && styles.stepLabelPending
                        ]}>
                            {step.label}
                        </Text>
                    </Animated.View>
                );
            })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  header: {
    marginBottom: 48,
  },
  title: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: 32,
    color: Theme.colors.textPrimary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: 16,
    color: Theme.colors.textSecondary,
    lineHeight: 22,
  },
  stepsContainer: {
    gap: 24,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 32, // Fixed height to prevent layout shifts
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  checkCircle: {
      width: 20,
      height: 20,
      borderRadius: 10,
      backgroundColor: Theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
  },
  pendingCircle: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: Theme.colors.zinc800,
  },
  stepLabel: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: 16,
    color: Theme.colors.textSecondary,
  },
  stepLabelActive: {
      color: Theme.colors.textPrimary,
      fontFamily: Theme.typography.fontFamily.bold,
  },
  stepLabelCompleted: {
      color: Theme.colors.textSecondary,
      opacity: 0.5, // Fade out completed items slightly to focus on current
  },
  stepLabelPending: {
      color: Theme.colors.zinc700,
  }
});
