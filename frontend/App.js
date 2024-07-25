import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CellFood from './src/screens/CellFoodData'

export default function App() {
  return (
    <View style={styles.container}>
      <CellFood/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
