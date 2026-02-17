import { Theme } from '@/constants/theme';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const isOnboardingComplete = useOnboardingStore((state) => state.isOnboardingComplete);
  const [isReady, setIsReady] = useState(false);

  // Simple hydration check hack: wait a tick for Zustand to likely hydrate
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100); 
    return () => clearTimeout(timer);
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, backgroundColor: Theme.colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color={Theme.colors.primary} />
      </View>
    );
  }

  if (isOnboardingComplete) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/onboarding" />;
}
