import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
  ScrollView,
  Platform
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { Region } from 'react-native-maps';

import styles from './style'; 
import CustomMap from './components/CustomMap';
import ButtonMap from './components/ButtonMap'; 

// Firebase
import { auth, db } from "../../services/firebaseConfig";
import { collection, getDocs } from 'firebase/firestore';

import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../navigationTypes';

const { width } = Dimensions.get('window');

// Tipagem do Local
type Local = {
  id: string;
  nome: string;
  categoria: string;
  descricao?: string;
  latitude: number;
  longitude: number;
  imagem?: string;
  status?: string;
};

export default function HomeV2() {

  const navigation = useNavigation<NavigationProp>();
  // Estados de Mapa e Locais
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Estados de Dados
  const [todosLocais, setTodosLocais] = useState<Local[]>([]);
  const [locaisFiltrados, setLocaisFiltrados] = useState<Local[]>([]);
  
  // Estados de Filtro
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
  const [textoBusca, setTextoBusca] = useState('');

  // 1. Permissão e Localização 
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos de sua permissão para acessar a localização.');
        // Default SP
        setRegion({ latitude: -23.5505, longitude: -46.6333, latitudeDelta: 0.05, longitudeDelta: 0.05 });
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      });
      setLoading(false);
    })();
  }, []);

  // 2. Buscar dados do Firebase (NOVO)
  useEffect(() => {
    async function fetchLocaisFirebase() {
      try {
        const querySnapshot = await getDocs(collection(db, "locais"));
        const lista = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            nome: data.nome,
            categoria: data.categoria,
            descricao: data.descricao,
            latitude: parseFloat(data.latitude || 0), 
            longitude: parseFloat(data.longitude || 0),
            imagem: data.imagem,
            status: data.status
          } as Local;
        });
        
        // Filtra apenas locais que tenham lat/long válidos para não quebrar o mapa
        const locaisValidos = lista.filter(l => l.latitude !== 0 && l.longitude !== 0);
        
        setTodosLocais(locaisValidos);
        setLocaisFiltrados(locaisValidos);
      } catch (error) {
        console.log("Erro ao buscar locais:", error);
      }
    }
    fetchLocaisFirebase();
  }, []);

  // 3. Lógica de Filtro (Texto + Categoria)
  useEffect(() => {
    let resultado = todosLocais;

    if (textoBusca) {
      resultado = resultado.filter(item => 
        item.nome.toLowerCase().includes(textoBusca.toLowerCase()) ||
        (item.descricao && item.descricao.toLowerCase().includes(textoBusca.toLowerCase()))
      );
    }

    if (categoriaSelecionada) {
      // Comparação flexível (includes) para pegar "Restaurante" ou "Restaurantes"
      resultado = resultado.filter(item => 
        item.categoria.toLowerCase().includes(categoriaSelecionada.toLowerCase())
      );
    }

    setLocaisFiltrados(resultado);
  }, [textoBusca, categoriaSelecionada, todosLocais]);

  // Função para centralizar no usuário
  const handleCenterUser = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.015,
      });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível obter a localização.');
    }
  };

  // Renderiza o Card do Carrossel 
  const renderCard = ({ item }: { item: Local }) => (
    <TouchableOpacity 
      style={styles.cardLocal}
      onPress={() => {
        // Ao clicar no card, centra o mapa no local
        setRegion({
          latitude: item.latitude,
          longitude: item.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        navigation.navigate('PlaceDetail', { local: item });
      }}
    >
      <Image 
        source={{ uri: item.imagem || 'https://via.placeholder.com/150' }} 
        style={styles.cardImage} 
      />
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.nome}</Text>
        <Text style={styles.cardCategory}>{item.categoria}</Text>
        <Text numberOfLines={1} style={styles.cardDesc}>{item.descricao}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>4.5</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Lista de categorias para o filtro visual
  const categoriasVisuais = ['Restaurante', 'Bares', 'Teatro', 'Arte', 'Museu', 'Parque'];

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      
      {/* 1. Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.greetingTitle}>Olá, {auth.currentUser?.displayName || 'Viajante'}!</Text>
        <Text style={styles.greetingSub}>Onde vamos conhecer hoje?</Text>
      </View>

      {/* 2. Barra de Busca e Filtros  */}
      <View style={{ zIndex: 10 }}> 
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={{marginRight: 10}} />
          <TextInput
            placeholder="Pesquise por nome..."
            style={styles.searchInput}
            value={textoBusca}
            onChangeText={setTextoBusca}
          />
        </View>

        {/* Lista Horizontal de Categorias */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoriesContainer}
          style={{ maxHeight: 60 }}
        >
          {categoriasVisuais.map((cat) => (
            <TouchableOpacity 
              key={cat} 
              style={[
                styles.categoryBtn, 
                categoriaSelecionada === cat && styles.categoryBtnActive
              ]}
              onPress={() => setCategoriaSelecionada(categoriaSelecionada === cat ? null : cat)}
            >
              <Text style={[styles.categoryText, categoriaSelecionada === cat && styles.categoryTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* 3. Mapa */}
      <View style={styles.mapContainer}>
        <CustomMap
          region={region}
          // Passamos os locais filtrados do Firebase para o seu mapa exibir os pinos
          locaisCategoria={locaisFiltrados} 
          localBusca={null}
          categoria={categoriaSelecionada}
        />
        
        {/* Botão de recentralizar */}
        <View style={styles.recenterButtonContainer}>
             <ButtonMap onPress={handleCenterUser} />
        </View>
      </View>

      {/* 4. Lista Inferior Flutuante */}
      <View style={styles.bottomListContainer}>
        {locaisFiltrados.length > 0 ? (
          <FlatList
            data={locaisFiltrados}
            keyExtractor={item => item.id}
            renderItem={renderCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.8 + 15}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 20 }}
          />
        ) : (
          <View style={styles.emptyCard}>
            <Text>Nenhum local encontrado nesta área.</Text>
          </View>
        )}
      </View>

    </SafeAreaView>
  );
}