import { Milestone } from '@/constants/journeys';
import { Theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, { Easing, FadeInDown, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Svg, { Defs, G, LinearGradient, Path, Pattern, Rect, Stop } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const getSeed = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
};

interface JourneyMapProps {
    milestones: Milestone[];
    completedMilestoneIds: string[];
}

export interface JourneyMapRef {
    recenter: () => void;
}

export const JourneyMap = forwardRef<JourneyMapRef, JourneyMapProps>(({ milestones, completedMilestoneIds }, ref) => {
    const horizontalScrollRef = useRef<ScrollView>(null);
    const verticalScrollRef = useRef<ScrollView>(null);

    const firstIncompleteIndex = milestones.findIndex(m => !completedMilestoneIds.includes(m.id));
    const currentIndex = firstIncompleteIndex === -1 ? milestones.length - 1 : firstIncompleteIndex;

    const { points, mapHeight } = useMemo(() => {
        let seed = 12345;
        if (milestones.length > 0) {
            seed = getSeed(milestones[0].id);
        }
        
        // 3 distinct terrain feels derived deterministically from the journey's first milestone
        const terrainType = Math.abs(seed) % 3; 
        
        let baseXSpacing = 160;
        let xVariance = 80;
        let yJumpVariance = 300;
        let mapH = 1000;

        if (terrainType === 0) {
            // "Rolling Hills": Gentle Y changes, wide X spacing
            baseXSpacing = 220;
            xVariance = 80;
            yJumpVariance = 200;
            mapH = 750;
        } else if (terrainType === 1) {
            // "Jagged Mountains": Tighter X spacing, wild dramatic Y jumps
            baseXSpacing = 150;
            xVariance = 100;
            yJumpVariance = 500;
            mapH = 1400;
        } else {
            // "Winding River": Wide X, very wide swooping Y
            baseXSpacing = 200;
            xVariance = 140;
            yJumpVariance = 420;
            mapH = 1100;
        }

        let currentX = 80;
        let currentY = mapH / 2;
        
        const generatedPoints = milestones.map((_, i) => {
            if (i === 0) {
                return { x: currentX, y: currentY };
            }
            
            // Randomize X spacing
            const randX = Math.abs(Math.sin(seed++));
            currentX += baseXSpacing + randX * xVariance;
            
            // Randomize Y to wander up and down organically
            const randY = Math.sin(seed++); 
            let nextY = currentY + (randY * yJumpVariance);
            
            // Clamp to prevent going out of bounds
            // Increased safe padding from edge (from 120 to 180, and 140 to 220) maps larger breathing gap
            if (nextY < 180) nextY = 180 + Math.abs(randY * 120);
            if (nextY > mapH - 220) nextY = mapH - 220 - Math.abs(randY * 120);
            
            currentY = nextY;
            
            return {
                x: currentX,
                y: currentY
            };
        });

        return { points: generatedPoints, mapHeight: mapH };
    }, [milestones]);

    const getPathString = (length: number) => {
        if (length === 0) return '';
        if (length === 1) return `M ${points[0].x} ${points[0].y}`;

        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < length; i++) {
            const prev = points[i - 1];
            const curr = points[i];
            
            // Dynamic control points for perfect organic cubic beziers
            const distanceX = curr.x - prev.x;
            const cpX1 = prev.x + distanceX * 0.45; 
            const cpX2 = curr.x - distanceX * 0.45;
            
            d += ` C ${cpX1} ${prev.y}, ${cpX2} ${curr.y}, ${curr.x} ${curr.y}`;
        }
        return d;
    };

    const fullPath = points.length > 0 ? getPathString(points.length) : '';
    const activeLength = currentIndex + 1;
    const activePath = points.length > 0 ? getPathString(activeLength) : '';

    const contentWidth = points.length > 0 ? points[points.length - 1].x + 300 : SCREEN_WIDTH;

    const [mapViewportHeight, setMapViewportHeight] = useState(460); // Default to something, updated on layout

    const recenterMap = () => {
        if (points.length > 0 && points[currentIndex]) {
            const point = points[currentIndex];
            horizontalScrollRef.current?.scrollTo({ 
                x: Math.max(0, point.x - SCREEN_WIDTH / 2), 
                animated: true 
            });
            verticalScrollRef.current?.scrollTo({ 
                y: Math.max(0, point.y - mapViewportHeight / 2), 
                animated: true 
            });
        }
    };

    // Expose recenter method
    useImperativeHandle(ref, () => ({
        recenter: recenterMap
    }));

    // Auto-scroll to the current node
    useEffect(() => {
        if (points.length > 0 && points[currentIndex] && mapViewportHeight > 0) {
            setTimeout(() => {
                recenterMap();
            }, 600);
        }
    }, [currentIndex, points, mapViewportHeight]);

    return (
        <View style={styles.container}>
            <View 
                style={styles.mapWindow} 
                onLayout={(e) => setMapViewportHeight(e.nativeEvent.layout.height)}
            >
                <ScrollView 
                    ref={horizontalScrollRef}
                    horizontal 
                    showsHorizontalScrollIndicator={false} 
                    contentContainerStyle={{ width: Math.max(contentWidth, SCREEN_WIDTH) }}
                    bounces={true}
                    decelerationRate="fast"
                >
                    <ScrollView
                        ref={verticalScrollRef}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled={true}
                        contentContainerStyle={{ height: mapHeight, width: contentWidth }}
                        bounces={true}
                    >
                        <View style={{ width: contentWidth, height: mapHeight }}>
                            {/* Background SVG Curve Map (Oversized to cover scroll bounce) */}
                            <Svg 
                                width={contentWidth + SCREEN_WIDTH * 2} 
                                height={mapHeight + 1000} 
                                style={{ position: 'absolute', left: -SCREEN_WIDTH, top: -500 }}
                            >
                                <Defs>
                                    <LinearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <Stop offset="0%" stopColor={Theme.colors.primary} stopOpacity="0.5" />
                                        <Stop offset="100%" stopColor={Theme.colors.primary} stopOpacity="1" />
                                    </LinearGradient>
                                    
                                    {/* Double Grid Map Pattern */}
                                    <Pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                                        <Path d="M 20 0 L 0 0 0 20" fill="none" stroke="#FFFFFF" strokeOpacity="0.06" strokeWidth="1" />
                                    </Pattern>
                                    <Pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                                        <Rect width="100" height="100" fill="url(#smallGrid)" />
                                        <Path d="M 100 0 L 0 0 0 100" fill="none" stroke="#FFFFFF" strokeOpacity="0.15" strokeWidth="1.5" />
                                    </Pattern>
                                </Defs>

                                {/* Group shifted to perfectly offset the absolute positioning */}
                                <G x={SCREEN_WIDTH} y={500}>
                                    {/* Oversized Background Grid to infinitely span beyond view bounds */}
                                    <Rect 
                                        x={-SCREEN_WIDTH} 
                                        y={-500} 
                                        width={contentWidth + SCREEN_WIDTH * 2} 
                                        height={mapHeight + 1000} 
                                        fill="url(#grid)" 
                                    />

                        {/* Inactive Trail (Dashed) */}
                        <Path 
                            d={fullPath}
                            stroke={Theme.colors.zinc800}
                            strokeWidth="3"
                            strokeDasharray="8 8"
                            fill="none"
                        />

                        {/* Active Glowing Trail (Layered) */}
                        <Path 
                            d={activePath}
                            stroke={Theme.colors.primary}
                            strokeWidth="12"
                            strokeOpacity="0.1"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <Path 
                            d={activePath}
                            stroke={Theme.colors.primary}
                            strokeWidth="6"
                            strokeOpacity="0.25"
                            fill="none"
                            strokeLinecap="round"
                        />
                        <Path 
                            d={activePath}
                            stroke="url(#activeGrad)"
                            strokeWidth="3"
                            fill="none"
                            strokeLinecap="round"
                        />
                        </G>
                    </Svg>

                     {/* Overlay Milestones seamlessly on exact (X, Y) path coordinates */}
                     {milestones.map((milestone, index) => {
                         const isCompleted = completedMilestoneIds.includes(milestone.id);
                         const isCurrent = index === currentIndex;
                         const isLocked = !isCompleted && !isCurrent;
                         const isDestination = index === milestones.length - 1;
                         const point = points[index];

                         return (
                             <Animated.View 
                                 key={milestone.id}
                                 entering={FadeInDown.delay(index * 120 + 200).duration(800).springify()}
                                 style={[
                                     styles.nodeWrapper,
                                     {
                                         left: point.x - 60, // 120 (wrapper width) / 2 = 60
                                         top: point.y - 28,  // 56 (circle height) / 2 = 28
                                     }
                                 ]}
                             >
                                 <Animated.View style={[styles.nodeContainer, isCurrent && styles.nodeCurrent]}>
                                     {isDestination && isLocked ? (
                                         <View style={[styles.nodeCircle, styles.circleDestination]}>
                                             <Ionicons name="location-sharp" size={28} color={Theme.colors.textSecondary} />
                                         </View>
                                     ) : (
                                        <View style={[
                                            styles.nodeCircle, 
                                            isCompleted && styles.circleCompleted,
                                            isCurrent && styles.circleCurrent,
                                            isLocked && styles.circleLocked
                                        ]}>
                                            {isCompleted && <Ionicons name="checkmark" size={24} color={Theme.colors.primary} />}
                                            {isCurrent && <PulseEffect />}
                                            {isLocked && <Ionicons name="lock-closed" size={20} color={Theme.colors.zinc700} />}
                                        </View>
                                     )}
                                     
                                     <View style={styles.textContainer}>
                                        <Text 
                                            style={[styles.nodeTitle, isCurrent && styles.textCurrent]}
                                            numberOfLines={2}
                                        >
                                            {milestone.shortName}
                                        </Text>
                                        <Text style={[styles.nodeDistance, isCurrent && styles.textCurrentSubtitle]}>
                                            {(milestone.distanceFromStart / 1000).toFixed(1)} km
                                        </Text>
                                    </View>
                                </Animated.View>
                            </Animated.View>
                        );
                    })}
                        </View>
                    </ScrollView>
                </ScrollView>
            </View>
        </View>
    );
});

// ------------------------------------------------------------------
// Sub-components & Styles
// ------------------------------------------------------------------

function PulseEffect() {
    const pulseAnim = useSharedValue(1);
    const opacityAnim = useSharedValue(0.8);

    React.useEffect(() => {
        pulseAnim.value = withRepeat(
            withTiming(2.2, { duration: 2500, easing: Easing.out(Easing.ease) }),
            -1,
            false // Don't reverse, restart at 1
        );
        opacityAnim.value = withRepeat(
            withTiming(0, { duration: 2500, easing: Easing.out(Easing.ease) }),
            -1,
            false
        );
    }, []);

    const animStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulseAnim.value }],
        opacity: opacityAnim.value,
        position: 'absolute',
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Theme.colors.primary,
    }));

    return (
        <View style={styles.pulseContainer}>
            <Animated.View style={animStyle} />
            <View style={styles.pulseDot} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mapWindow: {
        flex: 1,
        overflow: 'hidden',
    },
    nodeWrapper: {
        position: 'absolute',
        width: 120,
        alignItems: 'center',
        zIndex: 10,
    },
    nodeContainer: {
        alignItems: 'center',
        width: '100%',
    },
    nodeCircle: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Theme.colors.zinc900,
        borderWidth: 2,
        borderColor: Theme.colors.zinc800,
        marginBottom: 8,
        ...Theme.shadows.md,
    },
    circleCompleted: {
        backgroundColor: 'rgba(23, 185, 120, 0.1)',
        borderColor: Theme.colors.primary,
        shadowColor: Theme.colors.primary,
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    circleCurrent: {
        borderColor: Theme.colors.primary,
        backgroundColor: Theme.colors.zinc900, 
        ...Theme.shadows.glow,
    },
    circleLocked: {
        backgroundColor: Theme.colors.background, // Match the void of the index
        borderColor: Theme.colors.zinc800,
    },
    circleDestination: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderColor: Theme.colors.zinc700,
        ...Theme.shadows.md,
    },
    pulseContainer: {
        width: 14,
        height: 14,
        justifyContent: 'center',
        alignItems: 'center',
    },
    pulseDot: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: Theme.colors.primary,
    },
    nodeCurrent: {
        // Enlarge the active node slightly to pop
        transform: [{ scale: 1.15 }],
    },
    textContainer: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        // Ensure text doesn't overlap path lines awkwardly
        ...Theme.shadows.glow,
        shadowColor: '#000',
        elevation: 0,
    },
    nodeTitle: {
        fontFamily: Theme.typography.fontFamily.medium,
        fontSize: 13,
        color: Theme.colors.textSecondary,
        textAlign: 'center',
    },
    textCurrent: {
        color: '#FFFFFF',
        fontFamily: Theme.typography.fontFamily.bold,
    },
    nodeDistance: {
        fontFamily: Theme.typography.fontFamily.medium,
        fontSize: 11,
        color: Theme.colors.textTertiary,
        marginTop: 2,
    },
    textCurrentSubtitle: {
        color: Theme.colors.primary,
    }
});
