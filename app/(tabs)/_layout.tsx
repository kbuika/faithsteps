import { Theme } from '@/constants/theme';
import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Theme.colors.background,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: Theme.colors.primary,
        tabBarInactiveTintColor: Theme.colors.textTertiary,
      }}>
      <Tabs.Screen 
        name="index" 
        options={{
          title: 'Journey',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24, color }}>🚶</Text>
        }} 
      />
    </Tabs>
  );
}
