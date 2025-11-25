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
import CategoryList from './components/CategoryList';
import CustomMap from './components/CustomMap';
import ButtonMap from './components/ButtonMap';
import SearchBar from './components/SearchBar';

import proj4 from "proj4";
import teatrosJson from "../../assets/data/teatros.json";
import artesJson from "../../assets/data/artes.json";
import museuJson from "../../assets/data/museus.json";

//MARK:Função para converter UTM para Latitude/Longitude
const utmToLatLng = (easting: number, northing: number) => {
  // SIRGAS 2000 / UTM zone 22S
  const utm = "+proj=utm +zone=22 +south +ellps=GRS80 +units=m +no_defs";
  const wgs84 = "+proj=longlat +datum=WGS84 +no_defs";

  const [lon, lat] = proj4(utm, wgs84, [easting, northing]);
  return { latitude: lat, longitude: lon };
};

const fetchTeatros = (): Local[] => {
  return teatrosJson.teatro.map((t: any) => {
    const { latitude, longitude } = utmToLatLng(t.coord_e, t.coord_n);

    return {
      nome: t.nome_mapa || t.nome_abrev || "Teatro",
      latitude,
      longitude,
    };
  });
};
const fetchArte = (): Local[] => {
  return artesJson.espaco_expositivo_de_artes.map((t: any) => {
    const { latitude, longitude } = utmToLatLng(t.coord_e, t.coord_n);

    return {
      nome: t.nome_mapa || t.nome_abrev || "Arte",
      latitude,
      longitude,
    };
  });
};

const fetchMuseu = (): Local[] => {
  return museuJson.museu.map((t: any) => {
    const { latitude, longitude } = utmToLatLng(t.coord_e, t.coord_n);

    return {
      nome: t.nome_mapa || t.nome_abrev || "Museu",
      latitude,
      longitude,
    };
  });
};

const fetchRealPlaces = async (latitude: number, longitude: number, categoria: string) => {
  const categoryToTag: Record<string, string> = {
    Restaurantes: "amenity=restaurant",
    Bares: "amenity=bar",
  };

  const tag = categoryToTag[categoria];
  if (!tag) return [];

  // Define uma bounding box de 1.5 km ao redor da pessoa
  const delta = 0.015;
  const viewbox = [
    longitude - delta, // left
    latitude + delta,  // top
    longitude + delta, // right
    latitude - delta   // bottom
  ].join(',');

  const url = `https://nominatim.openstreetmap.org/search?format=json` +
              `&${tag}` +
              `&bounded=1&viewbox=${viewbox}` +
              `&limit=30`;

  try {
    const response = await fetch(url, {
      headers: { "User-Agent": "ReactNativeApp/1.0" },
    });

    const data = await response.json();

    if (!Array.isArray(data)) return [];

    return data.map((item: any) => ({
      nome: item.display_name,
      latitude: parseFloat(item.lat),
      longitude: parseFloat(item.lon),
    }));
  } catch (e) {
    console.log("Erro ao buscar lugares reais:", e);
    return [];
  }
};


type Local = {
  nome: string;
  latitude: number;
  longitude: number;
};

export default function HomeV2() {
  const [region, setRegion] = useState<Region | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string | null>(null);
 const [locaisCategoria, setLocaisCategoria] = useState<Local[]>([]);
  const [localBusca, setLocalBusca] = useState<Local | null>(null);


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
const handleCategoriaSelecionada = async (categoria: string) => {
  if (!region) return;

  setCategoriaSelecionada(categoria);
  setLocalBusca(null); // 🔥 limpa o pin da busca quando troca categoria

  if (categoria === "Teatros") {
    setLocaisCategoria(fetchTeatros());
    return;
  }

  if (categoria === "Arte") {
    setLocaisCategoria(fetchArte());
    return;
  }

  if (categoria === "Museu") {
    setLocaisCategoria(fetchMuseu());
    return;
  }

  const lugares = await fetchRealPlaces(region.latitude, region.longitude, categoria);

  if (lugares.length === 0) {
    Alert.alert("Nenhum local encontrado", "Não há locais próximos para esta categoria.");
  }

  setLocaisCategoria(lugares);
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
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Olá, Fulano!</Text>
          <Text style={styles.headerSubText}>Onde vamos conhecer hoje?</Text>
        </View>

        <View>
          <SearchBar 
            onPlaceSelected={(lat, lng) => {
              setRegion({
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              });

              setLocalBusca({
                nome: "Resultado da busca",
                latitude: lat,
                longitude: lng
              });
            }}
          />

        </View>

      <View style={{ flex: 1 }}>
        {/* Mapa */}
        <CustomMap
          region={region}
          locaisCategoria={locaisCategoria}
          localBusca={localBusca}
          categoria={categoriaSelecionada}
        />


        {/* Categorias sobre o mapa */}
        <View style={styles.categoryOverlay}>
          <CategoryList
            categorias={['Restaurantes', 'Bares', 'Teatros', 'Arte', 'Museu']}
            categoriaSelecionada={categoriaSelecionada}
            onSelecionar={handleCategoriaSelecionada}
          />
          <ButtonMap
            onPress={async () => {
              try {
                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;
                setRegion({
                  latitude,
                  longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                });
                
              } catch (error) {
                Alert.alert('Erro', 'Não foi possível obter a localização atual.');
              }
            }}
          />

        </View>
      </View>


        {/* Melhores Avaliados
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
        </View> */}  
    </SafeAreaView>
  );
}
