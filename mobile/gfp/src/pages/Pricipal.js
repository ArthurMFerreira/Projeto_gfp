import { View, Text, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Principal({navigation}) {
    const [usuario, setUsuario] = useState({});

    useEffect (() => {
        const buscarUsuarioLogado = async () => {
            const usuarioLogado = await AsyncStorage.getItem('usuarioLogado');
            if (usuarioLogado) {
                setUsuario(JSON.parse(usuarioLogado));
            } else {
                navigation.navigate('Login');
            }
            
        }
        buscarUsuarioLogado();

        botaoLogout = async () => {
            await AsyncStorage.removeItem('usuarioLogado');
            navigation.navigate('Login');
        }
    }, []);
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Bem-vindo, {usuario?.nome}</Text>
                <Button title="Sair" onPress={botaoLogout}/>
            </View>
            <Text>Principal</Text>
        </View>
    )
}