import * as SecureStore from "expo-secure-store";

// Função para limpar as chaves geradas pelo Firebase Auth
function sanitizeKey(key: string) {
  // Firebase usa ':', '/', e outros chars inválidos
  return key.replace(/[^a-zA-Z0-9._-]/g, "_");
}

export const SecureAsyncStorage = {
  getItem: async (key: string) => {
    const safeKey = sanitizeKey(key);
    return await SecureStore.getItemAsync(safeKey);
  },
  setItem: async (key: string, value: string) => {
    const safeKey = sanitizeKey(key);
    await SecureStore.setItemAsync(safeKey, value);
  },
  removeItem: async (key: string) => {
    const safeKey = sanitizeKey(key);
    await SecureStore.deleteItemAsync(safeKey);
  },
};
