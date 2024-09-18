import { StyleSheet } from 'react-native';

const PointsRecordsStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#343a40', // Cor de fundo do container
    },
    scrollContainer: {
        padding: 16,
    },
    // Estilos para a lista de registros de pontos
    row: {
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingVertical: 26,
        paddingHorizontal: 16,
        marginBottom: 10,
        elevation: 2, // Sombra no Android
        shadowColor: '#000', // Sombra no iOS
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: { width: 0, height: 2 },
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
        flex: 1, // Faz com que os horários ocupem o espaço disponível
    },
    timeBlockTop: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 30,
        marginVertical: 4,
    },
    timeBlock: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginVertical: 4,
    },
    detailStand: {
        width: 6,
        height: 70,
        borderRadius: 10,
        backgroundColor: '#509e2f',
        marginRight: 10,
        marginLeft: -20,
    },
    test: {
        backgroundColor: 'red',
        alignSelf: 'center',
        width: '100%',
        height: '100%'
    },
    time: {
        fontSize: 12,
        fontFamily: 'Poppins_500Medium',
        color: '#222',
    },
    arrow: {
        fontSize: 16,
        color: '#222',
        marginTop: -10,
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
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
        backgroundColor: '#f8f9fa',
    },
    filterButton: {
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#e9ecef',
        borderWidth: 1,
        borderColor: '#ced4da',
    },
    activeFilterButton: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    filterText: {
        color: '#333',
        textAlign: 'center',
    },
});

export default PointsRecordsStyles;
