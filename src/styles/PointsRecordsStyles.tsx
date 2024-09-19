import { StyleSheet } from 'react-native';

const PointsRecordsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343a40', // Cor de fundo do container
    },
    scrollContainer: {
        padding: 16,
        marginBottom: 170,
    },
    loadingIcon: {
        marginTop: 250,
    },
    // Estilos para a lista de registros de pontos
    row: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 26,
        paddingHorizontal: 16,
        marginBottom: 20,
    },
    rowContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    date: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: '#333',
    },
    timesContainer: {
        flexDirection: 'row',
    },
    timeBlockTop: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    timeBlock: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4,
    },
    time: {
        fontSize: 12,
        fontFamily: 'Poppins_500Medium',
        color: '#222',
        marginHorizontal: 10,
        width: 40, // Defina uma largura fixa
        textAlign: 'center', // Centraliza o texto
    },
    detailStand: {
        width: 6,
        height: 70,
        borderRadius: 10,
        backgroundColor: '#509e2f',
        marginRight: 10,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
    arrow: {
        fontSize: 28,
        color: '#222',
        marginLeft: 1,
    },
    detailsContainer: {
        marginTop: 10,
        paddingTop: 10,
    },
    dayOfWeek: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: '#333',
        marginBottom: 10,
        marginTop: -25,
    },
    expandedTime: {
        fontSize: 14,
        fontFamily: 'Poppins_600SemiBold',
        color: '#555',
        marginBottom: 5,
    },
    borderObservation: {
        borderTopWidth: 1,
        borderTopColor: '#DDD',
        marginTop: 20,
    },
    observationsTitle: {
        fontSize: 16,
        fontFamily: 'Poppins_600SemiBold',
        color: '#333',
        textAlign: 'center',
        marginTop: -5,
    },
    details: {
        textAlign: 'center',
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#666',
    },
    totalWorked: {
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
        color: '#333',
        textAlign: 'center',
        marginVertical: 10,
    },
    // Estilos que só aparecem quando os detalhes estão expandidos
    timeLabel: {
        fontSize: 12,
        fontFamily: 'Poppins_600SemiBold',
        color: '#509e2f',
    },
    registrationMethod: {
        fontSize: 12,
        fontFamily: 'Poppins_400Regular',
        color: '#777',
    },
    comprovantes: {
        marginTop: 10,
        color: '#FFF',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'Poppins_500Medium',
    },
});

export default PointsRecordsStyles;
