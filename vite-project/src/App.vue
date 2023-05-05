<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { supabase } from './supabase'
import { useSessionStore } from './stores/session'
import { ref, onMounted, onBeforeMount } from "vue"

const sessionStore = useSessionStore()

onMounted(async () => {
  await getOldSession()
  console.log(window.location)
  if (window.location.pathname !== '/confirmation') { 
    redirect() 
  }
})

async function redirect() {
  const { data, error } = await supabase
    .from('profiles')
    .select("updated_at")
    .eq("id", sessionStore.session.value.user.id);
  if (data[0] == null) {
    if (window)
      window.location = '/confirmation'
  }
}
async function getOldSession() {
  await supabase.auth.getSession().then(({ data }) => {
    sessionStore.session.value = data.session
  })

  await supabase.auth.onAuthStateChange((_, _session) => {
    sessionStore.session.value = _session
  })
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
