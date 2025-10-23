import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Home from '../pages/home/Home';
import NovoLugar from '../pages/new_place';
import Perfil from '../pages/profile';

export type AppTabParamList = {
  Buscar: undefined;
  NovoLugar: undefined;
  Perfil: undefined;
};

// crie o navegador de abas
const Tab = createBottomTabNavigator<AppTabParamList>();

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, 
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: '#fff', 
          borderTopWidth: 0,
          elevation: 4,
          height: 60,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        
        tabBarIcon: ({ color, size, focused }) => {
        
          let iconName: IconName = 'alert-circle'; 

          if (route.name === 'Buscar') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'NovoLugar') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/*telas/abas */}
      <Tab.Screen 
        name="Buscar" 
        component={Home}  
      />
      <Tab.Screen 
        name="NovoLugar" 
        component={NovoLugar}
        options={{ title: 'Novo Lugar' }} 
      />
      <Tab.Screen 
        name="Perfil" 
        component={Perfil}
      />
    </Tab.Navigator>
  );
}