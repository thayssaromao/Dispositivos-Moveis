import React from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  Image,
  SafeAreaView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style'; 

export default function Home() {
  return (
    
    <SafeAreaView style={styles.container}> 
      
      <ScrollView> 
        <View style={styles.header}>
          <Text style={styles.headerText}>Olá, Fulano!</Text>
          <Text style={styles.headerSubText}>Onde vamos conhecer hoje?</Text>
        </View>
        
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            placeholder="Pesquise Aqui"
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
          <Ionicons name="mic-outline" size={22} color="#888" style={styles.micIcon} />
        </View>

        {/* Seção Melhores Avaliados */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Melhores Avaliados</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            
            <View style={styles.placeCard}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/150' }} 
                style={styles.cardImage} 
              />
              <Text style={styles.cardTitle}>Brise Bar</Text>
            </View>
            <View style={styles.placeCard}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/150' }} 
                style={styles.cardImage} 
              />
              <Text style={styles.cardTitle}>Brisa Bar (Outro)</Text>
            </View>
            <View style={styles.placeCard}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/150' }} 
                style={styles.cardImage} 
              />
              <Text style={styles.cardTitle}>Brisa Bar (Outro)</Text>
            </View>
            <View style={styles.placeCard}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/150' }} 
                style={styles.cardImage} 
              />
              <Text style={styles.cardTitle}>Brisa Bar (Outro)</Text>
            </View>
            <View style={styles.placeCard}>
              <Image 
                source={{ uri: 'https://via.placeholder.com/150' }} 
                style={styles.cardImage} 
              />
              <Text style={styles.cardTitle}>Brisa Bar (Outro)</Text>
            </View>
            
          </ScrollView>
        </View>

        {/* Seção Procure no Mapa */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Procure No Mapa</Text>
          <View style={styles.mapPlaceholder}>
            <Text>Aqui vai o componente de Mapa</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}