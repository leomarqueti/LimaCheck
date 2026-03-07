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
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

type TokenPayload = {
  sub: number;
  nome: string;
};

export default function NovaTarefa() {
  const [nome, setNome] = useState('');
  const router = useRouter();

  async function handleCriar() {
    if (!nome.trim()) {
      Alert.alert('Atenção', 'Digite o nome da tarefa');
      return;
    }

    try {
      // Pega o token salvo
      const token = await AsyncStorage.getItem('token');

      // Decodifica pra pegar o id do usuário
      const payload = jwtDecode<TokenPayload>(token!);

      await api.post('/tarefas', { nome, usuario_id: payload.sub });
      router.back();
    } catch (error: any) {
      console.log(
        'erro criar:',
        error?.response?.status,
        error?.response?.data,
      );
      Alert.alert('Erro', 'Não foi possível criar a tarefa');
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nova Tarefa</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome da tarefa"
        value={nome}
        onChangeText={setNome}
      />
      <TouchableOpacity style={styles.botao} onPress={handleCriar}>
        <Text style={styles.botaoTexto}>Criar Tarefa</Text>
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
  titulo: { fontSize: 28, fontWeight: 'bold', marginBottom: 32 },
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
