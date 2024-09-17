import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppContextProps {
    user: string | null;
    setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

interface AppProviderProps {
    children: ReactNode;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null); // Inicializando com null para quando não há user

    const loadUserFromStorage = async () => {
        try {
            const storedUserId = await AsyncStorage.getItem('userId');
            if (storedUserId) {
                setUser(storedUserId); // Converte o valor armazenado em número
            }
        } catch (error) {
            console.error('Erro ao carregar o userId do AsyncStorage:', error);
        }
    };

    useEffect(() => {
        loadUserFromStorage();
    }, []);

    useEffect(() => {
        if (user !== null) {
            AsyncStorage.setItem('userId', user.toString()) // Converte o número para string antes de salvar
                .catch(error => console.error('Erro ao salvar o userId no AsyncStorage:', error));
        }
    }, [user]);

    return (
        <AppContext.Provider value={{ user, setUser }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
