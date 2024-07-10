<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';
import { onMounted } from 'vue';

// Le store est un objet qui permet de partager un état
// à travers les composants
const auth = useAuthStore();

onMounted(() => {
  auth.fetchRandomUser();
});
</script>

<template>
  <header>
    <h1>Les todos</h1>
    <h2 v-if="auth.isLogged">
      Bonjour {{ auth.user.firstname }}
      <button @click="auth.logout">Déconnexion</button>
    </h2>
    <button v-else @click="auth.fetchRandomUser()">
      Connexion
    </button>

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
