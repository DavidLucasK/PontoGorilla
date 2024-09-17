import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ForgetPassStyles from '../styles/ForgetPassStyles';
import { ForgetPassNavigationProp } from '../../navigation';

const ForgetPass: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [result, setResult] = useState<string>('');
    const [resultColor, setResultColor] = useState<string>('black');

    const navigation = useNavigation<ForgetPassNavigationProp>();

    const backendUrl = 'https://pontogorillaback.vercel.app/api/auth';

    const handleSendEmail = async () => {
        if (!email) {
            setResult('Por favor, insira um e-mail.');
            setResultColor('red');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${backendUrl}/forgot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setResult(data.message || 'E-mail enviado com sucesso!');
                setResultColor('green');
            } else {
                setResult(data.message || 'Erro ao enviar o e-mail.');
                setResultColor('red');
            }
        } catch (error) {
            console.error('Erro ao enviar e-mail:', error);
            setResult('Erro no servidor. Por favor, tente novamente mais tarde.');
            setResultColor('red');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={ForgetPassStyles.container}>
            <Image style={ForgetPassStyles.logo} source={require('../../assets/nome_gorilla_white.png')} />
            <View style={ForgetPassStyles.form}>
                <View style={ForgetPassStyles.field}>
                    <TextInput
                        style={ForgetPassStyles.input}
                        placeholder="Digite seu e-mail"
                        placeholderTextColor="#FFF"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                </View>
                <Text style={ForgetPassStyles.textWe}>Nós te enviaremos um e-mail com as instruções para redefinir sua senha.</Text>
                <TouchableOpacity style={ForgetPassStyles.button} onPress={handleSendEmail} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <Text style={ForgetPassStyles.buttonText}>Enviar e-mail</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={ForgetPassStyles.backLogin}>Voltar para Login</Text>
                </TouchableOpacity>
                {result ? (
                    <Text style={[ForgetPassStyles.result, { color: resultColor }]}>{result}</Text>
                ) : null}
            </View>
        </View>
    );
};

export default ForgetPass;
