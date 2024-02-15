<template>
  <div class="page-wrapper">
    <div class="element-wrapper">
      <div class="element-body">
        <h1>Todo App</h1>
        <button class="action-button" @click="fetchTodo">Fetch Todo</button>
        <table class="todo-table">
          <thead>
            <tr>
              <th>Assignee</th>
              <th>Description</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in todoStore.todos" :key="todo.id">
              <td>{{ todo.assignee }}</td>
              <td>{{ todo.description }}</td>
              <td>{{ formatDate(todo.dueDateTime) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useTodoStore } from '@/stores/todo';
import { ref } from 'vue';

const todoStore = useTodoStore();

async function fetchTodo() {
  await todoStore.fetchTodo();
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('nl'); 
}
</script>

<style>
.action-button {
  margin-bottom: 1rem;
}

.todo-table {
  width: 100%;
  border-collapse: collapse;
}

.todo-table th, .todo-table td {
  padding: 8px;
  border: 1px solid #ddd;
}

.todo-table th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>