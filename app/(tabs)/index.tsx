import { JourneyMap } from '@/components/journey/JourneyMap';
import { MilestonePreview } from '@/components/journey/MilestonePreview';
import { StepGoalCard } from '@/components/journey/StepGoalCard';
import { Theme } from '@/constants/theme';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Ionicons } from '@expo/vector-icons';
import React from 'react'; // Removed LinearGradient import
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const goal = useOnboardingStore((state) => state.dailyStepGoal) || 7000;
  const currentSteps = 3450; // Mock current steps for now

  return (
    <View style={styles.container}>
      {/* Removed LinearGradient to match onboarding solid black theme */}
      
      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header */}
        <View style={styles.header}>
            <View>
                <Text style={styles.journeyName}>The Exodus</Text>
                <View style={styles.streakContainer}>
                    <Text>🔥</Text>
                    <Text style={styles.streakText}> 12 Day Streak</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.settingsButton}>
                <Ionicons name="settings-outline" size={24} color={Theme.colors.textSecondary} />
            </TouchableOpacity>
        </View>

        {/* Dashboard Components */}
        <JourneyMap />
        
        <StepGoalCard 
            currentSteps={currentSteps} 
            goalSteps={goal} 
        />

        <MilestonePreview 
            title="Succoth"
            distanceAway="5 km"
            description="The first stop on the journey out of Egypt. A place of temporary shelter."
            imageUrl="https://images.unsplash.com/photo-1548588627-f978862b85e1?q=80&w=2600&auto=format&fit=crop&sat=-100" // Camp/Shelter, BW
        />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background, // Solid Black to match onboarding
    // paddingTop: Theme.spacing.topScreen, // Safe Area
  },
  scrollContent: {
      paddingBottom: 100, // Space for Tab Bar
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: Theme.spacing.l,
      paddingTop: 60, // Safe Area
      marginBottom: Theme.spacing.m,
  },
  journeyName: {
      fontFamily: Theme.typography.fontFamily.bold,
      fontSize: 34,
      color: Theme.colors.textPrimary,
      marginBottom: 4,
  },
  streakContainer: {
      flexDirection: 'row',
      alignItems: 'center',
  },
  streakText: {
      fontFamily: Theme.typography.fontFamily.medium,
      fontSize: 14,
      color: Theme.colors.textSecondary,
  },
  settingsButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: Theme.colors.zinc800,
      justifyContent: 'center',
      alignItems: 'center',
  }
});
