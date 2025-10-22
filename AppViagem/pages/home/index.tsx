import React, {useEffect, useState} from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  Image,
  SafeAreaView,
  Alert,
  ActivityIndicator
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';

import styles from './style'; 

export default function Home() {
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);

  /* MARK: Pedir permissao de localizacao para usuario */
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos de sua permissão para acessar a localização.');
        setRegion({
          latitude: -23.5505,
          longitude: -46.6333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });
        setLoading(false);
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      setLoading(false);
    })();
  }, []);
  
if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Carregando mapa...</Text>
      </View>
    );
  }

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
          <Text style={styles.sectionTitleCard}>Melhores Avaliados</Text>
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
          {/* Seção categorias */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Restaurantes</Text>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Bares</Text>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Atrações</Text>
            </View>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryTitle}>Categoria</Text>
            </View>
          </ScrollView>
          {region && (
            <MapView 
              style={styles.map}
              region={region} 
              showsUserLocation={true} 
            >
              <Marker
                coordinate={region}
                title="Você está aqui"
                description="Sua localização atual"
              />
            </MapView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}