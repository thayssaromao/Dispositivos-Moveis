import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Image,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Region } from 'react-native-maps';

import styles from './style';
import CategoryList from './CategoryList';
import CustomMap from './CustomMap';

type Local = {
  nome: string;
  latitude: number;
  longitude: number;
};

export default function Home() {
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [locais, setLocais] = useState<Local[]>([]);

  /* MARK: Pedir permissão de localização para usuário */
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

      const location = await Location.getCurrentPositionAsync({});
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

  /* Função que gera locais de exemplo */
  const handleCategoriaSelecionada = (categoria: string) => {
    if (!region) return;

    const placeholdersLocais: Record<string, Local[]> = {
      Restaurantes: [
        { nome: 'Restaurante A', latitude: region.latitude + 0.001, longitude: region.longitude + 0.001 },
        { nome: 'Restaurante B', latitude: region.latitude - 0.001, longitude: region.longitude - 0.001 },
      ],
      Bares: [
        { nome: 'Bar A', latitude: region.latitude + 0.002, longitude: region.longitude + 0.002 },
        { nome: 'Bar B', latitude: region.latitude - 0.002, longitude: region.longitude - 0.002 },
      ],
      Atrações: [
        { nome: 'Atração A', latitude: region.latitude + 0.003, longitude: region.longitude + 0.003 },
        { nome: 'Atração B', latitude: region.latitude - 0.003, longitude: region.longitude - 0.003 },
      ],
    };

    setLocais(placeholdersLocais[categoria] || []);
    setCategoriaSelecionada(categoria);
  };

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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Olá, Fulano!</Text>
          <Text style={styles.headerSubText}>Onde vamos conhecer hoje?</Text>
        </View>

        {/* Barra de busca */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput placeholder="Pesquise Aqui" style={styles.searchInput} placeholderTextColor="#888" />
          <Ionicons name="mic-outline" size={22} color="#888" style={styles.micIcon} />
        </View>

        {/* Melhores Avaliados */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitleCard}>Melhores Avaliados</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {Array(5).fill(0).map((_, i) => (
              <View style={styles.placeCard} key={i}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.cardImage} />
                <Text style={styles.cardTitle}>Lugar {i + 1}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Procure no mapa */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Procure No Mapa</Text>

          <CategoryList
            categorias={['Restaurantes', 'Bares', 'Atrações']}
            categoriaSelecionada={categoriaSelecionada}
            onSelecionar={handleCategoriaSelecionada}
          />

          <CustomMap region={region} locais={locais} categoria={categoriaSelecionada} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
