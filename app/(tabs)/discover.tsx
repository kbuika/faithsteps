import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const JOURNEYS = [
  { id: 'exodus', title: 'Exodus: Egypt to Canaan', distance: '400 km', difficulty: 'Intermediate', image: 'https://images.unsplash.com/photo-1548588627-f978862b85e1?q=80&w=2600&auto=format&fit=crop&sat=-100' },
  { id: 'emmaus', title: 'Road to Emmaus', distance: '11 km', difficulty: 'Beginner', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2600&auto=format&fit=crop&sat=-100' },
  { id: 'paul', title: 'Paul\'s First Journey', distance: '1,200 km', difficulty: 'Advanced', image: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2600&auto=format&fit=crop&sat=-100' },
];

export default function DiscoverScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScreenHeader title="Discover" subtitle="Find new paths for your journey." />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search Bar Placeholder */}
        <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={Theme.colors.zinc700} />
            <Text style={styles.searchText}>Search journeys, verses...</Text>
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
            {['All', 'Saved', 'Completed', 'New'].map((chip, index) => (
                <TouchableOpacity key={chip} style={[styles.chip, index === 0 && styles.chipActive]}>
                    <Text style={[styles.chipText, index === 0 && styles.chipTextActive]}>{chip}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Featured Journey</Text>
        
        {/* Featured Card */}
        <TouchableOpacity style={styles.featuredCard}>
            <Image source={{ uri: JOURNEYS[0].image }} style={StyleSheet.absoluteFill} contentFit="cover" />
            <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={StyleSheet.absoluteFill} />
            <View style={styles.cardContent}>
                <View style={styles.difficultyBadge}>
                    <Text style={styles.difficultyText}>{JOURNEYS[0].difficulty}</Text>
                </View>
                <Text style={styles.cardTitle}>{JOURNEYS[0].title}</Text>
                <Text style={styles.cardMeta}>{JOURNEYS[0].distance} • 45 days avg</Text>
            </View>
        </TouchableOpacity>

        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>All Journeys</Text>
        
        {/* List */}
        {JOURNEYS.slice(1).map((journey) => (
            <TouchableOpacity key={journey.id} style={styles.listItem}>
                <Image source={{ uri: journey.image }} style={styles.listImage} />
                <View style={styles.listContent}>
                    <Text style={styles.listTitle}>{journey.title}</Text>
                    <Text style={styles.listMeta}>{journey.difficulty} • {journey.distance}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={Theme.colors.zinc700} />
            </TouchableOpacity>
        ))}

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
      paddingBottom: 100,
  },
  searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Theme.colors.zinc900,
      marginHorizontal: Theme.spacing.l,
      padding: 12,
      borderRadius: Theme.borderRadius.l,
      marginBottom: Theme.spacing.m,
  },
  searchText: { // Corrected: Using a defined colour token for placeholder
      fontFamily: Theme.typography.fontFamily.medium,
      fontSize: 14,
      color: Theme.colors.zinc700,
      marginLeft: 8,
  },
  chipsContainer: {
      paddingHorizontal: Theme.spacing.l,
      marginBottom: Theme.spacing.l,
  },
  chip: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: Theme.borderRadius.full,
      backgroundColor: Theme.colors.zinc900,
      marginRight: 8,
      borderWidth: 1,
      borderColor: Theme.colors.zinc800,
  },
  chipActive: {
      backgroundColor: Theme.colors.primary,
      borderColor: Theme.colors.primary,
  },
  chipText: {
      fontFamily: Theme.typography.fontFamily.medium,
      fontSize: 13,
      color: Theme.colors.textSecondary,
  },
  chipTextActive: {
      color: '#fff',
  },
  sectionTitle: {
      paddingHorizontal: Theme.spacing.l,
      fontFamily: Theme.typography.fontFamily.bold,
      fontSize: 18,
      color: Theme.colors.textPrimary,
      marginBottom: Theme.spacing.m,
  },
  featuredCard: {
      marginHorizontal: Theme.spacing.l,
      height: 200,
      borderRadius: Theme.borderRadius.xl,
      overflow: 'hidden',
      justifyContent: 'flex-end',
  },
  cardContent: {
      padding: Theme.spacing.m,
  },
  difficultyBadge: {
      backgroundColor: 'rgba(255,255,255,0.2)',
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
      marginBottom: 8,
  },
  difficultyText: {
      color: '#fff',
      fontSize: 10,
      fontWeight: 'bold',
      textTransform: 'uppercase',
  },
  cardTitle: {
      fontFamily: Theme.typography.fontFamily.bold,
      fontSize: 20,
      color: '#fff',
      marginBottom: 4,
  },
  cardMeta: {
      fontFamily: Theme.typography.fontFamily.medium,
      fontSize: 13,
      color: 'rgba(255,255,255,0.7)',
  },
  listItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginHorizontal: Theme.spacing.l,
      marginBottom: Theme.spacing.m,
      backgroundColor: Theme.colors.zinc900,
      padding: 12,
      borderRadius: Theme.borderRadius.l,
  },
  listImage: {
      width: 60,
      height: 60,
      borderRadius: 8,
      backgroundColor: Theme.colors.zinc800,
  },
  listContent: {
      flex: 1,
      marginLeft: 12,
  },
  listTitle: {
      fontFamily: Theme.typography.fontFamily.bold,
      fontSize: 15,
      color: Theme.colors.textPrimary,
      marginBottom: 2,
  },
  listMeta: {
      fontFamily: Theme.typography.fontFamily.medium,
      fontSize: 12,
      color: Theme.colors.textSecondary,
  }
});
