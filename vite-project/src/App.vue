<script setup>
import { RouterLink, RouterView } from "vue-router";
import { supabase } from "./supabase";
import { useSessionStore } from "./stores/session";
import { ref, onMounted, onBeforeMount } from "vue";

const sessionStore = useSessionStore();

onMounted(async () => {
  await getOldSession();
  console.log(window.location);
  if (window.location.pathname != "/confirmation") {
    redirect();
  }
});

async function redirect() {
  const { data, error } = await supabase
    .from("profiles")
    .select("updated_at")
    .eq("id", sessionStore.session.value.user.id);
  if (data[0].updated_at == null) {
    if (window) window.location = "/confirmation";
  }
}
async function getOldSession() {
  await supabase.auth.getSession().then(({ data }) => {
    sessionStore.session.value = data.session;
  });

  await supabase.auth.onAuthStateChange((_, _session) => {
    sessionStore.session.value = _session;
  });
}
</script>

<template>
  <div id="navigationBar">
    <a
      id="account"
      v-if="sessionStore.session.value"
      :href="`/profile/${sessionStore.session.value.user.id}`"
      >Account</a
    >
    <a id="people" v-if="sessionStore.session.value" href="/people">People</a>
    <a id="create" v-if="sessionStore.session.value" href="/post"
      >Create Post</a
    >
    <div class="loginRegister" v-else>
      <a id="loginLink" href="/login">Log In</a>
      <a id="registerLink" href="/register">Register</a>
    </div>
  </div>
  <RouterView />
</template>

<style scoped>
#navigationBar {
  width: fit-content;
  height: 50px;
  text-align: center;
  color: var(--text);
  background-color: var(--background);
  border-radius: 10px;
  border: solid var(--box1) 3px;
  margin: 10px auto 30px;
}
#account,
#people,
#create {
  margin: 90px;
  font-size: 30px;
}
</style>
