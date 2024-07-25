<script setup>
  import axios from 'axios'
  import { computed, ref } from 'vue'
  import Button from '@/Button.vue'

  const todo = ref({
    title: '',
    completed: false,
  });

  const todos = ref([]);

  const loading = ref(false);
  const success = ref(false);
  const errors = ref(null);

  const addTodo = () => {
    loading.value = true;
    success.value = false;
    errors.value = null;

    axios.post('https://jsonplaceholder.typicode.com/todos', todo.value).then(response => {
      setTimeout(() => {
        loading.value = false;
        success.value = true;
        todo.value = { ...todo.value, title: '' }

        todos.value.push(response.data);

        setTimeout(() => success.value = false, 2000);
      }, 500);
    }).catch(error => {
      loading.value = false;

      errors.value = /*error.response.data*/ { title: 'Le titre est invalide' };
    });
  }

  const buttonText = computed(() => loading.value ? 'Chargement...' : success.value ? 'Succès' : 'Ajouter');
  const valid = computed(() => todo.value.title.trim().length > 0);
</script>

<template>
  <h1 class="text-3xl font-bold mb-4">Ajouter une nouvelle todo</h1>

  <div class="grid grid-cols-2">
    <form @submit.prevent="addTodo">
      <div class="mb-4">
        <label for="title" class="block mb-2">Titre</label>
        <input type="text" id="title" v-model="todo.title">
      </div>

      <div class="mb-4">
        <div class="inline-flex items-center gap-3">
          <input type="checkbox" id="completed" v-model="todo.completed">
          <label for="completed">Faite ?</label>
        </div>
      </div>

      <div v-if="errors !== null" class="mb-4">
        <ul class="bg-red-200 p-4 rounded-lg list-disc pl-12">
          <li v-for="(error, name) in erroome
      </div>

      <Button :class="{ 'bg-green-600 hover:bg-green-500': success }" :disabled="loading || !valid || success">
        {{ buttonText }}

        <svg v-if="loading" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="animate-spin w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>

        <svg v-else-if="success" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clip-rule="evenodd" />
        </svg>
      </Button>
    </form>

    <div>
      <ul>
        <li v-for="todo in todos">
          {{ todo.title }} - <strong>{{ todo.id }}</strong>
          {{ todo.completed ? '✅' : '❌' }}
        </li>
      </ul>
    </div>
  </div>
</template>
