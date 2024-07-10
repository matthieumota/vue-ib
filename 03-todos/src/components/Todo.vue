<script setup>
defineProps(['todo']);
</script>

<template>
  <li>
    <strong>{{ todo.id }}</strong> : {{ todo.name }}
    {{ todo.done ? '✅' : '❌' }}
  </li>
</template>
