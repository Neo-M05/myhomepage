import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Splash';
import LoginScreen from './Login';
import SignupScreen from './Signup';
import HomeScreen from './Home';
import AddMenuItemScreen from './AddMenuItem';
import FilterScreen from './Filter';
import DetailedMenuScreen from './DetailedMenuScreen';
import { MenuProvider } from './MenuContext';

const Stack = createStackNavigator();

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="AddMenuItem" component={AddMenuItemScreen} />
          <Stack.Screen name="Filter" component={FilterScreen} />
          <Stack.Screen name="DetailedMenu" component={DetailedMenuScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}