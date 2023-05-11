<script setup>
import WelcomeItem from "../components/WelcomeItem.vue";
import { useSessionStore } from "../stores/session";

const sessionStore = useSessionStore();
</script>

<template>
  <main>
    <RouterLink
      v-if="sessionStore.session.value"
      :to="`/profile/${sessionStore.session.value.user.id}`"
      >Account</RouterLink
    >
    <div class="loginRegister" v-else>
      <RouterLink id="loginLink" to="/login">Log In</RouterLink>
      <RouterLink id="registerLink" to="/register">Register</RouterLink>
    </div>

    <!-- <WelcomeItem /> -->
  </main>
</template>

<style>
.loginRegister {
  text-align: center;
  margin: auto;
  font-size: 40px;
}
#loginLink {
  margin: 50px;
}
#registerLink {
  margin: 50px;
}
</style>
