import { StyleSheet } from 'react-native';

const HomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343a40',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'space-around',
        paddingHorizontal: 40,
        marginTop: 10,
    },
    home: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    loadingText: {
        fontSize: 24,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 20,
        color: '#FFF', 
    },
    currentTime: {
        fontSize: 24,
        fontFamily: 'Poppins_600SemiBold',
        marginBottom: 20,
        color: '#FFF',
    },
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        gap: 20,
    },
    welcomeContainer: {
        display: 'flex',
    },
    welcome: {
        textAlign: 'center',
        color: '#FFF',
        fontSize: 24,
        fontFamily: 'Poppins_600SemiBold',
    },
    name: {
        textAlign: 'center',
        color: '#509e2f',
        fontSize: 24,
        fontFamily: 'Poppins_600SemiBold',
    },
    dateNow: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
    button: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        gap: 5,
        backgroundColor: '#509e2f',
        padding: 15,
        borderRadius: 5,
        marginBottom: -60,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
    },
    status: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 20,
    },
    gorilla: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    gps: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginTop: -3,
    },
    comprovantes: {
        color: '#FFF',
        fontSize: 16,
        alignSelf: 'center',
        fontFamily: 'Poppins_500Medium',
    },
    loadingIcon: {
        marginTop: 250,
    },
    workStatus: {
        fontSize: 18,
        color: '#509e2f',
        fontFamily: 'Poppins_500Medium',
        textAlign: 'center',
    },
    workTime: {
        fontSize: 32,
        fontFamily: 'Poppins_500Medium',
        color: '#fff',
        textAlign: 'left',
    },
    progressBar: {
        width: '100%',
        height: 30,
        backgroundColor: '#ddd',
        borderRadius: 20,
        marginVertical: 10,
    },
    progressCircleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    progressText: {
        fontSize: 16,
        color: '#FFF',
        marginTop: 10,
    },
});

export default HomeStyles;
