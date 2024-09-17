import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import CriarContaStyles from '../styles/CriarContaStyles';
import { CriarContaNavigationProp } from '../../navigation';

const CriarConta: React.FC = () => {
    
const [email, setEmail] = useState<string>('');
const [password, setPassword] = useState<string>('');
const [showPassword, setShowPassword] = useState<boolean>(false);
const [isLoading, setIsLoading] = useState<boolean>(false);
const [result, setResult] = useState<string>('');
const [resultColor, setResultColor] = useState<string>('black');

const navigation = useNavigation<CriarContaNavigationProp>();

const backendUrl = 'https://pontogorillaback.vercel.app/api/auth';

const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
};

const handleRegister = async () => {
    const emailInput = email.trim();
    const passwordInput = password.trim();

        // Validação do email
    if (!emailInput) {
        setResult('Email não preenchido!');
        setResultColor('red');
        return;
    }
    // Regex para validar o email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
        setResult('Email inválido!');
        setResultColor('red');
        return;
    }

    // Validação da senha
    if (!passwordInput) {
        setResult('Senha não preenchida!');
        setResultColor('red');
        return;
    }

    if (passwordInput.length < 6) {
        setResult('Senha deve conter pelo menos 6 caracteres.');
        setResultColor('red');
        return;
    }

    const hasNumber = /[0-9]/.test(passwordInput);
    const hasUpperCase = /[A-Z]/.test(passwordInput);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(passwordInput);

    if (!hasNumber && !hasUpperCase && !hasSpecialChar) {
        setResult('Senha deve conter pelo menos um número, uma letra maiúscula e um caractere especial.');
        setResultColor('red');
        return;
    }

    if (!hasNumber) {
        setResult('Senha deve conter pelo menos um número.');
        setResultColor('red');
        return;
    }

    if (!hasUpperCase) {
        setResult('Senha deve conter pelo menos uma letra maiúscula.');
        setResultColor('red');
        return;
    }

    if (!hasSpecialChar) {
        setResult('Senha deve conter pelo menos um caractere especial.');
        setResultColor('red');
        return;
    }

    setIsLoading(true);
    setResult(''); // Limpa qualquer resultado anterior
    setResultColor('black'); // Define a cor do texto do resultado

    try {
        const response = await axios.post(`${backendUrl}/register`, {
            email,
            password
        });

        if (response.status === 201) {
            setResult('Conta criada com sucesso!');
            setResultColor('#509e2f');
            setEmail(''); // Limpa o campo de email
            setPassword(''); // Limpa o campo de senha
            setTimeout(() => {
                navigation.navigate('Login');
            }, 500);
        }
    } catch (error) {
        // Erro de rede ou outro erro
        setResult('Erro ao criar conta.');
        setResultColor('red');
    } finally {
        setIsLoading(false);
    }
};

    return (
        <View style={CriarContaStyles.container}>
            <Image style={CriarContaStyles.logo} source={require('../../assets/nome_gorilla_white.png')} />
            <View style={CriarContaStyles.form}>
                <View style={CriarContaStyles.field}>
                    <TextInput
                        style={CriarContaStyles.input}
                        placeholder="Email"
                        placeholderTextColor="#FFF"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                </View>
                <View style={CriarContaStyles.field}>
                    <TextInput
                        style={CriarContaStyles.input}
                        placeholder="Senha"
                        placeholderTextColor="#FFF"
                        secureTextEntry={!showPassword}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <TouchableOpacity onPress={handleTogglePasswordVisibility}>
                    <Text style={CriarContaStyles.togglePassword}>
                        {showPassword ? 'Ocultar Senha' : 'Mostrar Senha'}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={CriarContaStyles.button} onPress={handleRegister} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={CriarContaStyles.buttonText}>Criar Conta</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={CriarContaStyles.backLogin}>Voltar para Login</Text>
                </TouchableOpacity>
                {result ? (
                    <Text style={[CriarContaStyles.result, { color: resultColor }]}>{result}</Text>
                ) : null}
            </View>
        </View>
    );
};

export default CriarConta;
