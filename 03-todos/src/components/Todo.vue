<script setup>
import { RouterLink } from 'vue-router';

defineProps(['todo']);
</script>

<template>
  <li>
    <RouterLink :to="'/todo/' + todo.id">
      <strong>{{ todo.id }}</strong> : {{ todo.name }}
      {{ todo.done ? '✅' : '❌' }}
    </RouterLink>
  </li>
</template>
