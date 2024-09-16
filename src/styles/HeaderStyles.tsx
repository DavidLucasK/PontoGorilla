import { StyleSheet, Platform } from 'react-native';

const HeaderStyles = StyleSheet.create({
    headerContent: {
        width: '100%',
        height: 150,
        paddingTop: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1F262D',
    },
    logo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    icons: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    },
    icon: {
        width: 32,
        height: 32,
    },
    middleicon: {
        width: 32,
        height: 32,
    },
    rightIcon: {
        width: 32,
        height: 32,
    },
});

export default HeaderStyles;