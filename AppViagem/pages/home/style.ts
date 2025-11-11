import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0, 
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerSubText: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 50,
  },
  categoryOverlay: {
  position: 'absolute',
  top: 20,
  left: 0,
  right: 0,
  alignItems: 'center',
  zIndex: 10, 
  elevation: 10, 
},

  searchIcon: {
    marginRight: 10,
  },
  micIcon: {
    marginLeft: 'auto', 
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  sectionContainer: {
    marginTop: 30,
    paddingLeft: 20, 
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitleCard: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  //cards de Local
  placeCard: {
    width: 200,
    height: 200, 
    marginRight: 15, 
    borderRadius: 16,
    backgroundColor: '#dddadaff',
    overflow: 'hidden', 
  },
  cardImage: {
    width: '100%',
    height: 150, 
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
  },
  //mapa
  mapPlaceholder: {
    height: 250,
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    marginRight: 20,
    marginBottom: 20, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
  },

  categoryCard: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 15,
    borderRadius: 16,
    backgroundColor: '#555454ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 13,
    fontWeight: '500',
    color: '#fff',
  },
});

export default styles;