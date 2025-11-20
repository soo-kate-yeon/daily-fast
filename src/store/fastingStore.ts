// src/store/fastingStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppStore, FastingSession, FastingPlanType } from '../types';
import { getPlanByType, DEFAULT_PLAN } from '../constants/fastingPlans';

// UUID 생성 헬퍼 (간단한 버전)
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// 초기 상태
const initialState = {
  currentSession: null,
  history: {
    sessions: [],
    stats: {
      totalSessions: 0,
      successCount: 0,
      earlyStopCount: 0,
      weeklySuccessRate: 0,
      monthlySuccessRate: 0,
    },
  },
  preferences: {
    defaultPlan: DEFAULT_PLAN,
  },
};

export const useFastingStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // 액션: 단식 시작
      startFasting: (planType: FastingPlanType) => {
        const plan = getPlanByType(planType);
        if (!plan) {
          console.error(`Plan not found: ${planType}`);
          return;
        }

        const session: FastingSession = {
          id: generateId(),
          planType,
          startTime: Date.now(),
          endTime: null,
          targetDuration: plan.duration,
          status: 'in_progress',
        };

        set({ currentSession: session });
      },

      // 액션: 단식 중단
      stopFasting: (reason: 'completed' | 'early_stop') => {
        const { currentSession, history } = get();
        if (!currentSession) {
          console.warn('No active session to stop');
          return;
        }

        const endTime = Date.now();
        const duration = endTime - currentSession.startTime;
        const isSuccess = duration >= currentSession.targetDuration;

        const completedSession: FastingSession = {
          ...currentSession,
          endTime,
          status: isSuccess ? 'completed' : 'early_stop',
        };

        // 히스토리 업데이트
        const updatedSessions = [...history.sessions, completedSession];
        const successCount = updatedSessions.filter(
          (s) => s.status === 'completed'
        ).length;
        const earlyStopCount = updatedSessions.filter(
          (s) => s.status === 'early_stop'
        ).length;

        set({
          currentSession: null,
          history: {
            sessions: updatedSessions,
            stats: {
              totalSessions: updatedSessions.length,
              successCount,
              earlyStopCount,
              weeklySuccessRate: 0, // TODO: Phase 7에서 구현
              monthlySuccessRate: 0,
            },
          },
        });
      },

      // 액션: 단식 예약
      scheduleNextFast: (planType: FastingPlanType, startTime: number) => {
        set({
          preferences: {
            ...get().preferences,
            scheduledFast: {
              planType,
              scheduledStartTime: startTime,
            },
          },
        });
      },

      // 헬퍼: 현재 단식 지속 시간
      getCurrentDuration: () => {
        const { currentSession } = get();
        if (!currentSession) return 0;
        return Date.now() - currentSession.startTime;
      },

      // 헬퍼: 이번 주 성공 횟수
      getWeeklySuccessCount: () => {
        // TODO: Phase 7에서 구현
        return 0;
      },
    }),
    {
      name: 'dailyfast-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
