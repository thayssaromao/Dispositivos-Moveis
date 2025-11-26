import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Onboarding from './pages/onboarding';
import Login from './pages/login';
import Sign from './pages/sign';
import AppTabs from './navigation/AppTabs';
import Favorites from './pages/favorites';
import ToVisit from './pages/to_visit';
import Visited from './pages/visited';
import Added from './pages/added';
import Reports from './pages/reports';
import { RootStackParamList } from './navigationTypes';


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login" //arrumar onboarding e trocar depois
        screenOptions={{
          headerShown: false
        }}
      >
        
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Sign" component={Sign} />
        <Stack.Screen name="Home" component={AppTabs} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="ToVisit" component={ToVisit} />
        <Stack.Screen name="Visited" component={Visited} />
        <Stack.Screen name="Added" component={Added} />
        <Stack.Screen name="Reports" component={Reports} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}