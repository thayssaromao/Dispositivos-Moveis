import React from 'react';
import MapView, { Marker, Region } from 'react-native-maps';
import { View } from 'react-native';
import styles from '../style';

type Local = {
  nome: string;
  latitude: number;
  longitude: number;
};

type Props = {
  region: Region | null;
  locaisCategoria: Local[];
  localBusca: Local | null;
  categoria: string | null;
};


export default function CustomMap({ region, locaisCategoria, localBusca, categoria}: Props) {
  if (!region) return null;

  return (
    <View style={{alignItems: 'center' }}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation
      >
        {locaisCategoria.map((item, i) => (
  <Marker
    key={"cat-" + i}
    coordinate={{ latitude: item.latitude, longitude: item.longitude }}
    title={item.nome}
    pinColor="red" 
  />
))}

{localBusca && (
  <Marker
    coordinate={{ latitude: localBusca.latitude, longitude: localBusca.longitude }}
    title={localBusca.nome}
    pinColor="blue"
  />
)}

      </MapView>
    </View>
  );
}
