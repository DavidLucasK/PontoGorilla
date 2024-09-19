import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import PointsRecordsStyles from '../styles/PointsRecordsStyles'; // Importando os estilos do PointsRecords
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation
import { PointsRecordsNavigationProp } from '../../navigation'; // Importando o tipo de navegação
import Header from '../components/Header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Definindo o tipo para os registros de ponto
interface PointRecord {
    id: number;
    date: string;
    hour1: string;
    hour2: string;
    hour3: string;
    hour4: string;
    obs?: string; // Observações são opcionais
}

const backendUrl = 'https://pontogorillaback.vercel.app/api/auth';

// Função auxiliar para calcular o dia da semana
const formatDate = (date: string) => {
    if (!date) {
        return '';
    }
    const parts = date.split('-');
    if (parts.length !== 3) {
        throw new Error('Data no formato incorreto. Esperado YYYY-MM-DD.');
    }

    const [year, monthStr, dayStr] = parts;
    const day = parseInt(dayStr, 10);
    const month = parseInt(monthStr, 10);

    if (isNaN(day) || isNaN(month)) {
        throw new Error('Dia ou mês inválidos.');
    }

    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
    return `${formattedDate}`;
};

// Formata os horários
const formatTime = (time: string) => {
    if (!time) {
        return '';
    }
    const [hours, minutes] = time.split(':');
    const formattedHours = hours ? hours.padStart(2, '0') : '00';
    const formattedMinutes = minutes ? minutes.slice(0, 2).padStart(2, '0') : '00';
    return `${formattedHours}:${formattedMinutes}`;
};

// Função para obter o dia da semana
const getDayOfWeek = (date: string) => {
    const [year, month, day] = date.split('-').map(Number);
    const fullDate = new Date(year, month - 1, day);
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return dayNames[fullDate.getDay()];
};

// Função auxiliar para calcular o total de horas trabalhadas
const calculateTotalWorked = (times: string[]) => {
    if (times.some(time => !time)) {
        return '00:00'; // Valor default se qualquer hora estiver faltando
    }

    const [start, lunchStart, lunchEnd, end] = times.map(time => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    });

    const workedMorning = lunchStart - start;
    const workedAfternoon = end - lunchEnd;
    const totalWorked = workedMorning + workedAfternoon;

    const hours = Math.floor(totalWorked / 60);
    const minutes = totalWorked % 60;

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}:${formattedMinutes}`;
};


const PointsRecords: React.FC = () => {
    const navigation = useNavigation<PointsRecordsNavigationProp>();
    const [expanded, setExpanded] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<PointRecord[]>([]);
    const [error, setError] = useState<string | null>(null);

    const getUserId = async () => {
        try {
            const userId = await AsyncStorage.getItem('userId');
            return userId;
        } catch (error) {
            console.error('Erro ao obter o item do AsyncStorage', error);
        }
    };

    useEffect(() => {
        const getRecords = async () => {
            try {
                const userId = await getUserId();
                if (userId) {
                    setLoading(true);
                    const response = await axios.get<PointRecord[]>(`${backendUrl}/points/${userId}`);
                    const dados = response.data;

                    if (Array.isArray(dados)) {
                        const sortedData = dados.sort((a, b) => b.id - a.id);
                        setData(sortedData);
                    } else {
                        console.error('Os dados recebidos não são um array.');
                    }
                } else {
                    console.log('UserId não encontrado');
                }
            } catch (error) {
                console.error('Erro ao carregar perfil:', error);
            } finally {
                setLoading(false);
            }
        };

        getRecords();
    }, []);

    const toggleExpand = (id: number) => {
        setExpanded(prevId => (prevId === id ? null : id));
    };

    const renderItem = ({ item }: { item: PointRecord }) => {
        const dayOfWeek = getDayOfWeek(item.date);
        const dataFormatada = formatDate(item.date);
        const times = [item.hour1, item.hour2, item.hour3, item.hour4];
        const formattedTimes = times.map(time => formatTime(time));
        const totalWorked = calculateTotalWorked(times);

        return (
            <TouchableOpacity
                style={PointsRecordsStyles.row}
                onPress={() => toggleExpand(item.id)}
            >
                <View style={PointsRecordsStyles.rowContent}>
                    <Text style={PointsRecordsStyles.date}>{dataFormatada}</Text>
                    <View style={PointsRecordsStyles.timesContainer}>
                        {expanded !== item.id && formattedTimes.map((time: string, index: number) => (
                            <View key={index} style={PointsRecordsStyles.timeBlockTop}>
                                <Text style={PointsRecordsStyles.time}>{time}</Text>
                            </View>
                        ))}
                    </View>
                    <Icon
                        name={expanded === item.id ? 'expand-less' : 'expand-more'}
                        style={PointsRecordsStyles.arrow}
                    /> 
                </View>
                {expanded === item.id && (
                    <View style={PointsRecordsStyles.detailsContainer}>
                        <Text style={PointsRecordsStyles.dayOfWeek}>{dayOfWeek}</Text>
                        {formattedTimes.map((time: string, index: number) => (
                            <TouchableOpacity 
                                key={index} 
                                style={PointsRecordsStyles.timeBlock} 
                                onPress={() => navigation.navigate('SingleRecord', { 
                                    recordId: item.id, 
                                    hourClicked: index + 1, 
                                    timeLabel: index % 2 === 0 ? 'Entrada' : 'Saída'
                                })}
                            >
                                <View style={PointsRecordsStyles.detailStand}></View>
                                <View>
                                    <Text style={PointsRecordsStyles.expandedTime}>{time}</Text>
                                    <Text style={PointsRecordsStyles.timeLabel}>
                                        {index % 2 === 0 ? 'Entrada' : 'Saída'}
                                    </Text>
                                    <Text style={PointsRecordsStyles.registrationMethod}>
                                        Registro no aplicativo
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                        <Text style={PointsRecordsStyles.borderObservation}></Text>
                        <Text style={PointsRecordsStyles.observationsTitle}>Observações</Text>
                        <Text style={PointsRecordsStyles.details}>{item.obs || 'Sem observações'}</Text>
                        <Text style={PointsRecordsStyles.totalWorked}>Total Trabalhado: {totalWorked}</Text>
                    </View>
                )}
            </TouchableOpacity>
        );
    };

    return (
        <View style={PointsRecordsStyles.container}>
            <Header
                homeIcon={require('../../assets/nome_gorilla_white.png')}
                leftIcon={require('../../assets/calendar.png')}
                onLeftIconPress={() => navigation.navigate('PointsRecords')}
                rightIcon={require('../../assets/profile-user.png')}
                onRightIconPress={() => navigation.navigate('Profile')}
                isStoreScreen={false}
            />
            <Text style={PointsRecordsStyles.comprovantes}>Últimos Registros</Text>
            <View style={PointsRecordsStyles.scrollContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color="#509e2f" style={PointsRecordsStyles.loadingIcon} />
                ) : (
                    <FlatList
                        data={data}
                        keyExtractor={item => item.id.toString()}
                        renderItem={renderItem}
                    />
                )}
            </View>
        </View>
    );
};

export default PointsRecords;
