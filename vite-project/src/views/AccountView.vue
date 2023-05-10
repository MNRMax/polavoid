<script setup>
import { ref } from "vue"
import { supabase } from '../supabase'
import { useSessionStore } from '../stores/session'
import ProfilePicture from "../components/ProfilePicture.vue";
import displayFollowItem from "../components/displayFollowItem.vue";
import { useRoute } from 'vue-router'
import FollowButton from "../components/followButton.vue";
const route = useRoute()

const sessionStore = useSessionStore()

const profile = ref()
const following = ref([])
const followers = ref([])
const showFollowing = ref(false)
const showFollowers = ref(false)

async function getProfile() {
    const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq("id", route.params.id)
    profile.value = data[0]
}
async function getFollowing() {
    const { data, error } = await supabase
        .from('follows')
        .select()
        .eq("user", route.params.id)
    following.value = data;
}
async function getFollowers() {
    const { data, error } = await supabase
        .from('follows')
        .select()
        .eq("following", route.params.id)
    followers.value = data;
}

function getAllData() {
    getProfile()
    getFollowing()
    getFollowers()
}

getAllData()

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
    <div v-if="profile" id="banner">
        <ProfilePicture id="pfp" :src="profile.avatar_url" />
        <div id="text">
            <h2>{{ profile.username }}</h2>
            <h3>{{ profile.full_name }}</h3>
            <a :href="profile.website">{{ profile.website }}</a>
        </div>
        <div id="followDiv">
            <button id="follow">{{ "0" }} Posts</button>
            <button id="follow" @click="showFollowers = !showFollowers">{{ followers.length }} Followers</button>
            <button id="follow" @click="showFollowing = !showFollowing">{{ following.length }} Following</button>
            <button id="followButton" @click="signOut" v-if="sessionStore.session.value.user.id == route.params.id">Sign
                Out</button>
            <FollowButton @update="getAllData" id="followButton" :thing="route.params.id" v-else />
        </div>
    </div>
    <displayFollowItem @close="showFollowing = !showFollowing" v-if="showFollowing" header="Following"
        :items="following.map(x => x.following)" />
    <displayFollowItem @close="showFollowers = !showFollowers" v-if="showFollowers" header="Followers"
        :items="followers.map(x => x.user)" />
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
}
</style>