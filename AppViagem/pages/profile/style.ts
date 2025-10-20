import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0', 
    paddingTop: Platform.OS === 'android' ? 30 : 0, 
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#333',
  },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
    overflow: 'hidden', 
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5', 
  },
  lastListItem: {
    borderBottomWidth: 0,
  },
  listText: {
    fontSize: 16,
    color: '#333',
  },
});

export default styles;