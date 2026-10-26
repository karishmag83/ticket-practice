import { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import EventsScreen from './src/screens/EventsScreen';
import MyTicketsScreen from './src/screens/MyTicketsScreen';
import CollectiblesScreen from './src/screens/CollectiblesScreen';

const TABS = [
  { key: 'events', label: 'Events' },
  { key: 'tickets', label: 'My tickets' },
  { key: 'collectibles', label: 'Collectibles' },
];

export default function App() {
  const [tab, setTab] = useState('events');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        {tab === 'events' && <EventsScreen />}
        {tab === 'tickets' && <MyTicketsScreen />}
        {tab === 'collectibles' && <CollectiblesScreen />}
      </View>
      <View style={styles.tabBar}>
        {TABS.map((t) => (
          <Pressable key={t.key} style={styles.tab} onPress={() => setTab(t.key)}>
            <Text style={[styles.tabText, tab === t.key && styles.tabTextActive]}>{t.label}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F7F5', paddingTop: 56 },
  content: { flex: 1 },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#DDDDD8',
    backgroundColor: '#FFFFFF',
    paddingBottom: 28,
  },
  tab: { flex: 1, alignItems: 'center', paddingVertical: 14 },
  tabText: { fontSize: 14, color: '#777770' },
  tabTextActive: { color: '#1F5C3A', fontWeight: '700' },
});
