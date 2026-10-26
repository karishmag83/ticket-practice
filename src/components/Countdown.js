import { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Countdown({ endsAt }) {
  const [remaining, setRemaining] = useState(Math.max(0, endsAt - Date.now()));

  useEffect(() => {
    let intervalId;
    const updateRemaining = () => {
      const nextRemaining = Math.max(0, endsAt - Date.now());
      setRemaining(nextRemaining);
      if (nextRemaining === 0 && intervalId) {
        clearInterval(intervalId);
      }
    };

    updateRemaining();
    if (endsAt > Date.now()) {
      intervalId = setInterval(updateRemaining, 1000);
    }

    return () => clearInterval(intervalId);
  }, [endsAt]);

  if (remaining === 0) {
    return <Text style={styles.text}>The drop has ended.</Text>;
  }

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
