// src/constants/fastingPlans.ts
import { FastingPlan, FastingPlanType } from '../types';

// 밀리초 단위 헬퍼
const HOUR_MS = 60 * 60 * 1000;

export const FASTING_PLANS: FastingPlan[] = [
  {
    type: '16:8',
    label: '16:8 플랜',
    duration: 16 * HOUR_MS,
    description: '16시간 단식, 8시간 식사. 가장 인기있는 방법이에요',
  },
  {
    type: '18:6',
    label: '18:6 플랜',
    duration: 18 * HOUR_MS,
    description: '18시간 단식, 6시간 식사',
  },
  {
    type: '20:4',
    label: '20:4 플랜',
    duration: 20 * HOUR_MS,
    description: '20시간 단식, 4시간 식사',
  },
  {
    type: '24',
    label: '24시간',
    duration: 24 * HOUR_MS,
    description: '하루 한 끼',
  },
  {
    type: '36',
    label: '36시간',
    duration: 36 * HOUR_MS,
    description: '36시간 단식',
  },
  {
    type: '48',
    label: '48시간',
    duration: 48 * HOUR_MS,
    description: '48시간 단식',
  },
  {
    type: '72',
    label: '72시간',
    duration: 72 * HOUR_MS,
    description: '72시간 물단식',
  },
  {
    type: '5:2',
    label: '5:2 단식',
    duration: 24 * HOUR_MS, // 제한 날의 단식 시간
    description: '주 5일 정상, 2일 칼로리 제한',
  },
  {
    type: 'alternate',
    label: '격일 단식',
    duration: 24 * HOUR_MS,
    description: '하루 단식, 하루 정상',
  },
];

// 플랜 타입으로 플랜 객체 찾기
export function getPlanByType(type: FastingPlanType): FastingPlan | undefined {
  return FASTING_PLANS.find((p) => p.type === type);
}

// 기본 플랜
export const DEFAULT_PLAN: FastingPlanType = '16:8';
