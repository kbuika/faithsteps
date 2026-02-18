import { Theme } from '@/constants/theme';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

// MVP: Simple vertical scroll list of milestones
// Future: Canvas-based interactive map
const MILESTONES = [
    { id: '1', title: 'Rameses (Start)', distance: '0 km', status: 'completed' },
    { id: '2', title: 'Succoth', distance: '45 km', status: 'current' },
    { id: '3', title: 'Etham', distance: '90 km', status: 'locked' },
    { id: '4', title: 'Pi Hahiroth', distance: '135 km', status: 'locked' },
    { id: '5', title: 'Red Sea Crossing', distance: '180 km', status: 'locked' },
];

export function JourneyMap() {
  return (
    <View style={styles.container}>
        <Text style={styles.sectionTitle}>Your Path</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {MILESTONES.map((milestone, index) => {
                const isCompleted = milestone.status === 'completed';
                const isCurrent = milestone.status === 'current';
                const isLocked = milestone.status === 'locked';

                return (
                    <Animated.View 
                        key={milestone.id} 
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
                        
                        {/* Connecting Line (except last) */}
                        {index < MILESTONES.length - 1 && (
                            <View style={[styles.connector, isCompleted ? styles.connectorActive : styles.connectorInactive]} />
                        )}

                        <Text style={[styles.nodeTitle, isCurrent && styles.textCurrent]}>
                            {milestone.title}
                        </Text>
                        <Text style={styles.nodeDistance}>{milestone.distance}</Text>
                    </Animated.View>
                );
            })}
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Theme.spacing.l,
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
      alignItems: 'flex-start', // Align items to top
  },
  nodeContainer: {
      alignItems: 'center',
      marginRight: 24, // Spacing between nodes
      width: 80, 
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
      zIndex: 2, // Above connector
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
      position: 'absolute',
      // Circle Center is at width/2 = 40. 
      // Circle Right Edge is at 40 + 24 = 64.
      // So line should start at 64.
      left: 64, 
      top: 23, // 48/2 = 24. Line height 2. Top = 23.
      // Width = Gap + (Next Start - Next Left Edge)?
      // Gap is MarginRight = 24.
      // Distance from Right Edge (64) to Next Container Start (80 + 24 = 104).
      // Inside Next Container, Circle Center is 40. Left Edge is 16.
      // So Line End is at Next Container Left Edge relative to Current Container Start.
      // Total Distance Node1 Start -> Node2 Left Edge = 80 (width) + 24 (margin) + 16 (left padding) = 120?
      // Wait. Container 1 [0..80]. Gap [80..104]. Container 2 [104..184].
      // Circle 1 Right Edge = 64.
      // Circle 2 Left Edge = 104 + 16 = 120.
      // Line Width = 120 - 64 = 56.
      // Check: 16 (remains of Cont1) + 24 (gap) + 16 (start of Cont2) = 56. Correct.
      width: 56, 
      height: 2,
      backgroundColor: Theme.colors.zinc800,
      zIndex: 1,
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
      height: 32, // Fixed height for 2 lines
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
