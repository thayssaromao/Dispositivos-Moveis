import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#81A4CD', 
    paddingTop: Platform.OS === 'android' ? 30 : 0, 
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  profileName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 15,
    color: '#000000ff',
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
    borderBottomColor: '#dbdbdbff', 
  },
  lastListItem: {
    borderBottomWidth: 0,
  },
  listText: {
    fontSize: 16,
    color: '#000000',
  },
});

export default styles;