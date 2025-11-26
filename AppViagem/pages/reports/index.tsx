import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  ActivityIndicator,
  Dimensions 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './style';

// Firebase
import { db, auth } from '../../services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const { width } = Dimensions.get('window');

export default function Reports() {
  const [loading, setLoading] = useState(true);
  
  // Estados para os Relatórios
  const [totalLocais, setTotalLocais] = useState(0);
  const [meusLocais, setMeusLocais] = useState(0);
  const [statsCategoria, setStatsCategoria] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDadosRelatorios() {
      try {
        // Busca TODOS os locais do banco
        const querySnapshot = await getDocs(collection(db, "locais"));
        const listaLocais = querySnapshot.docs.map(doc => doc.data());

        // --- RELATÓRIO 1: Quantidade Geral ---
        const total = listaLocais.length;
        const meus = listaLocais.filter((l: any) => l.usuarioId === auth.currentUser?.uid).length;

        setTotalLocais(total);
        setMeusLocais(meus);

        // --- RELATÓRIO 2: Por Categoria ---
        // 1. Conta quantos tem de cada categoria
        const contagem: Record<string, number> = {};
        listaLocais.forEach((local: any) => {
          // Normaliza o texto (Ex: "Museu" e "museu" viram a mesma coisa)
          const cat = local.categoria ? local.categoria.trim() : 'Outros';
          contagem[cat] = (contagem[cat] || 0) + 1;
        });

        // 2. Transforma em array para exibir e calcula porcentagem
        const arrayStats = Object.keys(contagem).map(key => ({
          categoria: key,
          quantidade: contagem[key],
          porcentagem: (contagem[key] / total) * 100
        }));

        // 3. Ordena do maior para o menor
        arrayStats.sort((a, b) => b.quantidade - a.quantidade);

        setStatsCategoria(arrayStats);

      } catch (error) {
        console.log("Erro ao gerar relatórios:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDadosRelatorios();
  }, []);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#F17300" />
        <Text style={{marginTop: 10}}>Gerando gráficos...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        
        <Text style={styles.pageTitle}>Painel de Estatísticas</Text>

        {/* RELATÓRIO 1: Engajamento Geral */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="stats-chart" size={24} color="#FF8C00" />
            <Text style={styles.cardTitle}>Contribuição da Comunidade</Text>
          </View>
          
          <View style={styles.rowStats}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{totalLocais}</Text>
              <Text style={styles.statLabel}>Locais Totais</Text>
            </View>
            <View style={[styles.statItem, styles.statBorder]}>
              <Text style={styles.statNumber}>{meusLocais}</Text>
              <Text style={styles.statLabel}>Cadastrados por Mim</Text>
            </View>
          </View>
          
          <Text style={styles.footerText}>
            Você contribuiu com {totalLocais > 0 ? ((meusLocais/totalLocais)*100).toFixed(0) : 0}% do conteúdo do app!
          </Text>
        </View>

        {/* RELATÓRIO 2: Distribuição por Categoria */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="pie-chart" size={24} color="#F17300" />
            <Text style={styles.cardTitle}>Locais por Categoria</Text>
          </View>

          {statsCategoria.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barLabelRow}>
                <Text style={styles.barLabel}>{item.categoria}</Text>
                <Text style={styles.barValue}>{item.quantidade} locais ({item.porcentagem.toFixed(0)}%)</Text>
              </View>
              {/* Barra de Progresso Visual */}
              <View style={styles.progressBarBackground}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { width: `${item.porcentagem}%` } // A mágica da largura dinâmica
                  ]} 
                />
              </View>
            </View>
          ))}
          
          {statsCategoria.length === 0 && (
            <Text style={{textAlign: 'center', color: '#999'}}>Nenhum dado disponível.</Text>
          )}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}