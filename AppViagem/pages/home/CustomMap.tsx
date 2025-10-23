import React from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import { View } from 'react-native';
import styles from './style';

type Local = {
  nome: string;
  latitude: number;
  longitude: number;
};

type Props = {
  region: Region | null;
  locais: Local[];
  categoria: string | null;
};

export default function CustomMap({ region, locais, categoria }: Props) {
  if (!region) return null;

  return (
    <View style={{ height: 300, marginTop: 10 }}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation
      >
        {locais.map((local, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: local.latitude, longitude: local.longitude }}
            title={local.nome}
            description={categoria || ''}
            pinColor="#FF6347"
          />
        ))}
      </MapView>
    </View>
  );
}
