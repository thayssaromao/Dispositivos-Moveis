import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  ActivityIndicator, // Para mostrar carregando
  RefreshControl // Para puxar pra baixo e atualizar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style'; // Usaremos o mesmo estilo das outras

// Imports do Firebase
import { db, auth } from '../../services/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Added() {
  const [locais, setLocais] = useState<any[]>([]); // Estado para guardar a lista
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Função que busca os dados no Banco
  async function fetchLocais() {
    // Pega o usuário atual
    const user = auth.currentUser;
    
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // 1. Cria a query: "Vá em 'locais' ONDE 'usuarioId' seja igual ao MEU ID"
      const q = query(
        collection(db, "locais"), 
        where("usuarioId", "==", user.uid)
      );

      // 2. Executa a busca
      const querySnapshot = await getDocs(q);
      
      // 3. Formata os dados para nossa lista
      const listaFormatada = querySnapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        };
      });

      setLocais(listaFormatada);
    } catch (error) {
      console.log("Erro ao buscar locais:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  // Busca os dados quando a tela abre
  useEffect(() => {
    fetchLocais();
  }, []);

  // Função para recarregar ao puxar a tela pra baixo
  const onRefresh = () => {
    setRefreshing(true);
    fetchLocais();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {loading ? (
        // Mostra um spinner enquanto carrega
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#333" />
        </View>
      ) : (
        <ScrollView 
          style={styles.container}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          
          <View style={styles.filterContainer}>
             <Text style={styles.resultText}>{locais.length} Lugares adicionados</Text>
          </View>

          {/* Se a lista estiver vazia */}
          {locais.length === 0 && (
            <View style={{ alignItems: 'center', marginTop: 50 }}>
              <Text style={{ color: '#999' }}>Você ainda não cadastrou nenhum local.</Text>
            </View>
          )}

          {/* Lista de Cards */}
          <View style={styles.listContainer}>
            {locais.map((item) => (
              <TouchableOpacity key={item.id} style={styles.card}>
                
                {/* Imagem (Se não tiver imagem salva, usa um placeholder) */}
                <Image 
                  source={{ uri: item.imagem || 'https://via.placeholder.com/100' }} 
                  style={styles.cardImage} 
                />
                
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.nome}</Text>
                  
                  <View style={styles.rowInfo}>
                    <Text style={styles.categoryText}>{item.categoria}</Text>
                    <Text style={styles.dotSeparator}>•</Text>
                    <Text style={styles.categoryText}>{item.cidade || 'Cidade não inf.'}</Text>
                  </View>

                  <Text style={styles.statusText}>{item.status}</Text>
                </View>

                {/* Ícone de "Mais" para combinar com o menu */}
                

              </TouchableOpacity>
            ))}
          </View>

        </ScrollView>
      )}
    </SafeAreaView>
  );
}