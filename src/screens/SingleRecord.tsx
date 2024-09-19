import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import SingleRecordStyles from '../styles/SingleRecordStyles';
import axios from 'axios';
import { RootStackParamList, SingleRecordNavigationProp } from '../../navigation';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Header from '../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definição da interface para os dados do registro
interface PointRecord {
  id: number;
  date: string;
  hour1: string;
  hour2: string;
  hour3: string;
  hour4: string;
  [key: string]: any; // Permitir acesso dinâmico por chave de string
}

// URL do backend
const backendUrl = 'https://pontogorillaback.vercel.app/api/auth';

// Função para formatar a data recebida como string
const formatDateToFullString = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  const monthIndex = parseInt(month, 10) - 1;
  const monthName = months[monthIndex];
  return `${parseInt(day, 10)} de ${monthName} de ${year}`;
};

const formatDateToBars = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
};

const formatDateDayWeek = (dateString: string): string => {
  const [year, month, day] = dateString.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  if (isNaN(date.getTime())) {
    throw new Error('Data inválida.');
  }
  const weekdays = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
  const dayOfWeek = weekdays[date.getDay()];
  return dayOfWeek;
};

// Função para formatar a hora para 'HH:MM'
const formatHour = (timeString: string): string => {
  const [hours, minutes] = timeString.split(':');
  return `${hours}:${minutes}`;
};

const SingleRecord: React.FC = () => {
  const navigation = useNavigation<SingleRecordNavigationProp>();
  const route = useRoute<RouteProp<RootStackParamList, 'SingleRecord'>>(); 
  const { recordId, hourClicked, timeLabel } = route.params; // Desestruturando os parâmetros

  const [record, setRecord] = useState<PointRecord | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await axios.get<PointRecord[]>(`${backendUrl}/singlerecord/${recordId}`);
        if (response.data.length > 0) {
          setRecord(response.data[0]);
        } else {
          setError('Registro não encontrado.');
        }
      } catch (error) {
        console.error('Erro ao carregar o registro:', error);
        setError('Não foi possível carregar o registro.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [recordId]);

  const loadFromAsyncStorage = async () => {
    try {
      const storedName = await AsyncStorage.getItem('userName');
      if (storedName) {
        setName(storedName);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do AsyncStorage:', error);
    }
  };

  useEffect(() => {
    loadFromAsyncStorage();
  }, []);

  if (error) {
    return (
      <View style={SingleRecordStyles.container}>
        <Text style={SingleRecordStyles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!record) {
    return (
      <View style={SingleRecordStyles.container}>
      <Header
        homeIcon={require('../../assets/nome_gorilla_white.png')}
        leftIcon={require('../../assets/calendar.png')}
        onLeftIconPress={() => navigation.navigate('PointsRecords')}
        middleIcon={require('../../assets/clock2.png')}
        rightIcon={require('../../assets/profile-user.png')}
        onRightIconPress={() => navigation.navigate('Profile')}
      />
      <ActivityIndicator size="large" color="#509e2f" style={SingleRecordStyles.loader} /> 
    </View>
    );
  }

  const triangles = Array.from({ length: 50 });

  // Garantir que hourClicked é um valor válido e seguro
  const hourKey = `hour${hourClicked}`;
  const hourValue = formatHour(record[hourKey] || '00:00:00');

  return (
    <View style={SingleRecordStyles.container}>
      <Header
        homeIcon={require('../../assets/nome_gorilla_white.png')}
        leftIcon={require('../../assets/calendar.png')}
        onLeftIconPress={() => navigation.navigate('PointsRecords')}
        middleIcon={require('../../assets/clock2.png')}
        rightIcon={require('../../assets/profile-user.png')}
        onRightIconPress={() => navigation.navigate('Profile')}
      />
      {loading ? 
      <ActivityIndicator size="large" color="#509e2f" style={SingleRecordStyles.loader} /> 
      : 
      <View style={SingleRecordStyles.main}>
        <TouchableOpacity onPress={() => navigation.navigate('PointsRecords')}>
          <Text style={SingleRecordStyles.back}>Voltar</Text>
        </TouchableOpacity>
        <Text style={SingleRecordStyles.title}>{formatDateToFullString(record.date)}</Text>
        <Text style={SingleRecordStyles.subtitle}>{formatDateDayWeek(record.date)}</Text>
        <View style={SingleRecordStyles.bottom}>
          <View style={SingleRecordStyles.detailStand}></View>
          <View>
            <Text style={SingleRecordStyles.hourText}>{hourValue}</Text>
            <Text style={SingleRecordStyles.detail1}>{timeLabel}</Text>
            <Text style={SingleRecordStyles.detail1}>Registro no Aplicativo</Text>
            <Text style={SingleRecordStyles.detail2}>Comprovante de registro</Text>
            <View style={SingleRecordStyles.detailContainer}>
              <View style={SingleRecordStyles.borderDetail} />
              <Text style={SingleRecordStyles.detail}>Gorilla Telemetria</Text>
              <Text style={SingleRecordStyles.detail}>CNPJ: 20686891000199</Text>
              <Text style={SingleRecordStyles.detail}>Estrada da Capela, 1751 - Vinhedo - SP</Text>
              <View style={SingleRecordStyles.borderDetail} />
              <Text style={SingleRecordStyles.detail}>{name}</Text>
              <Text style={SingleRecordStyles.detail}>Data: {formatDateToBars(record.date)}</Text>
              <Text style={SingleRecordStyles.detail}>Hora: {hourValue}</Text>
            </View>
          </View>
          <View style={SingleRecordStyles.tornBottom}>
        <View style={SingleRecordStyles.tornBottomTriangle}>
          {/* Mapeia o array e gera 10 triângulos */}
          {triangles.map((_, index) => (
            <View
              key={index}
              style={[
                SingleRecordStyles.triangle,
                {
                  left: `${index * 3}%`, // Espaçamento entre triângulos
                  transform: [{ rotate: '180deg' }],
                },
              ]}
            />
          ))}
        </View>
      </View>
        </View>
      </View>
      }
    </View>
  );
};

export default SingleRecord;
