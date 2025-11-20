import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// Phase 1: 타입 임포트 테스트
import { FastingSession, MessageBank } from './src/types';
// Phase 2: 상수 임포트 테스트
import { FASTING_PLANS, getPlanByType } from './src/constants/fastingPlans';
// Phase 3: 메시지 뱅크 임포트 테스트
import { MESSAGE_BANK } from './src/constants/messageBank';

export default function App() {
  // Phase 2: 테스트 코드
  console.log('총 플랜 개수:', FASTING_PLANS.length); // 9
  console.log('16:8 플랜:', getPlanByType('16:8')?.label); // "16:8 플랜"
  console.log('첫 번째 플랜:', FASTING_PLANS[0]);

  // Phase 3: 테스트 코드
  console.log('in_progress_early 메시지 개수:', MESSAGE_BANK.in_progress_early.length); // 3 이상
  console.log('success 메시지:', MESSAGE_BANK.success[0]); // "오늘도 해냈네요! 👏"

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
