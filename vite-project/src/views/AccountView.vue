<script setup>
import { ref } from "vue"
import { supabase } from '../supabase'
import { useSessionStore } from '../stores/session'
import ProfilePicture from "../components/ProfilePicture.vue";
import displayFollowItem from "../components/displayFollowItem.vue";

const sessionStore = useSessionStore()

const profile = ref()

async function getProfile() {
    const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq("id", sessionStore.session.value.user.id)
    profile.value = data[0]
}
getProfile()

const signOut = async () => {
    try {
        const { error } = await supabase.auth.signOut()
        sessionStore.session = undefined
        if (error) throw error
        window.location = "/"
    } catch (error) {
        if (error instanceof Error) {
            alert(error.message)
        }
    }
}
</script>

<template>
    <div id="banner">
        <ProfilePicture id="pfp" :src="profile.avatar_url" />
        <div id="text">
            <h2>{{ profile.username }}</h2>
            <h3>{{ profile.full_name }}</h3>
            <a :href="profile.website">{{ profile.website }}</a>
        </div>
        <div id="followDiv">
            <button id="follow">{{ profile.posts.length }} Posts</button>
            <button id="follow">{{ profile.followers.length }} Followers</button>
            <button id="follow">{{ profile.following.length }} Following</button>
            <button id="followButton" @click="signOut">Sign Out</button>
        </div>
    </div>
    <displayFollowItem :items="profile.following? profile.following : []"/>
</template>

<style scoped>
#text {
    display: block;
}

#pfp {
    width: 10%;
    margin: 2rem;
}

#banner {
    display: flex;
    width: 90%;
    background-color: rgb(48, 48, 48);
    border: 2px solid black;
    border-radius: 10px;
    margin: auto;
}

h2 {
    margin-top: 3rem;
    margin-bottom: 0;
    font-size: 2rem;
    color: aliceblue;
}

h3 {
    margin-top: 0.5rem;
    margin-bottom: 0.4rem;
    font-size: 1rem;
    color: aliceblue;
}

a {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 1rem;
}

#followDiv {
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 9rem;
}

#follow {
    height: fit-content;
    background-color: transparent;
    box-shadow: none;
    font-size: 1.3rem;
    color: aliceblue;
    border-style: none;
    margin-left: 1rem;
}

#followButton {
    height: fit-content;
    background-color: #00bd7e;
    box-shadow: none;
    font-size: 1.3rem;
    color: aliceblue;
    border-style: none;
    margin-left: 5rem;
    border-radius: 0.3rem;
    padding: 0.2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    width: fit-content;
}

button:hover {
    cursor: pointer;
}</style>