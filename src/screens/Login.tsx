//Padrão
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Estilização e navegação
import LoginStyles from '../styles/LoginStyles';
import { LoginNavigationProp } from '../../navigation';

//Requisição e cache
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Corrigido
import { useAppContext } from '../context/AppContext';

const backendUrl = 'https://pontogorillaback.vercel.app/api/auth';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<string>('');
    const [resultColor, setResultColor] = useState<string>('black');

    const navigation = useNavigation<LoginNavigationProp>();
    const { setUser } = useAppContext();

    const handleLogin = async () => {
        const emailInput = email.trim();
        const passwordInput = password.trim();

    console.log("Tentando logar...")
    console.log(emailInput)
    console.log(passwordInput)
    
    setIsLoading(true);

    try {
        const response = await axios.post(`${backendUrl}/login`, 
            { email: emailInput, password: passwordInput },
            {
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        const { data } = response;
        console.log('retornou', data);
        console.log('o userId é:', data.userId);

        setResult(data.message || 'Login bem-sucedido!');
        setResultColor(response.status === 200 ? '#509e2f' : 'red');

        if (response.status === 200) {
            await AsyncStorage.removeItem('userId');
            await AsyncStorage.removeItem('userName');
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('Cpf');
            await AsyncStorage.removeItem('Phone');
            await AsyncStorage.setItem('authToken', data.token);
            await AsyncStorage.setItem('userId', data.userId.toString()); // Converte userId para string
            setUser(data.userId); // Atualiza o estado do usuário no contexto, convertendo para número
            console.log(data.userId);
            setTimeout(() => {
                navigation.navigate('Home', { refresh: new Date().toISOString() }); // Ajuste para a navegação real em seu app
            }, 2000);
        }
    } catch (error) {
        setResult('Usuário ou senha incorretos.');
        setResultColor('red');
    } finally {
        setIsLoading(false);
    }
};

const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

return (
    <View style={LoginStyles.container}>
        <Image style={LoginStyles.logo} source={require('../../assets/nome_gorilla_white.png')} />
        <View style={LoginStyles.form}>
            <View style={LoginStyles.field}>
                <TextInput
                    style={LoginStyles.input}
                    placeholder="Email"
                    placeholderTextColor="#FFF" 
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
            </View>
            <View style={LoginStyles.field}>
                <TextInput
                    style={LoginStyles.input}
                    placeholder="Senha"
                    placeholderTextColor="#FFF" 
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>
            <TouchableOpacity onPress={handleTogglePasswordVisibility}>
                <Text style={LoginStyles.togglePassword}>
                    {showPassword ? 'Ocultar Senha' : 'Mostrar Senha'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity style={LoginStyles.button} onPress={handleLogin} disabled={isLoading}>
                {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                ) : (
                    <Text style={LoginStyles.buttonText}>Entrar</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')}>
                <Text style={LoginStyles.textForget}>Esqueceu a senha?</Text>
            </TouchableOpacity>
            <View style={LoginStyles.createAccount}>
                <Text style={LoginStyles.new}>Novo por aqui?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('CriarConta')}>
                    <Text style={LoginStyles.createAccountText}>Crie uma conta</Text>
                </TouchableOpacity>
            </View>
            {result ? (
                <Text style={[LoginStyles.result, { color: resultColor }]}>{result}</Text>
            ) : null}
        </View>
    </View>
    );
};

export default Login;
