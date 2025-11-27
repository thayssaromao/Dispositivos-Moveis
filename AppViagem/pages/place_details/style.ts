import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 250,
    backgroundColor: '#eee',
  },
  content: {
    padding: 20,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: -20, // Efeito de sobreposição na imagem
    backgroundColor: '#fff',
  },
  category: {
    color: '#FF8C00',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginLeft: 5,
  },
  dot: {
    marginHorizontal: 8,
    color: '#999',
  },
  statusOpen: {
    color: '#28A745',
    fontWeight: 'bold',
  },
  
  // Botões de Ação
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionBtn: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e6e6e6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  activeIconCircle: {
    backgroundColor: '#F17300', // Cor quando ativado
    color:'#fff',
  },
  actionLabel: {
    fontSize: 12,
    color: '#666',
  },

  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
  },
  
  extraInfo: {
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    color: '#555',
    fontSize: 14,
  },

  ratingSection: {
    alignItems: 'center',
    marginVertical: 10,
  },
  ratingSubtitle: {
    fontSize: 14,
    color: '#777',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  ratingFeedback: {
    marginTop: 5,
    fontSize: 14,
    color: '#FF8C00', // Laranja
    fontWeight: 'bold',
  },
});

export default styles;