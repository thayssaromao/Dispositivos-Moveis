import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity,
  TextInput,
  ScrollView, 
  SafeAreaView,
  Platform
} from 'react-native';
import styles from './style'; 

import { Input } from '../../components/input'; 

export default function NovoLugar() {

  function handleSubmit() {
   
    console.log('Enviando novo local...');
    
  }

  return (
  
    <SafeAreaView style={styles.container}>
  
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        
        <Text style={styles.pageTitle}>Adicione um lugar</Text>

        {/* 2. Formulário */}
        <View style={styles.formContainer}>
          <Input 
            placeholder="Nome do Lugar"
          />
          <Input 
            placeholder="Categoria (ex: Restaurante, Museu)"
          />
          <Input 
            placeholder="Endereço (Rua, Número)"
          />
          <Input 
            placeholder="Endereço (Cidade, Estado)"
          />

          
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descrição do local"
            placeholderTextColor="#999"
            multiline={true}
            numberOfLines={4}
          />

          {/* 3. Botão Enviar */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}