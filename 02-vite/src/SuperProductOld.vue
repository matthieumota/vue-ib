<template>
    <div class="product">
        <div>
            <img :src="variation.image" :alt="fullName">
        </div>
        <div>
            <h1>{{ fullName }}</h1>

            <p>{{ total }}</p>
            <input type="number" v-model="quantity" @change="notify">
            <button @click="quantity++; /*notify()*/">+</button>

            <p class="in-stock" v-if="stock > 0 && quantity <= stock">En stock</p>
            <p class="out-stock" v-else>Pas assez de stock</p>

            <ul>
                <li v-for="feature in features">
                    {{ feature }}
                </li>
            </ul>

            <div class="variations">
                <div v-for="(variation, index) in variations"
                     :class="{ square: true, active: selected === index }"
                     :style="{ backgroundColor: variation.color }"
                     @click="choose(index)"
                ></div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref, watch } from 'vue';

    // Ref pour le produit
    const brand = ref('Brand');
    const name = ref('Cat');
    const image = ref('https://www.zooplus.fr/magazine/wp-content/uploads/2022/03/kitten-sitzt-boden-768x512-1.jpeg');
    const price = ref(9.99);
    const stock = ref(100);
    const features = ref(['Mignon', 'Affectueux', 'Gourmand']);
    const variations = ref([
        { color: 'blue', price: 0, image: 'https://www.zooplus.fr/magazine/wp-content/uploads/2022/03/kitten-sitzt-boden-768x512-1.jpeg' },
        { color: 'red', price: 2, image: 'https://cdn.shopify.com/s/files/1/0265/1327/7008/files/comment-accueillir-un-chaton.jpg' },
    ]);

    const quantity = ref(1);
    const selected = ref(0); // Variation sélectionnée

    const fullName = computed(() => brand.value + ' ' + name.value);
    const total = computed(() => {
        // Exemple et test
        const numberFormat = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
        console.log(numberFormat.format(1997.12)); // 1 997,12 €

        return numberFormat.format((price.value + variation.value.price) * quantity.value);
    });
    const variation = computed(() => variations.value[selected.value]); // Renvoie la variation actuelle (objet)

    const choose = (index) => selected.value = index;

    const notify = () => 'alert(quantity.value)';

    // J'écoute quand il y a un changement sur la ref quantity
    watch(quantity, (newValue, oldValue) => {
        if (newValue >= stock.value) {
            alert(`Vous avez choisi ${newValue} et le stock est de ${stock.value}`);
        }
    });
</script>

<style scoped>
    .product {
        display: flex;
        gap: 50px;
        max-width: 1200px;
        margin: auto;
    }

    .product > div {
        width: 50%;
    }

    img {
        max-width: 100%;
    }

    input {
        padding: 10px;
        border: 1px solid lightgray;
        border-radius: 5px;
    }

    .in-stock {
        color: green;
    }

    .out-stock {
        color: lightcoral;
    }

    .variations {
        display: flex;
        gap: 10px;
    }

    .square {
        width: 50px;
        height: 50px;
        cursor: pointer;
        border: 4px solid transparent;
    }

    .square.active {
        border-color: darkcyan;
        opacity: 0.5;
    }
</style>
