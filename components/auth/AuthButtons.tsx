import { Theme } from '@/constants/theme';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface AuthButtonProps {
    onPress: () => void;
}

export const GoogleButton: React.FC<AuthButtonProps> = ({ onPress }) => {
    const scale = useSharedValue(1);

    const handlePressIn = () => {
        scale.value = withSpring(0.96, { stiffness: 400 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <AnimatedPressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[styles.button, styles.googleButton, animatedStyle]}
        >
            <View style={styles.iconContainer}>
                 {/* Better to use an SVG or Image for Google G. Using Image for simplicity if no SVG lib available */}
                 <Image 
                    source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png" }}
                    style={{ width: 20, height: 20 }}
                    contentFit="contain"
                 />
            </View>
            <Text style={styles.googleText}>Continue with Google</Text>
        </AnimatedPressable>
    );
};

export const EmailButton: React.FC<AuthButtonProps> = ({ onPress }) => {
    const scale = useSharedValue(1);

    const handlePressIn = () => {
        scale.value = withSpring(0.96, { stiffness: 400 });
    };

    const handlePressOut = () => {
        scale.value = withSpring(1);
    };

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
         <AnimatedPressable
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[styles.button, styles.emailButton, animatedStyle]}
        >
             <Text style={styles.emailText}>Continue with Email</Text>
        </AnimatedPressable>
    );
};


const styles = StyleSheet.create({
    button: {
        height: 50, // Standard height
        borderRadius: 25, // Pill shape
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    googleButton: {
        backgroundColor: '#FFFFFF',
    },
    googleText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#000000',
        marginLeft: 8,
    },
    emailButton: {
        backgroundColor: Theme.colors.zinc800, // Dark Grey
    },
    emailText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#FFFFFF', 
    },
    iconContainer: {
        paddingRight: 4,
    }
});
