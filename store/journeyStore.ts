import { ALL_JOURNEYS, Journey } from '@/constants/journeys';
import { create } from 'zustand';

interface JourneyProgress {
  [journeyId: string]: {
    completedMilestones: string[]; // List of milestone IDs
    isCompleted: boolean;
    startedAt: string; // ISO date
    completedAt?: string; // ISO date
  };
}

interface JourneyState {
  // State
  activeJourneyId: string | null;
  journeyProgress: JourneyProgress;
  totalSteps: number;
  totalDistance: number; // in meters
  journeysCompleted: number;

  // Actions
  setActiveJourney: (journeyId: string) => void;
  completeMilestone: (journeyId: string, milestoneId: string) => void;
  completeJourney: (journeyId: string) => void;
  updateTotalSteps: (steps: number) => void;
  
  // Getters (computed values can be derived in components or here)
  getActiveJourney: () => Journey | null;
  getJourneyProgress: (journeyId: string) => number; // 0-1 percentage
  isMilestoneUnlocked: (journeyId: string, milestoneId: string) => boolean;
}

// Initial Mock State
const INITIAL_JOURNEY_ID = 'road-to-emmaus'; // Default start journey

export const useJourneyStore = create<JourneyState>((set, get) => ({
  activeJourneyId: INITIAL_JOURNEY_ID,
  
  journeyProgress: {
    [INITIAL_JOURNEY_ID]: {
      completedMilestones: [], // Start fresh
      isCompleted: false,
      startedAt: new Date().toISOString(),
    }
  },
  
  totalSteps: 124532, // Mock initial data
  totalDistance: 85400, // Mock initial data (meters)
  journeysCompleted: 2, // Mock initial data

  setActiveJourney: (journeyId) => set({ activeJourneyId: journeyId }),

  completeMilestone: (journeyId, milestoneId) => {
    set((state) => {
      const currentProgress = state.journeyProgress[journeyId] || {
        completedMilestones: [],
        isCompleted: false,
        startedAt: new Date().toISOString(),
      };

      if (currentProgress.completedMilestones.includes(milestoneId)) {
        return state; // Already completed
      }

      const updatedMilestones = [...currentProgress.completedMilestones, milestoneId];
      
      return {
        journeyProgress: {
          ...state.journeyProgress,
          [journeyId]: {
            ...currentProgress,
            completedMilestones: updatedMilestones,
          }
        }
      };
    });
  },

  completeJourney: (journeyId) => {
    set((state) => {
      const currentProgress = state.journeyProgress[journeyId];
      if (!currentProgress || currentProgress.isCompleted) return state;

      return {
        journeysCompleted: state.journeysCompleted + 1,
        journeyProgress: {
          ...state.journeyProgress,
          [journeyId]: {
            ...currentProgress,
            isCompleted: true,
            completedAt: new Date().toISOString(),
          }
        }
      };
    });
  },

  updateTotalSteps: (steps) => set((state) => ({ totalSteps: state.totalSteps + steps })),

  // Getters
  getActiveJourney: () => {
    const { activeJourneyId } = get();
    return ALL_JOURNEYS.find(j => j.id === activeJourneyId) || null;
  },

  getJourneyProgress: (journeyId) => {
    const journey = ALL_JOURNEYS.find(j => j.id === journeyId);
    const progress = get().journeyProgress[journeyId];
    
    if (!journey || !progress) return 0;
    
    // Simple calculation: completed milestones / total milestones
    // In a real app, this might be based on distance walked
    return progress.completedMilestones.length / journey.milestones.length;
  },

  isMilestoneUnlocked: (journeyId, milestoneId) => {
    const journey = ALL_JOURNEYS.find(j => j.id === journeyId);
    if (!journey) return false;

    const milestoneIndex = journey.milestones.findIndex(m => m.id === milestoneId);
    if (milestoneIndex === -1) return false;

    // First milestone is always unlocked
    if (milestoneIndex === 0) return true;

    // Subsequent milestones are unlocked if the PREVIOUS one is completed
    const previousMilestoneId = journey.milestones[milestoneIndex - 1].id;
    const progress = get().journeyProgress[journeyId];
    
    return progress?.completedMilestones.includes(previousMilestoneId) ?? false;
  }
}));
