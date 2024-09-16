import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import Login from './src/screens/Login'; // Tela Login
import Home from './src/screens/Home'; // Tela Home

const Stack = createStackNavigator();

const App: React.FC = () => {
    // Carregar as fontes
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    // Mostrar uma tela de carregamento enquanto as fontes são carregadas
    if (!fontsLoaded) {
        return null;
    }

    // Renderizar o app quando as fontes forem carregadas
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login" // Redireciona para Home ou Login
                screenOptions={{
                    gestureEnabled: false,
                    cardStyleInterpolator: () => ({
                        cardStyle: {
                            opacity: 1,
                        },
                    }),
                }}
            >
                <Stack.Screen 
                    name="Home" 
                    component={Home} 
                    options={{ headerShown: false }} 
                />
                <Stack.Screen 
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }} 
                />
            </Stack.Navigator>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent={true}
            />
        </NavigationContainer>
    );
};

export default App;
