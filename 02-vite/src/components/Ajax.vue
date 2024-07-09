<script setup>
  import axios from 'axios';
  import { onMounted, ref } from 'vue';

  const users = ref([]);
  const loading = ref(false);

  onMounted(() => {
    loading.value = true;

    axios.get('https://jsonplaceholder.typicode.com/users').then(response => {
      users.value = response.data;
      setTimeout(() => loading.value = false, 500);
    });
  })
</script>

<template>
  <div v-if="loading" style="height: 200px; display: flex; align-items: center;">
    Chargement...
  </div>
  <ul v-else>
    <li v-for="user in users" :key="user.id">
      {{ user.email }}
    </li>
  </ul>
</template>
