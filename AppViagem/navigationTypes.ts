import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// 1. Importe o tipo do AppTabs
import { AppTabParamList } from './navigation/AppTabs';
// 2. Importe este helper
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Sign: undefined;
  Home: NavigatorScreenParams<AppTabParamList> | undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>;