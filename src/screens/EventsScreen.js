import { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { fetchEvents } from '../data/api';
import EventCard from '../components/EventCard';

export default function EventsScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEvents();
      setEvents(data);
    } catch (err) {
      console.log('Failed to load events', err);
      setError('We couldn’t load events. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const normalizedQuery = query.toLowerCase();
  const filtered = events.filter((event) =>
    event.title.toLowerCase().includes(normalizedQuery)
  );

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
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{error}</Text>
          <Pressable accessibilityRole="button" onPress={loadEvents}>
            <Text style={styles.retryButton}>Try again</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <EventCard event={item} />}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>
              No events found. Try a different search.
            </Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyMessage: { marginHorizontal: 16, color: '#66665F', fontSize: 16, textAlign: 'center' },
  errorContainer: { alignItems: 'center', marginHorizontal: 24, marginTop: 32 },
  errorMessage: { color: '#66665F', fontSize: 16, textAlign: 'center', marginBottom: 12 },
  retryButton: { color: '#1F5C3A', fontSize: 16, fontWeight: '700' },
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
