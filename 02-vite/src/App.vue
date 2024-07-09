<template>
  <Navbar :title="title" theme="light" />

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

  <Title value="Mon titre" />

  {{ total }}

  <Counter @incremented="(value) => total += value" />
  <Counter :start="5" :max="10" @incremented="(value) => total += value" />
  <Counter :start="89" :max="100" @incremented="(value) => total += value" />

  <Ajax />

  <SuperProduct
    v-for="product in products"
    :product="product"
    @added-to-cart="incrementTotal($event, product)"
  />

  {{ cart }}

  <AppFooter :year="2024" version="0.0.1" />
</template>

<script setup>
import { computed, ref } from 'vue'
import AppFooter from './components/AppFooter.vue'
import SuperProduct from './SuperProduct.vue'
import Navbar from './components/Navbar.vue'
import Title from './components/Title.vue'
import Counter from './components/Counter.vue'
import Ajax from './components/Ajax.vue'

const incrementTotal = (event, product) => {
  // @todo Améliorer le panier pour éviter les doublons
  cart.value.push({
    name: product.name, quantity: event.quantity, variation: event.variation
  });
}

const cart = ref([
  // { name: 'Blabla', quantity: 10, variation: 0 },
]);

const total = ref(94); // Pour l'exercice du compteur...

const products = ref([
  {
    brand: 'Brand A',
    name: 'Cat A',
    image: 'https://www.zooplus.fr/magazine/wp-content/uploads/2022/03/kitten-sitzt-boden-768x512-1.jpeg',
    price: 8.99,
    stock: 70,
    features: ['Mignon', 'Affectueux', 'Gourmand'],
    variations: [
      { color: 'blue', price: 0, image: 'https://www.zooplus.fr/magazine/wp-content/uploads/2022/03/kitten-sitzt-boden-768x512-1.jpeg' },
      { color: 'red', price: 2, image: 'https://cdn.shopify.com/s/files/1/0265/1327/7008/files/comment-accueillir-un-chaton.jpg' },
    ],
  },
  {
    brand: 'Brand B',
    name: 'Cat B',
    image: 'https://cdn.shopify.com/s/files/1/0265/1327/7008/files/comment-accueillir-un-chaton.jpg',
    price: 9.99,
    stock: 80,
    features: ['Mignon', 'Gourmand'],
    variations: [],
  },
  {
    brand: 'Brand C',
    name: 'Cat C',
    image: 'https://www.zooplus.fr/magazine/wp-content/uploads/2022/03/kitten-sitzt-boden-768x512-1.jpeg',
    price: 10.99,
    stock: 90,
    features: ['Mignon', 'Affectueux'],
    variations: [
      { color: 'purple', price: 0, image: 'https://www.zooplus.fr/magazine/wp-content/uploads/2022/03/kitten-sitzt-boden-768x512-1.jpeg' },
      { color: 'brown', price: 2, image: 'https://cdn.shopify.com/s/files/1/0265/1327/7008/files/comment-accueillir-un-chaton.jpg' },
    ],
  }
]);

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
