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

// Dados Mockados (Exemplo diferente de favoritos)
const mockQueroVisitar = [
  { 
    id: '1', 
    nome: 'Cristo Redentor', 
    categoria: 'Ponto Turístico', 
    nota: 4.9, 
    status: 'Aberto agora', 
    imagem: 'https://via.placeholder.com/100' 
  },
  { 
    id: '2', 
    nome: 'Jardim Botânico', 
    categoria: 'Natureza', 
    nota: 4.7, 
    status: 'Aberto agora', 
    imagem: 'https://via.placeholder.com/100' 
  },
  { 
    id: '3', 
    nome: 'Teatro Municipal', 
    categoria: 'Cultura', 
    nota: 4.6, 
    status: 'Fechado', 
    imagem: 'https://via.placeholder.com/100' 
  },
];

export default function ToVisit() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        
        {/* Barra de Contagem/Filtro */}
        <View style={styles.filterContainer}>
           <Text style={styles.resultText}>{mockQueroVisitar.length} Lugares na lista</Text>
           <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Filtrar</Text>
              <Ionicons name="filter" size={16} color="#333" />
           </TouchableOpacity>
        </View>

        {/* Lista de Cards */}
        <View style={styles.listContainer}>
          {mockQueroVisitar.map(item => (
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

              {/* Ícone de Bandeira (Flag) para combinar com o menu */}
              <View style={styles.iconContainer}>
                <Ionicons name="flag" size={20} color="#333" />
              </View>

            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}