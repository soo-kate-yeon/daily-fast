// src/utils/messages.ts
import { MessageCategory, FastingSession } from '../types';
import { MESSAGE_BANK } from '../constants/messageBank';
import { formatDurationShort } from './time';

/**
 * 단식 상태와 시간에 따라 메시지 카테고리 결정
 */
export function getMessageCategory(
  status: FastingSession['status'],
  durationMs: number,
  targetDurationMs: number
): MessageCategory {
  const hours = durationMs / (1000 * 60 * 60);

  if (status === 'in_progress') {
    if (hours < 6) return 'in_progress_early';
    if (hours < 12) return 'in_progress_mid';
    if (hours < targetDurationMs / (1000 * 60 * 60)) return 'in_progress_late';
    return 'in_progress_overtime';
  }

  if (status === 'completed') {
    return 'success';
  }

  // early_stop
  if (hours < 8) return 'early_stop_short';
  if (hours < 14) return 'early_stop_almost';
  return 'early_stop_close';
}

/**
 * 메시지 카테고리에서 랜덤 메시지 선택 및 변수 치환
 */
export function selectMessage(
  category: MessageCategory,
  variables?: {
    duration?: string;
    calories?: number;
  },
  messageBank: Record<MessageCategory, string[]> = MESSAGE_BANK
): string {
  const messages = messageBank[category];

  if (!messages || messages.length === 0) {
    return '오늘도 좋은 하루예요!'; // 최후 폴백
  }

  // 랜덤 선택
  const randomMsg = messages[Math.floor(Math.random() * messages.length)];

  // 변수 치환
  let result = randomMsg;
  if (variables?.duration) {
    result = result.replace(/{duration}/g, variables.duration);
  }
  if (variables?.calories !== undefined) {
    result = result.replace(/{calories}/g, String(variables.calories));
  }

  return result;
}

/**
 * 단식 세션에 맞는 메시지 생성 (올인원 헬퍼)
 */
export function getMessageForSession(
  session: FastingSession,
  currentTime: number = Date.now()
): string {
  const duration = session.endTime
    ? session.endTime - session.startTime
    : currentTime - session.startTime;

  const category = getMessageCategory(
    session.status,
    duration,
    session.targetDuration
  );

  return selectMessage(category, {
    duration: formatDurationShort(duration),
    calories: session.caloriesBurned,
  });
}
