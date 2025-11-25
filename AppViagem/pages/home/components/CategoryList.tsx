import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styles from '../style';

type Props = {
  categorias: string[];
  categoriaSelecionada: string | null;
  onSelecionar: (categoria: string) => void;
};

export default function CategoryList({ categorias, categoriaSelecionada, onSelecionar }: Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categorias.map((cat) => (
        <View
          key={cat}
          style={[
            styles.categoryCard,
            categoriaSelecionada === cat && { backgroundColor: '#F17300'},
          ]}
          onTouchEnd={() => onSelecionar(cat)}
        >
          <Text
            style={[
              styles.categoryTitle,
              categoriaSelecionada === cat && { color: '#fff' },
            ]}
          >
            {cat}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}
