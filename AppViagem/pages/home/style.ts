import { StyleSheet, Platform, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#81A4CD',
  },
  
  // Cabeçalho
  headerContainer: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    backgroundColor: '#81A4CD', 
    zIndex: 10, // Garante que fique acima do mapa
  },
  greetingTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  greetingSub: {
    fontSize: 18,
    color: '#555',
    marginBottom: 15,
  },

  // Barra de Busca
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 20,
    borderRadius: 16,
    paddingHorizontal: 15,
    height: 50,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },

  // Categorias
  categoriesContainer: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    alignItems: 'center',
    zIndex: 10,
  },
  categoryBtn: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    height: 36,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent'
  },
  categoryBtnActive: {
    backgroundColor: '#FF8C00', 
    borderColor: '#FF8C00'
  },
  categoryText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 14,
  },
  categoryTextActive: {
    color: '#fff',
  },

  // --- MAPA E CAMADAS FLUTUANTES ---
  
  // O Container do Mapa ocupa o espaço restante
  mapContainer: {
    flex: 1, 
    position: 'relative', // Importante para posicionar botões dentro dele
  },

  // Botão de Centralizar (Flutuante)
  recenterButtonContainer: {
    position: 'absolute',
    right: 20,
    bottom: 160, // Fica acima da lista de cards
    backgroundColor: '#fff',
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  // Lista Inferior (Carrossel Flutuante)
  bottomListContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    height: 130, // Altura reservada para os cards
  },
  emptyCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 20,
    borderRadius: 15,
    marginHorizontal: 20,
    alignItems: 'center',
    
  },

  // Estilo do Card Individual
  cardLocal: {
    backgroundColor: '#fff',
    width: width * 0.75, // Ocupa 75% da largura
    height: 120,
    borderRadius: 15,
    padding: 10,
    marginRight: 15, 
    flexDirection: 'row',
    // Sombras
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2}
  },
  cardImage: {
    width: 90,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  cardInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
    gap: 4
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardCategory: {
    fontSize: 12,
    color: '#777',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardDesc: {
    fontSize: 12,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
    color: '#333',
  },
});

export default styles;