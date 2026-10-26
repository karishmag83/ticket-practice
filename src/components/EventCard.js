import { View, Text, StyleSheet } from 'react-native';

export default function EventCard({ event }) {
  const date = new Date(event.date);

  return (
    <View style={styles.card}>
      <Text style={styles.category}>{event.category}</Text>
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.meta}>
        {event.venue}, {date.toLocaleDateString()}
      </Text>
      <Text style={styles.price}>${event.price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E4E4DF',
  },
  category: { fontSize: 13, color: '#1F5C3A', marginBottom: 4 },
  title: { fontSize: 17, fontWeight: '600', color: '#1A1A1A' },
  meta: { fontSize: 14, color: '#66665F', marginTop: 4 },
  price: { fontSize: 15, fontWeight: '600', marginTop: 8, color: '#1A1A1A' },
});
