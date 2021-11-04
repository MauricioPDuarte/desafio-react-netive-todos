import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const taskExists = tasks.find(task => task.title == newTaskTitle);

    if (taskExists) {
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome!",
        [
          {
            text: "Ok",
            onPress: () => { return; }
          }
        ]
      )
    } else {
      const newTask: Task = {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      };

      setTasks(tasks => [...tasks, newTask]);
    }


  }

  function handleEditTask(id: number, newTitle: string) {
    setTasks(tasks => tasks.map((task) => {
      if (task.id == id) {
        task.title = newTitle;
      }

      return task;
    }));
  }

  function handleToggleTaskDone(id: number) {
    setTasks(tasks => tasks.map((task) => {
      if (task.id == id) {
        task.done = !task.done;
      }

      return task;
    }));
  }

  function handleRemoveTask(id: number) {
    Alert.alert("Remover item", "Tem certeza que você deseja remover esse item?", [
      {
        text: "Sim",
        onPress: () => {
          setTasks(tasks => tasks.filter(task => task.id != id));
        }
      },
      {
        text: "Não",
        onPress: () => { }
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})