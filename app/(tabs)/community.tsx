import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { Theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const POSTS = [
    { id: '1', user: 'Sarah M.', time: '2h ago', content: 'Prayer Request: Strength for the new week.', likes: 12, comments: 3, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' },
    { id: '2', user: 'David K.', time: '5h ago', content: 'Just reached Mount Sinai! God is good.', likes: 45, comments: 8, image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=800&auto=format&fit=crop' },
    { id: '3', user: 'Grace L.', time: '1d ago', content: 'Praying for everyone starting clearly today.', likes: 22, comments: 1 },
];

export default function CommunityScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <ScreenHeader title="Community" subtitle="Walk together with others." />
      
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Post Input Placeholder */}
          <View style={styles.inputContainer}>
              <View style={styles.avatarPlaceholder} />
              <Text style={styles.inputText}>Share your journey...</Text>
          </View>

          {/* Feed */}
          {POSTS.map((post) => (
              <View key={post.id} style={styles.postCard}>
                  <View style={styles.postHeader}>
                      <Image source={{ uri: post.avatar || 'https://via.placeholder.com/40' }} style={styles.avatar} />
                      <View>
                          <Text style={styles.userName}>{post.user}</Text>
                          <Text style={styles.timeAgo}>{post.time}</Text>
                      </View>
                      <TouchableOpacity style={styles.moreButton}>
                          <Ionicons name="ellipsis-horizontal" size={20} color={Theme.colors.zinc700} />
                      </TouchableOpacity>
                  </View>
                  
                  <Text style={styles.postContent}>{post.content}</Text>
                  
                  {post.image && (
                      <Image source={{ uri: post.image }} style={styles.postImage} contentFit="cover" />
                  )}

                  <View style={styles.actions}>
                      <TouchableOpacity style={styles.actionButton}>
                          <Ionicons name="heart-outline" size={20} color={Theme.colors.textSecondary} />
                          <Text style={styles.actionText}>{post.likes}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                          <Ionicons name="chatbubble-outline" size={20} color={Theme.colors.textSecondary} />
                          <Text style={styles.actionText}>{post.comments}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.actionButton}>
                          <Ionicons name="share-social-outline" size={20} color={Theme.colors.textSecondary} />
                      </TouchableOpacity>
                  </View>
              </View>
          ))}
      </ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab}>
          <Ionicons name="add" size={28} color="#000" />
      </TouchableOpacity>
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
  inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Theme.colors.zinc900,
      marginHorizontal: Theme.spacing.l,
      padding: 16,
      borderRadius: Theme.borderRadius.l,
      marginBottom: Theme.spacing.m,
  },
  avatarPlaceholder: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: Theme.colors.zinc800,
      marginRight: 12,
  },
  inputText: {
      fontFamily: Theme.typography.fontFamily.medium,
      fontSize: 14,
      color: Theme.colors.textTertiary,
  },
  postCard: {
      backgroundColor: Theme.colors.zinc900,
      marginHorizontal: Theme.spacing.l,
      marginBottom: Theme.spacing.m,
      padding: 16,
      borderRadius: Theme.borderRadius.xl,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.05)',
  },
  postHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
  },
  avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 12,
      backgroundColor: Theme.colors.zinc800,
  },
  userName: {
      fontFamily: Theme.typography.fontFamily.bold,
      fontSize: 15,
      color: Theme.colors.textPrimary,
  },
  timeAgo: {
      fontFamily: Theme.typography.fontFamily.regular,
      fontSize: 12,
      color: Theme.colors.textSecondary,
  },
  moreButton: {
      marginLeft: 'auto',
  },
  postContent: {
      fontFamily: Theme.typography.fontFamily.regular,
      fontSize: 15,
      color: Theme.colors.textPrimary,
      lineHeight: 22,
      marginBottom: 12,
  },
  postImage: {
      width: '100%',
      height: 200,
      borderRadius: Theme.borderRadius.l,
      marginBottom: 12,
  },
  actions: {
      flexDirection: 'row',
      gap: 24,
  },
  actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
  },
  actionText: {
      fontFamily: Theme.typography.fontFamily.medium,
      fontSize: 13,
      color: Theme.colors.textSecondary,
  },
  fab: {
      position: 'absolute',
      bottom: 100,
      right: 24,
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: Theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: Theme.colors.primary,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
  },
});
