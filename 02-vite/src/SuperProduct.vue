<template>
    <div class="product">
        <div>
            <img :src="image" :alt="fullName">
        </div>
        <div>
            <h1>{{ fullName }}</h1>

            <p>{{ total }}</p>
            <input type="number" v-model="quantity" @change="notify">
            <button @click="quantity++; /*notify()*/">+</button>

            <p class="in-stock" v-if="product.stock > 0 && quantity <= product.stock">En stock</p>
            <p class="out-stock" v-else>Pas assez de stock</p>

            <ul>
                <li v-for="feature in product.features">
                    {{ feature }}
                </li>
            </ul>

            <div class="variations">
                <div v-for="(variation, index) in product.variations"
                     :class="{ square: true, active: selected === index }"
                     :style="{ backgroundColor: variation.color }"
                     @click="choose(index)"
                ></div>
            </div>

            <button @click="add">Ajouter au panier</button>
        </div>
    </div>
</template>

<script setup>
    import { computed, ref, watch } from 'vue';

    const props = defineProps(['product']); // Entrée de données dans le composant
    const emit = defineEmits(['addedToCart']); // Evénements que l'on peut déclencher

    const add = () => {
        emit('addedToCart', {
            quantity: quantity.value, // 5
            variation: selected.value, // 0
        }); // On emet un événément qu'on peut écouter plus tard
    }

    // Ref pour le produit

    const quantity = ref(1);
    const selected = ref(0); // Variation sélectionnée

    const fullName = computed(() => props.product.brand + ' ' + props.product.name);
    const total = computed(() => {
        // Exemple et test
        const numberFormat = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' });
        console.log(numberFormat.format(1997.12)); // 1 997,12 €
        // On vérifie si le produit a au moins une variation
        const variationPrice = variation.value ? variation.value.price : 0;

        return numberFormat.format((props.product.price + variationPrice) * quantity.value);
    });
    const variation = computed(() => props.product.variations ? props.product.variations[selected.value] : null); // Renvoie la variation actuelle (objet)
    const image = computed(() => variation.value ? variation.value.image : props.product.image);

    const choose = (index) => selected.value = index;

    const notify = () => 'alert(quantity.value)';

    // J'écoute quand il y a un changement sur la ref quantity
    watch(quantity, (newValue, oldValue) => {
        if (newValue >= props.product.stock) {
            alert(`Vous avez choisi ${newValue} et le stock est de ${props.product.stock}`);
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
