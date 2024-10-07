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
        width: 36,
        height: 36,
        marginRight: -5,
    },
    middle2icon: {
        width: 32,
        height: 32,
    },
    rightIcon: {
        width: 32,
        height: 32,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.459)', // Fundo do modal
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#343a40',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalConfirmationContent: {
        width: '100%',
        height: '90%',
        marginTop: 120,
        backgroundColor: '#343a40',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 20,
        color: '#FFF',
        textAlign: 'center',
    },
    modalTitleTime: {
        fontSize: 28,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 20,
        color: '#FFF',
        textAlign: 'center',
    },
    modalSubTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        marginBottom: 20,
        color: '#FFF', 
        textAlign: 'center',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    buttonCancel: {
        backgroundColor: '#606c77',
        fontFamily: 'Poppins_600SemiBold',
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    buttonConfirm: {
        fontFamily: 'Poppins_600SemiBold',
        backgroundColor: '#509e2f',
        padding: 10,
        borderRadius: 5,
        width: '48%',
        alignItems: 'center',
    },
    buttonOk: {
        backgroundColor: '#509e2f',
        padding: 10,
        color: '#FFF',
        textAlign: 'center',
        borderRadius: 5,
        minWidth: '48%',
        fontFamily: 'Poppins_600SemiBold',
    },
    buttonOkText: {
        color: 'white',
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
    titleConfirmRegister: {
        color: '#FFF',
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
        fontSize: 22,
    },
});

export default HeaderStyles;