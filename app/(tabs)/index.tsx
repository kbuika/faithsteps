import { JourneyMap } from '@/components/journey/JourneyMap';
import { MilestonePreview } from '@/components/journey/MilestonePreview';
import { StepGoalCard } from '@/components/journey/StepGoalCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Theme } from '@/constants/theme';
import { useJourneyStore } from '@/store/journeyStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated';

export default function HomeScreen() {
    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    const goal = useOnboardingStore((state) => state.dailyStepGoal) || 7000;
    // Mock current steps for now - in real app, hook into Pedometer
    const currentSteps = 3450; 

    // Store Data
    const activeJourney = useJourneyStore(state => state.getActiveJourney());
    const journeyProgress = useJourneyStore(state => state.journeyProgress);
    
    // Derived State
    const currentProgress = activeJourney ? journeyProgress[activeJourney.id] : null;
    const completedMilestoneIds = currentProgress?.completedMilestones || [];
    
    // Find next milestone
    const nextMilestone = activeJourney?.milestones.find(m => !completedMilestoneIds.includes(m.id));
    
    // Fallback if no journey active
    if (!activeJourney) return null; 

    return (
        <View style={styles.container}>
            <Animated.ScrollView 
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* 1. Map Interaction */}
                <JourneyMap 
                    milestones={activeJourney.milestones}
                    completedMilestoneIds={completedMilestoneIds}
                />

                {/* 2. Today's Goal */}
                <StepGoalCard 
                    currentSteps={currentSteps} 
                    goalSteps={goal} 
                />

                {/* 3. Next Milestone Preview */}
                {nextMilestone && (
                    <MilestonePreview 
                        title={nextMilestone.shortName}
                        distanceAway={`${(nextMilestone.distanceFromStart / 1000).toFixed(1)}km`}
                        description={nextMilestone.description}
                        imageUrl={nextMilestone.imageUrl}
                    />
                )}
                
                {/* Padding for Tab Bar */}
                <View style={{ height: 100 }} />
            </Animated.ScrollView>

            <View style={styles.headerContainer}>
                <ScreenHeader 
                    title={activeJourney.name}
                    subtitle={activeJourney.subtitle}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    content: {
        paddingTop: 150, // Space for the floating absolute header
        paddingBottom: 100, // Space for Tab Bar
    },
});
