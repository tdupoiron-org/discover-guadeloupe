import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ThemeProvider, useTheme } from './src/contexts/ThemeContext'
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
            tabBarIcon: ({ color }) => <span style={{ fontSize: 24 }}>📋</span>,
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarLabel: 'Map',
            tabBarIcon: ({ color }) => <span style={{ fontSize: 24 }}>🗺️</span>,
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color }) => <span style={{ fontSize: 24 }}>⚙️</span>,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <MainNavigator />
    </ThemeProvider>
  )
}
