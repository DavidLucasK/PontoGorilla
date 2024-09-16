import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Home: undefined;
    Login: undefined;
    Profile: undefined;
};

export type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
