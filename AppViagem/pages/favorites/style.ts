import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5', 
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  // Barra de Filtros
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  resultText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20, 
    borderWidth: 1,
    borderColor: '#E0E0E0',
    gap: 5
  },
  filterText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  
  // Lista
  listContainer: {
    paddingBottom: 20,
  },

  // Card Design
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#eee', 
  },
  cardInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
    gap: 4, 
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  rowInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 4,
  },
  dotSeparator: {
    fontSize: 12,
    color: '#999',
    marginHorizontal: 6,
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statusOpen: {
    color: '#28A745', 
  },
  statusClosed: {
    color: '#DC3545', 
  },
  heartIcon: {
    padding: 5,
    alignSelf: 'flex-start', 
  }
});

export default styles;