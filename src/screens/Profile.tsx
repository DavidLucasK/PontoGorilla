import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import ProfileStyles from '../styles/ProfileStyles'; // Importando estilos
import { useNavigation } from '@react-navigation/native';
import { ProfileNavigationProp } from '../../navigation';
import Header from '../components/Header';

const Profile: React.FC = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);

  return (
    <View>
        <Text>
            QUE ISSO MOREEEENO
        </Text>
    </View>
  );
};

export default Profile;
