import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
import styles from './style';

type Props = TextInputProps & {
  // Você pode adicionar props customizadas aqui se precisar
}

export function Input({ ...rest }: Props) {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#999"
      {...rest}
    />
  );
}