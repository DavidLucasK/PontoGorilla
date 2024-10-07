import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Modal, Alert } from 'react-native';
import { HomeNavigationProp } from '../../navigation'; // Importando os tipos de navegação
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation

import HeaderStyles from '../styles/HeaderStyles'; // Importando os estilos do cabeçalho
import MapComponent from './MapComponent';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backendUrl = 'https://pontogorillaback.vercel.app/api/auth';

interface HeaderProps {
    homeIcon?: any;
    leftIcon?: any; 
    middleIcon?:any;
    middle2Icon?:any
    rightIcon?: any;
    onHomeIconPress?: () => void;
    onLeftIconPress?: () => void;
    onMiddleIconPress?: () => void;
    onMiddle2IconPress?: () => void;
    onRightIconPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ homeIcon, leftIcon, middleIcon, middle2Icon, rightIcon, onLeftIconPress, onMiddleIconPress, onMiddle2IconPress, onRightIconPress }) => {
    const navigation = useNavigation<HomeNavigationProp>(); // Usando o tipo de navegação
    const [currentTime, setCurrentTime] = useState<string>('');

    const [modalFullVisible, setModalFullVisible] = useState<boolean>(false);
    const [modalRegisterVisible, setModalRegisterVisible] = useState<boolean>(false);
    const [modalRegisterConfirmationVisible, setModalRegisterConfirmationVisible] = useState<boolean>(false);

    // Novos estados para o contador, barra de progresso e status do botão
    const [isWorking, setIsWorking] = useState(false); // Estado para verificar se o usuário está trabalhando
    const [workTime, setWorkTime] = useState(0); // Contador em minutos
    const [progress, setProgress] = useState(0); // Progresso da barra em % (0 a 100)
    const [buttonText, setButtonText] = useState('Registrar Ponto'); // Texto do botão

    //Geolocalização
    const [location, setLocation] = useState<string>('');

    const handleLogoPress = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }], // Redefine a navegação para a tela Home
        });
    };

    useEffect(() => {
        // Atualizar o horário atual a cada segundo
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString());
        }, 500);

        return () => clearInterval(timer);
    }, []);

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

    const openRegisterConfirmationModal = () => {
        setModalRegisterConfirmationVisible(true);
    };

    const closeRegisterConfirmationModal = () => {
        setModalRegisterConfirmationVisible(false);
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

        try {
            const pointData = {
                userId: userId,
                date: formattedDate,
                hour1: buttonText === 'Registrar Ponto' ? currentTime : null,
                hour2: buttonText === 'Saída Almoço' ? currentTime : null,
                hour3: buttonText === 'Volta do Almoço' ? currentTime : null,
                hour4: buttonText === 'Saída Trabalho' ? currentTime : null,
                obs: '',  // Adicione observações se necessário
                geoloc: ''
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

    return (
            <View style={HeaderStyles.headerContent}>
                <TouchableOpacity onPress={handleLogoPress}>
                    <Image source={homeIcon} style={HeaderStyles.logo}/>
                </TouchableOpacity>
                <View style={HeaderStyles.icons}>
                    {leftIcon && (
                        <TouchableOpacity onPress={onLeftIconPress}>
                            <Image source={leftIcon} style={HeaderStyles.icon} />
                        </TouchableOpacity>
                    )}
                    {middleIcon && (
                        <TouchableOpacity onPress={onMiddleIconPress}>
                            <Image source={middleIcon} style={HeaderStyles.middleicon} />
                        </TouchableOpacity>
                    )}
                    {middle2Icon && (
                        <TouchableOpacity onPress={onMiddle2IconPress}>
                            <Image source={middle2Icon} style={HeaderStyles.middle2icon} />
                        </TouchableOpacity>
                    )}
                    {rightIcon && (
                        <TouchableOpacity onPress={onRightIconPress}>
                            <Image source={rightIcon} style={HeaderStyles.rightIcon} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
    );

    {/* Modal de registro de ponto completo */}
    {modalFullVisible && (
        <Modal transparent={true} visible={modalFullVisible} animationType="fade">
            <View style={HeaderStyles.modalContainer}>
                <View style={HeaderStyles.modalContent}>
                <Text style={HeaderStyles.modalTitle}>Todos os pontos do dia já foram preenchidos!</Text>
                <TouchableOpacity style={HeaderStyles.buttonOk} onPress={closeFullModal}>
                    <Text style={HeaderStyles.buttonOkText}>Ok</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )}

    {/* Modal de confirmação de registro de ponto */}
    {modalRegisterConfirmationVisible && (
        <Modal transparent={true} visible={modalRegisterConfirmationVisible} animationType="slide">
            <View style={HeaderStyles.modalContainer}>
                <View style={HeaderStyles.modalConfirmationContent}>
                    <Text style={HeaderStyles.titleConfirmRegister}>Você está aqui?</Text>
                    <MapComponent />
                    <Text style={HeaderStyles.modalTitleTime}>{currentTime}</Text>
                    <View style={HeaderStyles.modalButtons}>
                        <TouchableOpacity style={HeaderStyles.buttonCancel} onPress={closeRegisterConfirmationModal}>
                            <Text style={HeaderStyles.buttonOkText}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={HeaderStyles.buttonOk} onPress={handleRegisterPoint}>
                            <Text style={HeaderStyles.buttonOkText}>Registrar Ponto</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )}

    {/* Modal de registro de ponto com sucesso */}
    {modalRegisterVisible && (
        <Modal transparent={true} visible={modalRegisterVisible} animationType="fade">
            <View style={HeaderStyles.modalContainer}>
                <View style={HeaderStyles.modalContent}>
                <Text style={HeaderStyles.modalTitle}>Ponto registrado com sucesso!</Text>
                <TouchableOpacity style={HeaderStyles.buttonOk} onPress={closeRegisterModal}>
                    <Text style={HeaderStyles.buttonOkText}>Ok</Text>
                </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )}
};

export default Header;