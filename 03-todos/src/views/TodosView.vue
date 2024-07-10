<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import Loader from '@/components/Loader.vue';
import TodoList from '@/components/TodoList.vue';
import Todo from '@/components/Todo.vue';

const todos = ref([]);
const loading = ref(false);
const filter = ref('all');

const filteredTodos = computed(() => {
  return todos.value.filter((todo) => {
    // return filter.value === 'all' || filter.value == todo.done;
    if (filter.value === 'all') {
      return true;
    } else if (filter.value == 1) {
      return todo.done;
    } else if (filter.value == 0) {
      return !todo.done;
    }
  });
})

onMounted(() => {
  loading.value = true;

  axios.get('http://localhost:3000/todos').then(response => {
    todos.value = response.data;
  }).finally(() => {
    setTimeout(() => loading.value = false, 1000);
  });
});
</script>

<template>
  <Loader v-if="loading" />
  <template v-else>
    <select v-model="filter">
      <option value="all">Tout</option>
      <option value="1">Complète</option>
      <option value="0">Pas complète</option>
    </select>

    <ul>
      <li v-for="todo in filteredTodos">
        <strong>{{ todo.id }}</strong> : {{ todo.name }}
        {{ todo.done ? '✅' : '❌' }}
      </li>
    </ul>

    <!-- La même chose avec des composants -->
    <TodoList>
      <Todo v-for="todo in filteredTodos" :todo="todo" />
    </TodoList>
  </template>
</template>
