import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Image, ActivityIndicator, Modal } from 'react-native';
import HomeStyles from '../styles/HomeStyles'; // Importando os estilos do Home
import { useNavigation, useRoute, useFocusEffect, RouteProp } from '@react-navigation/native'; // Importando useNavigation
import { HomeNavigationProp, RootStackParamList } from '../../navigation'; // Importando o tipo de navegação
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MapComponent from '../components/MapComponent';

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

    const [modalFullVisible, setModalFullVisible] = useState<boolean>(false);
    const [modalRegisterVisible, setModalRegisterVisible] = useState<boolean>(false);
    const [modalRegisterConfirmationVisible, setModalRegisterConfirmationVisible] = useState<boolean>(false);

    // Novos estados para o contador, barra de progresso e status do botão
    const [isWorking, setIsWorking] = useState(false); // Estado para verificar se o usuário está trabalhando
    const [workTime, setWorkTime] = useState(0); // Contador em minutos
    const [progress, setProgress] = useState(0); // Progresso da barra em % (0 a 100)
    const [buttonText, setButtonText] = useState('Registrar Ponto'); // Texto do botão

    const getLocationFromStorage = async () => {
        try {
            // Pegar latitude e longitude do AsyncStorage
            const lat = await AsyncStorage.getItem('latitude');
            const lon = await AsyncStorage.getItem('longitude');
    
            // Verifica se os valores existem no AsyncStorage
            if (lat !== null && lon !== null) {
                const latitude = parseFloat(lat);
                const longitude = parseFloat(lon);
    
                return { latitude, longitude };
            } else {
                console.log('Nenhuma localização salva.');
                return null;
            }
        } catch (error) {
            console.error('Erro ao pegar dados do AsyncStorage', error);
            return null;
        }
    };

    const getUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            return userId;
        } catch (error) {
            console.error('Erro ao obter o item do AsyncStorage', error);
        }
    };

    // Função para registrar ponto
    const handleRegisterPoint = async () => {
        const userId = await getUserId(); // Obtém o ID do usuário

        if (!userId) {
            Alert.alert('Erro', 'ID do usuário não encontrado.');
            return;
        }

        const hour = new Date();
        const data = new Date();
        data.setHours(data.getHours() - 3); // Subtrai 3 horas
        const formattedDate = data.toISOString().split('T')[0]; // Formato YYYY-MM-DD
        const currentTime = hour.toISOString().split('T')[1].split('.')[0]; // Formato HH:MM:SS

        const location = await getLocationFromStorage();

        const fullLocation = `Latitude: ${location?.latitude}, Longitude:${location?.longitude}`;
        console.log(fullLocation);

        try {
            const pointData = {
                userId: userId,
                date: formattedDate,
                hour1: buttonText === 'Registrar Ponto' ? currentTime : null,
                hour2: buttonText === 'Saída Almoço' ? currentTime : null,
                hour3: buttonText === 'Volta do Almoço' ? currentTime : null,
                hour4: buttonText === 'Saída Trabalho' ? currentTime : null,
                obs: '',  // Adicione observações se necessário
                geoloc: fullLocation,
            };

            console.log(pointData);

            // Realiza o POST para o endpoint
            const response = await axios.post(`${backendUrl}/register-point`, pointData);
            console.log("registrando");

            // Verifica o status code da resposta
            if (response.status === 205) {
                setModalFullVisible(true);
                setModalRegisterVisible(false);
                setModalRegisterConfirmationVisible(false)
                console.log('todos os horarios preenchidos hoje')
                return;
            }
            else if (response.status === 200 || response.status === 201) {
                setIsWorking((prev) => !prev);
                setWorkTime(0); // Reseta o contador de tempo de trabalho
                setProgress(0); // Reseta a barra de progresso
                setModalRegisterVisible(true);
                setModalRegisterConfirmationVisible(false)
                console.log('registrado com sucesso')

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
            } else {
                Alert.alert('Erro', 'Não foi possível registrar o ponto.');
            }
        } catch (error) {
            console.error('Erro ao registrar ponto:', error);
            Alert.alert('Erro', 'Houve um problema ao registrar o ponto.');
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
            // Primeiro, tente obter o nome do AsyncStorage
            const storedName = await AsyncStorage.getItem('userName');
            if (storedName) {
                // Se o nome já estiver armazenado, use-o
                const formattedName = storedName.split(' ')[0];
                setName(formattedName);
            } else {
                // Caso contrário, faça a requisição para obter o nome
                const userId = await getUserId();
                if (userId) {
                    const response = await axios.get(`${backendUrl}/get-profile/${userId}`);
                    const profileData = response.data;
    
                    const firstName = extractFirstName(profileData.name || '');
                    const formattedName = firstName.split(' ')[0];
                    setName(formattedName);
    
                    // Armazene o nome no AsyncStorage para uso futuro
                    await AsyncStorage.setItem('userName', formattedName);
                } else {
                    setError('User ID is null or undefined');
                }
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
        }, 500);

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

    const formatTime = (minutes: number): string => {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hrs}h ${mins}min`;
    };

    // Função para abrir o modal de logout
    const openFullModal = () => {
        setModalFullVisible(true);
    };

    // Função para fechar o modal
    const closeFullModal = () => {
        setModalFullVisible(false);
    };

    const openRegisterModal = () => {
        setModalRegisterVisible(true);
    };

    const closeRegisterModal = () => {
        setModalRegisterVisible(false);
    };

    const openRegisterConfirmationModal = async () => {
        setModalRegisterConfirmationVisible(true);
    };

    const closeRegisterConfirmationModal = () => {
        setModalRegisterConfirmationVisible(false);
    };

    return (
        <View style={HomeStyles.container}>
            <Header
                homeIcon={require('../../assets/nome_gorilla_white.png')}
                leftIcon={require('../../assets/calendar.png')}
                onLeftIconPress={() => navigation.navigate('PointsRecords')}
                middleIcon={require('../../assets/clock2.png')}
                onMiddleIconPress={openRegisterConfirmationModal}
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
                        <TouchableOpacity style={HomeStyles.button} onPress={openRegisterConfirmationModal}>
                            <Text style={HomeStyles.buttonText}>{buttonText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('PointsRecords')}>
                            <Text style={HomeStyles.comprovantes}>Últimos Registros</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </>
            )}

            {/* Modal de registro de ponto completo */}
            {modalFullVisible && (
                <Modal transparent={true} visible={modalFullVisible} animationType="fade">
                <View style={HomeStyles.modalContainer}>
                    <View style={HomeStyles.modalContent}>
                    <Text style={HomeStyles.modalTitle}>Todos os pontos do dia já foram preenchidos!</Text>
                    <TouchableOpacity style={HomeStyles.buttonOk} onPress={closeFullModal}>
                        <Text style={HomeStyles.buttonOkText}>Ok</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </Modal>
            )}

            {/* Modal de confirmação de registro de ponto */}
            {modalRegisterConfirmationVisible && (
                <Modal transparent={true} visible={modalRegisterConfirmationVisible} animationType="slide">
                    <View style={HomeStyles.modalContainer}>
                        <View style={HomeStyles.modalConfirmationContent}>
                            <Text style={HomeStyles.titleConfirmRegister}>Você está aqui?</Text>
                            <MapComponent />
                            <Text style={HomeStyles.modalTitleTime}>{currentTime}</Text>
                            <View style={HomeStyles.modalButtons}>
                                <TouchableOpacity style={HomeStyles.buttonCancel} onPress={closeRegisterConfirmationModal}>
                                    <Text style={HomeStyles.buttonOkText}>Cancelar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={HomeStyles.buttonOk} onPress={handleRegisterPoint}>
                                    <Text style={HomeStyles.buttonOkText}>Registrar Ponto</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

            {/* Modal de registro de ponto com sucesso */}
            {modalRegisterVisible && (
                <Modal transparent={true} visible={modalRegisterVisible} animationType="fade">
                <View style={HomeStyles.modalContainer}>
                    <View style={HomeStyles.modalContent}>
                    <Text style={HomeStyles.modalTitle}>Ponto registrado com sucesso!</Text>
                    <TouchableOpacity style={HomeStyles.buttonOk} onPress={closeRegisterModal}>
                        <Text style={HomeStyles.buttonOkText}>Ok</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                </Modal>
            )}
        </View>
    );
};

export default Home;
