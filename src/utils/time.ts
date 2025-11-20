// src/utils/time.ts
import { format, startOfWeek, startOfMonth } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 밀리초를 "12시간 30분 24초" 형식으로 변환
 */
export function formatDuration(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  if (hours > 0) {
    return `${hours}시간 ${minutes}분 ${seconds}초`;
  } else if (minutes > 0) {
    return `${minutes}분 ${seconds}초`;
  } else {
    return `${seconds}초`;
  }
}

/**
 * 밀리초를 "12시간 30분" 형식으로 변환 (초 제외)
 */
export function formatDurationShort(ms: number): string {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}시간 ${minutes}분`;
  } else {
    return `${minutes}분`;
  }
}

/**
 * Unix timestamp를 "오전 8:00" 형식으로 변환
 */
export function formatTime(timestamp: number): string {
  return format(timestamp, 'a h:mm', { locale: ko });
}

/**
 * Unix timestamp를 "11월 15일" 형식으로 변환
 */
export function formatDate(timestamp: number): string {
  return format(timestamp, 'M월 d일', { locale: ko });
}

/**
 * 이번 주 시작일 (일요일) 반환
 */
export function getWeekStart(): Date {
  return startOfWeek(new Date(), { locale: ko });
}

/**
 * 이번 달 시작일 반환
 */
export function getMonthStart(): Date {
  return startOfMonth(new Date());
}

/**
 * 현재 시간 (Unix timestamp)
 */
export function now(): number {
  return Date.now();
}
