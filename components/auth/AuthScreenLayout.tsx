import { EmailButton, GoogleButton } from '@/components/auth/AuthButtons';
import { FadeInView } from '@/components/ui/FadeInView';
import { PremiumButton } from '@/components/ui/PremiumButton';
import { Theme } from '@/constants/theme';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useRouter } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';

interface AuthScreenLayoutProps {
    isLoginMode?: boolean;
}

export default function AuthScreenLayout({ isLoginMode = false }: AuthScreenLayoutProps) {
  const router = useRouter();
  
  const handleAuthSuccess = () => {
    // In production, sync with Firebase here
    if (isLoginMode) {
        router.replace('/(tabs)');
    } else {
        router.push('/onboarding/setup');
    }
  };

  const handleSkip = () => {
     if (isLoginMode) {
         router.replace('/(tabs)');
     } else {
         handleAuthSuccess();
     }
  };

  const signInWithApple = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      handleAuthSuccess();
    } catch (e) {
      // console.log(e);
    }
  };

  return (
    <View style={styles.container}>      
      <View style={styles.content}>
        <FadeInView>
            <Text style={styles.heading}>
                {isLoginMode ? 'Welcome Back' : 'Save Your Progress'}
            </Text>
            <Text style={styles.subheading}>
                {isLoginMode 
                    ? 'Sign in to continue your walk with God.'
                    : 'Create an account to sync your journey across devices.'
                }
            </Text>
        </FadeInView>
      </View>
      
      <View style={styles.authContainer}>
            {Platform.OS === 'ios' && (
                <AppleAuthentication.AppleAuthenticationButton
                    buttonType={isLoginMode ? AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN : AppleAuthentication.AppleAuthenticationButtonType.SIGN_UP}
                    buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
                    cornerRadius={25}
                    style={styles.appleButton}
                    onPress={signInWithApple}
                />
            )}
            
            <GoogleButton onPress={handleAuthSuccess} />
            <EmailButton onPress={handleAuthSuccess} />
      </View>

      <View style={styles.footer}>
          {!isLoginMode && (
             <PremiumButton 
                title="Maybe Later" 
                variant="ghost" 
                onPress={handleSkip} 
                textStyle={{ color: Theme.colors.zinc700, fontSize: 15 }}
            />
          )}
          <Text style={styles.terms}>By continuing, you agree to our Terms of Service & Privacy Policy.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: Theme.colors.background, // Black
    paddingHorizontal: 32,
    justifyContent: 'space-between', // Push footer down
  },
  content: {
    flex: 1,
    justifyContent: 'center', // Center text vertically in top half
    alignItems: 'center',
    marginBottom: 40,
  },
  heading: {
    fontFamily: Theme.typography.fontFamily.bold,
    fontSize: 34,
    color: Theme.colors.textPrimary,
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subheading: {
    fontFamily: Theme.typography.fontFamily.medium,
    fontSize: 17,
    color: Theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  authContainer: {
    width: '100%',
    paddingBottom: 40,
  },
  appleButton: {
    width: '100%',
    height: 50, 
    marginBottom: 12,
  },
  footer: {
      marginBottom: 60,
      alignItems: 'center',
      gap: 16,
  },
  terms: {
      fontFamily: Theme.typography.fontFamily.medium,
      fontSize: 11,
      color: Theme.colors.zinc700,
      textAlign: 'center',
      paddingHorizontal: 20,
      lineHeight: 16,
  },
});
