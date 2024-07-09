<script setup>
    defineProps(['title', 'theme']);
</script>

<template>
    <div class="navbar" :class="{ dark: theme !== 'light' }">
        <h1>{{ title ?? 'Menu' }}</h1>
        <nav>
            <a href="#">Accueil</a>
            <a href="#">A propos</a>
        </nav>
    </div>
</template>

<style scoped>
    .navbar {
        display: flex;
        align-items: center;
        gap: 20px;
        border-bottom: 1px solid lightgray;
    }

    h1 {
        font-size: 18px;
    }

    nav {
        display: flex;
        gap: 10px;
    }

    nav a {
        color: #000;
        text-decoration: none;
    }

    .navbar.dark {
        background-color: #1f0505;
        color: #fff;
    }

    .dark a {
        color: #fff;
    }
</style>