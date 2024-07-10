<script setup>
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';

const countries = ref([]);
const language = ref('fra');
const search = ref('');

const filteredCountries = computed(() => {
    // let objets = [{ name: 'Mota', firstname: 'Fiorella' }, { name: 'Mota', firstname: 'Marina' }];
    // console.log(objets.map((element) => ({ ...element, fullname: element.firstname + ' ' + element.name })));

    return countries.value
        .map((country) => ({ ...country, name: country.translations[language.value].common }))
        .sort((countryA, countryB) => countryA.name < countryB.name ? -1 : 1);
});

onMounted(() => {
    fetchAllCountries();
});

const fetchAllCountries = () => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
        countries.value = response.data;
    });
}

const fetchCountries = () => {
    if (search.value.trim() === '') {
        return fetchAllCountries();
    }

    axios.get(`https://restcountries.com/v3.1/name/${search.value}`).then(response => {
        countries.value = response.data;
    }).catch(() => fetchAllCountries());
}
</script>

<template>
    <h1>Pays</h1>

    <select v-model="language">
        <option value="fra">Français</option>
        <option value="ita">Italien</option>
    </select>

    <form @submit.prevent="fetchCountries">
        <input type="text" v-model="search">
        <button>Chercher</button>
    </form>

    <ul>
        <li v-for="country in filteredCountries">
            <p>Pays: {{ country.name }} {{ country.flag }}</p>
            <p>
                Capitale: <span v-for="capital, key in country.capital">
                    {{ capital }}<template v-if="key < country.capital.length - 1">, </template>
                </span>
            </p>
            <p>Langues parlées: <span v-for="language, name, key in country.languages">
                {{ language }}<template v-if="key < Object.keys(country.languages).length - 1">, </template>
            </span></p>
        </li>
    </ul>
</template>
