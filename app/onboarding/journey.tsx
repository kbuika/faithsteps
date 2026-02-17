import { PremiumButton } from '@/components/ui/PremiumButton';
import { Theme } from '@/constants/theme';
import { useOnboardingStore } from '@/store/onboardingStore';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface Journey {
  id: string;
  title: string;
  distance: string;
  duration: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  image: string;
}

const JOURNEYS: Journey[] = [
  {
    id: 'exodus',
    title: 'The Exodus',
    distance: '400 km',
    duration: '40 Days',
    difficulty: 'Medium',
    description: 'Walk from Egypt to the Promised Land. Experience mana, miracles, and the Red Sea crossing.',
    image: 'https://images.unsplash.com/photo-1545167097-c88f11904533?q=80&w=2670&auto=format&fit=crop&sat=-100', // Desert
  },
  {
    id: 'emmaus',
    title: 'Road to Emmaus',
    distance: '11 km',
    duration: '1-3 Days',
    difficulty: 'Easy',
    description: 'Join the disciples on the walk where Jesus reveals himself after resurrection.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2574&auto=format&fit=crop&sat=-100', // Nature Road
  },
  {
    id: 'paul-first',
    title: 'Paul\'s First Journey',
    distance: '1,500 km',
    duration: '3 Months',
    difficulty: 'Hard',
    description: 'Follow the apostle Paul through Cyprus and Galatia spreading the gospel.',
    image: 'https://images.unsplash.com/photo-1505832018823-50331d70d237?q=80&w=2616&auto=format&fit=crop&sat=-100', // Ancient/Travel
  },
];

export default function JourneySelectionScreen() {
  const router = useRouter();
  const setJourneyId = useOnboardingStore((state) => state.setJourneyId);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
  };

  const handleContinue = () => {
    if (selectedId) {
      setJourneyId(selectedId);
      router.push('/onboarding/goal');
    }
  };

  const renderItem = ({ item, index }: { item: Journey; index: number }) => {
    const isSelected = selectedId === item.id;
    return (
      <Animated.View entering={FadeInDown.delay(index * 100).duration(400)}>
        <Pressable 
            onPress={() => handleSelect(item.id)}
            style={[styles.cardContainer, isSelected && styles.cardContainerSelected]}
        >
            {/* Background Image */}
            <Image 
                source={{ uri: item.image }} 
                style={StyleSheet.absoluteFill} 
                contentFit="cover"
                transition={500}
            />
            
            {/* Gradient Overlay for Text Readability */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.6)', 'rgba(0,0,0,0.95)']}
                locations={[0, 0.5, 1]}
                style={StyleSheet.absoluteFill}
            />

            {/* Selection Overlay (Green Tint) */}
            {isSelected && (
                <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(23, 185, 120, 0.2)' }]} />
            )}

            {/* Content */}
            <View style={styles.cardContent}>
                <View style={styles.topRow}>
                     <View style={[styles.badge, { backgroundColor: getDifficultyColor(item.difficulty) }]}>
                        <Text style={styles.badgeText}>{item.difficulty}</Text>
                    </View>
                    {isSelected && (
                        <View style={styles.checkCircle}>
                            <Text style={styles.checkIcon}>✓</Text>
                        </View>
                    )}
                </View>

                <View>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <View style={styles.metaRow}>
                        <Text style={styles.metaText}>{item.distance}</Text>
                        <Text style={styles.metaDot}>•</Text>
                        <Text style={styles.metaText}>{item.duration}</Text>
                    </View>
                    <Text style={styles.description} numberOfLines={2}>
                        {item.description}
                    </Text>
                </View>
            </View>

            {/* Active Border */}
            {isSelected && <View style={styles.activeBorder} />}
        </Pressable>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Choose Your Path</Text>
        <Text style={styles.subheading}>Select a biblical journey that fits your life.</Text>
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={JOURNEYS}
          renderItem={renderItem}
          // @ts-ignore
          estimatedItemSize={200}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <View style={styles.footer}>
        <PremiumButton
          title="Start Journey"
          onPress={handleContinue}
          disabled={!selectedId}
          // When selected, use primary green. When not, use secondary/ghost-like to be less intrusive until action is needed.
          // Applying standard primary style but opacity handled by button component for disabled state
          variant={selectedId ? 'primary' : 'secondary'}
        />
      </View>
    </View>
  );
}

const getDifficultyColor = (diff: string) => {
    switch(diff) {
        case 'Easy': return Theme.colors.success;
        case 'Medium': return Theme.colors.warning;
        case 'Hard': return Theme.colors.error;
        default: return Theme.colors.info;
    }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
    paddingTop: 80,
  },
  header: {
    paddingHorizontal: Theme.spacing.l,
    marginBottom: Theme.spacing.l,
  },
  heading: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: 34,
    color: Theme.colors.textPrimary,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subheading: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: 17,
    color: Theme.colors.textSecondary,
    lineHeight: 22,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Theme.spacing.l,
    paddingBottom: 120,
    paddingTop: Theme.spacing.l,
  },
  cardContainer: {
    height: 200, // Taller cards for visual impact
    borderRadius: 24, // Premium rounded corners
    marginBottom: 20,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: Theme.colors.zinc900, // Fallback
  },
  cardContainerSelected: {
    transform: [{ scale: 1.02 }], // Subtle scale up
  },
  activeBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 3,
    borderColor: Theme.colors.primary,
    borderRadius: 24,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 20,
    zIndex: 10,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)', // Glassy look behind difficulty color? No, solid color from helper
  },
  badgeText: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: 11,
    color: '#000000', // Black text on bright badges
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: '#000',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardTitle: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: 24,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: 13,
    color: Theme.colors.textSecondary, // Use a lighter grey or maybe primary color?
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  metaDot: {
    color: Theme.colors.textSecondary,
    marginHorizontal: 8,
    fontSize: 12,
  },
  description: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: Theme.spacing.l,
    right: Theme.spacing.l,
  },
});
