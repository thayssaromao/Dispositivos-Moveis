import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, PROVIDER_DEFAULT, Region } from 'react-native-maps';

// 1. Definimos o que é um "Local"
type Local = {
  id: string;
  nome: string;
  latitude: number;
  longitude: number;
  categoria?: string;
};

// 2. Definimos quais propriedades (Props) o componente aceita
type CustomMapProps = {
  region: Region | null; // A região pode ser nula no início
  locaisCategoria: Local[]; // Uma lista de Locais
  localBusca: Local | null; // Um único local ou nulo
  categoria?: string | null; 
};

// 3. Aplicamos o tipo aqui na definição da função
export default function CustomMap({ region, locaisCategoria, localBusca }: CustomMapProps) {

  return (
    <View style={styles.container}>
      {region && ( 
        <MapView
          // DICA: No Android use PROVIDER_GOOGLE. No iOS, PROVIDER_DEFAULT.
          provider={PROVIDER_DEFAULT} 
          style={styles.map}
          region={region}
          showsUserLocation={true}
          loadingEnabled={true}
        >
          {/* Renderiza os pinos dos locais vindos do Firebase */}
          {locaisCategoria && locaisCategoria.map((local) => (
            <Marker
              key={local.id}
              coordinate={{
                latitude: local.latitude,
                longitude: local.longitude,
              }}
              title={local.nome}
              description={local.categoria}
            />
          ))}

          {/* Renderiza o pino da busca (se houver) */}
          {localBusca && (
            <Marker
              coordinate={{
                latitude: localBusca.latitude,
                longitude: localBusca.longitude,
              }}
              title={localBusca.nome}
              pinColor="blue" // Cor diferente para busca
            />
          )}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});