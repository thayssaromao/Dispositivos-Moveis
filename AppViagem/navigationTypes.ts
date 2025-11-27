import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppTabParamList } from './navigation/AppTabs';

import { NavigatorScreenParams } from '@react-navigation/native';

export type LocalType = {
  id: string;
  nome: string;
  categoria: string;
  descricao?: string;
  latitude: number;
  longitude: number;
  imagem?: string;
  status?: string;
  usuarioId?: string; // ID de quem criou
  endereco?: string; 
  cidade?: string;
};

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Sign: undefined;
  Home: NavigatorScreenParams<AppTabParamList> | undefined;
  Favorites: undefined;
  ToVisit: undefined;
  Visited: undefined;
  Added: undefined;
  Reports: undefined;
  PlaceDetail: { local: LocalType };
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;