<script setup>
import ProfilePicture from './ProfilePicture.vue';

const props = defineProps({
    profile: Object,
})
</script>

<template>
    <div id="all">
        <ProfilePicture id="pfp" :src="props.profile.avatar_url"/>
        <div id="text">
            <h2>{{ props.profile.username }}</h2>
            <h3>{{ props.profile.full_name }}</h3>
        </div>
        <button id="followButton" @click="signOut">Following</button>
    </div>
</template>

<style scoped>
#pfp {
    height: 4rem;
    width: 4rem;
}
#text {
    width: fit-content;
}
#all {
    width: 90%;
    display: flex;
    padding: 2rem;
    color: aliceblue;
}
h2 {    
    font-size: 1.5rem;
    margin: 0;
    margin-top: 0.5rem;
    margin-left: 20%;
}
h3 {    
    width: fit-content;
    font-size: 1rem;
    margin: 0;
    margin-left: 20%;
}
button {
    margin-top: 1.25rem;
    height: fit-content;
    background-color: #00bd7e;
    box-shadow: none;
    font-size: 1.3rem;
    color: aliceblue;
    border-style: none;
    margin-left: 25%;
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