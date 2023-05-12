<script setup>
import ProfilePicture from './ProfilePicture.vue';
import { supabase } from '../supabase'
import { ref, onMounted } from 'vue';
import '../assets/variables.css'

const props = defineProps({
    post: Object,
})

const profile = ref(undefined)

async function getProfile() {
    console.log(props.post.author)
    const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', props.post.author)
    profile.value = data[0]
}
// getProfile().then(data => {
//     profile.value = data;
// })
onMounted(() => {
    getProfile()
})
</script>

<template>
    <div v-if="profile" id="post">
        <img id="postImage" src="https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2013/07/ar-10.jpg?ssl=1">
        <div id="bottom">
            <ProfilePicture id="pfp" :src="profile.avatar_url" />
            <p id="signature">{{ profile.username }}</p>
        </div>
    </div>
</template>

<style>
#post {
    margin: auto;
    width: 40%;
    background-color: aliceblue;
    box-shadow: 10px 10px 10px black;
    padding: 1.5rem;
}

#postImage {
    width: 100%;
}

#pfp {
    width: 5rem;
    height: 5rem;
    padding: 10px;
}
#bottom {
    display: flex;
}
#signature {
    margin-left: 4rem;
    font-size: 2rem;
    color: black;
    font-family: 'Caveat', cursive;
}
</style>