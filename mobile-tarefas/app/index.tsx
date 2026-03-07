import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

export default function Login() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  async function handleLogin() {
    try {
      console.log('tentando login...', { nome, senha });
      const response = await api.post('/auth/login', { nome, senha });
      const token = response.data.acess_token;
      console.log('resposta:', response.data);
      // salva o token no celular
      await AsyncStorage.setItem('token', token);

      router.push('/home');
    } catch (error) {
      console.log('erro completo:', error);
      Alert.alert('Erro', 'Usuario e senha nao encontrada!');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>LimaCheck</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.botao} onPress={handleLogin}>
        <Text style={styles.botaoTexto}>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  botao: {
    backgroundColor: '#1d4ed8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
