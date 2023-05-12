<script setup>
import WelcomeItem from '../components/WelcomeItem.vue';
import PostItem from '../components/postItem.vue';
import { useSessionStore } from '../stores/session'

const sessionStore = useSessionStore()
</script>

<template>
    <main>
        <RouterLink v-if="sessionStore.session.value" :to="`/profile/${sessionStore.session.value.user.id}`">Account</RouterLink>
        <div v-else>
            <RouterLink to="/login">Log In</RouterLink>
            <RouterLink to="/register">Register</RouterLink>
        </div>

        <!-- <WelcomeItem /> -->
        <PostItem/>
    </main>
</template>
