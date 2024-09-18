import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from 'react-native';
import PointsRecordsStyles from '../styles/PointsRecordsStyles'; // Importando os estilos do PointsRecords
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation
import { PointsRecordsNavigationProp } from '../../navigation'; // Importando o tipo de navegação
import Header from '../components/Header';

// Função auxiliar para calcular o dia da semana
const getDayOfWeek = (date: string) => {
    const [day, month] = date.split('/');
    const fullDate = new Date(`${new Date().getFullYear()}-${month}-${day}`);
    const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    return dayNames[fullDate.getDay()];
};

// Função auxiliar para calcular o total de horas trabalhadas
const calculateTotalWorked = (times: string[]) => {
    const [start, lunchStart, lunchEnd, end] = times.map(time => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    });

    const workedMorning = lunchStart - start;
    const workedAfternoon = end - lunchEnd;
    const totalWorked = workedMorning + workedAfternoon;

    const hours = Math.floor(totalWorked / 60);
    const minutes = totalWorked % 60;

    // Formatando horas para incluir zero à esquerda se necessário
    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}:${formattedMinutes}`;
};

// Função para obter o início e o fim do mês atual
const getCurrentMonthRange = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return { startOfMonth, endOfMonth };
};

// Função para obter o início e o fim da semana atual
const getCurrentWeekRange = () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Segunda-feira
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7)); // Domingo
    return { startOfWeek, endOfWeek };
};

// Função para filtrar dados com base no intervalo de datas
const filterData = (data: any[], filter: 'month' | 'week') => {
    const { startOfMonth, endOfMonth } = getCurrentMonthRange();
    const { startOfWeek, endOfWeek } = getCurrentWeekRange();

    const startDate = filter === 'month' ? startOfMonth : startOfWeek;
    const endDate = filter === 'month' ? endOfMonth : endOfWeek;

    return data.filter(item => {
        const [day, month] = item.date.split('/').map(Number);
        const date = new Date(`${new Date().getFullYear()}-${month}-${day}`);
        return date >= startDate && date <= endDate;
    });
};


const PointsRecords: React.FC = () => {
    const navigation = useNavigation<PointsRecordsNavigationProp>();
    const [expanded, setExpanded] = useState<number | null>(null); // Para gerenciar a expansão da linha
    const [display, setDisplay] = useState<number | null>(null);
    const [filter, setFilter] = useState<'month' | 'week'>('month'); // Estado para o filtro
    const [filteredData, setFilteredData] = useState<any[]>(data); // Dados filtrados

    // Dados simulados de exemplo
    const data = [
        {
            id: 1,
            date: '09/12',
            times: ['08:00', '12:00', '13:00', '17:00'],
            details: 'Detalhes extras sobre o ponto registrado.',
        },
        {
            id: 2,
            date: '08/12',
            times: ['09:00', '12:30', '13:30', '18:00'],
            details: 'Informações detalhadas sobre o ponto.',
        },
        {
            id: 3,
            date: '07/12',
            times: ['08:15', '12:15', '13:15', '17:15'],
            details: 'Dados sobre o ponto registrado no dia 07/12.',
        },
        {
            id: 4,
            date: '06/12',
            times: ['08:10', '12:05', '13:05', '17:20'],
            details: 'Registro de ponto com informações adicionais.',
        },
        {
            id: 5,
            date: '05/12',
            times: ['08:00', '12:00', '13:00', '17:00'],
            details: 'Ponto normal do dia 05/12.',
        },
        {
            id: 6,
            date: '04/12',
            times: ['08:05', '12:10', '13:10', '17:05'],
            details: 'Informações detalhadas sobre o ponto registrado.',
        },
        {
            id: 7,
            date: '03/12',
            times: ['09:00', '12:00', '13:00', '18:00'],
            details: 'Dados extras do ponto de 03/12.',
        },
        {
            id: 8,
            date: '02/12',
            times: ['08:30', '12:30', '13:30', '17:30'],
            details: 'Registro do ponto de 02/12.',
        },
        {
            id: 9,
            date: '01/12',
            times: ['08:45', '12:45', '13:45', '17:45'],
            details: 'Informações sobre o ponto de 01/12.',
        },
        {
            id: 10,
            date: '30/11',
            times: ['08:00', '12:00', '13:00', '17:00'],
            details: 'Detalhes do ponto de 30/11.',
        },
        {
            id: 11,
            date: '29/11',
            times: ['08:00', '12:00', '13:00', '17:00'],
            details: 'Informações do registro de ponto de 29/11.',
        },
        {
            id: 12,
            date: '28/11',
            times: ['08:10', '12:10', '13:10', '17:10'],
            details: 'Ponto registrado em 28/11.',
        },
        {
            id: 13,
            date: '27/11',
            times: ['08:05', '12:05', '13:05', '17:05'],
            details: 'Dados do ponto registrado no dia 27/11.',
        },
        {
            id: 14,
            date: '26/11',
            times: ['08:00', '12:00', '13:00', '17:00'],
            details: 'Informações detalhadas sobre o ponto de 26/11.',
        },
    ];
    
    // Função para obter o início e o fim do mês atual
const getCurrentMonthRange = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    return { startOfMonth, endOfMonth };
};

// Função para obter o início e o fim da semana atual
const getCurrentWeekRange = () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1)); // Segunda-feira
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7)); // Domingo
    return { startOfWeek, endOfWeek };
};

// Função para filtrar dados com base no intervalo de datas
const filterData = (data: any[], filter: 'month' | 'week') => {
    const { startOfMonth, endOfMonth } = getCurrentMonthRange();
    const { startOfWeek, endOfWeek } = getCurrentWeekRange();

    const startDate = filter === 'month' ? startOfMonth : startOfWeek;
    const endDate = filter === 'month' ? endOfMonth : endOfWeek;

    return data.filter(item => {
        const [day, month] = item.date.split('/').map(Number);
        const date = new Date(`${new Date().getFullYear()}-${month}-${day}`);
        return date >= startDate && date <= endDate;
        });
    };

    // Função para lidar com o clique no TouchableOpacity
    const toggleExpand = (id: number) => {
        setExpanded(prevId => (prevId === id ? null : id)); // Expande ou recolhe a linha
        setDisplay(prevId => (prevId == id ? null: id));
    };

    const renderItem = ({ item }: { item: any }) => {
        const dayOfWeek = getDayOfWeek(item.date);
        const totalWorked = calculateTotalWorked(item.times);

        return (
            <TouchableOpacity
                style={PointsRecordsStyles.row}
                onPress={() => toggleExpand(item.id)}
            >
                <View style={PointsRecordsStyles.rowContent}>
                    <Text style={PointsRecordsStyles.date}>{item.date}</Text>
                    <View style={PointsRecordsStyles.timesContainer}>
                        {expanded !== item.id && item.times.map((time: string, index: number) => (
                            <View key={index} style={PointsRecordsStyles.timeBlockTop}>
                                <Text style={PointsRecordsStyles.time}>{time}</Text>
                            </View>
                        ))}
                    </View>
                    <Text style={PointsRecordsStyles.arrow}>
                        {expanded === item.id ? '▲' : '▼'}
                    </Text>
                </View>

                {expanded === item.id && (
                    <View style={PointsRecordsStyles.detailsContainer}>
                        {/* Exibir dia da semana */}
                        <Text style={PointsRecordsStyles.dayOfWeek}>{dayOfWeek}</Text>
                        
                        {/* Exibir horários em linhas separadas */}
                        {item.times.map((time: string, index: number) => (
                            <TouchableOpacity key={index} style={PointsRecordsStyles.timeBlock}>
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

                        {/* Exibir Observações */}
                        <Text style={PointsRecordsStyles.borderObservation}></Text>
                        <Text style={PointsRecordsStyles.observationsTitle}>Observações</Text>
                        <Text style={PointsRecordsStyles.details}>{item.details}</Text>

                        {/* Exibir Total Trabalhado */}
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
                middleIcon={require('../../assets/clock2.png')}
                onMiddleIconPress={() => navigation.navigate('Login')}
                rightIcon={require('../../assets/profile-user.png')}
                onRightIconPress={() => navigation.navigate('Profile')}
                isStoreScreen={false}
            />
            <ScrollView contentContainerStyle={PointsRecordsStyles.scrollContainer}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                />
            </ScrollView>
        </View>
    );
};

export default PointsRecords;
