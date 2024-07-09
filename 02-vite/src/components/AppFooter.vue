<template>
    <footer>
        Copyright - {{ year }} - {{ release }}
    </footer>
</template>

<script setup>
    import { computed } from 'vue';

    const props = defineProps(['year', 'version']);

    // Attention de créer la const props si on a besoin des
    // props dans le JS
    const release = computed(() => 'v'+props.version);
</script>

<style scoped>
    footer {
        text-align: center;
        padding: 40px 0;
    }
</style>
