<script setup>
  import axios from 'axios';
  import { onMounted, ref } from 'vue';

  const users = ref([]);
  const loading = ref(false);
  const hasError = ref(false);
  const el = ref();
  console.log(el.value); // Le h2 n'est pas présent

  onMounted(() => { // On attend que le composant soit "prêt" (le DOM est chargé)
    console.log(el.value);
    loading.value = true;
    hasError.value = false;

    axios.get('https://jsonplaceholder.typicode.com/users').then(response => { // Quand tout va bien
      users.value = response.data;
    }).catch(error => { // Quand il y a une erreur
      hasError.value = true;
    }).finally(() => { // Se lance dans tous les cas
      setTimeout(() => loading.value = false, 500);
    });
  })
</script>

<template>
  <h2 ref="el">Ajax</h2>
  <div v-if="loading" class="box">
    Chargement...
  </div>
  <div v-else-if="hasError" class="box">
    Désolé, l'API n'est pas disponible...
  </div>
  <ul v-else>
    <li v-for="user in users" :key="user.id">
      {{ user.email }}
    </li>
  </ul>
</template>

<style scoped>
  .box {
    height: 200px;
    display: flex;
    align-items: center;
  }
</style>
