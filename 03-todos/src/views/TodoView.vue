<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute(); // Récupérer le paramètre de la route
const router = useRouter(); // Pour gérer la redirection
const todo = ref(); // Valeur null par défaut

onMounted(() => {
    axios.get(`http://localhost:3000/todos/${route.params.id}`)
        .then(response => todo.value = response.data)
        .catch(() => router.push('/todos'));
});
</script>

<template>
    <h1 v-if="todo">
        {{ todo.name }} {{ todo.done ? '✅' : '❌' }}
    </h1>
</template>
