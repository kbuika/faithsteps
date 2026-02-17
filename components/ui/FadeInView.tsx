import React, { ReactNode } from 'react';
import { ViewStyle } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

interface FadeInViewProps {
  children: ReactNode;
  delay?: number;
  style?: ViewStyle;
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  delay = 0,
  style,
}) => {
  return (
    <Animated.View
      entering={FadeIn.delay(delay).duration(500)} // Smooth fade-in, no spring
      style={style}
    >
      {children}
    </Animated.View>
  );
};
