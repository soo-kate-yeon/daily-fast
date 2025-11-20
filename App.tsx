import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Phase 1: 타입 임포트 테스트
import { FastingSession, MessageBank } from './src/types';
// Phase 2: 상수 임포트 테스트
import { FASTING_PLANS, getPlanByType } from './src/constants/fastingPlans';
// Phase 3: 메시지 뱅크 임포트 테스트
import { MESSAGE_BANK } from './src/constants/messageBank';
// Phase 4: 시간 유틸리티 임포트 테스트
import { formatDuration, formatTime, now } from './src/utils/time';
// Phase 5: 메시지 선택 유틸리티 임포트 테스트
import { getMessageCategory, selectMessage } from './src/utils/messages';

export default function App() {
  // Phase 2: 테스트 코드
  console.log('총 플랜 개수:', FASTING_PLANS.length); // 9
  console.log('16:8 플랜:', getPlanByType('16:8')?.label); // "16:8 플랜"
  console.log('첫 번째 플랜:', FASTING_PLANS[0]);

  // Phase 3: 테스트 코드
  console.log('in_progress_early 메시지 개수:', MESSAGE_BANK.in_progress_early.length); // 3 이상
  console.log('success 메시지:', MESSAGE_BANK.success[0]); // "오늘도 해냈네요! 👏"

  // Phase 4: 테스트 코드
  console.log('formatDuration 테스트:', formatDuration(45000000)); // "12시간 30분 0초"
  console.log('formatTime 테스트:', formatTime(now())); // "오후 3:45" (현재 시각)
  console.log('현재 시간:', now());

  // Phase 5: 테스트 코드
  const category = getMessageCategory('in_progress', 3 * 60 * 60 * 1000, 16 * 60 * 60 * 1000);
  console.log('카테고리 테스트:', category); // "in_progress_early"

  const message = selectMessage('in_progress_early', { duration: '3시간' });
  console.log('변수 치환 테스트:', message); // "지금 3시간, 몸이 적응하는 중이에요" (예시)

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
