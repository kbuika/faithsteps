import { FadeInView } from '@/components/ui/FadeInView';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { Theme } from '@/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

export default function OnboardingScreen() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/onboarding/value');
  };

  return (
    <View style={styles.container}>
      {/* Background Image / Texture */}
      <ImageBackground 
        source={{ uri: 'https://images.unsplash.com/photo-1502230831726-fe5549140034?q=80&w=2574&auto=format&fit=crop' }} 
        style={StyleSheet.absoluteFill}
        // contentFit="cover"
      >
        <LinearGradient
            // Strong gradient for readability
            colors={['transparent', 'rgba(0,0,0,0.6)', '#000000']}
            style={StyleSheet.absoluteFill}
            locations={[0, 0.4, 0.9]}
        />
      </ImageBackground>

      <View style={styles.content}>
        <FadeInView delay={300} style={styles.header}>
            <Text style={styles.title}>
              Walk with <Text style={{ color: Theme.colors.primary }}>Faith.</Text>
            </Text>
            <Text style={styles.subtitle}>
              Turn your daily steps into a spiritual journey. 
              Track your progress through biblical landscapes.
            </Text>
        </FadeInView>

        <FadeInView delay={600} style={styles.footer}>
          <PremiumButton title="Get Started" onPress={handleStart} />
        </FadeInView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: Theme.spacing.l,
    paddingBottom: Theme.spacing.xxl,
  },
  header: {
    marginBottom: Theme.spacing.section,
  },
  title: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: 52, // Large, hero size
    lineHeight: 56,
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: Theme.spacing.m,
  },
  subtitle: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: Theme.typography.sizes.body,
    color: Theme.colors.textSecondary,
    lineHeight: 24,
    maxWidth: '80%',
  },
  footer: {
    width: '100%',
  },
});
