import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import HomeStyles from '../styles/HomeStyles'; // Importando os estilos do Home
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation
import { HomeNavigationProp } from '../../navigation'; // Importando o tipo de navegação
import Header from '../components/Header';

const Home: React.FC = () => {
    const navigation = useNavigation<HomeNavigationProp>(); // Usando o tipo de navegação para HomeScreen
    const [currentTime, setCurrentTime] = useState<string>('');
    const [punchInStatus, setPunchInStatus] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento

    useEffect(() => {
        // Atualizar o horário atual a cada segundo
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handlePunchIn = () => {
        setPunchInStatus(true);
        Alert.alert('Entrada Registrada', 'Você registrou sua entrada com sucesso!');
    };

    const handlePunchOut = () => {
        setPunchInStatus(false);
        Alert.alert('Saída Registrada', 'Você registrou sua saída com sucesso!');
    };

    return (
        <View style={HomeStyles.container}>
            <Header
                homeIcon={require('../../assets/nome_gorilla_white.png')}
                leftIcon={require('../../assets/calendar.png')}
                onLeftIconPress={() => navigation.navigate('Login')}
                middleIcon={require('../../assets/clock2.png')}
                onMiddleIconPress={() => navigation.navigate('Login')}
                rightIcon={require('../../assets/profile-user.png')}
                onRightIconPress={() => navigation.navigate('Login')}
                isStoreScreen={false}
            />
            <ScrollView contentContainerStyle={HomeStyles.scrollContainer}>
                <Image style={HomeStyles.gorilla} source={require('../../assets/logo_gorilla_white.png')} />
                <View style={HomeStyles.home}>
                    <Text style={HomeStyles.currentTime}>Horário Atual: {currentTime}</Text>

                    <View style={HomeStyles.buttonContainer}>
                        <TouchableOpacity 
                            style={[HomeStyles.button, !punchInStatus && HomeStyles.buttonActive]} 
                            onPress={handlePunchIn}
                            disabled={punchInStatus}
                        >
                            <Text style={HomeStyles.buttonText}>Registrar Entrada</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[HomeStyles.button, punchInStatus && HomeStyles.buttonActive]} 
                            onPress={handlePunchOut}
                            disabled={!punchInStatus}
                        >
                            <Text style={HomeStyles.buttonText}>Registrar Saída</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Home;
