import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Image, Modal, Pressable, Alert } from 'react-native';
import ProfileStyles from '../styles/ProfileStyles'; // Importando os estilos do Profile
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation
import { ProfileNavigationProp } from '../../navigation'; // Importando o tipo de navegação
import Header from '../components/Header';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backendUrl = 'https://pontogorillaback.vercel.app/api/auth';

const Profile: React.FC = () => {
  const navigation = useNavigation<ProfileNavigationProp>(); // Usando o tipo de navegação para HomeScreen
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Estado para visibilidade do modal
  const [modalAttVisible, setModalAttVisible] = useState<boolean>(false); // Estado para visibilidade do modal
  const [uploading, setUploading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [telefone, setPhone] = useState<string>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const getUserId = async () => {
    try {
        const userId = await AsyncStorage.getItem('userId');
        return userId;
    } catch (error) {
        console.error('Erro ao obter o item do AsyncStorage', error);
    }
  };
  
  useEffect(() => {
    const loadProfileData = async () => {
        try {
            const userId = await getUserId(); // Resolva a Promise para obter o valor de userId
            if (userId) {
                const response = await axios.get(`${backendUrl}/get-profile/${userId}`);
                const profileData = response.data;

                setName(profileData.name || '');
                setEmail(profileData.email || '');
                setCpf(profileData.cpf || '');
                setPhone(profileData.telefone || '');
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

    loadProfileData();
}, []);

    // Função para abrir o modal de logout
    const openLogoutModal = () => {
        setModalVisible(true);
    };

    // Função para fechar o modal
    const closeLogoutModal = () => {
        setModalVisible(false);
    };

    // Função para abrir o modal de atualização
    const openAttModal = () => {
      setModalAttVisible(true);
  };

  // Função para fechar o modal
  const closeAttModal = () => {
      setModalAttVisible(false);
  };

    // Função para confirmar logout e navegar para Login
    const confirmLogout = () => {
        setModalVisible(false);
        AsyncStorage.removeItem('userId');
        navigation.navigate('Login');
    };

    const updateProfile = async () => {
      if (!name || !email || !cpf || !telefone) {
        Alert.alert('Erro', 'Por favor, preencha todos os campos');
        return;
      }

      setUploading(true);
    
      try {

        const userId = await getUserId();

        if (!userId) {
            Alert.alert('Erro', 'ID do usuário não encontrado');
            return;
        }
        // Atualiza o perfil no backend
        await axios.post(`${backendUrl}/update-profile`, {
          userId,
          name,
          email,
          cpf,
          telefone,
        });
        openAttModal();
        setUploading(false);
        
      } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        Alert.alert('Erro', 'Não foi possível atualizar o perfil no momento.');
      }
    };

    return (
        <View style={ProfileStyles.container}>
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
            <ScrollView contentContainerStyle={ProfileStyles.scrollContainer}>
              <Text style={ProfileStyles.profileTitle}>Perfil</Text>
                <View style={ProfileStyles.profileContainer}>
                    <Text style={ProfileStyles.label}>Nome completo:</Text>
                    <TextInput 
                        style={ProfileStyles.textInput}
                        placeholder="Digite seu nome completo" 
                        placeholderTextColor={'#FFF'}
                        value={loading ? 'Carregando' : name}
                        onChangeText={setName}
                    />
                    <Text style={ProfileStyles.label}>Email:</Text>
                    <TextInput 
                        style={ProfileStyles.textInput} 
                        placeholderTextColor={'#FFF'}
                        value={loading ? 'Carregando' : email}
                        onChangeText={setEmail}
                    />
                    <Text style={ProfileStyles.label}>CPF:</Text>
                    <TextInput 
                        style={ProfileStyles.textInput} 
                        placeholder="Digite seu CPF"
                        placeholderTextColor={'#FFF'}
                        keyboardType="numeric" // Define o tipo de teclado para números
                        value={loading ? 'Carregando' : cpf}
                        onChangeText={setCpf}
                    />
                    <Text style={ProfileStyles.label}>Telefone:</Text>
                    <TextInput 
                        style={ProfileStyles.textInput} 
                        placeholder="Digite seu telefone"
                        placeholderTextColor={'#FFF'}
                        keyboardType="numeric" // Define o tipo de teclado para números
                        value={loading ? 'Carregando' : telefone}
                        onChangeText={setPhone}
                    />
                </View>
                <TouchableOpacity 
                  onPress={updateProfile} 
                  disabled={uploading}>
                  <Text style={ProfileStyles.atualizarInfo}>{uploading ? 'Atualizando...' : 'Atualizar Informações'}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={openLogoutModal}>
                    <Text style={ProfileStyles.signOut}>Sair da Conta</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Modal de confirmação de logout */}
            {modalVisible && (
              <Modal
                transparent={true}
                visible={modalVisible} // Use este estado específico
                animationType="fade"
              >
                  <View style={ProfileStyles.modalContainer}>
                      <View style={ProfileStyles.modalContent}>
                          <Text style={ProfileStyles.modalTitle}>Você tem certeza que deseja mesmo sair?</Text>
                          <View style={ProfileStyles.modalButtons}>
                              <TouchableOpacity style={ProfileStyles.buttonCancel} onPress={closeLogoutModal}>
                                  <Text style={ProfileStyles.buttonText}>Cancelar</Text>
                              </TouchableOpacity>
                              <TouchableOpacity style={ProfileStyles.buttonConfirm} onPress={confirmLogout}>
                                  <Text style={ProfileStyles.buttonText}>Sim</Text>
                              </TouchableOpacity>
                          </View>
                      </View>
                  </View>
              </Modal>
          )}

          {/* Modal de Atualização */}
          {modalAttVisible && (
            <Modal
              transparent={true}
              visible={modalAttVisible} // Use este estado específico
              animationType="fade"
            >
                <View style={ProfileStyles.modalContainer}>
                    <View style={ProfileStyles.modalContent}>
                        <Text style={ProfileStyles.modalTitle}>Sucesso!</Text>
                        <Text style={ProfileStyles.modalSubTitle}>Perfil atualizado com sucesso!</Text>
                        <TouchableOpacity style={ProfileStyles.buttonOk} onPress={closeAttModal}>
                            <Text style={ProfileStyles.buttonText}>Ok</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
          )}
        </View>
    );
};

export default Profile;
