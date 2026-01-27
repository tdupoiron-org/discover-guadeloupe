import React from 'react'
import { Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext'
import { VisitedSitesProvider } from './src/contexts/VisitedSitesContext'
import { ListScreen } from './src/screens/ListScreen'
import { MapScreen } from './src/screens/MapScreen'
import { SettingsScreen } from './src/screens/SettingsScreen'
import './src/i18n'

const Tab = createBottomTabNavigator()

function MainNavigator() {
  const { colors } = useTheme()

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
          },
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
        }}
      >
        <Tab.Screen
          name="List"
          component={ListScreen}
          options={{
            tabBarLabel: 'List',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📋</Text>,
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>🗺️</Text>,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>⚙️</Text>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <VisitedSitesProvider>
        <MainNavigator />
      </VisitedSitesProvider>
    </ThemeProvider>
  )
}
