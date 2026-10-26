import { useState } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet } from 'react-native';

const TICKETS = [
  { id: 'tkt-1', eventTitle: 'Cage Night 14: Main Card', date: '2026-11-14T20:00:00', section: 'Floor, Row B', price: 45 },
  { id: 'tkt-2', eventTitle: 'Bayside Hawks vs. Harbor City Owls', date: '2026-11-07T19:00:00', section: 'Section 104', price: 18 },
  { id: 'tkt-3', eventTitle: 'Friday Laughs Comedy Showcase', date: '2026-11-20T21:00:00', section: 'General admission', price: 25 },
  { id: 'tkt-4', eventTitle: 'Golden Gloves Regional Finals', date: '2026-12-12T19:30:00', section: 'Ringside 2', price: 35 },
];

export default function MyTicketsScreen() {
  const [sortBy, setSortBy] = useState('date');
  const [claimed, setClaimed] = useState([]); // positions of claimed tickets

  const sorted = [...TICKETS].sort((a, b) =>
    sortBy === 'date' ? new Date(a.date) - new Date(b.date) : a.price - b.price
  );

  const toggleClaim = (index) => {
    setClaimed((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My tickets</Text>
      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sort by</Text>
        {['date', 'price'].map((option) => (
          <Pressable
            key={option}
            onPress={() => setSortBy(option)}
            style={[styles.sortButton, sortBy === option && styles.sortButtonActive]}
          >
            <Text style={[styles.sortText, sortBy === option && styles.sortTextActive]}>
              {option === 'date' ? 'Date' : 'Price'}
            </Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={sorted}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item, index }) => {
          const isClaimed = claimed.includes(index);
          return (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{item.eventTitle}</Text>
                <Text style={styles.meta}>
                  {new Date(item.date).toLocaleDateString()}, {item.section}
                </Text>
              </View>
              <Pressable
                onPress={() => toggleClaim(index)}
                style={[styles.claimButton, isClaimed && styles.claimButtonDone]}
              >
                <Text style={[styles.claimText, isClaimed && styles.claimTextDone]}>
                  {isClaimed ? 'Claimed' : 'Claim'}
                </Text>
              </Pressable>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heading: { fontSize: 26, fontWeight: '700', marginHorizontal: 16, marginBottom: 12, color: '#1A1A1A' },
  sortRow: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, marginBottom: 16 },
  sortLabel: { fontSize: 14, color: '#66665F', marginRight: 8 },
  sortButton: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 16, borderWidth: 1, borderColor: '#DDDDD8', marginRight: 8 },
  sortButtonActive: { backgroundColor: '#1F5C3A', borderColor: '#1F5C3A' },
  sortText: { fontSize: 14, color: '#1A1A1A' },
  sortTextActive: { color: '#FFFFFF', fontWeight: '600' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E4E4DF',
  },
  title: { fontSize: 16, fontWeight: '600', color: '#1A1A1A' },
  meta: { fontSize: 14, color: '#66665F', marginTop: 4 },
  claimButton: { paddingVertical: 8, paddingHorizontal: 14, borderRadius: 8, borderWidth: 1, borderColor: '#1F5C3A', marginLeft: 12 },
  claimButtonDone: { backgroundColor: '#1F5C3A' },
  claimText: { fontSize: 14, fontWeight: '600', color: '#1F5C3A' },
  claimTextDone: { color: '#FFFFFF' },
});
