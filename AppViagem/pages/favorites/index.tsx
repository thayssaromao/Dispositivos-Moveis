import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView,
  Image,
  TouchableOpacity,
  Platform 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style'; 

// Dados Mockados simulando o banco de dados
const mockFavoritos = [
  { 
    id: '1', 
    nome: 'Brise Bar', 
    categoria: 'Bares e Pubs', 
    nota: 4.5, 
    status: 'Aberto agora', 
    imagem: 'https://via.placeholder.com/100' 
  },
  { 
    id: '2', 
    nome: 'Museu de Arte', 
    categoria: 'Cultura', 
    nota: 4.8, 
    status: 'Fechado', 
    imagem: 'https://via.placeholder.com/100' 
  },
  { 
    id: '3', 
    nome: 'Parque Central', 
    categoria: 'Lazer', 
    nota: 4.7, 
    status: 'Aberto agora', 
    imagem: 'https://via.placeholder.com/100' 
  },
];

export default function Favoritos() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        
        {/* Barra de Filtro (Visual) */}
        <View style={styles.filterContainer}>
           <Text style={styles.resultText}>{mockFavoritos.length} Lugares salvos</Text>
           <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Filtrar</Text>
              <Ionicons name="filter" size={16} color="#333" />
           </TouchableOpacity>
        </View>

        {/* Lista de Cards */}
        <View style={styles.listContainer}>
          {mockFavoritos.map(item => (
            <TouchableOpacity key={item.id} style={styles.card}>
              
              {/* Imagem do Card */}
              <Image source={{ uri: item.imagem }} style={styles.cardImage} />
              
              {/* Informações */}
              <View style={styles.cardInfo}>
                {/* Linha 1: Título */}
                <Text style={styles.cardTitle}>{item.nome}</Text>
                
                {/* Linha 2: Nota e Categoria */}
                <View style={styles.rowInfo}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{item.nota}</Text>
                  <Text style={styles.dotSeparator}>•</Text>
                  <Text style={styles.categoryText}>{item.categoria}</Text>
                </View>

                {/* Linha 3: Status */}
                <Text style={[
                  styles.statusText, 
                  item.status === 'Fechado' ? styles.statusClosed : styles.statusOpen
                ]}>
                  {item.status}
                </Text>
              </View>

              {/* Ícone de Coração (Favoritado) */}
              <View style={styles.heartIcon}>
                <Ionicons name="heart" size={20} color="red" />
              </View>

            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}