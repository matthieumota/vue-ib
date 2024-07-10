<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <h1>Les todos</h1>

    <nav>
      <RouterLink to="/">Accueil</RouterLink>
      <RouterLink to="/todos">Todos</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style>
  body {
    background-color: lightgray;
  }
</style>
