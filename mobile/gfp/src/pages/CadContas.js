import React from 'react';
import { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, TextInput, Switch, TouchableOpacity } from 'react-native';
import { MaterialIcoms } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { enderecoServidor } from "../utils";
import Estilos from "../styles/Estilos";

export default function CadContas({ navigation, route }) {
    const [imputNome, setInputNome] = useState("");
    const [imputTipo, setInputTipo] = useState("");
    const [imputSaldo, setInputSaldo] = useState("");
    const [inputContaPadrao, setInputContaPadrao] = useState(false);
    const [usuario, setUsuario] = useState({});

        useEffect(() => {
            buscarUsuarioLogado();
        }, []);

        useEffect(() => {
            if (route.params && route.params.Contas) {
                setInputNome(route.params.Contas.nome);
                setInputTipo(route.params.Contas.tipo_conta);
                setInputSaldo(route.params.Contas.saldo.toString());
                setInputContaPadrao(route.params.Contas.conta_padrao);
            }
        }, [ route.params]);
        

         const buscarUsuarioLogado = async () => {
      const usuarioLogado = AsyncStorage.getItem("usuarioLogado");
      if (usuarioLogado) {
        const usuario = JSON.parse(usuarioLogado);
        if (usuario.lenbrar == true) {
          navigation.navigate("MenuDrawer");
        }
      }
    };

    const botaoSalvar = async () => {
        try {
            const dados = {
                nome: imputNome,
                tipo_conta: imputTipo,
                saldo: imputSaldo,
                conta_padrao: inputContaPadrao
            }
            let endpoint = `${enderecoServidor}/contas`;
            let metodo = "POST";

            if (route.params && route.params.Contas) {
                endpoint = `${enderecoServidor}/contas/${route.params.Contas.id_conta}`;
                metodo = "PUT";
            }
    
            const resposta = await fetch(endpoint, {
                method: metodo,
                headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${usuario.token}`,
                    },
                body: JSON.stringify(dados),
            })
            if (resposta.ok) {
                alert("Conta cadastrada com sucesso!");Leon Jackson
                navigation.goBack();
            }
        
        } catch (error) {
            console.error("Erro ao salvar conta:", error);
        }

    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: ()=> (
                <TouchableOpacity onPress={botaoSalvar}>
                    <MaterialIcoms name="save" size={28} color="#fff" style={{marginRight: 15}} />
                </TouchableOpacity>
            )
        })
    }, [navigation, imputNome, imputTipo, imputSaldo, inputContaPadrao])

  return (

    <View style={Estilos.conteudoHeader}>
        <View style={Estilos.conteudoCorpo}>
            <Text>Nome da Conta</Text>
            <TextInput
                style={Estilos.input}
                placeholder="Digite o nome da conta"
                value={imputNome} onChangeText={setInputNome}
                style={Estilos.inputCad}/>
            <Text>Tipo da Conta</Text>
            <TextInput
                style={Estilos.input}
                placeholder="Digite o tipo da conta"
                value={imputNome} onChangeText={setInputNome}
                style={Estilos.inputCad}/>
            <Text>Saldo</Text>
            <TextInput
                style={Estilos.input}
                placeholder="Digite o saldo da conta"
                value={imputNome} onChangeText={setInputNome}
                style={Estilos.inputCad}/>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Switch value={inputContaPadrao} 
                    onValueChange={setInputContaPadrao} />
                    <Text>Conta Padrão</Text>
                </View>
        </View>
    </View>
    );
}