<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
import { useSessionStore } from "../stores/session";
import router from '../router'

const sessionStore = useSessionStore();

let email = ref("");
let usename = ref("");
let password = ref("");

const handleSignUp = async () => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    sessionStore.session = data.session;
    sessionStore.user = data.user;
    if (error) throw error;
    alert("Please check your Email to verify your account.");
    setTimeout(() => {
        window.location.pathname = "/login"
    }, 100)
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message);
    }
  }
};
</script>

<template>
  <div id="login">
    <h2>Create An Account</h2>
    <form @submit.prevent="handleSignUp">
      <label for="email">Email:</label>
      <input
        type="text"
        id="email"
        autocomplete="email"
        v-model="email"
        required
      />
      <label for="password">Create Password:</label>
      <input
        type="password"
        id="password"
        autocomplete="new-password"
        v-model="password"
        required
      />
      <input type="submit" :value="'Register'" />
    </form>
  </div>
</template>

<style scoped>
#login {
  color: var(--text);
  text-align: center;
  border: 5px solid var(--box1);
  border-radius: 10px;
  width: fit-content;
  margin: auto;
  margin-top: 18%;
  min-width: 30%;
  padding: 2rem;
  padding-top: 1rem;
  background-color: var(--shadow);
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
  color: var(--text);
  border: 2px solid var(--text);
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}
input[type="submit"]:hover {
  background-color: var(--button);
}
input:-webkit-autofill {
  background-color: rgb(255, 227, 253) !important;
  background-image: none !important;
}
label {
  color: var(--text);
}
</style>
