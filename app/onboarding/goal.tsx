import { PremiumButton } from '@/components/ui/PremiumButton';
import { Theme } from '@/constants/theme';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const GOAL_OPTIONS = [
  { label: 'Lightly', steps: 5000 },
  { label: 'Moderately', steps: 7500 },
  { label: 'Highly', steps: 10000 },
];

export default function GoalSelectScreen() {
    const router = useRouter();
    const [stepGoal, setStepGoal] = useState(7500);

    const increment = () => setStepGoal(p => Math.min(p + 100, 50000));
    const decrement = () => setStepGoal(p => Math.max(p - 100, 1000));

    const handleContinue = () => {
        router.push('/onboarding/notifications');
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Daily Move Goal</Text>
                <Text style={styles.subtitle}>Set a goal based on how active you are, or how active you'd like to be, each day.</Text>
            </View>

            <View style={styles.segmentContainer}>
                {GOAL_OPTIONS.map((opt) => (
                    <Pressable 
                        key={opt.label} 
                        style={[styles.segment, stepGoal === opt.steps && styles.segmentActive]}
                        onPress={() => setStepGoal(opt.steps)}
                    >
                        <Text style={[styles.segmentText, stepGoal === opt.steps && styles.segmentTextActive]}>{opt.label}</Text>
                    </Pressable>
                ))}
            </View>

            <View style={styles.counterRow}>
                <Pressable onPress={decrement} style={styles.circleBtn}>
                    <Text style={styles.circleBtnText}>-</Text>
                </Pressable>
                
                <View style={styles.display}>
                    <Text style={styles.bigNumber}>{stepGoal}</Text>
                    <Text style={styles.unit}>STEPS/DAY</Text>
                </View>

                <Pressable onPress={increment} style={styles.circleBtn}>
                    <Text style={styles.circleBtnText}>+</Text>
                </Pressable>
            </View>

            <View style={styles.footer}>
                <PremiumButton title="Set Move Goal" onPress={handleContinue} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', // Pure black
        paddingTop: 80,
        paddingHorizontal: 24,
    },
    header: {
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontWeight: '700', // System Bold
        color: '#FFFFFF',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 17,
        color: '#8E8E93', // System Gray
        lineHeight: 22,
    },
    segmentContainer: {
        flexDirection: 'row',
        backgroundColor: '#1C1C1E', // Zinc 900
        borderRadius: 9,
        padding: 2,
        marginBottom: 60,
    },
    segment: {
        flex: 1,
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 7,
    },
    segmentActive: {
        backgroundColor: '#636366', // Zinc 700 / Active Grey
    },
    segmentText: {
        fontSize: 13,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    segmentTextActive: {
        color: '#FFFFFF',
    },
    counterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Spread out
        alignItems: 'center', // Vertically center
        marginBottom: 'auto', // Push to center/top
    },
    circleBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Theme.colors.primary, // Neon Red/Pink in Apple Fitness, using our Emerald/Lime
        justifyContent: 'center',
        alignItems: 'center',
    },
    circleBtnText: {
        fontSize: 28,
        color: '#000000',
        fontWeight: '600',
        lineHeight: 30,
    },
    display: {
        alignItems: 'center',
    },
    bigNumber: {
        fontSize: 72,
        fontWeight: '800', // Heavy
        color: '#FFFFFF',
        fontVariant: ['tabular-nums'],
        letterSpacing: -2,
    },
    unit: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 1,
        marginTop: -5,
    },
    footer: {
        marginBottom: 40,
    }
});
