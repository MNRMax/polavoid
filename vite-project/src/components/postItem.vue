<script setup>
import ProfilePicture from './ProfilePicture.vue';
import {supabase} from '../supabase'
import { ref } from 'vue';

const props = defineProps({
    post: Object,
})

const profile = ref(null)

async function getProfile() {
    const { data, error } = await supabase
        .from('profiles')
        .select()
        .in('id', id)
    return data
}
// getProfile().then(data => {
//     profile.value = data;
// })
console.log(props.post)
</script>

<template>
<div id="post">
    <img id="postImage" src="https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2013/07/ar-10.jpg?ssl=1">
    <ProfilePicture id="pfp" :src="profile.avatar_url"/>
</div>
</template>

<style>
#post {
    margin: auto;
    width: 40%; 
    background-color: aliceblue;
    border: 2px black solid;
    padding: 1rem;
}
#postImage {
    width: 100%;
}
#pfp {
    width: 3rem;
}
</style>