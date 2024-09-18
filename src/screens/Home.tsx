import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import HomeStyles from '../styles/HomeStyles'; // Importando os estilos do Home
import { useNavigation, useRoute, useFocusEffect, RouteProp } from '@react-navigation/native'; // Importando useNavigation
import { HomeNavigationProp, RootStackParamList } from '../../navigation'; // Importando o tipo de navegação
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Svg, { Circle } from 'react-native-svg'; // Importando react-native-svg

const backendUrl = 'https://pontogorillaback.vercel.app/api/auth';

const Home: React.FC = () => {
    const navigation = useNavigation<HomeNavigationProp>(); // Usando o tipo de navegação para HomeScreen
    const route = useRoute<RouteProp<RootStackParamList, 'Home'>>();
    const [currentTime, setCurrentTime] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
    const [welcomeMessage, setWelcomeMessage] = useState<string>('');
    const [currentDate, setCurrentDate] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [error, setError] = useState('');

    // Novos estados para o contador, barra de progresso e status do botão
    const [isWorking, setIsWorking] = useState(false); // Estado para verificar se o usuário está trabalhando
    const [workTime, setWorkTime] = useState(0); // Contador em minutos
    const [progress, setProgress] = useState(0); // Progresso da barra em % (0 a 100)
    const [buttonText, setButtonText] = useState('Registrar Ponto'); // Texto do botão

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
            setWelcomeMessage('Bom Dia,');
        } else if (hours >= 13 && hours < 19) {
            setWelcomeMessage('Boa Tarde,');
        } else {
            setWelcomeMessage('Boa Noite,');
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
            setLoading(false); // Parar o carregamento após a tentativa
        }
    };

    const formatDateToFullString = (): string => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('pt-BR', {
            weekday: 'long', // Nome completo do dia da semana
            year: 'numeric',
            month: 'long',   // Nome completo do mês
            day: 'numeric',
        });
        return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    };

    useEffect(() => {
        setCurrentDate(formatDateToFullString()); // Define a data no formato desejado
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadProfileData();
            updateWelcomeMessage();
        }, [route.params?.refresh])
    );

    useEffect(() => {
        // Atualizar o horário atual a cada segundo
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Incrementar o contador de trabalho a cada minuto se estiver trabalhando
        let workInterval: NodeJS.Timeout;
        if (isWorking) {
            workInterval = setInterval(() => {
                setWorkTime((prev) => prev + 1);
                setProgress((prev) => Math.min((prev + (100 / 900)), 100)); // 15 horas = 900 minutos
            }, 60000); // Atualiza a cada minuto
        }

        return () => {
            if (workInterval) clearInterval(workInterval);
        };
    }, [isWorking]);

    const handleRegisterPoint = () => {
        setIsWorking((prev) => !prev);
        setWorkTime(0); // Reseta o contador de tempo de trabalho
        setProgress(0); // Reseta a barra de progresso

        // Alterna o texto do botão
        setButtonText((prev) => {
            switch (prev) {
                case 'Registrar Ponto':
                    return 'Saída Almoço';
                case 'Saída Almoço':
                    return 'Volta do Almoço';
                case 'Volta do Almoço':
                    return 'Saída Trabalho';
                default:
                    return 'Registrar Ponto';
            }
        });
    };

    const formatTime = (minutes: number): string => {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hrs}h ${mins}min`;
    };

    return (
        <View style={HomeStyles.container}>
            <Header
                homeIcon={require('../../assets/nome_gorilla_white.png')}
                leftIcon={require('../../assets/calendar.png')}
                onLeftIconPress={() => navigation.navigate('PointsRecords')}
                middleIcon={require('../../assets/clock2.png')}
                onMiddleIconPress={() => navigation.navigate('Login')}
                rightIcon={require('../../assets/profile-user.png')}
                onRightIconPress={() => navigation.navigate('Profile')}
                isStoreScreen={false}
            />
            {loading ? (
                <ActivityIndicator size="large" color="#509e2f" style={HomeStyles.loadingIcon} />
            ) : (
                <>
                    <ScrollView contentContainerStyle={HomeStyles.scrollContainer}>
                        <View style={HomeStyles.welcomeContainer}>
                            <Text style={HomeStyles.welcome}>{welcomeMessage}<Text style={HomeStyles.name}> {name}!</Text></Text>
                            <Text style={HomeStyles.dateNow}>{currentDate}</Text>
                        </View>
                        <View>
                            <Image style={HomeStyles.gorilla} source={require('../../assets/logo_gorilla_white.png')} />
                            {/* Novo bloco para o status de trabalho e contador */}
                            <Text style={HomeStyles.workStatus}>{isWorking ? 'Trabalhando' : 'Não trabalhando'}</Text>
                            {isWorking && (
                                <>
                                    <Text style={HomeStyles.workTime}>{formatTime(workTime)}</Text>
                                    <View style={HomeStyles.progressBar}>
                                        <View style={{ width: `${progress}%`, minWidth: '9%', height: '100%', backgroundColor: '#509e2f', borderRadius: 100 }} />
                                    </View>
                                </>
                            )}
                        </View>
                        <TouchableOpacity style={HomeStyles.button} onPress={handleRegisterPoint}>
                            <Text style={HomeStyles.buttonText}>{buttonText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('PointsRecords')}>
                            <Text style={HomeStyles.comprovantes}>Últimos Registros</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </>
            )}
        </View>
    );
};

export default Home;
