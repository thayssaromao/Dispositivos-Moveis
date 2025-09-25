import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import styles from "./style";

export default function SignIn() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Crie sua Conta!</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Nome de Usuário"
          placeholderTextColor="#999"
        />

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

        <TouchableOpacity style={styles.registerBtn}>
          <Text style={styles.registerText}>Registrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}