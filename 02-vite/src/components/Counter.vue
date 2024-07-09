<template>
    <div :style="{ backgroundColor: value >= max ? 'red' : 'transparent' }">
        <button @click="decrement" v-if="value > 0">-</button>
        <span>{{ value }}</span>
        <button @click="increment" v-if="value < max || !max">+</button>
    </div>
</template>

<script setup>
    import { ref } from 'vue';

    const props = defineProps(['start', 'max']);
    const emit = defineEmits(['toto']);

    const value = ref(props.start || 0);

    const increment = () => {
        value.value++;
        emit('incremented', 1);
    };
    const decrement = () => {
        value.value--;
        emit('incremented', -1);
    };
</script>
