import React from "react";
import { 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import styles from "./style";


export default function Login() {
  return (
    <View style={styles.container}>
    
      <View style={styles.card}>
        <View style={styles.titleContainer}> 
          <Text style={styles.title}>Bem Vindo ao{"\n"}Trip to Go!</Text>
        </View>

        <TextInput 
          style={styles.input}
          placeholder="Escreva seu email"
          placeholderTextColor="#999"
        />

        <TextInput 
          style={styles.input}
          placeholder="Escreva sua senha"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity style={styles.googleBtn}>
          <Text style={styles.googleText}>G Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.registerText}>
          Não tem uma conta? <Text style={styles.registerLink}>Crie aqui!</Text>
        </Text>
      </View>
    </View>
  );
}
