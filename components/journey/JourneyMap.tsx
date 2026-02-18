import { Milestone } from '@/constants/journeys';
import { Theme } from '@/constants/theme';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface JourneyMapProps {
    milestones: Milestone[];
    completedMilestoneIds: string[];
}

export function JourneyMap({ milestones, completedMilestoneIds }: JourneyMapProps) {
    // Find index of first incomplete milestone to mark as current
    const firstIncompleteIndex = milestones.findIndex(m => !completedMilestoneIds.includes(m.id));
    const currentIndex = firstIncompleteIndex === -1 ? milestones.length - 1 : firstIncompleteIndex;

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Your Path</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false} 
                contentContainerStyle={styles.scrollContent}
            >
                {milestones.map((milestone, index) => {
                    const isCompleted = completedMilestoneIds.includes(milestone.id);
                    const isCurrent = index === currentIndex;
                    const isLocked = !isCompleted && !isCurrent;

                    return (
                        <View key={milestone.id} style={styles.nodeWrapper}>
                            <Animated.View 
                                entering={FadeInDown.delay(index * 100).duration(500)}
                                style={[styles.nodeContainer, isCurrent && styles.nodeCurrent]}
                            >
                                <View style={[
                                    styles.nodeCircle, 
                                    isCompleted && styles.circleCompleted,
                                    isCurrent && styles.circleCurrent,
                                    isLocked && styles.circleLocked
                                ]}>
                                    {isCompleted && <Text style={styles.checkIcon}>✓</Text>}
                                    {isCurrent && <View style={styles.pulseDot} />}
                                    {isLocked && <Text style={styles.lockIcon}>🔒</Text>}
                                </View>
                                
                                <Text 
                                    style={[styles.nodeTitle, isCurrent && styles.textCurrent]}
                                    numberOfLines={2}
                                >
                                    {milestone.shortName}
                                </Text>
                                <Text style={styles.nodeDistance}>
                                    {(milestone.distanceFromStart / 1000).toFixed(1)} km
                                </Text>
                            </Animated.View>

                            {/* Connecting Line (except last) */}
                            {index < milestones.length - 1 && (
                                <View style={[
                                    styles.connector, 
                                    (isCompleted && index < currentIndex) ? styles.connectorActive : styles.connectorInactive
                                ]} />
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: Theme.spacing.s,
        marginBottom: Theme.spacing.l,
    },
    sectionTitle: {
        paddingHorizontal: Theme.spacing.l,
        fontFamily: Theme.typography.fontFamily.bold,
        fontSize: 20,
        color: Theme.colors.textPrimary,
        marginBottom: Theme.spacing.m,
    },
    scrollContent: {
        paddingHorizontal: Theme.spacing.l,
        paddingBottom: 20, // Space for scale animation
    },
    nodeWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingTop: 10,
    },
    nodeContainer: {
        alignItems: 'center',
        width: 90,
        marginRight: 0, 
        zIndex: 2,
    },
    nodeCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.zinc800,
        borderWidth: 2,
        borderColor: Theme.colors.zinc700,
        marginBottom: 8,
        zIndex: 2,
    },
    circleCompleted: {
        backgroundColor: Theme.colors.primary,
        borderColor: Theme.colors.primary,
    },
    circleCurrent: {
        borderColor: Theme.colors.primary,
        backgroundColor: 'rgba(23, 185, 120, 0.1)',
    },
    circleLocked: {
        opacity: 0.5,
    },
    checkIcon: {
        color: '#000',
        fontWeight: 'bold',
    },
    lockIcon: {
        fontSize: 12,
    },
    pulseDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: Theme.colors.primary,
    },
    nodeCurrent: {
        transform: [{ scale: 1.05 }],
    },
    connector: {
        width: 50,
        height: 3, 
        marginTop: 22.5, 
        backgroundColor: Theme.colors.zinc700,
        zIndex: 1,
        marginLeft: -20, // Tighter overlap
        marginRight: -20, // Tighter overlap
    },
    connectorActive: {
        backgroundColor: Theme.colors.primary,
    },
    connectorInactive: {
        backgroundColor: Theme.colors.zinc800,
    },
    nodeTitle: {
        fontFamily: Theme.typography.fontFamily.medium,
        fontSize: 12,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        height: 32,
    },
    textCurrent: {
        color: Theme.colors.primary,
        fontWeight: 'bold',
    },
    nodeDistance: {
        fontFamily: Theme.typography.fontFamily.regular,
        fontSize: 10,
        color: Theme.colors.textTertiary,
        marginTop: 2,
    },
});
