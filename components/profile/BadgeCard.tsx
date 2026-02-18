import { Theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withSequence,
    withTiming
} from 'react-native-reanimated';

interface BadgeCardProps {
    name: string;
    icon: string;
    description: string;
    unlocked: boolean;
    dateUnlocked?: string;
}

export function BadgeCard({ name, icon, description, unlocked, dateUnlocked }: BadgeCardProps) {
    const shineOpacity = useSharedValue(0);

    useEffect(() => {
        if (unlocked) {
            shineOpacity.value = withRepeat(
                withSequence(
                    withDelay(2000, withTiming(1, { duration: 1000 })),
                    withTiming(0, { duration: 1000 })
                ),
                -1,
                true
            );
        }
    }, [unlocked]);

    const animatedShineStyle = useAnimatedStyle(() => ({
        opacity: shineOpacity.value,
    }));

    return (
        <View style={[styles.container, !unlocked && styles.lockedContainer]}>
            <LinearGradient
                colors={unlocked 
                    ? [Theme.colors.zinc800, Theme.colors.zinc900]
                    : [Theme.colors.zinc900, '#000']}
                style={styles.gradient}
            >
                {/* Badge Icon Container */}
                <View style={[styles.iconContainer, unlocked && styles.iconContainerUnlocked]}>
                    <Ionicons 
                        name={icon as any} 
                        size={32} 
                        color={unlocked ? '#000' : Theme.colors.zinc700} 
                    />
                    
                    {/* Shine Effect Overlay */}
                    {unlocked && (
                        <Animated.View style={[StyleSheet.absoluteFill, styles.shineOverlay, animatedShineStyle]}>
                            <LinearGradient
                                colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.4)', 'rgba(255,255,255,0)']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={StyleSheet.absoluteFill}
                            />
                        </Animated.View>
                    )}
                </View>

                {/* Text Content */}
                <View style={styles.content}>
                    <Text style={[styles.name, unlocked && styles.nameUnlocked]}>{name}</Text>
                    <Text style={styles.description} numberOfLines={2}>{description}</Text>
                    {unlocked && dateUnlocked && (
                        <Text style={styles.date}>Unlocked on {dateUnlocked}</Text>
                    )}
                </View>

                {/* Locked Icon */}
                {!unlocked && (
                    <View style={styles.lockIcon}>
                        <Ionicons name="lock-closed" size={16} color={Theme.colors.zinc700} />
                    </View>
                )}
            </LinearGradient>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 160,
        height: 200,
        marginRight: 16,
        borderRadius: Theme.borderRadius.xl,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    lockedContainer: {
        opacity: 0.7,
        borderColor: 'rgba(255,255,255,0.02)',
    },
    gradient: {
        flex: 1,
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Theme.colors.zinc900,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 2,
        borderColor: Theme.colors.zinc800,
        overflow: 'hidden',
    },
    iconContainerUnlocked: {
        backgroundColor: Theme.colors.accent, // Electric Lime
        borderColor: Theme.colors.accent,    // Emerald Border
        shadowColor: Theme.colors.accent,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    shineOverlay: {
        zIndex: 10,
    },
    content: {
        alignItems: 'center',
    },
    name: {
        fontFamily: Theme.typography.fontFamily.bold,
        fontSize: 16,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
        marginBottom: 4,
    },
    nameUnlocked: {
        color: Theme.colors.textPrimary,
    },
    description: {
        fontFamily: Theme.typography.fontFamily.medium,
        fontSize: 11,
        color: Theme.colors.textSecondary, // Removed opacity
        textAlign: 'center',
        marginBottom: 8,
    },
    date: {
        fontFamily: Theme.typography.fontFamily.regular,
        fontSize: 10,
        color: Theme.colors.primary, // Green text for date
    },
    lockIcon: {
        position: 'absolute',
        top: 12,
        right: 12,
    },
});
