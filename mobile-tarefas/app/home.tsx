import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';

type Usuario = {
  nome: string;
};

type Tarefa = {
  id: number;
  nome: string;
  isCheck: boolean;
  usuario?: Usuario | null;
};

export default function Home() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const router = useRouter();

  useEffect(() => {
    carregarTarefas();
  }, []);

  async function carregarTarefas() {
    try {
      const response = await api.get('/tarefas');
      // filtra só as tarefas não marcadas
      const naoFeitas = response.data.filter((t: Tarefa) => !t.isCheck);
      setTarefas(naoFeitas);
    } catch (error: any) {
      console.log('erro tarefas:', error?.response?.status);
    }
  }

  async function marcarCheck(id: number) {
    try {
      await api.patch(`/tarefas/${id}/check`);
      carregarTarefas(); // recarrega a lista
    } catch (error) {
      console.log('Erro ao marcar tarefa:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tarefas da Oficina 🔧</Text>

      <FlatList
        data={tarefas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tarefa}>
            <TouchableOpacity onPress={() => marcarCheck(item.id)}>
              <Text style={styles.check}>{item.isCheck ? '✅' : '⬜'}</Text>
            </TouchableOpacity>
            <View>
              <Text style={styles.nomeTarefa}>{item.nome}</Text>
              <Text style={styles.nomeUsuario}>{item.usuario?.nome}</Text>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.botaoNovo}
        onPress={() => router.push('/nova-tarefa')}
      >
        <Text style={styles.botaoTexto}>+ Nova Tarefa</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: '#fff' },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, marginTop: 40 },
  tarefa: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
    gap: 12,
  },
  check: { fontSize: 24 },
  nomeTarefa: { fontSize: 16, fontWeight: '500' },
  nomeUsuario: { fontSize: 13, color: '#888' },
  botaoNovo: {
    backgroundColor: '#1d4ed8',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  botaoTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
