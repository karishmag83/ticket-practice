import { View, Text, ScrollView, StyleSheet } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import Countdown from '../components/Countdown';

const SET = {
  name: 'Bayside Hawks 2026 Season Set',
  pieces: [
    { id: 'c1', name: 'Home Opener', rarity: 'Common' },
    { id: 'c2', name: 'Rivalry Night', rarity: 'Common' },
    { id: 'c3', name: 'Senior Night', rarity: 'Uncommon' },
    { id: 'c4', name: 'Overtime Thriller', rarity: 'Uncommon' },
    { id: 'c5', name: 'Buzzer Beater', rarity: 'Rare' },
    { id: 'c6', name: 'Championship Banner', rarity: 'Legendary' },
  ],
};

// Collectibles the fan owns. They have two copies of Rivalry Night.
const OWNED = [
  { collectibleId: 'c1', serial: 112 },
  { collectibleId: 'c2', serial: 87 },
  { collectibleId: 'c2', serial: 301 },
  { collectibleId: 'c3', serial: 45 },
  { collectibleId: 'c4', serial: 9 },
];

// For testing, the drop ends 15 seconds after the app loads.
const DROP_ENDS_AT = Date.now() + 15 * 1000;

export default function CollectiblesScreen() {
  const ownedCount = OWNED.length;
  const total = SET.pieces.length;
  const left = total - ownedCount;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Collectibles</Text>
      <View style={styles.card}>
        <Text style={styles.setName}>{SET.name}</Text>
        <Text style={styles.count}>
          {ownedCount} of {total} collected
        </Text>
        <ProgressBar progress={ownedCount / total} />
        <Text style={styles.nudge}>Only {left} left to complete the set!</Text>
        <Countdown endsAt={DROP_ENDS_AT} />
      </View>

      {SET.pieces.map((piece) => {
        const owned = OWNED.some((o) => o.collectibleId === piece.id);
        return (
          <View key={piece.id} style={[styles.piece, !owned && styles.pieceMissing]}>
            <Text style={styles.pieceName}>{piece.name}</Text>
            <Text style={styles.pieceMeta}>
              {piece.rarity}, {owned ? 'Owned' : 'Missing'}
            </Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingBottom: 24 },
  heading: { fontSize: 26, fontWeight: '700', marginHorizontal: 16, marginBottom: 12, color: '#1A1A1A' },
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E4E4DF',
  },
  setName: { fontSize: 17, fontWeight: '600', color: '#1A1A1A' },
  count: { fontSize: 14, color: '#66665F', marginTop: 4, marginBottom: 10 },
  nudge: { fontSize: 14, color: '#1A1A1A', marginTop: 10 },
  piece: {
    backgroundColor: '#FFFFFF',
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E4E4DF',
  },
  pieceMissing: { opacity: 0.5, borderStyle: 'dashed' },
  pieceName: { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
  pieceMeta: { fontSize: 13, color: '#66665F', marginTop: 2 },
});
