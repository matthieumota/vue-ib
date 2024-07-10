<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

const countries = ref([]);

const filteredCountries = computed(() => {
    return countries.value
        .map((country) => ({ ...country, name: country.translations['fra'].common }))
        .sort((countryA, countryB) => countryA.name < countryB.name ? -1 : 1);
});

const languages = (country) => country.languages ? Object.values(country.languages): [];

onMounted(() => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
        countries.value = response.data;
    });
});
</script>

<template>
    <h1>Pays</h1>

    <ul>
        <li v-for="country in filteredCountries">
            <p>Pays: {{ country.name }} {{ country.flag }}</p>
            <p>
                Capitale: <span v-for="capital, key in country.capital">
                    {{ capital }}<template v-if="key < country.capital.length - 1">, </template>
                </span>
            </p>
            <p>Langues parlées: <span v-for="language, key in languages(country)">
                {{ language }}<template v-if="key < languages(country).length - 1">, </template>
            </span></p>
        </li>
    </ul>
</template>
