<script setup>
import {ref} from "vue"
import { supabase } from '../supabase'
let loading = false

const handleLogin = async () => {
  try {
    loading.value = true
    const { error } = await supabase.auth.signIn({
      email: email.value,
    })
    if (error) throw error
    alert('Check your email for the login link!')
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
        <h2>Log In To Your Account</h2>
        <form @submit.prevent="">
            <label for="email">Email:</label>
            <input type="text" id="email" autocomplete="email">
            <label for="password">Password:</label>
            <input type="password" id="password" autocomplete="current-password">
            <input type="submit" :value="loading ? 'Loading...':'Log In'">
        </form>
    </div>
</template>

<style scoped>
#login {
    text-align: center;
    border: 2px gray solid;
    border-radius: 10px;
    width: fit-content;
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