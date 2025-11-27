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
import { collection, getDocs, query, where } from 'firebase/firestore';

const { width } = Dimensions.get('window');

export default function Relatorios() {
  const [loading, setLoading] = useState(true);
  
  // Estados para os Relatórios GERAIS
  const [totalLocais, setTotalLocais] = useState(0);
  const [meusLocais, setMeusLocais] = useState(0);
  const [statsCategoria, setStatsCategoria] = useState<any[]>([]);

  // NOVO: Estado para Relatório de FAVORITOS
  const [statsFavoritos, setStatsFavoritos] = useState<any[]>([]);
  const [totalFavoritos, setTotalFavoritos] = useState(0);

  useEffect(() => {
    async function fetchDadosRelatorios() {
      try {
        const userId = auth.currentUser?.uid;

        
        const querySnapshot = await getDocs(collection(db, "locais"));
        const listaLocais = querySnapshot.docs.map(doc => doc.data());

        const total = listaLocais.length;
        const meus = listaLocais.filter((l: any) => l.usuarioId === userId).length;

        setTotalLocais(total);
        setMeusLocais(meus);

        // Distribuição Geral
        const contagemGeral: Record<string, number> = {};
        listaLocais.forEach((local: any) => {
          const cat = local.categoria ? local.categoria.trim() : 'Outros';
          contagemGeral[cat] = (contagemGeral[cat] || 0) + 1;
        });

        const arrayGeral = Object.keys(contagemGeral).map(key => ({
          categoria: key,
          quantidade: contagemGeral[key],
          porcentagem: (contagemGeral[key] / total) * 100
        })).sort((a, b) => b.quantidade - a.quantidade);

        setStatsCategoria(arrayGeral);

  
        if (userId) {
            // Busca apenas os favoritos do usuário
            const qFav = query(collection(db, "favoritos"), where("usuarioId", "==", userId));
            const snapFav = await getDocs(qFav);
            const listaFavoritos = snapFav.docs.map(doc => doc.data());
            const totalFav = listaFavoritos.length;
            setTotalFavoritos(totalFav);

            if (totalFav > 0) {
                const contagemFav: Record<string, number> = {};
                listaFavoritos.forEach((item: any) => {
                    // Aproveitamos que salvamos a categoria dentro do documento de favorito
                    const cat = item.categoria ? item.categoria.trim() : 'Outros';
                    contagemFav[cat] = (contagemFav[cat] || 0) + 1;
                });

                const arrayFav = Object.keys(contagemFav).map(key => ({
                    categoria: key,
                    quantidade: contagemFav[key],
                    porcentagem: (contagemFav[key] / totalFav) * 100
                })).sort((a, b) => b.quantidade - a.quantidade);

                setStatsFavoritos(arrayFav);
            } else {
                setStatsFavoritos([]);
            }
        }

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
        <ActivityIndicator size="large" color="#FF8C00" />
        <Text style={{marginTop: 10}}>Calculando estatísticas...</Text>
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
        </View>

        {/* RELATÓRIO 2: favoritos por categoria */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="heart" size={24} color="#e9471eff" /> 
            <Text style={styles.cardTitle}>Minhas Preferências (Favoritos)</Text>
          </View>

          {statsFavoritos.length > 0 ? (
              statsFavoritos.map((item, index) => (
                <View key={index} style={styles.barContainer}>
                  <View style={styles.barLabelRow}>
                    <Text style={styles.barLabel}>{item.categoria}</Text>
                    <Text style={styles.barValue}>{item.quantidade} ({item.porcentagem.toFixed(0)}%)</Text>
                  </View>
                  <View style={styles.progressBarBackground}>
                    <View 
                      style={[
                        styles.progressBarFill, 
                        { width: `${item.porcentagem}%`, backgroundColor: '#e9471eff' } 
                      ]} 
                    />
                  </View>
                </View>
              ))
          ) : (
            <Text style={{textAlign: 'center', color: '#999', fontStyle: 'italic'}}>
                Você ainda não favoritou nenhum local.
            </Text>
          )}

          {totalFavoritos > 0 && (
             <Text style={styles.footerText}>Baseado em seus {totalFavoritos} locais favoritados.</Text>
          )}
        </View>

        {/* RELATÓRIO 3: Distribuição Geral do App */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="pie-chart" size={24} color="#4A90E2" />
            <Text style={styles.cardTitle}>O que tem no App? (Geral)</Text>
          </View>

          {statsCategoria.map((item, index) => (
            <View key={index} style={styles.barContainer}>
              <View style={styles.barLabelRow}>
                <Text style={styles.barLabel}>{item.categoria}</Text>
                <Text style={styles.barValue}>{item.quantidade} ({item.porcentagem.toFixed(0)}%)</Text>
              </View>
              <View style={styles.progressBarBackground}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { width: `${item.porcentagem}%`, backgroundColor: '#4A90E2' } 
                  ]} 
                />
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}