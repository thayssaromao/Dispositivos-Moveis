import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#81A4CD', // Fundo levemente cinza azulado
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000ff',
    marginBottom: 20,
    padding: 10,
  },
  
  // Estilo Geral dos Cards
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    marginLeft: 15,
    marginRight: 15,
    // Sombras
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
    gap: 10
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },

  // Relatório 1: Números Grandes
  rowStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statBorder: {
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  footerText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },

  // Relatório 2: Barras
  barContainer: {
    marginBottom: 15,
  },
  barLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  barLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
  },
  barValue: {
    fontSize: 12,
    color: '#888',
  },
  progressBarBackground: {
    height: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#F17300', // Azul bonito
    borderRadius: 5,
  },
});

export default styles;