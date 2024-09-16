import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { HomeNavigationProp } from '../../navigation'; // Importando os tipos de navegação
import { useNavigation } from '@react-navigation/native'; // Importando useNavigation

import HeaderStyles from '../styles/HeaderStyles'; // Importando os estilos do cabeçalho

interface HeaderProps {
    homeIcon?: any;
    leftIcon?: any; 
    middleIcon?:any;
    rightIcon?: any;
    onHomeIconPress?: () => void;
    onLeftIconPress?: () => void;
    onMiddleIconPress?: () => void;
    onRightIconPress?: () => void;
    isStoreScreen?: boolean;
}

const Header: React.FC<HeaderProps> = ({ homeIcon, leftIcon, middleIcon, rightIcon, onLeftIconPress, onMiddleIconPress, onRightIconPress, isStoreScreen }) => {
    const navigation = useNavigation<HomeNavigationProp>(); // Usando o tipo de navegação

    const handleLogoPress = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }], // Redefine a navegação para a tela Home
        });
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
                    {rightIcon && (
                        <TouchableOpacity onPress={onRightIconPress}>
                            <Image source={rightIcon} style={HeaderStyles.rightIcon} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
    );
};

export default Header;