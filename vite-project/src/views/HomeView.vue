<script setup>
import { ref } from 'vue';
import WelcomeItem from '../components/WelcomeItem.vue';
import PostItem from '../components/postItem.vue';
import { useSessionStore } from '../stores/session'
import { supabase } from '../supabase';

const sessionStore = useSessionStore()
const post = ref(undefined)

async function getPost() {
    const { data, error } = await supabase
        .from('posts')
        .select()
    return data[0]
}
getPost().then(data => {
    post.value = data;
})
</script>

<template>
    <main>
        <RouterLink v-if="sessionStore.session.value" :to="`/profile/${sessionStore.session.value.user.id}`">Account</RouterLink>
        <div v-else>
            <RouterLink to="/login">Log In</RouterLink>
            <RouterLink to="/register">Register</RouterLink>
        </div>

        <!-- <WelcomeItem /> -->
        <PostItem v-if="post" :post="post"/>
    </main>
</template>
