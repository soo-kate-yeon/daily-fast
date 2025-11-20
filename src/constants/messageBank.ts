// src/constants/messageBank.ts
import { MessageBank } from '../types';

export const MESSAGE_BANK: MessageBank = {
  // 진행 중 - 초반 (0-6시간)
  in_progress_early: [
    '좋은 시작이에요, 천천히 가봐요',
    '지금 {duration}, 몸이 적응하는 중이에요',
    '{duration}째! 이미 시작했어요',
  ],

  // 진행 중 - 중반 (6-12시간)
  in_progress_mid: [
    '{duration} 넘었어요! 이제 몸이 지방을 쓰기 시작해요',
    '{duration}째, 집중력이 좋아지는 시간이에요',
    '절반 넘었어요! 몸이 변화하는 중이에요',
  ],

  // 진행 중 - 후반 (12-16시간)
  in_progress_late: [
    '{duration}! 이미 충분히 의미있어요',
    '거의 다 왔네요, 몸이 스스로 회복 중이에요',
    '{duration}이나! 대단해요',
  ],

  // 진행 중 - 목표 초과 (16시간+)
  in_progress_overtime: [
    '목표 달성 🎉 언제든 편하게 식사하세요',
    '{duration} 넘었어요! 원한다면 조금 더 해도 좋아요',
    '이미 목표 넘었어요. 충분히 잘하고 있어요',
  ],

  // 성공
  success: [
    '오늘도 해냈네요! 👏',
    '{duration} 완주! 멋져요',
    '성공이에요 🎉 자신감 있게 식사하세요',
    '또 하나의 건강한 하루!',
  ],

  // 조기 종료 - 짧게 (0-8시간)
  early_stop_short: [
    '오늘은 몸이 다른 걸 원했나봐요',
    '괜찮아요, 다시 시작하면 돼요',
    '완벽한 날만 있진 않아요',
  ],

  // 조기 종료 - 거의 (8-14시간)
  early_stop_almost: [
    '{duration}이나 했어요! 대단해요',
    '거의 다 왔는데도 몸 신호를 들었네요, 현명해요',
    '{duration}도 충분히 의미있어요',
  ],

  // 조기 종료 - 아깝게 (14-16시간)
  early_stop_close: [
    '와, {duration}! 거의 다 했어요',
    '{duration}도 이미 성공이에요. 몸이 쉬고 싶었나봐요',
    '목표 바로 앞까지! 다음엔 자연스럽게 될 거예요',
  ],
};
