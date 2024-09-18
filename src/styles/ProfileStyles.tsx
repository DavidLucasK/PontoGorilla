import { StyleSheet } from 'react-native';

const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343a40',
    },
    profileTitle: {
        marginTop: 20,
        fontSize: 32,
        fontFamily: 'Poppins_600SemiBold',
        color: '#FFF', // Ajuste a cor do texto conforme necessário
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileContainer: {
        marginVertical: 20, // Ajusta a margem vertical conforme necessário
    },
    profileImage: {
        width: 100, // Ajuste o tamanho da imagem conforme necessário
        height: 100, // Ajuste o tamanho da imagem conforme necessário
        borderRadius: 50, // Faz a imagem ser circular
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: '#FFF', // Ajuste a cor do texto conforme necessário
    },
    textInput: {
        width: '100%',

        minWidth: 300,
        height: 50,
        color: '#FFF',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
    },
    gorilla: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', // Fundo do modal
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#343a40',
        borderRadius: 10,
        padding: 40,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
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
    buttonText: {
        color: 'white',
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
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
    atualizarInfo:{
        fontFamily: 'Poppins_600SemiBold',
        color: '#FFF',
        textAlign: 'center',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginBottom: 60,
        marginTop: -20,
        backgroundColor: '#509e2f'
    },
    signOut: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#FFF',
        textAlign: 'center',
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        backgroundColor: '#626675'
    },
    loadingIcon: {
        marginTop: 250,
    },
});

export default ProfileStyles;
