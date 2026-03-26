import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, ScrollView } from 'react-native';
import { useState } from 'react';

type Tarefa = {
  id: string;
  titulo: string;
  concluida: boolean;
};

const tarefasIniciais: Tarefa[] = [
  { id: '1', titulo: 'Estudar React Native', concluida: false },
  { id: '2', titulo: 'Fazer atividade da faculdade', concluida: true },
  { id: '3', titulo: 'Organizar projeto', concluida: false },
];

export default function App() {
  const [tarefas, setTarefas] = useState<Tarefa[]>(tarefasIniciais);
  const [novaTarefa, setNovaTarefa] = useState('');

  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return;

    const nova: Tarefa = {
      id: Date.now().toString(),
      titulo: novaTarefa.trim(),
      concluida: false,
    };

    setTarefas((prev) => [nova, ...prev]);
    setNovaTarefa('');
  };

  const alternarConclusao = (id: string) => {
    setTarefas((prev) =>
      prev.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  };

  const removerTarefa = (id: string) => {
    setTarefas((prev) => prev.filter((tarefa) => tarefa.id !== id));
  };

  const total = tarefas.length;
  const concluidas = tarefas.filter((t) => t.concluida).length;
  const pendentes = total - concluidas;
  const progresso = total > 0 ? Math.round((concluidas / total) * 100) : 0;

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.appCard}>
        <View style={styles.header}>
          <View>
            <Text style={styles.badge}>TaskFlow</Text>
            <Text style={styles.title}>Minhas Tarefas</Text>
            <Text style={styles.subtitle}>
              Organize seu dia com clareza e execução.
            </Text>
          </View>

          <View style={styles.progressCard}>
            <Text style={styles.progressLabel}>Progresso</Text>
            <Text style={styles.progressValue}>{progresso}%</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <View style={styles.summaryBox}>
            <Text style={styles.summaryNumber}>{total}</Text>
            <Text style={styles.summaryText}>Total</Text>
          </View>

          <View style={styles.summaryBox}>
            <Text style={styles.summaryNumber}>{concluidas}</Text>
            <Text style={styles.summaryText}>Concluídas</Text>
          </View>

          <View style={styles.summaryBox}>
            <Text style={styles.summaryNumber}>{pendentes}</Text>
            <Text style={styles.summaryText}>Pendentes</Text>
          </View>
        </View>

        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progresso}%` }]} />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Digite uma nova tarefa"
            placeholderTextColor="#94a3b8"
            value={novaTarefa}
            onChangeText={setNovaTarefa}
            onSubmitEditing={adicionarTarefa}
          />

          <Pressable style={styles.addButton} onPress={adicionarTarefa}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Lista de tarefas</Text>
          <Text style={styles.sectionInfo}>Toque para concluir</Text>
        </View>

        <View style={styles.listContainer}>
          {tarefas.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Nenhuma tarefa cadastrada</Text>
              <Text style={styles.emptyText}>
                Adicione sua primeira tarefa para começar a organizar seu dia.
              </Text>
            </View>
          ) : (
            tarefas.map((tarefa) => (
              <View key={tarefa.id} style={styles.taskCard}>
                <Pressable
                  style={styles.taskMain}
                  onPress={() => alternarConclusao(tarefa.id)}
                >
                  <View
                    style={[
                      styles.checkCircle,
                      tarefa.concluida && styles.checkCircleDone,
                    ]}
                  >
                    <Text style={styles.checkText}>
                      {tarefa.concluida ? '✓' : ''}
                    </Text>
                  </View>

                  <View style={styles.taskTextArea}>
                    <Text
                      style={[
                        styles.taskTitle,
                        tarefa.concluida && styles.taskTitleDone,
                      ]}
                    >
                      {tarefa.titulo}
                    </Text>
                    <Text style={styles.taskMeta}>
                      {tarefa.concluida ? 'Concluída' : 'Pendente'}
                    </Text>
                  </View>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => removerTarefa(tarefa.id)}
                >
                  <Text style={styles.deleteButtonText}>Excluir</Text>
                </Pressable>
              </View>
            ))
          )}
        </View>
      </View>

      <StatusBar style="dark" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flexGrow: 1,
    backgroundColor: '#eef2f7',
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  appCard: {
    width: '100%',
    maxWidth: 920,
    backgroundColor: '#ffffff',
    borderRadius: 28,
    padding: 28,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16,
    flexWrap: 'wrap',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#dcfce7',
    color: '#0f766e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 14,
  },
  title: {
    fontSize: 42,
    color: '#0f172a',
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 8,
  },
  progressCard: {
    minWidth: 140,
    backgroundColor: '#0f766e',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
  },
  progressLabel: {
    color: '#ccfbf1',
    fontSize: 13,
    marginBottom: 6,
    fontWeight: '600',
  },
  progressValue: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 14,
    marginTop: 28,
    flexWrap: 'wrap',
  },
  summaryBox: {
    flexGrow: 1,
    minWidth: 140,
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  summaryText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  progressBarBg: {
    height: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 999,
    overflow: 'hidden',
    marginTop: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#14b8a6',
    borderRadius: 999,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 28,
    flexWrap: 'wrap',
  },
  input: {
    flex: 1,
    minWidth: 240,
    backgroundColor: '#f8fafc',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    fontSize: 16,
    color: '#0f172a',
    borderWidth: 1,
    borderColor: '#cbd5e1',
  },
  addButton: {
    backgroundColor: '#0f766e',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 140,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  sectionHeader: {
    marginTop: 32,
    marginBottom: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0f172a',
  },
  sectionInfo: {
    fontSize: 14,
    color: '#64748b',
  },
  listContainer: {
    gap: 12,
  },
  emptyState: {
    backgroundColor: '#f8fafc',
    borderRadius: 20,
    padding: 28,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: '#64748b',
    lineHeight: 22,
  },
  taskCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#0f172a',
    shadowOpacity: 0.03,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  taskMain: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#94a3b8',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    backgroundColor: '#ffffff',
  },
  checkCircleDone: {
    backgroundColor: '#14b8a6',
    borderColor: '#14b8a6',
  },
  checkText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 14,
  },
  taskTextArea: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: '#94a3b8',
  },
  taskMeta: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
  },
  deleteButtonText: {
    color: '#dc2626',
    fontSize: 14,
    fontWeight: '700',
  },
});