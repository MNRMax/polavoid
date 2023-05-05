<script setup>
import { ref } from "vue"
import { supabase } from '../supabase'
import { useSessionStore } from '../stores/session'

const sessionStore = useSessionStore()

let loading = ref(false)
let usename = ref(null)
let fullname = ref(null)
let website = ref(null)


async function changeUser() {
    try {
        const updates = {
            id: sessionStore.session.value.user.id,
            username: username.value,
            full_name: fullname.value,
            website: website.value,
            updated_at: new Date(),
        }
        const { error } = await supabase.from('profiles').upsert(updates).select()
        if (error) throw error
        window.location = `/profile/${sessionStore.session.value.user.id}`
    } catch (error) {

    }


}
</script>

<template>
    <div id="login">
        <h2>Create Your Username</h2>
        <form @submit.prevent="changeUser">
            <label for="username">Username:</label>
            <input type="text" id="username" autocomplete="off" v-model="username" required>
            <label for="username">Full Name:</label>
            <input type="text" id="fullname" autocomplete="off" v-model="fullname" required>
            <label for="username">Website (Optional):</label>
            <input type="url" id="website" autocomplete="off" v-model="website">
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
input[type="url"] {
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
}</style>
