import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    Home: { refresh?: string };
    PointsRecords: undefined;
    SingleRecord: { recordId: number; hourClicked: number, timeLabel: string };
    Login: undefined;
    CriarConta: undefined;
    ForgetPass: undefined;
    Profile: undefined;
};

export type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type PointsRecordsNavigationProp = StackNavigationProp<RootStackParamList, 'PointsRecords'>;
export type SingleRecordNavigationProp = StackNavigationProp<RootStackParamList, 'SingleRecord'>;
export type LoginNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type CriarContaNavigationProp = StackNavigationProp<RootStackParamList, 'CriarConta'>;
export type ForgetPassNavigationProp = StackNavigationProp<RootStackParamList, 'ForgetPass'>;
export type ProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;
