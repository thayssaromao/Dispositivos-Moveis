import React from "react";
import { useState } from "react";
import { 
  Text, 
  View, 
  TouchableOpacity, 
  StyleSheet,

} from "react-native";
import styles from "./style";
import { Input } from '../../components/input'; 
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '../../navigationTypes';

import { auth } from "../../services/firebaseConfig"; 
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {

  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleNavigateToSignUp() {
    navigation.navigate('Sign'); 
  }

    //para rodar no simulador use essa funcao sem conexao com firebase

  // function handleLogin() {
  //   //temporario
  //   navigation.navigate('Home');
  // }


  // exemplo de login valido -> email:teste2@gmail.com senha:123456
  // Esse handle apenas funciona quando builda no dispositivo real, no emulador ocorre erro de conexao com o firebase
  async function handleLogin() {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.navigate('Home');
    } catch (error) {
      console.log("Erro ao logar:", error);
      alert("Email ou senha incorretos!");
    }
  }
  
  return (
    <View style={styles.container}>
    
      <View style={styles.card}>
        <View style={styles.titleContainer}> 
          <Text style={styles.title}>Bem Vindo ao{"\n"}Trip to Go!</Text>
        </View>

        <Input 
          placeholder='Escreva seu email'
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

        <TouchableOpacity style={styles.googleBtn}>
          <Text style={styles.googleText}>G Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Não tem uma conta? <Text style={styles.registerLink} onPress={handleNavigateToSignUp}>Crie aqui!</Text>
        </Text>
      </View>
    </View>
  );
}
