import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LoginStyles from '../styles/LoginStyles';
import { LoginNavigationProp } from '../../navigation';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<string>('');
    const [resultColor, setResultColor] = useState<string>('black');

    const navigation = useNavigation<LoginNavigationProp>();

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
                        placeholder="Email ou usuário"
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
                <TouchableOpacity style={LoginStyles.button} onPress={() => navigation.navigate('Home')} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={LoginStyles.buttonText}>Entrar</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={LoginStyles.textForget}>Esqueceu a senha?</Text>
                </TouchableOpacity>
                <View style={LoginStyles.rememberMe}>
                    <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                        <Text style={LoginStyles.rememberMeText}>Lembre-se de mim</Text>
                    </TouchableOpacity>
                </View>
                <View style={LoginStyles.createAccount}>
                    <Text style={LoginStyles.new}>Novo por aqui?</Text>
                    <TouchableOpacity>
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
