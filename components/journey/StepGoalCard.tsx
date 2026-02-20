import { Theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    FadeInDown,
    useAnimatedProps,
    useSharedValue,
    withDelay,
    withTiming
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle) as any;

interface StepGoalCardProps {
    currentSteps: number;
    goalSteps: number;
}

export function StepGoalCard({ currentSteps, goalSteps }: StepGoalCardProps) {
    const progress = Math.min(currentSteps / goalSteps, 1);
    const animatedProgress = useSharedValue(0);
    const radius = 36;
    const circumference = 2 * Math.PI * radius;

    useEffect(() => {
        animatedProgress.value = withDelay(500, withTiming(progress, { duration: 1500 }));
    }, [progress]);

    const animatedProps = useAnimatedProps(() => {
        const strokeDashoffset = circumference * (1 - animatedProgress.value);
        return {
            strokeDashoffset,
        };
    });

    return (
        <Animated.View 
            entering={FadeInDown.delay(200).duration(600)}
            style={styles.cardContainer}
        >
            <View style={styles.innerContainer}>
                <View style={styles.leftContent}>
                    <Text style={styles.label}>TODAY'S STEPS</Text>
                    <View style={styles.statsRow}>
                        <Text 
                            numberOfLines={1} 
                            adjustsFontSizeToFit
                            minimumFontScale={0.4}
                        >
                            <Text style={styles.currentSteps}>{currentSteps.toLocaleString()}</Text>
                            <Text style={styles.goalLabel}> / {goalSteps.toLocaleString()}</Text>
                        </Text>
                    </View>
                    <Text style={styles.subtext}>
                        {currentSteps >= goalSteps ? 'Goal reached! 🎉' : `${(goalSteps - currentSteps).toLocaleString()} steps to go`}
                    </Text>
                </View>

                <View style={styles.ringContainer}>
                     <Svg width={90} height={90} viewBox="0 0 90 90">
                         {/* Background Circle */}
                        <Circle
                            cx="45"
                            cy="45"
                            r={radius}
                            stroke={Theme.colors.zinc800}
                            strokeWidth="12"
                            fill="transparent"
                            strokeLinecap="round"
                        />
                        {/* Progress Circle */}
                        <AnimatedCircle
                            cx="45"
                            cy="45"
                            r={radius}
                            stroke={Theme.colors.primary}
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeLinecap="round"
                            rotation="-90"
                            origin="45, 45"
                            animatedProps={animatedProps}
                        />
                     </Svg>
                     <View style={styles.iconCenter}>
                        <Ionicons name="footsteps" size={24} color={Theme.colors.primary} />
                     </View>
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    cardContainer: {
        marginHorizontal: Theme.spacing.l,
        marginBottom: Theme.spacing.l,
        height: 160, 
        borderRadius: 24,
        overflow: 'hidden',
        backgroundColor: Theme.colors.zinc700,
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: Theme.spacing.xl,
    },
    leftContent: {
        flex: 1,
        justifyContent: 'center',
        paddingRight: Theme.spacing.m, // Add breathing room
    },
    label: {
        fontFamily: Theme.typography.fontFamily.bold,
        fontSize: 13,
        color: Theme.colors.accent,
        marginBottom: 8,
        letterSpacing: 1.5, 
        textTransform: 'uppercase',
    },
    statsRow: {
        marginBottom: 2, // No longer row flex, just a container
    },
    currentSteps: {
        fontFamily: Theme.typography.fontFamily.bold,
        fontSize: 56, 
        color: Theme.colors.primary,
        letterSpacing: -2,
        includeFontPadding: false,
    },
    goalLabel: {
        fontFamily: Theme.typography.fontFamily.medium,
        fontSize: 18,
        color: 'rgba(255,255,255,0.4)',
    },
    subtext: {
        fontFamily: Theme.typography.fontFamily.medium,
        fontSize: 13,
        color: Theme.colors.textSecondary,
    },
    ringContainer: {
        position: 'relative',
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconCenter: {
        position: 'absolute',
    }
});
