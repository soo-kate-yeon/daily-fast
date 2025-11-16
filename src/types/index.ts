// src/types/index.ts

// 단식 플랜 타입
export type FastingPlanType =
  | '16:8'
  | '18:6'
  | '20:4'
  | '24'
  | '5:2'
  | 'alternate'
  | '36'
  | '48'
  | '72';

// 단식 세션 (진행 중이거나 완료된)
export type FastingSession = {
  id: string;
  planType: FastingPlanType;
  startTime: number;              // Unix timestamp (milliseconds)
  endTime: number | null;         // null = 진행 중
  targetDuration: number;         // 목표 시간 (milliseconds)
  status: 'in_progress' | 'completed' | 'early_stop';
  caloriesBurned?: number;
};

// 단식 플랜 정의
export type FastingPlan = {
  type: FastingPlanType;
  label: string;
  duration: number;               // milliseconds
  description: string;
};

// 단식 히스토리 통계
export type FastingStats = {
  totalSessions: number;
  successCount: number;
  earlyStopCount: number;
  weeklySuccessRate: number;      // 0-1
  monthlySuccessRate: number;     // 0-1
};

// 단식 히스토리
export type FastingHistory = {
  sessions: FastingSession[];
  stats: FastingStats;
};

// 사용자 설정
export type UserPreferences = {
  defaultPlan: FastingPlanType;
  scheduledFast?: {
    planType: FastingPlanType;
    scheduledStartTime: number;
  };
};

// 메시지 카테고리
export type MessageCategory =
  | 'in_progress_early'           // 0-6시간
  | 'in_progress_mid'             // 6-12시간
  | 'in_progress_late'            // 12-16시간
  | 'in_progress_overtime'        // 16시간+
  | 'success'
  | 'early_stop_short'            // 0-8시간
  | 'early_stop_almost'           // 8-14시간
  | 'early_stop_close';           // 14-16시간

// 메시지 뱅크 (객체 타입)
export type MessageBank = {
  [K in MessageCategory]: string[];
};

// Zustand Store 타입
export type AppStore = {
  // 상태
  currentSession: FastingSession | null;
  history: FastingHistory;
  preferences: UserPreferences;

  // 액션
  startFasting: (planType: FastingPlanType) => void;
  stopFasting: (reason: 'completed' | 'early_stop') => void;
  scheduleNextFast: (planType: FastingPlanType, startTime: number) => void;

  // 헬퍼
  getCurrentDuration: () => number;
  getWeeklySuccessCount: () => number;
};
