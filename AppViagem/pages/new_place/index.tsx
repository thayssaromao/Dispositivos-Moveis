import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  TextInput,
  ScrollView, 
  SafeAreaView, 
  Platform,
  Alert // Importante para dar feedback ao utilizador
} from 'react-native';
import styles from './style';
import { Input } from '../../components/input'; 

// IMPORTS DO FIREBASE
import { db } from '../../services/firebaseConfig'; // Ajuste o caminho se necessário
import { collection, addDoc } from 'firebase/firestore';

export default function NovoLugar() {
  // 1. CRIAR ESTADOS PARA CADA CAMPO
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cidade, setCidade] = useState('');
  const [descricao, setDescricao] = useState('');
  
  // Estado para controlar o carregamento (loading)
  const [loading, setLoading] = useState(false);

  // 2. FUNÇÃO PARA SALVAR NO BANCO
  async function handleSubmit() {
    // Validação simples
    if (nome === '' || categoria === '') {
      Alert.alert("Atenção", "Por favor, preencha pelo menos o nome e a categoria.");
      return;
    }

    setLoading(true);

    try {
      // Cria um objeto com os dados
      const novoLocal = {
        nome: nome,
        categoria: categoria,
        endereco: endereco,
        cidade: cidade,
        descricao: descricao,
        // Dados adicionais úteis
        dataCriacao: new Date().toISOString(),
        status: 'Aberto' // Valor padrão
      };

      // ENVIA PARA O FIREBASE (Coleção 'locais')
      const docRef = await addDoc(collection(db, "locais"), novoLocal);

      console.log("Documento salvo com ID: ", docRef.id);
      Alert.alert("Sucesso", "Local cadastrado com sucesso!");

      // Limpar os campos após salvar
      setNome('');
      setCategoria('');
      setEndereco('');
      setCidade('');
      setDescricao('');

    } catch (error) {
      console.error("Erro ao adicionar documento: ", error);
      Alert.alert("Erro", "Não foi possível salvar o local. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Text style={styles.pageTitle}>Adicione um lugar</Text>

        <View style={styles.formContainer}>
          {/* 3. LIGAR OS INPUTS AOS ESTADOS */}
          <Input 
            placeholder="Nome do Lugar"
            value={nome}
            onChangeText={setNome}
          />
          <Input 
            placeholder="Categoria (ex: Restaurante, Museu)"
            value={categoria}
            onChangeText={setCategoria}
          />
          <Input 
            placeholder="Endereço (Rua, Número)"
            value={endereco}
            onChangeText={setEndereco}
          />
          <Input 
            placeholder="Cidade (Cidade, UF)"
            value={cidade}
            onChangeText={setCidade}
          />

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrição do local"
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={4}
            value={descricao}
            onChangeText={setDescricao}
          />

          <TouchableOpacity 
            style={[styles.submitButton, { opacity: loading ? 0.6 : 1 }]} 
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.submitButtonText}>
              {loading ? "Enviando..." : "Enviar"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}