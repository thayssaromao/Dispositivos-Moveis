import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Onboarding from './pages/onboarding';
import Login from './pages/login';
import Sign from './pages/sign';


export default function App() {
  return (
    <View style={styles.container}>
      <Login />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
