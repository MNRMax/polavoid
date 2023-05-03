<script setup>
import {ref} from "vue"
import { supabase } from '../supabase'
import { useSessionStore } from '../stores/session'
import router from "@/router";

const sessionStore = useSessionStore()

let loading = ref(false)
let email = ref("")
let usename = ref("")
let password = ref("")


const handleSignUp = async () => {
  try {
    loading.value = true
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value
    })
    sessionStore.session = data.session
    sessionStore.user = data.user
    if (error) throw error
    window.location = "/"
  } catch (error) {
    if (error instanceof Error) {
      alert(error.message)
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
    <div id="login">
        <h2>Create An Account</h2>
        <form @submit.prevent="handleSignUp">
            <label for="email">Email:</label>
            <input type="text" id="email" autocomplete="email" v-model="email">
            <label for="password">Create Password:</label>
            <input type="password" id="password" autocomplete="new-password" v-model="password">
            <input type="submit" :value="loading.value ? 'Loading...':'Log In'">
        </form>
    </div>
</template>

<style scoped>
#login {
    text-align: center;
    border: 2px gray solid;
    border-radius: 10px;
    width: fit-content;
    min-width: 30%;
    margin: auto;
    padding: 2rem;
    padding-top: 1rem;
    background-color: rgb(174, 179, 184);
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
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
}

input[type="submit"]:hover {
  background-color: #3e8e41;
}
label {
    color: black;
}
</style>