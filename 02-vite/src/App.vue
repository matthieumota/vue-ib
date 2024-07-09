<template>
  <Navbar :title="title" theme="dark" />

  {{ html }}
  <span v-html="html"></span> <!-- Attention aux failles XSS -->

  <!-- Le modifier permet de modifier les événements facilement -->
  <input type="text" :value="title" @keyup.enter="title = $event.target.value">
  <input type="text" v-model.lazy="title"> <!-- On change le titre au "change" -->
  <button @['click']="title = 'Test'">Changer le titre</button>
  <input type="text" v-model="title">

  <input type="text" v-model="name">
  <p>{{ name }}, Texte à l'envers: {{ reverse }}</p>

  <ul>
    <li v-for="letter in thirdLetters">
      {{ letter }}
    </li>
  </ul>
  <input type="checkbox" value="alban" v-model="letters"> Alban

  <SuperProduct />
  <SuperProduct />
  <SuperProduct />
</template>

<script setup>
import { computed, ref } from 'vue'
import SuperProduct from './SuperProduct.vue'
import Navbar from './components/Navbar.vue'

const title = ref('Mon application Vue JS')
const html = ref('<h2>Du HTML</h2>')

const name = ref('Fiorella')
const letters = ref(['baba', 'allo', 'dede', 'ello', 'charles'])

// Une computed est une valeur qui est calculée à partir d'une ref
const reverse = computed(() => {
  console.log('call')
  return name.value.split('').reverse().join('')
})

const sortedLetters = computed(() => {
  // let array = ['a', 'b', 'c']
  // let array2 = array // Ici, c'est le même tableau
  // let array3 = [...array] // Ici, c'est une copie du tableau donc un 2ème tableau
  return [...letters.value].sort((a, b) => {
    console.log('Abc')
    return a < b ? -1 : 1
  })
})

const thirdLetters = computed(() => {
  return sortedLetters.value.slice(0, 3)
})
</script>
