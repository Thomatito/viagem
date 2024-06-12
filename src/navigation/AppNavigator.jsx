import React from 'react'; import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import LoginScreen from '../screens/LoginScreen';
import NewsScreen from '../screens/NewsScreen';
import RegisterScreen from '../screens/RegisterScreen';



 
 
const Stack = createStackNavigator();
 
export default function AppNavigator() {
  return (
  <NavigationContainer>
    <Stack.Navigator>
 
 
      <Stack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        title: "Login",
      }} />
 
     
    <Stack.Screen
      name="News"
       component={NewsScreen}
       options={{
        title: "News",
      }}/>

    <Stack.Screen
          name="RegisterScreen"
          component={RegisterScreen}
          options={{
            title: "Cadastro de usuário",
          }}
          />

      </Stack.Navigator>
      </NavigationContainer>
      );
    }
 
    const Tabs = createMaterialBottomTabNavigator();
 
export function TabsNavigation() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="News" component={NewsScreen} />
      <Tabs.Screen name="Login" component={LoginScreen} />
      <Tabs.Screen name="Register" component={RegisterScreen} />

    </Tabs.Navigator>
  );
}