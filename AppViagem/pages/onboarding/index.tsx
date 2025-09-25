import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Onboarding: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Aviãozinho e título */}
      <View style={styles.titleContainer}>
        
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Trip to</Text>
          <Text style={styles.subtitle}>GO!</Text>
        </View>
      </View>

      {/* Globo */}
      {/* <Image
        source={require('../assets/globe.png')} // placeholder
        style={styles.globe}
      /> */}

      {/* Botão */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Começar</Text>
      </TouchableOpacity>

      {/* Indicadores */}
      <View style={styles.dotsContainer}>
        <View style={[styles.dot, styles.dotActive]} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textWrapper: {
    alignItems: 'center',
  },
  plane: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    marginBottom: -10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFD700',
    backgroundColor: '#6A0DAD',
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  subtitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#6A0DAD',
    marginTop: 10,
  },
  globe: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#FFD700',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  dotActive: {
    backgroundColor: '#000',
  },
});
