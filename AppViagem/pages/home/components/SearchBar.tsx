import React, { useState } from 'react';
import { TextInput, View, ActivityIndicator, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({ onPlaceSelected }: { onPlaceSelected: (lat: number, lng: number) => void }) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const searchLocation = async () => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        query
        )}&format=json&limit=1&bounded=1&viewbox=${encodeURIComponent("-49.5,-25.7,-49.0,-25.25")}`;


      const response = await fetch(url, {
        headers: {
          "User-Agent": "ReactNativeApp/1.0", // Requisito OSM
        },
      });

      const data = await response.json();

      if (!data || data.length === 0) {
        Alert.alert("Não encontrado", "Nenhum local encontrado com esse nome.");
        setLoading(false);
        return;
      }

      const lat = parseFloat(data[0].lat);
      const lng = parseFloat(data[0].lon);

      if (isNaN(lat) || isNaN(lng)) {
        Alert.alert("Erro", "Coordenadas inválidas retornadas.");
        setLoading(false);
        return;
      }

      onPlaceSelected(lat, lng);
    } catch (error) {
      console.error("ERRO AO BUSCAR LOCAL:", error);
      Alert.alert("Erro", "Não foi possível buscar este local.");
    }

    setLoading(false);
  };

  return (
    <View style={{
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#dedadaff",
      borderRadius: 12,
      paddingHorizontal: 20,
      margin:20,
      height: 50,
      elevation: 2
    }}>
      <Ionicons name="search" size={20} color="#888" />

      <TextInput
        placeholder="Pesquise Aqui"
        style={{ flex: 1, marginLeft: 10 }}
        returnKeyType="search"
        onSubmitEditing={searchLocation}
        onChangeText={setQuery}
        value={query}
      />

      {loading ? (
        <ActivityIndicator size={20} color="#000" />
      ) : (
        <Ionicons
          name="arrow-forward-circle"
          size={24}
          color="#888"
          onPress={searchLocation}
        />
      )}
    </View>
  );
}
