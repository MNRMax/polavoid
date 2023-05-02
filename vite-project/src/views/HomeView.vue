<script setup>
import WelcomeItem from '../components/WelcomeItem.vue';

</script>

<template>
  <main>
    <RouterLink to="/login">Log In</RouterLink>
    <RouterLink to="/register">Register</RouterLink>
    <WelcomeItem/>
  </main>
</template>
