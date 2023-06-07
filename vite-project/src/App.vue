<script setup>
import { RouterLink, RouterView } from "vue-router";
import { supabase } from "./supabase";
import { useSessionStore } from "./stores/session";
import { ref, onMounted, onBeforeMount } from "vue";
import router from "./router";

const sessionStore = useSessionStore();

onBeforeMount(async () => {
  await getOldSession();
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
    if (window) router.go({ path: "/confirmation" });
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
    <RouterLink to="/"
      ><img id="homeLogo" src="/favicon.ico" alt=""
    /></RouterLink>
    <RouterLink
      id="account"
      v-if="sessionStore.session.value"
      :to="`/profile/${sessionStore.session.value.user.id}`"
      >Account</RouterLink
    >
    <RouterLink id="people" v-if="sessionStore.session.value" to="/people"
      >People</RouterLink
    >
    <RouterLink id="create" v-if="sessionStore.session.value" to="/post"
      >Create Post</RouterLink
    >
    <div class="loginRegister" v-else>
      <RouterLink id="loginLink" to="/login">Log In</RouterLink>
      <RouterLink id="registerLink" to="/register">Register</RouterLink>
    </div>
    <RouterLink id="aboutLink" to="/about">About</RouterLink>
  </div>
  <RouterView />
</template>

<style scoped>
#homeLogo {
  width: 70px;
  margin: 20px;
}
#navigationBar {
  z-index: 100;
  max-width: 1400px;
  max-width: none;
  width: max-content;
  height: 100px;
  text-align: center;
  color: var(--text);
  background-color: var(--background);
  border-radius: 10px;
  border: solid var(--box1) 3px;
  margin: 10px auto 30px;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
.loginRegister {
  display: flex;
  flex-wrap: wrap;
  align-content: center;
}
#account,
#people,
#create,
#aboutLink,
#loginLink,
#registerLink {
  margin: 30px 90px;
  font-size: 27px;
}
</style>
