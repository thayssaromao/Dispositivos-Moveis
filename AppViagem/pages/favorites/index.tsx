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

export default function Favoritos() {
  const navigation = useNavigation<NavigationProp>();
  
  const [listaFavoritos, setListaFavoritos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Função que busca os dados
  async function fetchFavoritos() {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Busca apenas os favoritos DO USUÁRIO ATUAL
      const q = query(
        collection(db, "favoritos"), 
        where("usuarioId", "==", user.uid)
      );

      const querySnapshot = await getDocs(q);
      
      const lista = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Precisamos garantir que o ID do local seja passado corretamente
        // O documento de favorito tem 'localId', mas a tela de detalhes espera 'id'
        return {
          id: data.localId, // Importante: Usamos o ID do Local, não do Favorito
          ...data
        };
      });

      setListaFavoritos(lista);
    } catch (error) {
      console.log("Erro ao buscar favoritos:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // useFocusEffect garante que a lista atualize toda vez que você entrar na tela
  // (Ex: se você desfavoritar algo lá nos detalhes e voltar, a lista atualiza)
  useFocusEffect(
    useCallback(() => {
      fetchFavoritos();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchFavoritos();
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
                {listaFavoritos.length} {listaFavoritos.length === 1 ? 'Lugar salvo' : 'Lugares salvos'}
             </Text>
             {/* Botão de filtro visual (sem lógica por enquanto) */}
             <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterText}>Filtrar</Text>
                <Ionicons name="filter" size={16} color="#333" />
             </TouchableOpacity>
          </View>

          {/* Estado Vazio */}
          {listaFavoritos.length === 0 && (
             <View style={{alignItems: 'center', marginTop: 50}}>
                <Ionicons name="heart-dislike-outline" size={50} color="#ccc" />
                <Text style={{color: '#999', marginTop: 10}}>Você ainda não favoritou nenhum local.</Text>
             </View>
          )}

          {/* Lista de Cards */}
          <View style={styles.listContainer}>
            {listaFavoritos.map(item => (
              <TouchableOpacity 
                key={item.id} // ID do local
                style={styles.card}
                onPress={() => {
                  // NAVEGAÇÃO PARA A TELA 'PlaceDetails'
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

                {/* Ícone de Coração */}
                <View style={styles.heartIcon}>
                  <Ionicons name="heart" size={20} color="red" />
                </View>

              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>
      )}
    </SafeAreaView>
  );
}