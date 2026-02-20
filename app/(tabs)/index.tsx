import { JourneyMap, JourneyMapRef } from '@/components/journey/JourneyMap';
import { MilestonePreview } from '@/components/journey/MilestonePreview';
import { StepGoalCard } from '@/components/journey/StepGoalCard';
import { Theme } from '@/constants/theme';
import { useJourneyStore } from '@/store/journeyStore';
import { useOnboardingStore } from '@/store/onboardingStore';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import React, { useMemo, useRef } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const insets = useSafeAreaInsets();
    
    // Refs
    const bottomSheetRef = useRef<BottomSheet>(null);
    const mapRef = useRef<JourneyMapRef>(null);

    const snapPoints = useMemo(() => ['35%', '60%', '75%'], []);

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
            <View 
                style={[styles.headerWrapper, { top: Math.max(insets.top, 16) }]} 
                pointerEvents="box-none"
            >
                <View style={styles.headerShadowWrapper}>
                    <BlurView intensity={45} tint="dark" style={styles.headerGlass}>
                        <View style={styles.customHeaderContent}>
                            <View style={styles.headerTextGroup}>
                                <Text style={styles.headerTitle} numberOfLines={1}>{activeJourney.name}</Text>
                                {activeJourney.subtitle && (
                                    <Text style={styles.headerSubtitle} numberOfLines={1}>
                                        {activeJourney.subtitle}
                                    </Text>
                                )}
                            </View>
                            
                            {/* Floating Recenter FAB aligned inside header */}
                            <Pressable onPress={() => mapRef.current?.recenter()} style={styles.fabRecenter}>
                                <Ionicons name="locate" size={22} color={Theme.colors.primary} />
                            </Pressable>
                        </View>
                    </BlurView>
                </View>
            </View>

            {/* 1. Map Interaction (Takes available space, expands from very top) */}
            <View style={styles.mapContainer}>
                <JourneyMap 
                    ref={mapRef}
                    milestones={activeJourney.milestones}
                    completedMilestoneIds={completedMilestoneIds}
                />
            </View>

            {/* 2. Bottom Overlay Sheet */}
            <BottomSheet
                ref={bottomSheetRef}
                index={0} // Start at 35%
                snapPoints={snapPoints}
                backgroundStyle={{ 
                    backgroundColor: Theme.colors.zinc900, 
                    borderTopLeftRadius: 36, 
                    borderTopRightRadius: 36 
                }}
                handleIndicatorStyle={{ 
                    backgroundColor: Theme.colors.zinc700, 
                    width: 48, 
                    height: 6 
                }}
            >
                <BottomSheetScrollView contentContainerStyle={styles.sheetContent}>
                    {/* Today's Goal */}
                    <StepGoalCard 
                        currentSteps={currentSteps} 
                        goalSteps={goal} 
                    />

                    {/* Next Milestone Preview */}
                    {nextMilestone && (
                        <View style={styles.previewContainer}>
                            <MilestonePreview 
                                title={nextMilestone.shortName}
                                distanceAway={`${(nextMilestone.distanceFromStart / 1000).toFixed(1)}km`}
                                description={nextMilestone.description}
                                imageUrl={nextMilestone.imageUrl}
                            />
                        </View>
                    )}
                    
                    {/* Padding for Scroll */}
                    <View style={{ height: 40 }} />
                </BottomSheetScrollView>
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    headerWrapper: {
        position: 'absolute',
        left: Theme.spacing.l,
        right: Theme.spacing.l,
        zIndex: 10,
    },
    headerShadowWrapper: {
        borderRadius: 20,
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 20,
        elevation: 8,
    },
    headerGlass: {
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: Theme.colors.zinc700,
        backgroundColor: 'rgba(4, 13, 42, 0.4)', // Add slight tint to improve readability
    },
    customHeaderContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: Theme.spacing.l,
    },
    headerTextGroup: {
        flex: 1,
        marginRight: Theme.spacing.m,
    },
    headerTitle: {
        fontFamily: Theme.typography.fontFamily.bold,
        fontSize: 28, // Optimized for inline card layout
        color: Theme.colors.textPrimary,
        letterSpacing: -0.5,
    },
    headerSubtitle: {
        fontFamily: Theme.typography.fontFamily.medium,
        fontSize: 14,
        color: Theme.colors.textSecondary,
        marginTop: 4,
    },
    mapContainer: {
        flex: 1,
        // Map starts from the very top now, sitting purely under the absolute header container.
    },
    sheetContent: {
        paddingTop: Theme.spacing.m,
        paddingBottom: 40,
    },
    previewContainer: {
        marginTop: Theme.spacing.l,
    },
    fabRecenter: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Theme.colors.zinc800,
        justifyContent: 'center',
        alignItems: 'center',
        // ...Theme.shadows.glow,
        borderWidth: 1,
        borderColor: Theme.colors.zinc700,
    }
});
