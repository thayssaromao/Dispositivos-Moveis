// pages/onboarding/Onboarding.styles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    justifyContent: "space-between", // Espaçamento entre os elementos (logo, texto, botão)
    alignItems: "center",
  },
  logoContainer: {
    marginTop: 80, // Margem do topo para a logo
    alignItems: 'center',
  },
  logoImage: {
    width: 300, // Ajuste o tamanho da logo conforme necessário
    height: 300,
    resizeMode: 'contain', // Garante que a imagem se ajuste sem cortar
  },
  button: {
    backgroundColor: '#FFEB3B', // Amarelo vibrante
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 100, // Margem da parte inferior para o botão
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 50, // Margem para os pontos de paginação
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#555',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FFEB3B', // Cor do ponto ativo
  }
});

export default styles;