<template>
  <Navbar :title="title" theme="light" />

  <RouterView />

  <AppFooter :year="2024" version="0.0.1" />
</template>

<script setup>
import AppFooter from './components/AppFooter.vue'
import Navbar from './components/Navbar.vue'
import { RouterView } from 'vue-router'
</script>
