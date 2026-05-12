import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Screens
import HomeScreen from '@/screens/HomeScreen';
import NotesScreen from '@/screens/NotesScreen';
import NoteDetailScreen from '@/screens/NoteDetailScreen';
import CreateNoteScreen from '@/screens/CreateNoteScreen';
import ThemesScreen from '@/screens/ThemesScreen';
import ReviewScreen from '@/screens/ReviewScreen';
import SettingsScreen from '@/screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Notes Stack Navigator
function NotesStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#f8f9fa',
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen 
        name="NotesList" 
        component={NotesScreen}
        options={{ title: 'Mes Notes' }}
      />
      <Stack.Screen 
        name="NoteDetail" 
        component={NoteDetailScreen}
        options={{ title: 'Détail de la Note' }}
      />
      <Stack.Screen 
        name="CreateNote" 
        component={CreateNoteScreen}
        options={{ title: 'Créer une Note' }}
      />
    </Stack.Navigator>
  );
}

// Themes Stack Navigator
function ThemesStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#f8f9fa',
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen 
        name="ThemesList" 
        component={ThemesScreen}
        options={{ title: 'Mes Thèmes' }}
      />
    </Stack.Navigator>
  );
}

// Review Stack Navigator
function ReviewStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#f8f9fa',
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen 
        name="ReviewMain" 
        component={ReviewScreen}
        options={{ title: 'Révision' }}
      />
    </Stack.Navigator>
  );
}

// Settings Stack Navigator
function SettingsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#f8f9fa',
        },
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen 
        name="SettingsMain" 
        component={SettingsScreen}
        options={{ title: 'Paramètres' }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: any = 'home';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'NotesStack') {
            iconName = focused ? 'note-multiple' : 'note-multiple-outline';
          } else if (route.name === 'ThemesStack') {
            iconName = focused ? 'palette' : 'palette-outline';
          } else if (route.name === 'ReviewStack') {
            iconName = focused ? 'refresh' : 'refresh';
          } else if (route.name === 'SettingsStack') {
            iconName = focused ? 'cog' : 'cog-outline';
          }

          return (
            <MaterialCommunityIcons 
              name={iconName} 
              size={size} 
              color={color} 
            />
          );
        },
        tabBarActiveTintColor: '#4ECDC4',
        tabBarInactiveTintColor: '#999',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#eee',
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -5,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarLabel: 'Accueil',
        }}
      />
      <Tab.Screen 
        name="NotesStack" 
        component={NotesStackNavigator}
        options={{
          tabBarLabel: 'Notes',
        }}
      />
      <Tab.Screen 
        name="ThemesStack" 
        component={ThemesStackNavigator}
        options={{
          tabBarLabel: 'Thèmes',
        }}
      />
      <Tab.Screen 
        name="ReviewStack" 
        component={ReviewStackNavigator}
        options={{
          tabBarLabel: 'Révision',
        }}
      />
      <Tab.Screen 
        name="SettingsStack" 
        component={SettingsStackNavigator}
        options={{
          tabBarLabel: 'Paramètres',
        }}
      />
    </Tab.Navigator>
  );
}

// Root Navigator
export default function RootNavigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}
