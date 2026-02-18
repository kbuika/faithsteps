import { PremiumButton } from '@/components/ui/PremiumButton';
import { Theme } from '@/constants/theme';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface MilestonePreviewProps {
    title: string;
    distanceAway: string;
    description: string;
    imageUrl: string;
}

export function MilestonePreview({ title, distanceAway, description, imageUrl }: MilestonePreviewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Next Milestone</Text>
      
      <View style={styles.card}>
        <Image 
            source={{ uri: imageUrl }} 
            style={StyleSheet.absoluteFill} 
            contentFit="cover"
            transition={500}
        />
        
        <LinearGradient 
            colors={['transparent', 'rgba(0,0,0,0.8)', 'rgba(0,0,0,0.95)']}
            style={StyleSheet.absoluteFill}
        />

        <View style={styles.content}>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>{distanceAway} Away</Text>
            </View>
            
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description} numberOfLines={2}>{description}</Text>
            
            <PremiumButton 
                title="Preview" 
                variant="outline" 
                onPress={() => {}} 
                style={styles.button}
                textStyle={{ fontSize: 13 }}
            />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Theme.spacing.l,
    marginBottom: Theme.spacing.xl,
  },
  header: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: 18,
    color: Theme.colors.textPrimary,
    marginBottom: Theme.spacing.m,
  },
  card: {
    height: 220,
    borderRadius: Theme.borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: Theme.colors.zinc900,
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: Theme.spacing.l,
  },
  badge: {
    backgroundColor: 'rgba(23, 185, 120, 0.2)', // Primary with opacity
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginBottom: 8,
  },
  badgeText: {
    color: Theme.colors.primary,
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: 11,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: 22,
    color: Theme.colors.textPrimary,
    marginBottom: 4,
  },
  description: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: 14,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 16,
    lineHeight: 20,
  },
  button: {
    height: 36,
    width: 100,
    borderColor: 'rgba(255,255,255,0.3)',
  }
});
