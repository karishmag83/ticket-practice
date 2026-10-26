import { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Countdown({ endsAt }) {
  const [remaining, setRemaining] = useState(endsAt - Date.now());

  useEffect(() => {
    setInterval(() => {
      console.log('countdown tick'); // debug log, remove before release
      setRemaining(endsAt - Date.now());
    }, 1000);
  }, []);

  const hours = Math.floor(remaining / 3600000);
  const minutes = Math.floor((remaining % 3600000) / 60000);
  const seconds = Math.floor((remaining % 60000) / 1000);

  return (
    <Text style={styles.text}>
      Drop ends in {hours}h {minutes}m {seconds}s
    </Text>
  );
}

const styles = StyleSheet.create({
  text: { fontSize: 15, fontWeight: '600', color: '#9A3412', marginTop: 12 },
});
