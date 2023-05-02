<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { supabase } from './supabase'
import { useSessionStore } from './stores/session'
import {ref, onMounted} from "vue"

const sessionStore = useSessionStore()

onMounted(() => {
  supabase.auth.getSession().then(({ data }) => {
    sessionStore.session.value = data.session
  })

  supabase.auth.onAuthStateChange((_, _session) => {
    sessionStore.session.value = _session
  })
  console.log(sessionStore.session)
})
</script>

<template>
  <RouterView/>
</template>

<style scoped>
</style>
