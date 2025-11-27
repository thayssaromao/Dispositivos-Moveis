import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigationTypes';
import styles from './style';
import { LocalType } from '../../navigationTypes';
import { db, auth } from '../../services/firebaseConfig';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  query, 
  where, 
  getDocs, 
  doc,
  setDoc,
  getDoc 
} from 'firebase/firestore';

type DetalhesScreenRouteProp = RouteProp<RootStackParamList, 'PlaceDetail'>;

export default function PlaceDetails() {
  const route = useRoute<DetalhesScreenRouteProp>();
  // 1. Recebemos o parâmetro inicial (que pode estar incompleto se vier dos Favoritos)
  const { local: paramsLocal } = route.params; 
  
  // 2. Criamos um estado para os dados finais que usaremos na tela
  const [local, setLocal] = useState(paramsLocal);
  const [loadingData, setLoadingData] = useState(false);

  const user = auth.currentUser;

  // Estados dos Botões
  const [isFavorito, setIsFavorito] = useState(false);
  const [isQueroVisitar, setIsQueroVisitar] = useState(false);
  const [isJaVisitado, setIsJaVisitado] = useState(false);
  
  const [docIdFavorito, setDocIdFavorito] = useState<string | null>(null);
  const [docIdQuero, setDocIdQuero] = useState<string | null>(null);
  const [docIdVisitado, setDocIdVisitado] = useState<string | null>(null);

  const [userRating, setUserRating] = useState(0); 
  const [mediaNota, setMediaNota] = useState(0);
  const [totalAvaliacoes, setTotalAvaliacoes] = useState(0);

  // 3. EFEITO PARA BUSCAR DADOS COMPLETOS SE NECESSÁRIO
  useEffect(() => {
    async function carregarDadosCompletos() {
      // Se o objeto não tiver latitude ou descrição, significa que é um "resumo"
      if (local.latitude === undefined || !local.descricao) {
        setLoadingData(true);
        try {
          const docRef = doc(db, "locais", local.id);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            // Atualiza o estado com os dados completos do banco + ID
            setLocal({ id: docSnap.id, ...docSnap.data() } as LocalType);
          }
        } catch (error) {
          console.log("Erro ao buscar detalhes completos:", error);
        } finally {
          setLoadingData(false);
        }
      }
    }

    carregarDadosCompletos();
  }, []);

  useEffect(() => {
    async function checkStatus() {
      if (!user) return;
      try {
        await checkCollection('favoritos', setIsFavorito, setDocIdFavorito);
        await checkCollection('quero_visitar', setIsQueroVisitar, setDocIdQuero);
        await checkCollection('ja_visitados', setIsJaVisitado, setDocIdVisitado);
        await checkUserRating(); 
        await fetchMediaGeral();
      } catch (e) {
        console.log("Erro ao checar status", e);
      }
    }
    checkStatus();
  }, [local]); 


  async function checkCollection(collectionName: string, setStatus: Function, setId: Function) {
    const q = query(collection(db, collectionName), where("usuarioId", "==", user?.uid), where("localId", "==", local.id));
    const snapshot = await getDocs(q);
    if (!snapshot.empty) { setStatus(true); setId(snapshot.docs[0].id); }
  }

  async function checkUserRating() {
    if(!user) return;
    const ratingDocId = `${user.uid}_${local.id}`;
    const docRef = doc(db, "avaliacoes", ratingDocId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) { setUserRating(docSnap.data().nota); }
  }

  async function fetchMediaGeral() {
    try {
      const q = query(collection(db, "avaliacoes"), where("localId", "==", local.id));
      const snapshot = await getDocs(q);
      const totalDocs = snapshot.size;
      if (totalDocs > 0) {
        let somaNotas = 0;
        snapshot.forEach(doc => { somaNotas += doc.data().nota; });
        setMediaNota(somaNotas / totalDocs);
        setTotalAvaliacoes(totalDocs);
      } else {
        setMediaNota(0); setTotalAvaliacoes(0);
      }
    } catch (error) { console.log(error); }
  }

  async function handleToggle(collectionName: string, isActive: boolean, setIsActive: Function, docId: string | null, setDocId: Function) {
     if (!user) { Alert.alert("Login necessário", "Logue para salvar."); return; }
     setIsActive(!isActive);
     try {
        if (isActive && docId) {
            await deleteDoc(doc(db, collectionName, docId)); setDocId(null);
        } else {
            // Agora salvamos tudo o que temos no 'local' atual
            const docRef = await addDoc(collection(db, collectionName), {
                usuarioId: user.uid, 
                localId: local.id, 
                nome: local.nome, 
                categoria: local.categoria, 
                imagem: local.imagem || '', 
                // Tenta salvar latitude/longitude se tiver
                ...(local.latitude && { latitude: local.latitude }),
                ...(local.longitude && { longitude: local.longitude }),
                status: 'Aberto'
            }); setDocId(docRef.id);
        }
     } catch (e) { console.log(e); setIsActive(isActive); }
  }

  async function handleRate(stars: number) {
    if (!user) { Alert.alert("Atenção", "Logue para avaliar."); return; }
    setUserRating(stars);
    try {
        const ratingDocId = `${user.uid}_${local.id}`;
        await setDoc(doc(db, "avaliacoes", ratingDocId), {
            usuarioId: user.uid, localId: local.id, nota: stars, data: new Date().toISOString()
        });
        await fetchMediaGeral(); 
    } catch (error) { console.log(error); }
  }

  const RenderStars = () => (
    <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRate(star)}>
                <Ionicons name={star <= userRating ? "star" : "star-outline"} size={32} color="#FFD700" style={{ marginHorizontal: 5 }} />
            </TouchableOpacity>
        ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        
        <Image source={{ uri: local.imagem || 'https://via.placeholder.com/300' }} style={styles.image} />

        {/* Loading para quando estiver buscando os dados completos */}
        {loadingData && (
            <View style={{ padding: 20, alignItems: 'center' }}>
                <ActivityIndicator size="small" color="#FF8C00" />
                <Text style={{ fontSize: 12, color: '#666' }}>Carregando detalhes...</Text>
            </View>
        )}

        <View style={styles.content}>
          <Text style={styles.category}>{local.categoria}</Text>
          <Text style={styles.title}>{local.nome}</Text>

          {/* Média */}
          <View style={styles.rowInfo}>
             <Ionicons name="star" size={18} color="#FFD700" />
             <Text style={styles.rating}>
               {totalAvaliacoes > 0 ? `${mediaNota.toFixed(1)} (${totalAvaliacoes})` : "Sem avaliações"}
             </Text>
             <Text style={styles.dot}>•</Text>
             <Text style={styles.statusOpen}>Aberto Agora</Text>
          </View>

          {/* Botões de Ação */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => handleToggle('favoritos', isFavorito, setIsFavorito, docIdFavorito, setDocIdFavorito)}>
              <View style={[styles.iconCircle, isFavorito && styles.activeIconCircle]}>
                <Ionicons name={isFavorito ? "heart" : "heart-outline"} size={24} color={isFavorito ? "#fff" : "#333"} />
              </View>
              <Text style={styles.actionLabel}>Favorito</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={() => handleToggle('quero_visitar', isQueroVisitar, setIsQueroVisitar, docIdQuero, setDocIdQuero)}>
              <View style={[styles.iconCircle, isQueroVisitar && styles.activeIconCircle]}>
                <Ionicons name={isQueroVisitar ? "flag" : "flag-outline"} size={24} color={isQueroVisitar ? "#fff" : "#333"} />
              </View>
              <Text style={styles.actionLabel}>Quero ir</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={() => handleToggle('ja_visitados', isJaVisitado, setIsJaVisitado, docIdVisitado, setDocIdVisitado)}>
              <View style={[styles.iconCircle, isJaVisitado && styles.activeIconCircle]}>
                <Ionicons name={isJaVisitado ? "checkmark-circle" : "checkmark-circle-outline"} size={24} color={isJaVisitado ? "#fff" : "#333"} />
              </View>
              <Text style={styles.actionLabel}>Visitei</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.divider} />

          {/* Avaliação */}
          <View style={styles.ratingSection}>
            <Text style={styles.sectionTitle}>Sua Avaliação</Text>
            <RenderStars />
            {userRating > 0 && <Text style={styles.ratingFeedback}>Você deu nota {userRating}!</Text>}
          </View>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>Sobre</Text>
          <Text style={styles.description}>
            {local.descricao || "Descrição indisponível."}
          </Text>

       
           <View style={styles.extraInfo}>
              <View style={styles.infoRow}>
                 <Ionicons name="location-outline" size={20} color="#666" />
                 <Text style={styles.infoText}>
                    {local.endereco 
                        ? local.endereco 
                        : (local.latitude && local.longitude 
                            ? `${local.latitude.toFixed(4)}, ${local.longitude.toFixed(4)}` 
                            : "Localização não disponível")
                    }
                 </Text>
              </View>
           </View>

        </View>
      </ScrollView>
    </View>
  );
}