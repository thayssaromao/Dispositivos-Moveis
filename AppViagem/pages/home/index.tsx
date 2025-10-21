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
import MapView, { Marker } from 'react-native-maps';
import styles from './style'; 

export default function Home() {
  const initialRegion = {
    latitude: -23.5505,
    longitude: -46.6333,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

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
          <MapView 
            style={styles.map}
            initialRegion={initialRegion}
          >
            <Marker
              coordinate={{ latitude: -23.561334, longitude: -46.656539 }}
              title="Avenida Paulista"
              description="Coração de São Paulo"
            />
          </MapView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}