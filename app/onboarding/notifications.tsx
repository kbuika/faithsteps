import { PremiumButton } from '@/components/ui/PremiumButton';
import { Theme } from '@/constants/theme';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming
} from 'react-native-reanimated';

export default function NotificationsScreen() {
  const router = useRouter();
  const rotation = useSharedValue(0);

  useEffect(() => {
    // Ringing animation: rotate back and forth
    rotation.value = withRepeat(
      withSequence(
        withTiming(-15, { duration: 150, easing: Easing.linear }),
        withTiming(15, { duration: 150, easing: Easing.linear }),
        withTiming(-10, { duration: 150, easing: Easing.linear }),
        withTiming(10, { duration: 150, easing: Easing.linear }),
        withTiming(0, { duration: 150, easing: Easing.linear }),
        withTiming(0, { duration: 2000 }) // Pause between rings
      ),
      -1, // Infinite loop
      false // Do not reverse
    );
  }, []);

  const animatedIconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const handleContinue = async () => {
    // Request permissions
    const { status } = await Notifications.requestPermissionsAsync();
    router.push('/onboarding/auth');
  };

  const handleSkip = () => {
    router.push('/onboarding/auth');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
            <View style={styles.iconCircle}>
                <Animated.Text style={[{ fontSize: 48 }, animatedIconStyle]}>🔔</Animated.Text>
            </View>
        </View>
        
        <View>
            <Text style={styles.title}>Stay Motivated with Faith Notifications</Text>
            <Text style={styles.subtitle}>
              Receive daily scripture, journey milestones, and reminders to walk with God.
            </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <PremiumButton title="Enable Notifications" onPress={handleContinue} />
        <View style={{ marginTop: 16 }}>
             <PremiumButton 
                title="Maybe Later" 
                variant="secondary" 
                onPress={handleSkip} 
                style={{ backgroundColor: 'transparent' }} // Make it look like a text link but keep touch area
                textStyle={{ color: Theme.colors.textSecondary, fontFamily: Theme.typography.fontFamily.medium }}
            />
        </View>
       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.surface, 
    paddingHorizontal: 32,
    paddingBottom: 60,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 40,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Theme.colors.zinc800,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: 28,
    color: Theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: 17,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    width: '100%',
  },
});
