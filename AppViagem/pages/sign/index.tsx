import React from 'react';
import { useState } from 'react';
import { auth } from '../../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { 
  Text, 
  View, 
  TouchableOpacity, 
} from 'react-native';

import { ImageBackground } from 'react-native';

import { updateProfile } from "firebase/auth";

import styles from './style';
import { Input } from '../../components/input'; 
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../navigationTypes';

export default function Sign() {
  
  const navigation = useNavigation<NavigationProp>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNavigateToLogin() {
    navigation.goBack(); 
  }

  
  // function handleRegister() {
  //   navigation.navigate('Home');
  // }

  async function handleRegister() {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    await updateProfile(user, {
      displayName: name,
    });

    console.log("Usuário registrado com sucesso!");
    console.log("Nome salvo no Firebase:", name);
    
    navigation.navigate('Home');
  } catch (error: any) {
    console.log("Erro ao registrar:", error);
    if (error.code === 'auth/email-already-in-use') {
      alert("Este email já está em uso!");
    } else if (error.code === 'auth/invalid-email') {
      alert("Email inválido!");
    } else if (error.code === 'auth/weak-password') {
      alert("Senha muito fraca! Use pelo menos 6 caracteres.");
    } else {
      alert("Erro ao registrar: " + error.message);
    }
  }
}

  return (
    <ImageBackground 
      source={require('../../assets/imgs/bg.png')} 
      style={styles.container}
      resizeMode="cover"
    >

      <View style={styles.card}>
        <View style={styles.titleContainer}> 
          <Text style={styles.title}>Crie sua Conta!</Text>
        </View>

        <Input 
          placeholder="Nome de Usuário"
          value={name}
          onChangeText={setName}
        />

        <Input 
          placeholder="Escreva seu email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <Input 
          placeholder="Escreva sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* <TouchableOpacity style={styles.googleBtn}>
          <Text style={styles.googleText}>G Google</Text>
        </TouchableOpacity> */}

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
    </ImageBackground>
  );
}