import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { AppTabParamList } from './navigation/AppTabs';

import { NavigatorScreenParams } from '@react-navigation/native';

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
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;