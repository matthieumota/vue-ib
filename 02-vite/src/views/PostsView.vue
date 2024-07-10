<template>
    <div v-if="loading" class="box">
        Chargement...
    </div>
    <ul v-else>
        <li v-for="post in posts">
            {{ post.id }} - {{ post.title }}
        </li>
    </ul>
    <button @click="followPage(-1)" v-if="page > 1" :disabled="loading">Précédent</button>
    <button @click="followPage(1)" :disabled="loading">Suite</button>
    <button @click="fetchPosts()" :disabled="loading">Reset</button>
</template>

<script setup>
import axios from 'axios';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute(); // Récupére la route actuelle
const router = useRouter(); // Le router qui va nous permettre de manipuler l'URL
const posts = ref([]);
const loading = ref(false);
const page = ref(parseInt(route.query.page) || 1); // On peut récupérer le paramètre ?page=1 sur la route

const followPage = (increment) => {
    page.value += increment;
    router.push({ path: '/articles', query: { page: page.value } }); // L'URL ?page=1 devient ?page=2
    // fetchPosts();
}

const fetchPosts = () => {
    loading.value = true;

    axios.get('https://jsonplaceholder.typicode.com/posts?_page='+page.value).then(response => {
        posts.value = response.data;

        if (posts.value.length === 0) { // Si on va sur la page 11, on revient sur la page 1
            page.value = 1;
            followPage(0);
        }
    }).finally(() => { // Se lance dans tous les cas
        setTimeout(() => loading.value = false, 2000);
    });
}

onMounted(() => { // Au démarrage du composant...
    fetchPosts();
});

// Le watch sert à surveiller l'URL qui change (surtout avec l'historique)
watch(
    () => route.query.page,
    (newId) => {
        page.value = parseInt(newId);
        fetchPosts();
    }
)
</script>

<style scoped>
  .box {
    height: 200px;
    display: flex;
    align-items: center;
  }
</style>
