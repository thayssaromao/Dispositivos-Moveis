import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style'; 
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../navigationTypes';

export default function Perfil() {
  const navigation = useNavigation<NavigationProp>();

  function handleNavigateToFavoritos() {
    navigation.navigate('Favorites');
  }
  function handleNavigateToQueroVisitar() {
    navigation.navigate('ToVisit');
  }
  function handleNavigateToJaVisitados() {
    navigation.navigate('Visited');
  }
  function handleNavigateToMeusDados() {
    
  }

  return (
    
    <SafeAreaView style={styles.container}>
      
      {/* 1. Cabeçalho do Perfil */}
      <View style={styles.profileHeader}>
        <Ionicons name="person-circle-outline" size={64} color="#c0c0c0" />
        <Text style={styles.profileName}>Nome de Fulano</Text>
      </View>

      {/* 2. Card com a lista de opções */}
      <View style={styles.listCard}>

        {/* Item 1: Favoritos */}

        <TouchableOpacity style={styles.listItem} onPress={handleNavigateToMeusDados}>
          <Text style={styles.listText}>Minhas Informações</Text>
          <Ionicons name="person" size={24} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.listItem} onPress={handleNavigateToFavoritos}>
          <Text style={styles.listText}>Favoritos</Text>
          <Ionicons name="heart" size={24} color="#333" />
        </TouchableOpacity>

        {/* Item 2: Quero Visitar */}
        <TouchableOpacity style={styles.listItem} onPress={handleNavigateToQueroVisitar}>
          <Text style={styles.listText}>Quero Visitar</Text>
          <Ionicons name="flag" size={24} color="#333" />
        </TouchableOpacity>

        {/* Item 3: Já Visitados */}
        <TouchableOpacity style={styles.listItem} onPress={handleNavigateToJaVisitados}>
          <Text style={styles.listText}>Já Visitados</Text>
          <Ionicons name="checkmark-circle" size={24} color="#333" />
        </TouchableOpacity>

        {/* Item 4: Adicionados */}
        <TouchableOpacity style={[styles.listItem, styles.lastListItem]}>
          <Text style={styles.listText}>Adicionados</Text>
          <Ionicons name="add-circle" size={24} color="#333" />
        </TouchableOpacity>

        
      </View>

    </SafeAreaView>
  );
}