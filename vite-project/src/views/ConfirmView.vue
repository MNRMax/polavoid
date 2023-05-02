<script setup>
import {ref} from "vue"
import { supabase } from '../supabase'  
import { useSessionStore } from '../stores/session'

const sessionStore = useSessionStore()

let loading = ref(false)
let usename = ref("")


async function changeUser() {
  const updates = {
      id: sessionStore.user.id,
      username: username.value,
      updated_at: new Date(),
    }
    let { error } = await supabase.from('profiles').upsert(updates).select()
    console.log(error)
}
</script>

<template>
    <div id="login">
        <h2>Create Your Username</h2>
        <form @submit.prevent="changeUser">
            <label for="username">Username:</label>
            <input type="text" id="username" autocomplete="off" v-model="username">
            <input type="submit" value="Sign Up">
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
