import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#81A4CD',
    paddingTop: Platform.OS === 'android' ? 30 : 0, 
  },
  scrollContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000ff',
    marginBottom: 40,
  },
  formContainer: {
    flex: 1,
    width: '100%', 
    alignItems: 'center', 
    gap:20
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 15, 
    borderWidth: 1,
    borderColor: '#6b6b6bff'
  },
  textArea: {
    height: 120, 
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  
  submitButton: {
    width: '90%',
    height: 50,
    borderRadius: 12,
    backgroundColor: '#F17300',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20, 
    marginBottom: 40, 
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;