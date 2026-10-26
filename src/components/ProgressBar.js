import { View, StyleSheet } from 'react-native';

export default function ProgressBar({ progress }) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${progress * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: { height: 10, backgroundColor: '#E4E4DF', borderRadius: 5, overflow: 'hidden' },
  fill: { height: '100%', backgroundColor: '#1F5C3A' },
});
