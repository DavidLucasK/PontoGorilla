import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, Alert } from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, { Marker, UrlTile } from 'react-native-maps';

const MapComponent = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getLocation = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão Negada', 'Permissão da localização é obrigatória.');
                setLoading(false);
                return;
            }

            try {
                const location = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High,
                });
                const lat = location.coords.latitude;
                const lon = location.coords.longitude;

                setLatitude(lat);
                setLongitude(lon);

                await AsyncStorage.setItem('latitude', lat.toString());
                await AsyncStorage.setItem('longitude', lon.toString());
            } catch (error) {
                console.error('Error getting location:', error);
                Alert.alert('Erro', 'Não foi possível localizar.');
            } finally {
                setLoading(false);
            }
        };

        getLocation();
    }, []);

    return (
        <View style={{ width: '100%', height: 410, borderWidth: 5, borderColor: '#343a40', borderRadius: 20, overflow: 'hidden', zIndex: 99 }}>
            {loading ? (
                <View style={{ width: '100%', height: 410, backgroundColor: '#606c77', borderRadius: 20 }}>
                    <ActivityIndicator size="large" color="#509e2f" style={{ marginTop: 165 }} />
                </View>
            ) : (
                latitude !== null && longitude !== null ? (
                    <MapView
                        style={{ width: '100%', height: 400 }}
                        initialRegion={{
                            latitude: latitude,
                            longitude: longitude,
                            latitudeDelta: 0.003,
                            longitudeDelta: 0.003,
                        }}
                    >
                        <UrlTile
                            urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            maximumZ={19}
                        />
                        <Marker coordinate={{ latitude, longitude }} />
                    </MapView>
                ) : (
                    <Text>Sem dados de localização disponíveis</Text>
                )
            )}
        </View>
    );
};

export default MapComponent;
