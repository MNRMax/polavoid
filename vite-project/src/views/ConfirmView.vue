<script setup>
import { ref, onMounted } from "vue"
import { supabase } from '../supabase'
import { useSessionStore } from '../stores/session'
import ProfilePicture from "../components/ProfilePicture.vue";
import convertToBase64 from "../base64";
import router from '../router'

const sessionStore = useSessionStore()

let loading = ref(false)
let username = ref(null)
let fullname = ref(null)
let website = ref(null)
let pfp = ref(null)

async function getProfile() {
    const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', sessionStore.session.value.user.id)
    console.log(data)
    username.value = data[0].username
    fullname.value = data[0].full_name
    website.value = data[0].website
    pfp.value = data[0].avatar_url
}

async function changeUser() {
    try {
        const updates = {
            id: sessionStore.session.value.user.id,
            username: username.value,
            full_name: fullname.value,
            website: website.value,
            avatar_url: pfp.value,
            updated_at: new Date(),
        }
        const { error } = await supabase.from('profiles').upsert(updates).select()
        if (error) throw error
        router.go(`/profile/${sessionStore.session.value.user.id}`)
    } catch (error) {

    }
}
async function handleImage(event) {
    const data = await convertToBase64(event.target.files[0])
    pfp.value = data
}

onMounted(() => {
  getProfile()
})
</script>

<template>
    <div id="login">
        <h2>Create Your Username</h2>
        <form @submit.prevent="changeUser">
            <label for="username">Username:</label>
            <input type="text" id="username" autocomplete="off" v-model="username" required>
            <label for="fullname">Full Name:</label>
            <input type="text" id="fullname" autocomplete="off" v-model="fullname" required>
            <label for="website">Website (Optional):</label>
            <input type="url" id="website" autocomplete="off" v-model="website">
            <label for="pfp">Avatar (Optional):</label>
            <input id="pfpImage" type="file" accept="image/*" ref="image" @change="handleImage">
            <br/>
            <input type="submit" value="Sign Up">
        </form>
    </div>
    <br/>
    <div id="preview">
        <ProfilePicture :src="pfp" id="profilePic"/>
        <h2 class="name">{{ username }}</h2>
        <h3>{{ fullname }}</h3>
        <a>{{ website }}</a>
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
    margin-top: 1.5rem;
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
#preview {
    margin: auto;
    text-align: center;
}
.name {
    color: aliceblue;
    font-size: 3rem;
}
h3 {
    color: aliceblue;
    font-size: 2rem;
}
#profilePic {
    width: 20rem;
    height: 20rem;
}
</style>
