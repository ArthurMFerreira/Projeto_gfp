import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import enderecoServidor from './utils'




export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigation = useNavigation();

  async function botaoEntrar() {
    if (!email || !senha) {
      setMensagem('⚠️ Preencha todos os campos.');
      return;
    }

    try {
      const resposta = await fetch(`${enderecoServidor}/usuarios/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        await AsyncStorage.setItem('usuarioLogado', JSON.stringify(dados));
        navigation.navigate('Pricipal');
      } else {
        setMensagem('❌ Email ou senha inválidos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setMensagem('❌ Erro de conexão. Tente novamente.');
    }
  }

  function botaoLimpar() {
    setEmail('');
    setSenha('');
    setMensagem('');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.title}>Gestor Financeiro</Text>
        <Text style={styles.subtitle}>Acesse sua conta para continuar</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="seu@email.com"
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={senha}
            onChangeText={setSenha}
            placeholder="Digite sua senha"
            placeholderTextColor="#888"
            secureTextEntry
          />
        </View>

        {mensagem !== '' && <Text style={styles.message}>{mensagem}</Text>}

        <TouchableOpacity style={styles.buttonPrimary} onPress={botaoEntrar}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={botaoLimpar}>
          <Text style={styles.buttonTextSecondary}>Limpar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f', // Cor de fundo escura
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#1c1c1c', // Cor de fundo do card
    borderColor: '#222',
    borderWidth: 1,
    borderRadius: 12,
    padding: 40,
    maxWidth: 400,
    width: '100%',
    shadowColor: '#00bcd4', // Cor neon do sombra
    shadowOpacity: 0.2,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  title: {
    fontSize: 26,
    color: '#00bcd4', // Neon
    fontFamily: 'Orbitron', // Fonte futurista Orbitron
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#333', // Cor do subtítulo
    fontFamily: 'Orbitron',
    textAlign: 'center',
    marginBottom: 25,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    color: '#00bcd4', // Neon
    fontFamily: 'Orbitron',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    padding: 12,
    backgroundColor: '#1c1c1c', // Cor de fundo do input
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 8,
    color: '#e0f7fa', // Cor do texto
    fontSize: 15,
    fontFamily: 'Orbitron', // Fonte futurista Orbitron
  },
  message: {
    marginTop: 15,
    padding: 10,
    borderRadius: 6,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '500',
    color: '#ff5252', // Erro em vermelho
    backgroundColor: 'rgba(255, 82, 82, 0.1)',
    fontFamily: 'Orbitron',
  },
  buttonPrimary: {
    width: '100%',
    padding: 12,
    backgroundColor: '#00bcd4', // Neon para o botão primário
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#0f0f0f', // Cor de texto do botão
    fontWeight: '600',
    fontSize: 15,
    fontFamily: 'Orbitron',
  },
  buttonSecondary: {
    width: '100%',
    padding: 12,
    marginTop: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#00bcd4', // Neon para a borda do botão secundário
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  buttonTextSecondary: {
    color: '#00bcd4', // Neon para o texto do botão secundário
    fontWeight: '600',
    fontSize: 15,
    fontFamily: 'Orbitron',
  },
});
