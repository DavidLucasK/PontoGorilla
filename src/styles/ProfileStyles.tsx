import { StyleSheet } from 'react-native';

const ProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343a40',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    home: {
        width: '100%',
        alignItems: 'center',
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
    button: {
        backgroundColor: '#6e6e6e',
        padding: 15,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    buttonActive: {
        backgroundColor: '#509e2f',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    status: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: 20,
    },
    gorilla: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
});

export default ProfileStyles;
