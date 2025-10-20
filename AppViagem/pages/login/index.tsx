import React from "react";
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

export default function Login() {

  const navigation = useNavigation<NavigationProp>();

  function handleNavigateToSignUp() {
    navigation.navigate('Sign'); 
  }

  function handleLogin() {
    //temporario
    navigation.navigate('Home');
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
        />

        <Input 
          placeholder="Escreva sua senha"
          secureTextEntry 
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
