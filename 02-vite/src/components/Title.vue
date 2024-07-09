<template>
    <h1>{{ value }}</h1>
</template>

<script setup>
    defineProps({
        value: {
            type: String,
            required: true,
            default: 'Un titre',
        },
    });
</script>
