import React from 'react';
import { 
  Text, 
  View, 
  TouchableOpacity, 
} from 'react-native';

import styles from './style';
import { Input } from '../../components/input'; 
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../navigationTypes';

export default function Sign() {
  
  const navigation = useNavigation<NavigationProp>();

  
  function handleNavigateToLogin() {
    navigation.goBack(); 
  }

  
  function handleRegister() {
    navigation.navigate('Home');
  }

  return (
    <View style={styles.container}>
     
      <View style={styles.card}>
        <View style={styles.titleContainer}> 
          <Text style={styles.title}>Crie sua Conta!</Text>
        </View>

        <Input 
          placeholder="Nome de Usuário"
        />

        <Input 
          placeholder="Escreva seu email"
          keyboardType="email-address"
        />

        <Input 
          placeholder="Escreva sua senha"
          secureTextEntry
        />

        <TouchableOpacity style={styles.googleBtn}>
          <Text style={styles.googleText}>G Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={handleRegister}>
          <Text style={styles.loginText}>Registrar</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Já tem uma conta? 
          <Text style={styles.registerLink} onPress={handleNavigateToLogin}>
            Entre aqui!
          </Text>
        </Text>
      </View>
    </View>
  );
}