import { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchEvents } from '../data/api';
import EventCard from '../components/EventCard';

export default function EventsScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchEvents();
        setEvents(data);
        setLoading(false);
      } catch (err) {
        console.log('Failed to load events', err);
      }
    }
    load();
  }, []);

  const filtered = events.filter((event) => event.title.includes(query));

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upcoming events</Text>
      <TextInput
        style={styles.search}
        placeholder="Search events"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  heading: { fontSize: 26, fontWeight: '700', marginHorizontal: 16, marginBottom: 12, color: '#1A1A1A' },
  search: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDDDD8',
    fontSize: 16,
  },
});
