import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NavigationProp } from '../../navigationTypes';
import styles from './style'; 

// Firebase
import { db, auth } from '../../services/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function QueroVisitar() {
  const navigation = useNavigation<NavigationProp>();
  
  const [listaQueroVisitar, setListaQueroVisitar] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Função de busca
  async function fetchQueroVisitar() {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // BUSCA NA COLEÇÃO 'quero_visitar'
      const q = query(
        collection(db, "quero_visitar"), 
        where("usuarioId", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      
      const lista = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: data.localId, // Mapeamos o ID do local corretamente para a navegação
          ...data
        };
      });

      setListaQueroVisitar(lista);
    } catch (error) {
      console.log("Erro ao buscar lista quero visitar:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // Atualiza a lista toda vez que a tela ganha foco
  useFocusEffect(
    useCallback(() => {
      fetchQueroVisitar();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchQueroVisitar();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
           <ActivityIndicator size="large" color="#FF8C00" />
        </View>
      ) : (
        <ScrollView 
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          
          <View style={styles.filterContainer}>
             <Text style={styles.resultText}>
                {listaQueroVisitar.length} {listaQueroVisitar.length === 1 ? 'Local na lista' : 'Locais na lista'}
             </Text>
             <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Filtrar</Text>
                <Ionicons name="filter" size={16} color="#333" />
             </TouchableOpacity>
          </View>

          {/* Estado Vazio */}
          {listaQueroVisitar.length === 0 && (
             <View style={{alignItems: 'center', marginTop: 50}}>
                <Ionicons name="flag-outline" size={50} color="#ccc" />
                <Text style={{color: '#999', marginTop: 10}}>Sua lista de desejos está vazia.</Text>
             </View>
          )}

          {/* Lista de Cards */}
          <View style={styles.listContainer}>
            {listaQueroVisitar.map(item => (
              <TouchableOpacity 
                key={item.id} 
                style={styles.card}
                onPress={() => {
                  // Navega para Detalhes
                  navigation.navigate('PlaceDetail', { local: item });
                }}
              >
                
                <Image 
                  source={{ uri: item.imagem || 'https://via.placeholder.com/150' }} 
                  style={styles.cardImage} 
                />
                
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.nome}</Text>
                  
                  <View style={styles.rowInfo}>
                    <Ionicons name="star" size={14} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.nota || 4.5}</Text>
                    <Text style={styles.dotSeparator}>•</Text>
                    <Text style={styles.categoryText}>{item.categoria}</Text>
                  </View>

                  <Text style={[
                    styles.statusText, 
                    item.status === 'Fechado' ? styles.statusClosed : styles.statusOpen
                  ]}>
                    {item.status || 'Aberto'}
                  </Text>
                </View>

                {/* Ícone de Bandeira (Diferente dos Favoritos) */}
                <View style={styles.iconContainer}>
                  <Ionicons name="flag" size={20} color="#333" />
                </View>

              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>
      )}
    </SafeAreaView>
  );
}