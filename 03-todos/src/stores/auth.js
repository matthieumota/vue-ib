import axios from 'axios';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const isLogged = computed(() => user.value);

  const login = (firstname) => {
    user.value = { firstname };
  };
  const logout = () => {
    user.value = null;
  };
  const fetchRandomUser = async () => {
    axios.get('https://jsonplaceholder.typicode.com/users').then((response) => {
        const users = response.data;
        const randomUser = users[Math.floor(Math.random()*users.length)];
        login(randomUser.name);
    });
  }

  return { user, isLogged, login, logout, fetchRandomUser };
});
