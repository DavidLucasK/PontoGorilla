import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapComponent = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getLocation = async () => {
            // Solicitar permissões
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão Negada', 'Permissão da localização é obrigatória.');
                setLoading(false);
                return;
            }

            try {
                // Obter a localização atual
                const location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });
                setLatitude(location.coords.latitude);
                setLongitude(location.coords.longitude);
            } catch (error) {
                console.error('Error getting location:', error);
                Alert.alert('Erro', 'Não foi possível localizar.');
            } finally {
                setLoading(false);
            }
        };

        getLocation();
    }, []);

    if (loading) {
        return <View style={{ width: '100%', height: 410, backgroundColor: '#606c77', borderRadius: 20 }} ><ActivityIndicator size="large" color="#509e2f" style={{marginTop: 165}} /></View>;
    }

    if (latitude === null || longitude === null) {
        return <Text>Sem dados de localização disponíveis</Text>;
    }

    return (
        <View style={{ width: '100%', height: 410, borderWidth: 5, borderColor: '#343a40', borderRadius: 20, overflow: 'hidden', zIndex: 99, }} >
            <MapView
                style={{ width: '100%', height: 400}}
                region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.003,
                    longitudeDelta: 0.003,
                }}
            >
                <Marker coordinate={{ latitude, longitude }} />
            </MapView>
        </View>
    );
};

export default MapComponent;
