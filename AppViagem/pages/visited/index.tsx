import React from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView,
  Image,
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style'; 

//mock
const mockJaVisitados = [
  { 
    id: '1', 
    nome: 'Pão de Açúcar', 
    categoria: 'Ponto Turístico', 
    nota: 4.8, 
    status: 'Aberto agora', 
    imagem: 'https://via.placeholder.com/100' 
  },
  { 
    id: '2', 
    nome: 'MASP', 
    categoria: 'Cultura', 
    nota: 4.7, 
    status: 'Fechado', 
    imagem: 'https://via.placeholder.com/100' 
  },
  { 
    id: '3', 
    nome: 'Mercado Municipal', 
    categoria: 'Gastronomia', 
    nota: 4.6, 
    status: 'Aberto agora', 
    imagem: 'https://via.placeholder.com/100' 
  },
];

export default function Visited() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        
        
        <View style={styles.filterContainer}>
           <Text style={styles.resultText}>{mockJaVisitados.length} Lugares visitados</Text>
           <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Filtrar</Text>
              <Ionicons name="filter" size={16} color="#333" />
           </TouchableOpacity>
        </View>

        {/* Lista de Cards */}
        <View style={styles.listContainer}>
          {mockJaVisitados.map(item => (
            <TouchableOpacity key={item.id} style={styles.card}>
              
              <Image source={{ uri: item.imagem }} style={styles.cardImage} />
              
              <View style={styles.cardInfo}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                
                <View style={styles.rowInfo}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.ratingText}>{item.nota}</Text>
                  <Text style={styles.dotSeparator}>•</Text>
                  <Text style={styles.categoryText}>{item.categoria}</Text>
                </View>

                <Text style={[
                  styles.statusText, 
                  item.status === 'Fechado' ? styles.statusClosed : styles.statusOpen
                ]}>
                  {item.status}
                </Text>
              </View>

              <View style={styles.iconContainer}>
                <Ionicons name="checkmark-circle" size={20} color="#333" />
              </View>

            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}