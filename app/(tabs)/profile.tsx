import { BadgeCard } from '@/components/profile/BadgeCard';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Theme } from '@/constants/theme';
import { useJourneyStore } from '@/store/journeyStore';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BADGES = [
    { id: '1', name: 'First Step', icon: 'checkmark-circle' as const, unlocked: true, date: 'Feb 12' },
    { id: '2', name: 'Week Warrior', icon: 'trophy' as const, unlocked: true, date: 'Feb 19' },
    { id: '3', name: 'Red Sea', icon: 'water' as const, unlocked: false, date: undefined },
    { id: '4', name: 'Sinai', icon: 'navigate-circle' as const, unlocked: false, date: undefined },
];

export default function ProfileScreen() {
    const router = useRouter();
    
    // Store Stats
    const totalSteps = useJourneyStore(state => state.totalSteps);
    const journeysCompleted = useJourneyStore(state => state.journeysCompleted);

    // Derived Stats (Mocked or simple calc for now)
    const avgDaily = Math.floor(totalSteps / 14); // Mock 14 days active
    const longestStreak = 14; 

    const STATS = [
        { label: 'Total Steps', value: totalSteps.toLocaleString(), icon: 'footsteps' },
        { label: 'Avg. Daily', value: avgDaily.toLocaleString(), icon: 'stats-chart' },
        { label: 'Longest Streak', value: `${longestStreak} Days`, icon: 'flame' },
        { label: 'Journeys', value: journeysCompleted.toString(), icon: 'map' },
    ];

    return (
        <View style={styles.container}>
            {/* Cinematic Header Background (Optional, currently black to match theme) */}
            <LinearGradient
                colors={[Theme.colors.primary, 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 0.5 }}
                style={[StyleSheet.absoluteFill, { opacity: 0.1 }]}
            />

            <ScreenHeader title="Profile" subtitle="Your spiritual legacy." />
            
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                
                {/* 1. Hero Profile Section */}
                <View style={styles.profileHero}>
                    <View style={styles.avatarWrapper}>
                        <LinearGradient
                            colors={[Theme.colors.primary, Theme.colors.accent]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.avatarBorder}
                        >
                             <Image 
                                source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=400&auto=format&fit=crop' }} 
                                style={styles.avatarImage} 
                                contentFit="cover"
                            />
                        </LinearGradient>
                        <TouchableOpacity style={styles.editBadge}>
                             <Ionicons name="camera" size={14} color="#fff" />
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.heroName}>John Pilgrim</Text>
                    <Text style={styles.heroMemberSince}>Walking since Feb 2026</Text>
                    
                    {/* Level / Status Pill */}
                    <View style={styles.levelPill}>
                        <Ionicons name="star" size={12} color={Theme.colors.primary} />
                        <Text style={styles.levelText}>Disciple Level 3</Text>
                    </View>
                </View>

                {/* 2. Premium Stats Grid */}
                <View style={styles.statsContainer}>
                    {STATS.map((stat, index) => (
                        <View key={stat.label} style={styles.statBox}>
                            <View style={[styles.statIconCircle, { backgroundColor: index % 2 === 0 ? 'rgba(23, 185, 120, 0.1)' : 'rgba(167, 255, 131, 0.1)' }]}>
                                <Ionicons 
                                    name={stat.icon as any} 
                                    size={20} 
                                    color={index % 2 === 0 ? Theme.colors.primary : Theme.colors.accent} 
                                />
                            </View>
                            <Text style={styles.statValue}>{stat.value}</Text>
                            <Text style={styles.statLabel}>{stat.label}</Text>
                        </View>
                    ))}
                </View>

                {/* 3. Badges Showcase (Horizontal Carousel) */}
                <View style={styles.sectionHeader}>
                    <Text style={styles.sectionTitle}>Achievements</Text>
                    <TouchableOpacity>
                        <Text style={styles.seeAllText}>See All</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={styles.badgesScroll}
                    decelerationRate="fast"
                    snapToInterval={176} // Card width + margin
                >
                    {BADGES.map((badge) => (
                        <BadgeCard
                            key={badge.id}
                            name={badge.name}
                            icon={badge.icon as any} // Ensure icon string type matches Ionicons
                            description={badge.unlocked ? "Earned for consistency." : "Complete 5 more walks."}
                            unlocked={badge.unlocked}
                            dateUnlocked={badge.date}
                        />
                    ))}
                </ScrollView>

                {/* 4. Settings Menu */}
                <View style={styles.menuContainer}>
                    <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>Settings</Text>
                    {['Notifications', 'Privacy & Security', 'Help & Support'].map((item, index) => (
                        <TouchableOpacity key={item} style={styles.menuItem}>
                            <View style={styles.menuLeft}>
                                <Ionicons 
                                    name={index === 0 ? "notifications-outline" : index === 1 ? "shield-checkmark-outline" : "help-buoy-outline"} 
                                    size={22} 
                                    color={Theme.colors.textSecondary} 
                                />
                                <Text style={styles.menuText}>{item}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={18} color={Theme.colors.zinc700} />
                        </TouchableOpacity>
                    ))}
                    
                    <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0, marginTop: 8 }]}>
                         <View style={styles.menuLeft}>
                            <Ionicons name="log-out-outline" size={22} color={Theme.colors.error} />
                            <Text style={[styles.menuText, { color: Theme.colors.error }]}>Log Out</Text>
                         </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Theme.colors.background,
    },
    scrollContent: {
        paddingBottom: 120, // Tab bar clearance
    },
    // Hero Section
    profileHero: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 32,
    },
    avatarWrapper: {
        position: 'relative',
        marginBottom: 16,
        shadowColor: Theme.colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 10,
    },
    avatarBorder: {
        width: 110,
        height: 110,
        borderRadius: 55,
        padding: 3, // Border width
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarImage: {
        width: '100%',
        height: '100%',
        borderRadius: 55, // Inner radius
        backgroundColor: Theme.colors.zinc800,
        borderWidth: 3, // Gap between border and image
        borderColor: Theme.colors.background,
    },
    editBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: Theme.colors.zinc800,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 3,
        borderColor: Theme.colors.background,
    },
    heroName: {
        fontFamily: Theme.typography.fontFamily.bold,
        fontSize: 26,
        color: Theme.colors.textPrimary,
        marginBottom: 4,
    },
    heroMemberSince: {
        fontFamily: Theme.typography.fontFamily.medium,
        fontSize: 14,
        color: Theme.colors.textSecondary,
        marginBottom: 12,
    },
    levelPill: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(23, 185, 120, 0.15)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(23, 185, 120, 0.3)',
    },
    levelText: {
        marginLeft: 6,
        fontFamily: Theme.typography.fontFamily.bold, // Fixed typo
        fontSize: 12,
        color: Theme.colors.primary,
    },

    // Stats Grid
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: Theme.spacing.l,
        marginBottom: 32,
    },
    statBox: {
        width: '48%', // Two columns
        backgroundColor: Theme.colors.zinc900,
        borderRadius: Theme.borderRadius.xl,
        padding: 16,
        marginBottom: 12,
        alignItems: 'flex-start', // Align left for cleaner look
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.05)',
    },
    statIconCircle: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    statValue: {
        fontFamily: Theme.typography.fontFamily.bold,
        fontSize: 20,
        color: Theme.colors.textPrimary,
        marginBottom: 2,
    },
    statLabel: {
        fontFamily: Theme.typography.fontFamily.medium,
        fontSize: 12,
        color: Theme.colors.primary,
    },

    // Badges Section
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Theme.spacing.l,
        marginBottom: 16,
    },
    sectionTitle: {
        fontFamily: Theme.typography.fontFamily.bold,
        fontSize: 20,
        color: Theme.colors.textPrimary,
    },
    seeAllText: {
        fontFamily: Theme.typography.fontFamily.medium,
        fontSize: 14,
        color: Theme.colors.primary,
    },
    badgesScroll: {
        paddingHorizontal: Theme.spacing.l,
        paddingBottom: 32, // Shadow space
    },

    // Settings Menu
    menuContainer: {
        paddingHorizontal: Theme.spacing.l,
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.05)',
    },
    menuLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuText: {
        fontFamily: Theme.typography.fontFamily.medium,
        fontSize: 16,
        color: Theme.colors.textPrimary,
        marginLeft: 12,
    },
});
