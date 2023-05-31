<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useSessionStore } from "../stores/session";
import router from "@/router";

const sessionStore = useSessionStore();

let loading = ref(false);
let email = ref("");
let password = ref("");
let self = this;

const handleLogin = async () => {
  try {
    loading.value = true;
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    sessionStore.session = data.session;
    if (error) throw error;
    window.location = "/";
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section>
    <div id="login">
      <h2>Log In To Your Account</h2>
      <form @submit.prevent="handleLogin">
        <label for="email">Email:</label>
        <input type="text" id="email" autocomplete="email" v-model="email" />
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          autocomplete="current-password"
          v-model="password"
        />
        <input type="submit" :value="loading.value ? 'Loading...' : 'Log In'" />
      </form>
    </div>
  </section>
</template>

<style scoped>
#login {
  color: var(--text);
  text-align: center;
  border: 5px solid var(--shadow);
  border-radius: 10px;
  width: fit-content;
  margin: auto;
  margin-top: 18%;
  min-width: 30%;
  padding: 2rem;
  padding-top: 1rem;
  background-color: var(--box1);
}
input[type="text"],
input[type="password"] {
  display: block;
  margin: auto;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 90%;
}
input[type="submit"] {
  background-color: var(--button);
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}
input[type="submit"]:hover {
  background-color: var(--button);
}
input:-webkit-autofill{
  background-color: rgb(255, 227, 253) !important;
  background-image: none !important;
}
label {
  color: var(--text);
}
</style>
