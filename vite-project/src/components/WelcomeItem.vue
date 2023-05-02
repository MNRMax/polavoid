<script setup>
import { supabase } from '../supabase'  
import { useSessionStore } from '../stores/session'

const sessionStore = useSessionStore()

</script>

<template>
    <p>{{ sessionStore }}</p>
</template>

<style scoped>
p {
    color: white;
}
</style>
