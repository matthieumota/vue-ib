<script setup>
import { useAuthStore } from '@/stores/auth';
import { RouterLink } from 'vue-router';

defineProps(['todo']);

const auth = useAuthStore();
</script>

<template>
  <li>
    <RouterLink :to="'/todo/' + todo.id">
      <strong>{{ todo.id }}</strong> : {{ todo.name }}
      {{ todo.done ? '✅' : '❌' }}
    </RouterLink>
    <button @click="auth.logout" v-if="auth.isLogged">
      Déconnexion de {{ auth.user.firstname }}
    </button>
  </li>
</template>
