import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import HomeStyles from '../styles/HomeStyles'; // Importando os estilos do Home
import { useNavigation, useRoute, useFocusEffect, RouteProp  } from '@react-navigation/native'; // Importando useNavigation
import { HomeNavigationProp, RootStackParamList } from '../../navigation'; // Importando o tipo de navegação
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const backendUrl = 'https://pontogorillaback.vercel.app/api/auth';

const Home: React.FC = () => {
    const navigation = useNavigation<HomeNavigationProp>(); // Usando o tipo de navegação para HomeScreen
    const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
    const [currentTime, setCurrentTime] = useState<string>('');
    const [punchInStatus, setPunchInStatus] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
    const [welcomeMessage, setWelcomeMessage] = useState<string>('');

    const [name, setName] = useState<string>('');
    const [error, setError] = useState('');

    const getUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            return userId;
        } catch (error) {
            console.error('Erro ao obter o item do AsyncStorage', error);
        }
      };

      const extractFirstName = (fullName: string) => {
        const firstSpaceIndex = fullName.indexOf(' ');
        if (firstSpaceIndex !== -1) {
            return fullName.substring(0, firstSpaceIndex);
        }
        return fullName; // Retorna o nome completo se não houver espaços
    };

    const updateWelcomeMessage = () => {
        const now = new Date();
        const hours = now.getHours();

        if (hours >= 4 && hours < 13) {
            setWelcomeMessage('Bom Dia');
        } else if (hours >= 13 && hours < 19) {
            setWelcomeMessage('Boa Tarde');
        } else {
            setWelcomeMessage('Boa Noite');
        }
    };

    const loadProfileData = async () => {
        setLoading(true);

        try {
            const userId = await getUserId();
            if (userId) {
                const response = await axios.get(`${backendUrl}/get-profile/${userId}`);
                const profileData = response.data;

                const firstName = extractFirstName(profileData.name || '');
                setName(firstName);
            } else {
                setError('User ID is null or undefined');
            }
        } catch (error) {
            console.error('Erro ao carregar perfil:', error);
            Alert.alert('Erro', 'Não foi possível carregar os dados do perfil.');
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            console.log('refresh parameter:', route.params?.refresh);
            loadProfileData();
            updateWelcomeMessage();
        }, [route.params?.refresh])
    );

    useEffect(() => {
        // Atualizar o horário atual a cada segundo
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
            updateWelcomeMessage(); // Atualiza a mensagem a cada sec
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
                onRightIconPress={() => navigation.navigate('Profile')}
                isStoreScreen={false}
            />
            <ScrollView contentContainerStyle={HomeStyles.scrollContainer}>
                {loading ? 
                    null : 
                    <View style={HomeStyles.welcomeContainer}>
                        <Text style={HomeStyles.welcome}>{welcomeMessage} {name}</Text>
                    </View>
                }
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
