import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importando AsyncStorage
import { useFonts, Poppins_400Regular, Poppins_500Medium, Poppins_700Bold, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import Login from './src/screens/Login'; // Tela Login
import CriarConta from './src/screens/CriarConta'; // Tela Criar Conta
import ForgetPass from './src/screens/ForgetPass'; // Tela Esqueceu a Senha
import Home from './src/screens/Home'; // Tela Home
import PointsRecords from './src/screens/PointsRecords'; // Tela PointsRecords
import Profile from './src/screens/Profile'; // Tela Profile

import { AppProvider } from './src/context/AppContext'; // AppProvider

const Stack = createStackNavigator();

const App: React.FC = () => {

    const [isLoading, setIsLoading] = useState(true); // Estado para controle de carregamento
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false); // Estado de login

    // Carregar as fontes
    const [fontsLoaded] = useFonts({
        Poppins_400Regular,
        Poppins_500Medium,
        Poppins_600SemiBold,
        Poppins_700Bold,
    });

    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const token = await AsyncStorage.getItem('authToken'); // Verifica se o token está salvo
                if (token) {
                    setIsLoggedIn(true); // Define como logado se o token existir
                }
            } catch (error) {
                console.error('Erro ao verificar o token:', error);
            } finally {
                setIsLoading(false); // Carregamento concluído
            }
        };

        checkLoginStatus(); // Chama a função para verificar o login
    }, []);

    if (!fontsLoaded || isLoading) {
        return <View><Text>Carregando...</Text></View>; // Tela de carregamento enquanto carrega fontes ou checa o login
    }

    // Renderizar o app quando as fontes forem carregadas
    return (
        <AppProvider>
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName={isLoggedIn ? "Home" : "Login"} // Redireciona para Home ou Login
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
                        name="PointsRecords" 
                        component={PointsRecords} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="Profile" 
                        component={Profile} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="Login"
                        component={Login}
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="CriarConta"
                        component={CriarConta}
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="ForgetPass"
                        component={ForgetPass}
                        options={{ headerShown: false }} 
                    />
                </Stack.Navigator>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="transparent"
                    translucent={true}
                />
            </NavigationContainer>
        </AppProvider>
    );
};

export default App;
