<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <HelloWorld msg="You did it!" />

    <nav>
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/todos">Todos</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped></style>
