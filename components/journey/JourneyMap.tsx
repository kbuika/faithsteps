import { Milestone } from '@/constants/journeys';
import { Theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
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
                                    {isCompleted && <Ionicons name="checkmark" size={24} color={Theme.colors.primary} />}
                                    {isCurrent && <View style={styles.pulseDot} />}
                                    {isLocked && <Ionicons name="lock-closed" size={20} color={Theme.colors.zinc700} />}
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
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.zinc900,
        borderWidth: 2,
        borderColor: Theme.colors.zinc800,
        marginBottom: 12,
        zIndex: 2,
    },
    circleCompleted: {
        backgroundColor: 'rgba(23, 185, 120, 0.1)',
        borderColor: Theme.colors.primary,
    },
    circleCurrent: {
        borderColor: Theme.colors.primary,
        backgroundColor: 'rgba(23, 185, 120, 0.05)',
        ...Theme.shadows.glow,
    },
    circleLocked: {
        backgroundColor: Theme.colors.zinc900,
        borderColor: Theme.colors.zinc800,
    },
    pulseDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Theme.colors.primary,
        ...Theme.shadows.glow,
    },
    nodeCurrent: {
        transform: [{ scale: 1.05 }],
    },
    connector: {
        width: 45,
        height: 2, 
        marginTop: 27, 
        backgroundColor: Theme.colors.zinc700,
        zIndex: 1,
        marginLeft: -10, // Tighter overlap
        marginRight: -10, // Tighter overlap
    },
    connectorActive: {
        backgroundColor: Theme.colors.primary,
    },
    connectorInactive: {
        backgroundColor: Theme.colors.zinc700,
    },
    nodeTitle: {
        fontFamily: Theme.typography.fontFamily.medium,
        fontSize: 13,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        height: 20,
    },
    textCurrent: {
        color: Theme.colors.primary,
        fontWeight: 'bold',
    },
    nodeDistance: {
        fontFamily: Theme.typography.fontFamily.medium,
        fontSize: 11,
        color: Theme.colors.textTertiary,
        marginTop: 4,
    },
});
