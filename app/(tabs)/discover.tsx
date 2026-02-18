import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ALL_JOURNEYS, getJourneysByDifficulty, Journey } from '@/constants/journeys';


const CATEGORIES = ['All', 'Beginner', 'Intermediate', 'Advanced'];

export default function DiscoverScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredJourneys = selectedCategory === 'All' 
    ? ALL_JOURNEYS 
    : getJourneysByDifficulty(selectedCategory.toLowerCase() as Journey['difficulty']);

  // Featured is always the first one marked as featured, or the first one in the list
  const featuredJourney = ALL_JOURNEYS.find(j => j.isFeatured) || ALL_JOURNEYS[0];

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
            {CATEGORIES.map((chip, index) => (
                <TouchableOpacity 
                    key={chip} 
                    style={[styles.chip, selectedCategory === chip && styles.chipActive]}
                    onPress={() => setSelectedCategory(chip)}
                >
                    <Text style={[styles.chipText, selectedCategory === chip && styles.chipTextActive]}>
                        {chip}
                    </Text>
                </TouchableOpacity>
            ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Featured Journey</Text>
        
        {/* Featured Card */}
        {featuredJourney && (
            <TouchableOpacity style={styles.featuredCard}>
                <Image 
                    source={{ uri: featuredJourney.featuredImageUrl }} 
                    style={StyleSheet.absoluteFill} 
                    contentFit="cover"
                    transition={500}
                />
                <LinearGradient colors={['transparent', 'rgba(0,0,0,0.9)']} style={StyleSheet.absoluteFill} />
                <View style={styles.cardContent}>
                    <View style={styles.difficultyBadge}>
                        <Text style={styles.difficultyText}>{featuredJourney.difficulty}</Text>
                    </View>
                    <Text style={styles.cardTitle}>{featuredJourney.name}</Text>
                    <Text style={styles.cardMeta}>
                        {(featuredJourney.totalDistance / 1000).toFixed(0)} km • {featuredJourney.estimatedDays} days
                    </Text>
                </View>
            </TouchableOpacity>
        )}

        <Text style={[styles.sectionTitle, { marginTop: 32 }]}>
            {selectedCategory === 'All' ? 'All Journeys' : `${selectedCategory} Journeys`}
        </Text>
        
        {/* List */}
        {filteredJourneys.map((journey) => (
            <TouchableOpacity key={journey.id} style={styles.listItem}>
                <Image 
                    source={{ uri: journey.thumbnailUrl }} 
                    style={styles.listImage} 
                    contentFit="cover"
                    transition={300}
                />
                <View style={styles.listContent}>
                    <Text style={styles.listTitle}>{journey.name}</Text>
                    <Text style={styles.listMeta}>
                        {journey.difficulty} • {(journey.totalDistance / 1000).toFixed(0)} km
                    </Text>
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
