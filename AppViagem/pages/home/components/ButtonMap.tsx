import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  onPress: () => void;
};

export default function ButtonMap({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="locate" size={24} color="#fff" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 50,
    height: 50,
    backgroundColor: '#F17300',
    borderRadius: 25, // Redondo
    justifyContent: 'center',
    alignItems: 'center',
    // Sombras para parecer flutuante
    elevation: 5,
    shadowColor: '#fff',
    shadowOpacity: 0.3,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
});