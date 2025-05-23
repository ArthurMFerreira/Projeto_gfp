import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { MaterialIcoms } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { enderecoServidor } from "../utils";
import Estilos from "../styles/Estilos";
import {useIsFocused} from "@react-navigation/native";

export default function Contas({ navigation}) {
    const [dadosLista, setDadosLista] = useState([]);

    const isFocused = useIsFocused();
 // hook para verificar se a tela está em foco
    const buscarDadosAPI = async () => {
        try {
            const resposta = await fetch(`${enderecoServidor}/contas`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${usuario.token}`,
                },
        })
            const dados = await resposta.json();
            setDadosLista(dados);

        } catch (error) {
            console.error("Erro ao buscar dados:", error);
            
        }
    }
    useEffect(() => {
        
        if (isFocused === true) {
            buscarDadosAPI();
        }
        buscarDadosAPI();
    }, [usuario, isFocused]);

    useEffect(() => {
        buscarUsuarioLogado();
    }, []);
     
    const botaoExcluir = async (id) => {

        try {
            const resposta = await fetch(`${enderecoServidor}/contas/${id}`, {
                method: "DELETE",
                body: JSON.stringify({ id_conta: id }),
                headers: {
                    'Authorization': `Bearer ${usuario.token}`,
                },
        })

        if (resposta.ok) {
            buscarDadosAPI();
        }
            
        } catch (error) {
            console.error("Erro ao excluir conta:", error);
            
        }

    }
useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: ()=> (
            <TouchableOpacity onPress={() => navigation.navigate("CadContas")}>
                <MaterialIcoms name="add" size={28} color="#fff" style={{marginRight: 15}} />
            </TouchableOpacity>
        )
    })
}, [navigation])

    const exibirItemLista = ({ item }) => {
        return(
            <TouchableOpacity>
                <Image source={require('../assets/logo2.png')} style={Estilos.imagemLista} />
                <View style={textContainer}>
                    <Text>{item.tipo_conta}</Text>
                    <Text style={nomeLista}>{item.nome}</Text>

                </View>
                <MaterialIcoms name="edit" size={24} color="black" 
                onPress={() => navigation.navigate('CadContas', {Conta: item})}/>
                <MaterialIcoms name="delete" size={24} color="black" 
                    onPress={() => botaoExcluir(item.id_conta)}
                />

            </TouchableOpacity>
        )
    }
    const buscarUsuarioLogado = async () => {
      const usuarioLogado = AsyncStorage.getItem("usuarioLogado");
      if (usuarioLogado) {
        const usuario = JSON.parse(usuarioLogado);
        if (usuario.lenbrar == true) {
          navigation.navigate("MenuDrawer");
        }
      }
    };

  return (
    <View style={Estilos.conteudoHeader}>

      <View style={Estilos.conteudoCorpo}>
        <Text>Contas</Text>

        <FlatList 
            data = {dadosLista}
            renderItem={exibirItemLista}
            keyExtractor={item => item.id_conta}
            />
      </View>
    </View>
  );
}
