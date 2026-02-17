import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface OnboardingState {
  isOnboardingComplete: boolean;
  selectedJourneyId: string | null;
  dailyStepGoal: number;
  notificationsEnabled: boolean;
  
  // Actions
  completeOnboarding: () => void;
  setJourneyId: (id: string) => void;
  setStepGoal: (steps: number) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      isOnboardingComplete: false,
      selectedJourneyId: null,
      dailyStepGoal: 5000, // Default goal
      notificationsEnabled: false,

      completeOnboarding: () => set({ isOnboardingComplete: true }),
      setJourneyId: (id) => set({ selectedJourneyId: id }),
      setStepGoal: (steps) => set({ dailyStepGoal: steps }),
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      reset: () => set({
        isOnboardingComplete: false,
        selectedJourneyId: null,
        dailyStepGoal: 5000,
        notificationsEnabled: false
      }),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
